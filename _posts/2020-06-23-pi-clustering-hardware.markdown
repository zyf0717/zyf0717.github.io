---
layout: post
title:  "Pi cluster (hardware)"
date:   2020-06-23 16:30:00 +0800
categories: jekyll update
---

After many weeks, the hardware I procured to set up my very own compute cluster has mostly arrived. This post will be the first in a series detailing my setup process and subsequent projects.

## 1. Master node

![ODYSSEY mini PC with compatible casing](https://zyf0717.github.io/assets/images/odyssey.jpg)

I have decided to use the [Odyssey mini PC](https://www.seeedstudio.com/ODYSSEY-X86J4105864-p-4447.html) for the master node. It has a Intel Celeron J4105 processor, 8GB RAM and 64GB eMMC. It is no powerhouse, but it is more powerful than any worker node in this cluster while still maintaining low power consumption. Ubuntu 20.04 desktop will be run on this machine.

## 2. Worker nodes and networking

![Rapsberry Pi 4B, PoE HAT, network switch](https://zyf0717.github.io/assets/images/pi-cluster.jpg)

For worker nodes, I chose use [Raspberry Pi 4 Model Bs](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/). At the time of purchase, the 8GB RAM models were not released, so I chose the 4GB RAM modes. Regardless, 4GB RAM seems more than sufficient for a headless Ubuntu 20.04 server setup.

I decided to power the 3 Pis through [PoE HATs](https://www.raspberrypi.org/products/poe-hat/) rather than through the default USB-C. This setup reduces the amount of cables and wires significantly, though it probably costs more than the USB-C option.

Note that a PoE network switch would be necessary to power the Pis, and I chose the [TL-SG1005P](https://www.tp-link.com/us/business-networking/unmanaged-switch/tl-sg1005p/) which has 4 PoE ports (for the Pis) and 1 uplink port (for the Odyssey). This network switch has a total PoE budget of 56W, and can *technically* power up to 4 Pis (each requiring at least 5V and 2.5A, or 12.5W). I do have a 4th Pi arriving (shipping delayed by 1.5 months and counting), and will update this page after testing.

At least four ethernet cables are needed to connect all machines to the network switch -- 3 for the Pis and 1 for the Odyssey. I have also used a fifth ethernet cable to also connect the Odyssey to my Google Home network. Since the Pis have gigabit ethernet, all cables used should preferably support gigabit speeds.

[Samsung EVO Plus MicroSDs](https://www.samsung.com/sg/memory-storage/evo-plus-microsd-card-with-sd-adapter-100/MB-MC64GAAPC/) were used for its decent read and write speeds and low cost, particularly after a discount at time of purchase.

The [cluster case](https://www.amazon.sg/dp/B07MW3GM1T/ref=pe_12283492_374736162_TE_item) I used was purchased from Amazon. The fans provided with the cluster case were not used.

## 3. Final setup

![Odyssey-Pi cluster](https://zyf0717.github.io/assets/images/odyssey-pi-cluster.jpg)

Ta-da!

Next up in this series: [Pi cluster (SSH and static IP)](https://zyf0717.github.io/jekyll/update/2020/06/23/pi-ssh-ip.html)