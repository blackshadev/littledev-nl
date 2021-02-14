---
title: 'Readable code'
state: Draft
description: >-
    Ever read code from your past self or an opensource package and taught "What does this code do?" over and over again? Well you are not alone, but there are things you can do to improve the readability and maintainability without littering the code with pages of documentation comments.
date: '2021-02-14T14:13:00+01:00'
tags:
    - tag: programming
---

Developers tend to read more code than they write. Thus every improvement to make our code more readable is a huge bonus for our future selves and our fellow developer. Even more so with opensource, where readability is a must, no body is going to contribute if your code is a complete mess and unreadable. I am not going to say we need to comment more or anything, comments are not the best tool to make your code more readable. You can read more about why I think that in [another blog post](2021-02-13-why-comments-dont-make-your-code-more-readable).

## Don't write for yourself

The first thing to realize is the fact that you should not write code for yourself. The fact that you understand what you did is not good enough. Will your future self understand the code? Will other contributers understand the code? Will far-less experienced coders understand your code?
That last one is the best guideline to follow. If you assume the readers of your code are really, really stupid. You will be able to understand the code with ease when you take a fresh look at it in the future. So lay-off on all your fancy language tricks and one-liners, inexperienced coders don't get that. Don't put personal jokes or references in the code nobody besides you will understand.

## Naming things

You probably heared this a lot already, but good names do a lot for readability. In most languages you can name various things like: Variables, Functions and classes (or/and types). But what are considered good names?

Well, we want to pack as much information in all names if possible. So things like `i` , `iX`, `a` or other very small variable names are not good enough. With one exception however. It is very common to use `i` as a counter in a for loop. This has become so iconic, that this packs so much information in it, that it is fine. Abbriviations should be avoided most of the time since it is hard to read it in code. I say most of the time because common or domain specific abbrivations should be fine, everybody should know abbriviations like HTTP and FTP. But made up abbriviations or abbriviating model names shouldn't be done, they tent to introduce confusion and these are hard to read for new developers.

## read; comment; rewrite

A common strategy I use a lot is re-reading my code, think about the segments I need to clearify. Clearify it in a comment and think how I can incorporate the information added by the comment in my code, and remove the comment because it is now redundant.

Most of the time it is fairly easy with just some variable renames. But sometimes you will need to restructure the code or put things in private function to clearify the behavior. And I see that last one the least, while it can be the most usefull
