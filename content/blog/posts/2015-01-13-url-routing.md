---
title: URL routing
state: Published
description: >
    Ever wondered how packages like flask and express route their URLs to the
    correct functions, even with properties like wildcards and parameters? In this
    post I will discuss a solution to this URL routing problem which uses a search
    algorithm to find the correct route.
date: '2015-01-13T16:32:00+01:00'
tags:
    - tag: tech
    - tag: programming
---

A few weeks ago I needed to create a way of deploying webservices in nodeJS for a client of mine. I looked at some of the existing packages out on the web, but I couldn’t find anything to my liking. I decided to custom build it, not only for learning purposes, but also to be able to use a framework the client was already accustomed to.

One of the problems I faced was the URL routing. Of course there were no problems with static routes, but one of the nice things to have in these kind of situations is parameters within the URL and other fancy things like wildcards. Once again I turned to the web, but the only given solution I found was “just regex all routes and per request iterate over all route regexs”. Although this will work, it isn’t a really elegant approach, I even dare to say that this is almost as brute force of a solution as it gets.

In this post I will use the following routes (and syntax) as an example. The routes are the key within the JSON, where the accepted HTTP verbs are prepended between square brackets. The resource (a file containing the webservice) is the value in this map.

```js
var routes = {
    '/': 'index.js',
    '[GET]/test/{id}/': 'test.js:paramExample',
    '[GET]/test/{1}/{2}/': 'test.js:paramExample',
    '/test/hallo/world/': 'test.js:halloworld',
    '[GET,PUT]/test/json/': 'test.js:getJson',
    '[POST]/test/': 'test.js:post',
    '/statics/*': 'statics.js',
};
```

## Tree building

Ok, of course we could regex the whole thing, but let’s first use our brains. We need a way to structure all routes given. I have done this by creating a tree structure which can be seen in te figure to the right. Every purple node is a node which is bound to a resource, so those are possible end nodes. The once with curly brackets are parameters and the astrix is a wildcard. The HTTP verbs are not seen in this picture, but can still be present in the actual node structure, I choose not to show them to allow for a cleaner representation.

## Tree traversing

![Routes structured in a tree where each purple has a resource bound to it](/uploads/roadieroutegraph-300x271.png#right)

Routes structured in a tree where each purple has a resource bound to it

For the people that read my previous post about search algorithms, this will look awfully familiar to a state space representation. In fact it can be used as such, we can use the created tree as possible paths. If we have an input URL we can traverse the tree in that order. Say we have ‘/test/hallo/world/’ the order of traversing will be ‘/’->’test’->’hallo’->’world’, great this works! Except for an URL like ‘/test/hallo/’, with the given routing table we would like to end up as a ‘/test/{id}/’ route, but in our implementation it will end up at ‘/test/hallo/’ which does not have a resource bound to it. So in fact, we need a search algorithm to solve this.

## Searching the answer

Before anyone tries an uninformed search algorithm let’s revisit our tree. We now know that all purple states are goal states if and only if the HTTP verb matches and the complete user’s route is used — wildcards use up the complete left-over route. When we try an uninformed search algorithm for ‘/test/json/’ it will map to ‘/test/{id}/’ before ‘/test/json/’, this is because we need to apply a kind of ranking in our routes. We could restructure our whole tree to make sure the static routes are looked at first, than the routes with parameters and lastly the wildcards. But instead of restructuring the whole tree with every added route, we could also add weights and use a informed search algorithm.

So our weights are as followed: \[1]:static, \[2]:parameter, \[3 times the size of the leftover URL]:wildcard. I know the wildcard is the ugly duck in this case, but I will explain that later. Now when we use greedy search — which always takes the cheapest route first, ‘/test/json/’ will in fact be routed to ‘/test/json’ instead of ‘/test/{id}/’, this is because ‘/test/json’ as a total cost of 2 and ‘/test/{id}’ has a cost of 3. Now the wildcard, we always want the static routes first and the parameters after that, say we have a ‘/{1}/{2}/{3}/’ route and a ‘/\*’ route. The parameter route has a cost of 6 (2 for each parameter), in fact the maximum cost of any route containing only static and parameters is 2 times the length of the URL items. Therefore if we want the wildcards to be last, we need to scale according to the left over URL parts, we could suffice with 2n+1 but anything greater than 2 times the URL items is good, and with 3 times the URL items you have some space to apply ranking between the wildcards themselves.

## Worth it?

Hell yeah! The main problem with regexing everything is that your worst case scales according to the total of routes you have. This thing scales with the size of the user route, because shorter URLs need to check less states before reaching their goal state. Of course this model can be expanded to include some kind of regex mechanism inside each node, typed parameters, ect. Also a thing to note is that adding or removing routes is really easy. Just add a node per URL part if it doesn’t exist yet and add a resource to the end.

See a live example in the nodeJs roadie package, available on [npm](https://www.npmjs.com/package/roadie) and [github](https://github.com/blackshadev/Roadie)
