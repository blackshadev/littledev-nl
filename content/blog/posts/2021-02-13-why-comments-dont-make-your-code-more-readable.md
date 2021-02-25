---
title: "Why comments don't make your code more readable"
state: Published
description: >-
    This statement seems really controversial, early on in my career I got told that every function should have a comment and commenting makes your code more readable. Now I am going to tell you why it really isn’t.
date: '2021-02-13T11:11:00+01:00'
tags:
    - tag: programming
---

Bear in mind, this post reflects my experience and opinion. If you don’t agree, that is fine. My point of view should still give you a good resource for how to write better comments.

## The good

Let’s start simple, why are comments good? Comments should make your code more readable and this is really important. Most programmers read more code than they write. When you are tracking a bug, adding features to existing code or reworking code. You will need to read a lot of code. So our main goal with comments, should be to make your code easier to read.

So a small summary above a function or a small part of code can be really handy. You can read the comment, and continue.

## The bad

Let's take a look at the flip side of the coin, why are comments all that bad? Well first. People just over do it. Reading every, reading every, part of a, part of a, sentence, sentence, twice is, twice is, VERY ANNOYING. You see what I did there? I see this actually a lot. Take a look at the code sample below as an example what I mean. Every line of comment in there could be read from the code alone. All comments are completely redundant and mirror the code. All comments duplicate what you can already read. Just like the last three sentences. And when you read a lot of code, it just becomes a nuisance.

```php
/**
 * A customer
 */
class Customer
{
    private string $name;
    private array $orders;

    /**
     * Returns the name of the customer
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Gets customer's loyalty points by summerizing the customer's
     * order loyaltypoints
     * @return int
     */
    public function getLoyaltyPoints(): int
    {
        // start loyalty points to 0 and use it to sum
        $loyaltyPoints = 0;

        // Loop over orders to sum the order's loyalty points
        foreach ($this->orders as $order) {
            $loyaltyPoints += $order->getLoyaltyPoints();
        }

        // Return sum of orders of loyalty points
        return $loyaltyPoints;
    }
}
```

But what is really the issue, if you have a good highlighter you can just skim over these comments. Or over the code. But comments actually have multiple downsides. So first the least compelling argument: comments take away space which could be used by code. It makes your code waaaay bigger.

But more important: Comments are not code, and it makes working with your code harder. Every change you make, you will need to check if all the comments in the code around it are still relevant. What’s more, if someone forgets to update the comments, the comments will tell your colleagues or the future you a different story than the code. Which is annoying if you actually (have to) use the comments to skim over code.

And lastly, switching context is hard! Whenever you want to read it all, or start ignoring comments. You need to switch context between, reading a programming language and reading (or ignoring) a human language.

## The ugly

Now, what can be said more? Well structurally commenting will make your code more ugly! I see this sometimes were people write incomprehensible code, put a comment above it, and call it a day. Remembers comments is not code, if someone changes the incomprehensible code without changing the comment, you will have a really bad time. To illustrate this, let's take the `getLoyaltyPoints` function from the earlier example and make the code smaller, but in my opinion: worse

```php
...
    public function getLP(): int
    {
        // start loyalty points to 0 and use it to sum
        $lp = 0;

        // Loop over orders to sum the order's loyalty points
        foreach ($this->all as $o) {
            $lp += $o->getLP();
        }

        // Return sum of orders of loyalty points
        return $lp;
    }
...
```

One last caveat. There is one exception: Optimized code. Within some code-bases you need to get the absolute best performance out of your code. Performance optimized code just isn’t the most readable, so a comment here and there will be useful.

## Conclusion

So I hope this gives you some thinking material. I have written a [follow-up post](/blog/2021-02-19-tips-for-readable-code) about how to write more readable code, in which I also cover when to comment. But after reading this, you should be well on your way to think more critically about comments. The main three takeaways are:

-   Don't just add comments because of convention or because you can.
-   Don't justify a comment for bad code, or the other way around. Just write better code.
-   Do start thinking, when you want to write a comment. Chances are you can change the code such that you won’t need the comment.

To prove my point, the code below have ZERO comments and I think it doesn't need it.

```php
class Customer
{
    private string $name;
    private array $orders;

    public function getName(): string
    {
        return $this->name;
    }

    public function getLoyaltyPoints(): int
    {
        $loyaltyPoints = 0;

        foreach ($this->orders as $order) {
            $loyaltyPoints += $order->getLoyaltyPoints();
        }

        return $loyaltyPoints;
    }
}
```
