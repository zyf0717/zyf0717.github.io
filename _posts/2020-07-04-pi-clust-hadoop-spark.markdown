---
layout: post
title:  "Pi cluster (worker node Hadoop and Spark)"
date:   2020-07-04 12:00:00 +0800
categories: jekyll update
---

This post follows my previous post [Pi cluster ()](), and is basically a documentation of my setup of Hadoop and Spark on the worker nodes of my cluster.

## 0. Install JDK

Install JDK on all workers nodes with the following (`clustercmd` was previously defined):

```bash
$ clustercmd sudo apt install openjdk-8-jdk-headless
```

## 1. Apache Hadoop

Create  directories first with:

```
$ clustercmd sudo mkdir -p /opt/hadoop_tmp/hdfs
$ clustercmd sudo chown ubuntu: -R /opt/hadoop_tmp
$ clustercmd sudo mkdir -p /opt/hadoop
$ clustercmd sudo chown ubuntu: /opt/hadoop
```

Copy the files in `/opt/hadoop` from the master node to every worker node using:

```
$ for pi in $(workernodes); do rsync -avxP $HADOOP_HOME $pi:/opt; done
```

Because the Pi's run on ARM64 (rather than the AMD64 of the master node), run the following in each worker node:

```
$ sudo echo 'export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-arm64' >> /opt/hadoop/etc/hadoop/hadoop-env.sh
$ echo 'export HADOOP_HOME=/opt/hadoop' >> .bashrc
$ echo 'export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin' >> .bashrc
```

Verify that the above is done correctly with:

```
$ hadoop version | grep Hadoop
Hadoop 3.2.1
```

[**TBC**]

