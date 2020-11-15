---
title: Going static
state: Published
description: >-
  My journey migrating from WordPress to a fully statistically generated with
  NuxtJS, TailwindCSS and Netlify CMS, aka a JAMstack.
date: '2020-11-15T11:39:59+01:00'
tags:
  - tag: programming
  - tag: tech
---
So I got in on the new hype nowadays: Staticly generated websites with a JAMstack. My reason for it is twofold, I wanted to learn about this new hype. But more importantly, I didn't want to maintain my WordPress, I don't want to update it and it's plugins to keep it secure, I don't keep updating a template in order to keep my website viewable throughout updates and most importantly I don't want to receive emails because some Russians tried to log into my WordPress account or fear it got hacked because I didn't update it quickly enough.

## Static... what now?

So first, a short introduction what this statically generated thing I am talking about?

With WordPress your content, your pages, blogs, menus, are stored in a database. For each page access WordPress will roughly do the following: 

1. Consult it's database and check what kind of page the user tries to access.
2. Fetches all the content from the database
3. Puts the content from the database in the template
4. Renders the page which the content
5. Serve the generated page to the user

With statically generated websites step 1 trough 4 are done when you build the website, before you upload your website. Now your websites is just a bunch of HTML pages without the server needing to do anything for you, just like the old days. The benefits: Less dependencies on external parties, no need of a PHP capable web host, a website which is easy to cache and the best thing: it is fast as heck. 

To be fair, blog type websites or just plain old websites do lent themselves very well for this thing. Every type of website where you don't need any input from the end user and  where you can have your content ready before-hand and this content isn't changed much. You can also make more complex sites static, for example webshops. It's just not so straight forward.

## This is the way

So how did I did this, what did I use? And how did I like it.

### Content management 

So first things first, I wanted to have all my content available in my source control. I am an developer and I don't mind tinkering when I get full control. So I looked up a CMS which is git based and I ended up with Netlify CMS. Not the best choice I can make, now I require a netlify account and an Netlify identity. But their are upsides, I can edit my content without it, and switch it out when something better comes along.  

### Static framework

So we have some options, if you google 'static website generator' you got things to choose. I ended up with NuxtJS, which is based on VueJS, I really like VueJS. It is easy to get into, it has good documentation and a good ecosystem. It has a downside though, it is not as fast as others out there, you need to have knowledge about javascript and VueJS, although VueJS is easy enough to get into and lastly my biggest issue, the javascript ecosystem is really unstable and I still need to apply updates every week. Luckily even I know allot of javascript (I ended up using typescript, because why not?) and even if I don't update, my site is static, so no security issues there!

There even is a create template for NuxtJS and I got the basics up and running within half an hour. Whats more, I got some content loaded within have an hour. Amazing! 

### TailwindCSS

But... I got no styling, I could have used some front-end frameworks like Bootstrap or Bulma and purchase a template. But... I wanted full control and I wanted to learn something new, so I used TailwindCSS. I can recommend it is you want the freedom, you know some CSS and you go FULL rage when CSS promises you to do a thing while it obviously doesn't work for this specific instance. In my opinion, TailwincCSS makes CSS simpeler, but you still use CSS, thus it is not as easy as Bootstrap.

## The struggles

So this is a more technical solution to WordPress, you still need to have some coding skills to do this. In my opinion with basic HTML and JS you will be fine. What's more, if you need more complex things, like tags on your blogs, you need to build it yourself. No easy plugins or database joins, at least I didn't find any.  

## Final verdict

To be totally honest, when I started I thought I wouldn't like the hassle and end up buying something like a squarespace account and be done with it. I just want a website to have a presence and to blog a bit. 

But! It was way easier than I thought, and even though I don't like netlify CMS that much, I like the freedom that the whole stack brings me. I will switch CMS one day, or just inline edit in NuxtJS (because yes it can do that in dev mode).

All in all, a fun experience and this website is here to stay! 10/10 would statically generate it again
