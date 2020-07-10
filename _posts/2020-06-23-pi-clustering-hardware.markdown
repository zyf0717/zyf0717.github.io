---
layout: post
title:  "Pi cluster (hardware)"
date:   2020-06-23 16:30:00 +0800
categories: jekyll update
---

After many weeks, the hardware I procured to set up my very own compute cluster has mostly arrived. This post will be the first in a series detailing my setup process and subsequent projects.

## 1. Master node

![ODYSSEY mini PC with compatible casing](https://zyf0717.github.io/assets/images/odyssey.jpg)

I have decided to use the [Odyssey mini PC](https://www.seeedstudio.com/ODYSSEY-X86J4105864-p-4447.html) for the master node. It has a Intel Celeron J4105 processor, 8GB RAM and 64GB eMMC. It is no powerhouse, but it is more powerful than any worker node in this cluster while still maintaining low power consumption. Ubuntu desktop 20.04 will be installed on this machine.

## 2. Worker nodes

![Rapsberry Pi 4B, PoE HAT, network switch](https://zyf0717.github.io/assets/images/pi-cluster.jpg)

**Picture taken prior to the arrival of the forth Pi.*

For the worker nodes, I chose [Raspberry Pi 4 Model Bs](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/). A few weeks back, the 8GB RAM models were not released, so I went with the 4GB RAM models. Notwithstanding, 4GB RAM seems more than sufficient for a headless Ubuntu server 20.04 setup.

I decided to power the three Pis through [PoE HATs](https://www.raspberrypi.org/products/poe-hat/) rather than through the default USB-C. This arrangement reduces the amount of cables and wires significantly, though it costs more than the USB-C option.

[Samsung EVO Plus MicroSDs](https://www.samsung.com/sg/memory-storage/evo-plus-microsd-card-with-sd-adapter-100/MB-MC64GAAPC/) are used for its decent read and write speeds and low cost, particularly after a discount at time of purchase. Perhaps at some point I might migrate the setup to some form of high-speed USB storage after USB boot is fully supported.

## 3. Networking

A PoE network switch would be necessary to power the Pis through PoE HATs, and I chose the [TL-SG1005P](https://www.tp-link.com/us/business-networking/unmanaged-switch/tl-sg1005p/) which has four PoE ports (for the Pis) and one uplink port (for the Odyssey). This network switch has a total PoE budget of 56W, and can power up to four Pis (each requiring at least 5V and 2.5A, or 12.5W). ~~I do have a forth Pi arriving (shipping delayed by 1.5 months and counting), and will update this page after testing.~~

At least five ethernet cables are needed to connect all five machines to the network switch -- four for the Pis and one for the Odyssey. I have also used a sixth ethernet cable to also connect the Odyssey to my Google Home network. Since the Pis have gigabit ethernet, all cables used should preferably support gigabit speeds.

## 4. Final setup

![Odyssey-Pi cluster](https://zyf0717.github.io/assets/images/odyssey-pi-cluster.jpg)

The [cluster case](https://www.amazon.sg/dp/B07MW3GM1T/ref=pe_12283492_374736162_TE_item) I used for the Pi stack was purchased on Amazon. The fans provided with the cluster case were not used as the PoE HATs I purchased come with CPU fans.

A keyboard, mouse, a monitor, a HDMI cable as well as a Mini HDMI to HDMI adapter was also used for software setup in the next post of this series: [Pi cluster (SSH and static IP)](https://zyf0717.github.io/jekyll/update/2020/06/24/pi-ssh-ip.html).