---
layout: post
title:  "Pi cluster (single-node Hadoop and Spark)"
date:   2020-06-25 21:00:00 +0800
categories: jekyll update
---

This post follows my previous post [Pi cluster (SSH and static IP)](https://zyf0717.github.io/jekyll/update/2020/06/24/pi-ssh-ip.html), and is basically a documentation of my setup of Hadoop and Spark on the master node of my cluster.

## 0. Install JDK

On the master node, use the following:

```bash
$ sudo apt install openjdk-8-jdk
```

To install on the worker nodes, use the following:

```bash
$ clustercmd sudo apt install openjdk-8-jdk-headless
```

## 1. Apache Hadoop

Download and install Hadoop on the master node with the following:

```bash
$ cd && wget https://apachemirror.sg.wuchna.com/hadoop/common/hadoop-3.2.1/hadoop-3.2.1.tar.gz
$ sudo tar -xvf hadoop-3.2.1.tar.gz -C /opt/
$ rm hadoop-3.2.1.tar.gz && cd /opt
$ sudo mv hadoop-3.2.1 hadoop
```

Change the permissions on this directory:

```bash
$ sudo chown $USER: -R /opt/hadoop
```

Edit `~/.bashrc` by appending the following:

```bash
export HADOOP_HOME=/opt/hadoop
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
```

Edit `/opt/hadoop/etc/hadoop/hadoop-env.sh` by adding the following:

```bash
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
```

Verify that Hadoop has been installed correctly by checking the version:

```bash
$ cd && hadoop version | grep Hadoop
```

## 2. Apache Spark

The process for Spark is very similar to the above. Install with the following commands:

```bash
$ wget https://apachemirror.sg.wuchna.com/spark/spark-3.0.0/spark-3.0.0-bin-hadoop3.2.tgz
$ sudo tar -xvf spark-3.0.0-bin-hadoop3.2.tgz -C /opt/
$ rm spark-3.0.0-bin-hadoop3.2.tgz && cd /opt/
$ sudo mv spark-3.0.0-bin-hadoop3.2 spark
$ sudo chown $USER: -R /opt/spark
```

Edit `~/.bashrc` by appending the following:

```bash
export SPARK_HOME=/opt/spark
export PATH=$PATH:$SPARK_HOME/bin
```

Check that Spark has been installed correctly with:

```bash
$ spark-shell --version
```

In my case I had the following warning messages due to the master node being connected to two networks:

```bash
WARN Utils: Your hostname, odyssey resolves to a loopback address: 127.0.1.1; using 10.42.0.1 instead (on interface enp2s0)
WARN Utils: Set SPARK_LOCAL_IP if you need to bind to another address
```

To resolve, I created the Spark environment configuration file with `$ gedit /opt/spark/conf/spark-env.sh` and inserted the following:

```bash
#!/usr/bin/env bash
export SPARK_LOCAL_IP=10.42.0.1
```

## 3. Hadoop Distributed File System

Setup HDFS by modifying some configuration files. Files are within `/opt/hadoop/etc/hadoop`. 

The first is `core-site.xml`:

```xml
<configuration>
  <property>
    <name>fs.defaultFS</name>
    <value>hdfs://odyssey:9000</value>
  </property>
</configuration>
```

The next is `hdfs-site.xml`:

```xml
<configuration>
  <property>
    <name>dfs.datanode.data.dir</name>
    <value>file:///opt/hadoop_tmp/hdfs/datanode</value>
  </property>
  <property>
    <name>dfs.namenode.name.dir</name>
    <value>file:///opt/hadoop_tmp/hdfs/namenode</value>
  </property>
  <property>
    <name>dfs.replication</name>
    <value>1</value>
  </property>
</configuration> 
```

Also, create the following directories and configure ownership:

```bash
$ sudo mkdir -p /opt/hadoop_tmp/hdfs/datanode
$ sudo mkdir -p /opt/hadoop_tmp/hdfs/namenode
$ sudo chown $USER: -R /opt/hadoop_tmp
```

The next file is `mapred-site.xml`:

```xml
<configuration>
  <property>
    <name>mapreduce.framework.name</name>
    <value>yarn</value>
  </property>
</configuration>
```

Final file is `yarn-site.xml`:

```xml
<configuration>
  <property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
  </property>
  <property>
    <name>yarn.nodemanager.auxservices.mapreduce.shuffle.class</name>  
    <value>org.apache.hadoop.mapred.ShuffleHandler</value>
  </property>
</configuration> 
```

Format the HDFS with:

```bash
$ hdfs namenode -format -force
```

Boot HDFS with:

```bash
$ start-dfs.sh
$ start-yarn.sh
```

Test if HDFS is running properly with `$ jps`. Output should be something like:

```bash
3040 NameNode
3762 NodeManager
4037 Jps
3608 ResourceManager
3355 SecondaryNameNode
2687 DataNode
```

