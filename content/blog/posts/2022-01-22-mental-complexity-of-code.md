---
title: 'The mental strain of code'
state: Published
description: >-
    Programmers often forget the mental complexity of the software they build. With every addition this mental complexity tend to increase. The mental complexity increases ten fold when add features or add constraints on some shared context within your application. But when does it increase, and when does it becomes a strain.
date: '2022-01-22T14:06:00+01:00'
image: 2022-01-22-mental-complexity-of-code.jpg
tags:
    - tag: programming
---

Most programmer know not keep global or shared state, and when you do, do it so less as possible. But why should we not? Why is it so bad to use shared state and how does it relate to other constructs you may not expect.

Even if we through all consistency and concurrency aside, shared state is often deemed as bad. And I share this view, but not because it is a common source of bugs. Using shared state does not introduce a bug, the bugs are a symptom of something else. The underlying issue all comes down to the strain it puts on your mental model. 

While programming you often build up a mental model of everything they need to know and use. For small programs everything fits perfectly in your brain and using shared state will not cause much issues (yet). But with every addition this mental model increases, causing for all kind of issues. Developers will start to forget that some things existed, forgetting to change some shared variable or forgetting that, no at this stage in the program, you cannot use that variable or it has been changed bu something else. The size and the burden of this mental model is increased by multiple factors on multiple different levels. Let's start by examining how we build this mental model when we try understand an arbitrary peace of code. 

When you try to understand a certain piece of code, you'd often look at specific units like, a class, a method or a function. Each of these have there own 'context'. This context is a combination of scope, the state of everything in scope and how this state changes over time. With scope we mean every variable, class and function a certain unit of code uses. The scoping rules is mostly depend on the rules of your programming language, but these are consistent throughout your code. In contrast your state changes all the time. The current function can change local variables, variables outside it's local scope or through a reference passed as an argument. 

Needless to say, the more things is in the scope, the bigger the strain on the mental model is. On top of that, the more different calling states it has, the bigger the strain on the mental model. And lastly, the more the state changes throughout the function, the bigger the strain on the mental model. This means, that pure functions have the less strain on your mental model. Pure function are functions without side effects and whom the output is solely dependant on the input. And global variables have a huge strain on your mental model, because potentially any piece of code in your program can use it and thus it increases the mental strain on every line of code.

But this affects every line of code you change, and with every library you add, most things you add, add to the mental strain. This mental model also tie in really neat with common good practices. Dependency injection instead of a shared container or variables reduces the scope, using smaller interfaces instead of concrete implementation limits the scope which all reduces the mental model. Keeping your functions on the smaller side reduces the size of the context, while immutable objects limits the change throughout the context, making it easier to follow changes (or the lack thereof) throughout your code. Thus these good practices try to reduce the mental strain, increasing maintainability of your code.

So instead of increasing complexity, creating all new concepts throughout your code. Try to think about what your additions do in terms of mental strain. Try and write code with the smallest scope and context, while reducing side-effects and variable changes. Not because somebody says so, it is a good practice or it is the cool thing to do. But because the reduces the processing power required to read the code and it will be easier for anybody, new and veterans to join in. Keep an eye out on the mental strain your code produces.
