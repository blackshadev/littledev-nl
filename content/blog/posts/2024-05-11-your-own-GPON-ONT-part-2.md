---
title: 'Your own GPON ONT pt. 2'
state: Published
description: >-
    I ran into some issues with the combination of my GPON module and router. In this post I tell you what happened and how I resolved it.
date: '2024-05-11T11:19:00+01:00'
image: 2024-02-25-your-own-gpon-ont.jpg
tags:
    - tag: tech
    - tag: networks
---

In the previous post I have had explained everything there is about using you own ONT. After some usages it seemed the combination of ONT module and EdgeRouter wasn't the perfect fit. The EdgeRouter's logs were filling up and every once in a while my whole network froze for several seconds.

## Background

In my original post I explained allot of terminology about GPON, what it is. What you all need. etc. In this one, I will not. I will focus on what happened and what I tried and lastly, why I changed to make everything happy again. So for the full information, please also read [this blog post](/blog/2024-02-25-your-own-GPON-ONT-part-2).

First of, what happened? Well everything worked well for quite a while. But every so often my whole network froze, or at least my router did and thus al my network traffic. During the freeze it will not react to anything or route any traffic. After about 5 seconds it will unfreeze and continue if nothing ever happened. When inspecting the logs I noticed many messages like the once stated below.

```
kernel: i2c-octeon 1180000001000.i2c: unhandled state: 0
kernel: Failed to read SFP EEPROM_0 at byte 29 val -5!!
```

After some investigation these messages started when I popped in the GPON module. I2C is a protocol which is commonly used over SFP to communicate with the EEPROM of these SFP modules. After allot of e-mailing between both Ubiquiti and fs-store I came to the conclusion that these the devices: The EdgeRouter-4 and GPON SFP module with MAC from FS.com, are incompatible. The module requires a I2C speed below 80KHz while the EdgeRouter's minimum is 100KHz.

## So now what

I scoured the internet for alternative solutions. There where many. Initially I bought a UFiber instant module from Ubiquiti themselves. But I couldn't get it to work with my ISP even with a custom ROM flash. During this process I did find out that most of these "multi-propose" GPON module have the same PON SoC at their heart: the Realtek RTL960x. And from this family of products there where several options which were quite open and friendly to use to begin with. I poked around and talked to people from my ISP and in the end I landed on the ODI DFP-34X-2C2. You can find many of these sticks on aliexpress, I bought [this one](https://nl.aliexpress.com/item/1005003515456552.html?spm=a2g0o.order_list.order_list_main.11.21ef79d2wId0Gv&gatewayAdapt=glo2nld) (watch out, the module is 48 euro's, you need to select your connection "color" first, I had an APC connection).

## Making it work

Using the new module is actually quite easily. I did not load any custom software on it what so every. These modules all "expose" themselves via HTTP and SSH on a static IP: `192.168.1.1`. For me this is quite anoying, because my router's IP is `192.168.1.1`. To configure it I popped it into a switch, I put it into it's own untagged vlan along with another port which was connected to my laptop. I statically assigned my laptop `192.168.1.42` and I browsed to `http://192.168.1.1`. The module has a handy web interface from which I could assign an other IP, namely `192.168.20.2` and I could change the GPON SN of the module to my original GPON module's SN. This way I didn't have to contact my ISP and let them change the allowed GPON SN. You don't have to change your GPON SN if your provider allows you to run your own setup, you can email them the stated GPON SN and they will authorize you. If they don't... You can copy theirs instead... I also entered the LOID id and password from the old stick. I didn't think my provider uses it, but what does it matter. I entered `1234567890` and `password01`. I popped it into my router and after a few minutes everything worked great!

## Accessing the module

Unfortunately this module doesn't allow you to enter a gateway. So you cannot access it from another network. You can access it from your router so this gave me the following workaround. I assigned the interface which holds the GPON module the network `192.168.20.1/24`. Since my router has SSH I can SSH Tunnel a HTTP connection to the module using `ssh -L 8080:192.168.20.2:80 192.168.1.1`. Now for as long as this ssh tunnel is open you can access the web panel of the module on `http://localhost:8080`.
