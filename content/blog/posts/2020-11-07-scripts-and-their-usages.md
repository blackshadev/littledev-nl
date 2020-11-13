---
title: Scripts and their usages
description: >-
    Most people when you toss up the term scripts will automatically think of
    JavaScript running within a browser. Although this is indeed the mayor use of
    JavaScript, it also has other usages. Another example with which people are
    fairly familiar is bash. Bash is used within Linux and Windows as shell /
    terminal scripts. In this post I will explain a bit about script languages and
    explain why I think that scripts are underused as method of flow control.
date: '2014-07-31T10:49:00+02:00'
tags:
    - Scripting
---

## In the beginning

In the early times of computing, you had a huge computer which would run so called “jobs” . People who wanted to run their program needed to create a program, put it on the computer and it would run overnight. Each program was queued as a job and they would execute one after another. When your job was done you got the result. In the really early days the result was printed, but the time I am targeting at the result was written on a tape and could be requested at a later time, but it would be overridden or swapped out at some point.

You might imagine that this was quite tedious for people who wanted multiple tries with their program, or who wanted to feed the output of one program into an other. Therefore a small interpreter language was created to allow the programmers more control over their jobs. This allowed the programmer to specify his job, which could contain multiple programs and manipulate the input and output of his programs. This was actually the first usage of a script like syntax within a computer. The language was created and used by IBM, and was used on their mainframes.

## Scripts?

So what is the difference between a script language and a programming language anyway? Well a script language runs within an execution environment and can only execute functions created by themselves or handed to them by the execution environment. This means that all interaction with the underlying operating system is through the execution environment.

Knowing this you probably guessed that allot of modern “programming languages” are actually script languages with a huge environment sitting on top of it. For instance: Python, PHP, Ruby, Perl.

But yeah… With python you can do a whole lot more than just control the flow of a process. Moreover with these languages you actually think that you have direct access to the OS with some function calls. But the hard truth is: You don’t.

The clearest case of scripting is within browsers. The browser executes the JavaScript, it gives you some “native” functions and objects to interact with and you are good to go. This principle started so simple and allowed for so much. Some people will still remember the days when flash websites were the best and most amazing websites. Nowadays when I come across one I look amazed and ask myself. ~Why haven’t they just made it in JavaScript?.. Lower or no visible loading time.. Same possibilities.. and a lot cleaner. Currently JavaScript has exploded a bit, not that I complaining. With HTML5 you get so many cool things, but to be fair… Let’s not follow in the footsteps of PHP and make your ok script language a horror of possibilities and hugely inconsistent.

## Underrated, how?

This is why I think, that the original usage of scripts are underrated nowadays. Huge projects are created and have so little control and yet, it is so easy to implement some form of control via script languages.

The only 2 big usages of scripts are within the game industries and within web development. Within the game industry it is quite common to use script languages. I know that within most game engines you can script some behaviour of objects and manipulate them.

## Usage example

But there is so much more to it. The first time I used it, I was amazed by the possibilities. For instance what if you have a standardized way of saving data but the layout and / or sources from which you get data differ. You could write code for all the sources and keep on adding source code. This is fine at first, but with four sources you should really be starting to eel dirty and realize that there has to be a better way. A good way to do it, is to take all the data from a specific source, throw it to a script which is specific for that source, take the output and store that. Now the only thing you have to do is edit / add some scripts files and let them output the data in a standardized way.

With languages which don’t compile into one source file this will look like a hassle. But it also keeps things separated and since scripts are easy to make (most of the time), other people can make them as well.

Most modern languages have libraries or native support for some script languages. But if they doesn’t, don’t worry. There is a “small” project around called Chromium V8 made some modest company called something like “google”. And v8 can run JavaScript REALLY darn fast. A lot of projects are based upon it, for example NodeJs.

In my next post I will give some code examples of scripts which run within your programs.
