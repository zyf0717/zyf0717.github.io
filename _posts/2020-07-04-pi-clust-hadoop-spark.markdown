---
layout: post
title:  "Pi cluster (cluster Hadoop and Spark)"
date:   2020-07-04 12:00:00 +0800
categories: jekyll update
---

This post follows my previous post [Pi cluster (master node Hadoop and Spark)](https://zyf0717.github.io/jekyll/update/2020/06/25/pi-single-node-hadoop-spark.html), and is a continuation for a multi-node Hadoop and Spark setup.

## 0. Install JDK

Install JDK on all workers nodes with the following (`clustercmd` was previously defined):

```bash
$ clustercmd sudo apt install openjdk-8-jdk-headless
```

## 1. Setting up Hadoop Distributed File System

First, create directories in the worker nodes with the following:

```bash
$ clustercmd sudo mkdir -p /opt/hadoop_tmp/hdfs
$ clustercmd sudo chown ubuntu: -R /opt/hadoop_tmp
$ clustercmd sudo mkdir -p /opt/hadoop
$ clustercmd sudo chown ubuntu: /opt/hadoop
```

Next, the configuration files of the master node have to be changed. Files are located at `/opt/hadoop/etc/hadoop/`.

The first is `core-site.xml`:

```xml
<configuration>
  <property>
    <name>fs.default.name</name>
    <value>hdfs://odyssey:9000</value>
  </property>
</configuration>
```

The next is `hdfs-site.xml`:

```xml
<configuration>
  <property>
    <name>dfs.datanode.data.dir</name>
    <value>/opt/hadoop_tmp/hdfs/datanode</value>
  </property>
  <property>
    <name>dfs.namenode.name.dir</name>
    <value>/opt/hadoop_tmp/hdfs/namenode</value>
  </property>
  <property>
    <name>dfs.replication</name>
    <value>4</value>
  </property>
  <property>
    <name>dfs.namenode.datanode.registration.ip-hostname-check</name>
    <value>false</value>
  </property>
</configuration> 
```

The next file is `mapred-site.xml`:

```xml
<configuration>
  <property>
    <name>mapreduce.framework.name</name>
    <value>yarn</value>
  </property>
  <property>
    <name>yarn.app.mapreduce.am.env</name>
    <value>HADOOP_MAPRED_HOME=$HADOOP_HOME</value>
  </property>
  <property>
    <name>mapreduce.map.env</name>
    <value>HADOOP_MAPRED_HOME=$HADOOP_HOME</value>
  </property>
  <property>
    <name>mapreduce.reduce.env</name>
    <value>HADOOP_MAPRED_HOME=$HADOOP_HOME</value>
  </property>
  <property>
    <name>mapreduce.framework.name</name>
    <value>yarn</value>
  </property>
  <property>
    <name>yarn.app.mapreduce.am.resource.mb</name>
    <value>1024</value>
  </property>
  <property>
    <name>mapreduce.map.memory.mb</name>
    <value>512</value>
  </property>
  <property>
    <name>mapreduce.reduce.memory.mb</name>
    <value>512</value>
  </property>
</configuration> 
```

Final file is `yarn-site.xml`:

```xml
<configuration>
  <property>
    <name>yarn.acl.enable</name>
    <value>0</value>
  </property>
  <property>
    <name>yarn.resourcemanager.hostname</name>
    <value>odyssey</value>
  </property>
  <property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
  </property>
  <property>
    <name>yarn.nodemanager.auxservices.mapreduce.shuffle.class</name>  
    <value>org.apache.hadoop.mapred.ShuffleHandler</value>
  </property>
  <property>
    <name>yarn.nodemanager.resource.memory-mb</name>
    <value>1536</value>
  </property>
  <property>
    <name>yarn.scheduler.maximum-allocation-mb</name>
    <value>3072</value>
  </property>
  <property>
    <name>yarn.scheduler.minimum-allocation-mb</name>
    <value>256</value>
  </property>
  <property>
    <name>yarn.nodemanager.vmem-check-enabled</name>
    <value>false</value>
  </property>
</configuration> 
```

Copy the files in `/opt/hadoop` from the master node to every worker node using:

```bash
$ for pi in $(workernodes); do rsync -avxP $HADOOP_HOME $pi:/opt; done
```

SSH into one of the worker nodes (pi0). The following exports should be inserted in to `.bashrc` *at the top* of the file:

```bash
# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

export HADOOP_HOME=/opt/hadoop
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
export HADOOP_HOME_WARN_SUPPRESS=1
export HADOOP_ROOT_LOGGER="WARN,DRFA"

function workernodes {
  grep "pi" /etc/hosts | awk '{print $2}' | grep -v $(hostname)
}

function clustercmd {
  for pi in $(workernodes); do ssh $pi "$@"; done
}

function clusterscp {
  for pi in $(workernodes); do
    cat $1 | ssh $pi "sudo tee $1" > /dev/null 2>&1
  done
}

# If not running interactively, don't do anything
...
```

After `$ source .bashrc`, run `$ clusterscp .bashrc` to copy the updated `.bashrc` to all the other worker nodes.

Continue by amending the `hadoop-env.sh` in the worker node (pi0) -- this is because in my case the master node has a AMD64 processor, while the worker nodes are using ARM64 processors:

```bash
$ echo 'export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64' >> /opt/hadoop/etc/hadoop/hadoop-env.sh
```

Then copy the amended `hadoop-env.sh` from that worker node (pi0) to all the other worker nodes with:

```
$ clusterscp /opt/hadoop/etc/hadoop/hadoop-env.sh
```

Back to the master node. Verify that Hadoop is correctly installed by running the following:

```bash
$ clustercmd hadoop version | grep Hadoop
Hadoop 3.2.1
Hadoop 3.2.1
Hadoop 3.2.1
Hadoop 3.2.1
```

Clean up all the worker nodes with:

```
$ clustercmd rm -rf /opt/hadoop_tmp/hdfs/datanode/*
$ clustercmd rm -rf /opt/hadoop_tmp/hdfs/namenode/*
```

Format the HDFS with:

```bash
$ hdfs namenode -format -force
```

Start HDFS with:

```bash
$ start-dfs.sh && start-yarn.sh
```

To check if HDFS is running properly across worker nodes, create an empty folder to test. On the master node, run:

```bash
$ hadoop fs -mkdir /tmp
$ clustercmd hadoop fs -ls /
Found 1 items
drwxr-xr-x   - zyf0717 supergroup          0 2020-07-04 22:38 /tmp
Found 1 items
drwxr-xr-x   - zyf0717 supergroup          0 2020-07-04 22:38 /tmp
Found 1 items
drwxr-xr-x   - zyf0717 supergroup          0 2020-07-04 22:38 /tmp
Found 1 items
drwxr-xr-x   - zyf0717 supergroup          0 2020-07-04 22:38 /tmp
```

Also, navigating to http://odyssey:9870 opens the Haddop web UI, and under "Datanodes", the following can be seen:

![Hadoop datanodes](https://zyf0717.github.io/assets/images/datanodes.png)

## 2. Configuring Apache Spark

Add the following two lines to `.bashrc` on the master node:

```bash
export SPARK_HOME=/opt/spark
export PATH=$PATH:$SPARK_HOME/bin
```

Next, create the Spark configuration file with the following:

```bash
$ cd $SPARK_HOME/conf
$ sudo mv spark-defaults.conf.template spark-defaults.conf
```

Add the following lines to the newly created `spark-defaults.conf`:

```
spark.master                    yarn
spark.driver.memory             2688m
spark.yarn.am.memory            2688m
spark.executor.memory           2688m
spark.executor.cores            1
spark.driver.cores              1
spark.shuffle.service.enabled   false
spark.dynamicAllocation.enabled false
```

Restart the cluster:

```bash
$ stop-dfs.sh && stop-yarn.sh
$ start-dfs.sh && start-yarn.sh
```

Test run the a Spark job across the entire cluster:

```bash
$ spark-submit --num-executors 4 --deploy-mode client --class org.apache.spark.examples.SparkPi $SPARK_HOME/examples/jars/spark-examples*.jar 10000
...
2020-07-06 17:39:27,852 INFO scheduler.DAGScheduler: Job 0 finished: reduce at SparkPi.scala:38, took 117.875031 s
Pi is roughly 3.1416181431416184
...
```

Test run the same Spark job using only a single executor by setting `--num-executors 1`:

```bash
$ spark-submit --num-executors 1 --deploy-mode client --class org.apache.spark.examples.SparkPi $SPARK_HOME/examples/jars/spark-examples*.jar 10000
...
2020-07-06 17:45:12,722 INFO scheduler.DAGScheduler: Job 0 finished: reduce at SparkPi.scala:38, took 272.968774 s
Pi is roughly 3.1416485071416487
...
```