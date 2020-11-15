---
title: Going static
state: Draft
description: >-
  My journey migrating from WordPress to a fully statistically generated with
  NuxtJS.
date: '2020-11-15T11:39:59+01:00'
tags:
  - tag: programming
  - tag: tech
---
So I got in on the new hype nowadays: Staticly generated websites. My reason for it is twofold, I wanted to learn about this new hype. But more importantly, I didn't want to maintain my WordPress, I don't want to update it and it's plugins to keep it secure, I don't keep updating a template in order to keep my website viewable throughout updates and most importantly I don't want to receive emails because some Russians tried to log into my WordPress account or fear it got hacked because I didn't update it quickly enough.

## Static... what now?

So first, a short introduction what this statically generated thing I am talking about?

With WordPress your content: the blog posts, the pages, etc. Are stored in a database. For each page acces, WordPress will roughly do the following: 

* Consult it's database and check what kind of page the user tries to access.
* Fetches all the content from the database
* Puts the content from the database in the template
* Serves the fully rendered page to the user





So my radical solution to this problem: statically generate my website. To be fair, blog type websites or just plain old websites do lent themselves very well for thi
