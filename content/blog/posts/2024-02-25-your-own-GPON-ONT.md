---
title: 'Your own GPON ONT'
state: Published
description: >-
    Running your own network setup can be fun. But this isn't always as straight forward as you might expect. Read more how to hook up the GPON network of your provider to your own gear.
date: '2024-02-25T11:06:00+01:00'
image: 2024-02-25-your-own-gpon-ont.jpg
tags:
    - tag: tech
    - tag: networks
---

Update: The module and router combi stated in this article don't interact that well. Please read my [followup](/blog/2024-02-25-your-own-GPON-ONT) for an alternative module.

Some people just go out of there way to really own their internet service to the fullest. I am one of those people. I really dislike having gear from my internet service provider (ISP) at home. Especially because I know for a fact that my own gear is faster, more reliable, more configurable and cannot be screwed with by them. Now of course, this also means they cannot help me if I have internet issues. But honestly with my own gear, these incidents are few and far between.

## What are we working with

I am using allot of ubiquiti's unifi gear, like the unifi AP's an switches. But for the routing I preferred the EdgeRouter-4, it is beefy enough, it has a SFP port and it s a bit cheaper (and allot smaller) than the USG 4 pro. And for a full sized managed switch I got a Cisco SG300-52 which I bought as a second hand cheaply. For this blog we would only need a router with an SFP slot, and the SFP module to put in it.

- EdgeRouter-4
- [GPON SFP module with MAC](https://www.fs.com/de-en/products/133619.html)

Here in the Netherlands, it is a right to run your own networking gear. So they cannot disallow me for running my own gear, trying to fiddle with theirs, etc. The connection is on my premise, the gear is on my premise, thus I am allowed to use it however I want. Moreover in the Netherlands Fiber is quite common and, most often, more affordable than alternatives because of better competition. I got my own network setup already hooked up to an ISP (Tweak), but unfortunately, they have been bought by a bigger company, so I moved to another ISP named Jonaz. Sadly Jonaz uses GPON which requires other SFP modules than I am used to.

## GPON vs AON

As I found out during this period, not all fibre networks are made the same. Besides the different fibre connectors and wave-length there is also a difference between active (AON) and passive networks (PON). Passive networks need special protocols with authentications called GPON of XGS-PON used. In my case, Tweak used AON with LC as a connector. This was as as easy as buying the correct module from fs.com, plugging it in, assigning the provider's VLAN, and done.

My new provider (Jonaz) uses a PON network with SC as a connector and GPON as protocol. Initially these modules are already more expensive on fs.com. Moreover there are less total "options" to choose from but the terminology is really confusing.

## Choosing the "right" GPON SFP stick

When you browse for GPON SFP sticks you will be hit with some weird terminology, lets go through most of them. First of, GPON has two sides to a connection, your provider, which is known as the OLT (optical line terminal) and the consuming side, known as ONU (optical network unit) or ONT (optical network terminal).

Next to this you have sticks with MAC and without MAC. This isn't referring to a MAC address (which I initially thought). But it refers to the capabilities of the stick itself. Sticks without a MAC need to be paired with gear specially designed to handle PON connections. All the packets send through PON network are special and they need to be handled and decoded as such. Sticks with MAC can do these things on the stick itself, basically it is a whole modem on a stick!

I didn't have special gear handling PON connections. I could buy a "Ubiquiti UFiber" instead. But I didn't wanted to add new gear. I wanted my fibre to go straight into my EdgeRouter 4. So I bought the [GPON ONU Stick with MAC SFP](https://www.fs.com/products/133619.html). Perfect.

## Getting the "right" Serial

Most GPON ONU devices will have the serial used during GPON authentication on the stick or on the packaging. Unfortunately. fs.com , for unknown reasons, does not. Confusingly they add a serial number to the box, but that is the product serial number. Not the serial used during GPON authentication. If you have a PON capable device and added a stick you should be able to read the PON serial right from it. But as said before I did not have such gear. I bought a stick to handle that itself. So I needed to log into the module itself to retrieve (or set) it.

These SFP sticks come with their own mini server. You cannot do allot with it. By default when you plug it in it will use an IP of `192.168.1.10` and you can log into it using SSH. The challenge is how to do it from the EdgeRouter. If you already use the `192.168.1.0/24` network you will be in quite of a pickle. What I did was have a SFP capable switch in the target network (`192.168.1.0/24`), add the module to it, logged into the stick with the steps below and change the ip address. The commands for this are shown on [this website](https://hack-gpon.org/ont-fs-com-gpon-onu-stick-with-mac/#setting-management-ip). You should set the management IP to a network which you are not currently using.

Now plug it into your EdgeRouter, add a static IP to the SFP interface with the IP of the management IP's gateway the stick expects. By default it will be `192.168.1.1/24`. Wait a few seconds for it to fully boot. And now you can ssh into it from anywhere in your network. The stick uses some older SSH specs so we would need to enable some insecure algorithms.

```
ssh -oHostKeyAlgorithms=+ssh-rsa -oKexAlgorithms=+diffie-hellman-group14-sha1 ONTUSER@192.168.1.10

password: 7sp!lwUBz1
```

Now we are in the stick and we can ask for it's GPON serial used during authentication with `fw_printenv | grep nSerial`. This is the serial your ISP needs to talk with your stick.

## Would you recommend?

Well, most of the time: NOOOO. Don't get me wrong, it works wonders. And it is doable and the SFP module is not that expensive. But if you are not fully experienced with networking gear and how to debug (common) problems with networks, it is hard to recommend.

There are no big benefits, but there is one big drawback. Your ISP will not be able to help you if you have problems. If you are unlucky they will not help you because you run your own gear. But most of the time, they won't be able to help because they don't have the tools they normally have. Normally ISP's have build in tool in their own gear to debug common problems. But without their gear in your network, they cannot use those, and thus they are blind.

But I am quite happy with it! There is one less (literal and figurative) black box from my ISP in my networking closet. I can inspect more about the PON connection when / if I need to. But other than that, no difference.

Hopefully this writeup was useful to some people.
