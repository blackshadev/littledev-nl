---
title: 'Tips for Readable code'
state: Published
description: >-
    Have you ever read code from your past self or an opensource package and thought "What does this code do?" over and over again? Well you are not alone, but there are things you can do to improve the readability and maintainability without littering the code with pages of documentation comments.
date: '2021-02-19T16:51:00+01:00'
tags:
    - tag: programming
---

Developers tend to read more code than they write. Thus every improvement to make our code more readable is a huge bonus for our future selves and our fellow developers. Even more so with open source, where readability is a must, nobody is going to contribute if your code is a complete mess and unreadable. I am not going to say we need to comment more or anything, comments are not the best tool to make your code more readable. You can read more about why I think that in [another blog post](/blog/2021-02-13-why-comments-dont-make-your-code-more-readable).

An important thing is that your programs can tell a story. As Robin C. Martin put's it in his book 'clean code': Master programmers think of systems as stories to be told, not programs to be written. But this doesn't tell us how we do it, so let's start!

## Don't write for yourself

The first thing to realize is the fact that you should not write code for yourself. The fact that you understand what you did is simply not good enough. Always ask yourself if other contributors will understand the code? And most importantly if far-less experienced coders will understand your code. If so, your future self will most certainly understand the code.
I cannot iterate this enough though. If you assume the readers of your code are really, really stupid. You will be able to understand the code with ease when you take a fresh look at it in the future. So lay off on all your fancy language tricks and one-liners, inexperienced coders don't get that. Don't put personal jokes or references in the codebase, nobody besides you will understand it. So keep it simple.

## Know your tools

Knowing which tools you have to make your code more readable is half the battle. If you assume you can only add comments, you probabily will end with allot of readable content, but not with readable code.
My readable code toolbox consists of the following:

-   Naming
-   Putting code in named functions
-   Restructuring the code
-   Refactoring the code
-   and dead last: explanatory comments

### Naming

First up and most importantly: naming. You probably heard this a lot already, but good names will do a lot for readability. In most languages you can name various things like: Variables, Functions and classes (or/and types). But what are considered good names?

Well, we want to pack as much clear and readable information in all names if possible. So things like `i` , `iX`, `a` or other very small variable names are not good enough. With one exception however. It is very common to use `i` as a counter in a for loop. This has become so iconic, that this packs so much information in it, that it is fine. Abbreviations should be avoided most of the time since it is hard to read and understand it in code. There are exceptions however common or domain specific abbreviations can be used, everybody should know common abbreviations like HTTP and FTP and typing them out is just silly. But made up abbreviations, for model names or from outside of your domain should never be used, they tend to introduce confusion and these are hard to read for new developers.

### Function

Next on the list is putting code in named functions. So we developers got this thing, where we can put lines of code that do a certain thing in a function with a handy name we can specify ourself. Use it! I myself actually used to believe that functions were only useful for code reuse. But ohhh boy, you can make some horrible blurry code really readable by putting every few lines in a function.

Take for example the snipped below.

```php
public function calculateAndAssignLoyaltyPoints($order) {
    $this->promotionApplicator->apply($order);

    if ($order->paymentState === 'completed') {
        $this->loyaltyAssigner->assign($order);
    }
}
```

In the above code sample the `loyaltyAssigner`, `order` and `promotionApplicator` are part library (and thus immutable code). The code is pretty small already so what can we do to make this understandable. I know what this does, but without checking the promotionApplicator and loyaltyAssigner you will have a pretty hard time understanding. Let me clarify it a bit.

```php
public function calculateAndAssignLoyaltyPoints($order) {
    $this->calculateAndApplyOrderPromotions($order);

    if ($this->orderIsPaid($order)) {
        $this->assignLoyaltyPointsToCustomer($order);
    }
}

private function calculateAndApplyOrderPromotions($oder) {
    $this->promotionApplicator->apply($order);
}

private function orderIsPaid($order) {
    return $order->paymentState === 'completed';
}

private function assignOrderLoyaltyPointsToCustomer($order) {
    $this->loyaltyAssigner->assign($order);
}
```

This should be way easier to read. In the new version we even have extra information about what is happening, namely: Assigning loyalty points to a customer. We could rename the `loyaltyAssigner` to something like a `customerLoyaltyAssigner` but to me this doesn't make it allot better. I don't want to deviate from the names to much, because the class of the loyaltyAssigner is named LoyaltyAssigner. So naming it similar can be pretty beneficial for readability and understanding the code.

### Restructuring

Even with all naming correct and clear, a program can still makes no sense because of a wrong structure. Even a good bedtime story will be complete gibberish when you start midway and jump around from chapter to chapter. Generally you'd want to have a structure which tells your story from the start till the end while keeping it simple possible. You can achieve this by trying to explain, in words and without looking at the code, what a function is supposed to do. If the code follows the same story, good job. If not try and restructure it. Can't you tell the story without looking at the code? Your function probably does to much, try and cut it up in smaller functions.

Let look at a small but exaggerated example.

```php
/**
 * A user is always allowed if it is an admin
 * For running locally you must be an admin
 * Otherwise check the resource owner against the user
 */
public function allowed($user, $resource) {
    if ($user->ip !== '127.0.0.1' && $user->role !== 'admin') {
        return $user->id !== $resource->user_id;
    }

    return $user->role === 'admin';
}
```

Clearly from the descriptive comment the code is. But it doesn't follow the same narrative? I'd say: yes, we can. Lets restructure the code such that all edge causes are clearly visible.

```php
public function allowed($user, $resource) {
    if ($user->role === 'admin') {
        return true;
    }
    if ($user->ip === '127.0.0.1') {
        return false
    }

    return $user->id !== $resource->user_id;
}
```

Now it follows the narrative more closely and we made all edge cases visible while out 'general' case is at the end. Of course we can go further and introduce some variables to make it even better, but that is besides the point. Another easy way of restructuring code is bringing edge cases more on top and make return clauses simple. This way it is easier to read and explain. Nobody can explain a function whom returns a composition of multiple conditions.

### Refactoring

Sometimes a minor restructuring or renaming doesn't do much. Or you end up with so many private function which doesn't do the readability justice. In that case you should consider a refactor. Where you split up different parts in separate files / classes or other units. Don't be afraid to introduce a value class of two, it will make it more readable.

### Explanatory Comments

As a last resort you can add a comment. Why as a last resort? Well every line of comment is a part a non-functional part which you need to maintain besides the code. But don't comment on what the code does, that should be said by the code itself. Tell why it does it. Or with what algorithm. This provides extra context instead of explaining the code in an other language.

As an example, imagine you have a prime number generator based on the Sieve of Eratosthenes. You could explain the whooole algorithm in a comment. But.. Does that do it justice?

What I think is cleaner, write to code as clean as possible, add a comment where you reference the algorithm used and provide a online resource which explains it. This way the code is as clean as possible, and if someone would want to debug / change the code, they have a good enough lead to start gathering information and understanding your code.

## Read; Comment; Rewrite

So we know what tools we have, but knowing when to use them is not easy. Not to worry, I got a easy starting out strategy. With it you can get a feeling and over time you will start rewriting your code less and less.

Write your code, as you would. Re-reading the code and think what you'd want to clarify or how you would explain it. Explain the code in a (temporary). Now start rewriting your code with the tools above to incorporate as much of the comments as possible in you code. Lastly, remove the comment because it is now redundant.

Most of the time it is fairly easy with just some variable renames. But sometimes you will need to restructure the code, put things in private function to clarify the behavior.

## Liked what you read?

I hope this whole tirade was informational for people, this was my view on writing readable code. There are, ofcourse, many other views on this subject, so don't shy away from reading other people's thoughts. For me books like 'clean code' by Robert C Martin and The Art of Readable Code by Dustin Boswell and Trevor Foucher were a very good resource to get more grip on writing readable code.

Anyway, happy coding!
