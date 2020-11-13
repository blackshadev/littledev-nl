---
title: Script examples
description: >+
    As promised in this post I will give some examples of script usage within a
    project. This allows for more customizable control which is easy to maintain
    and implement. I will give examples for C# with the ClearScript library and
    NodeJs with the vm module. But you are not limited to these two langauges,
    most languages have their own JavaScript engine module/library. So try it with
    your favourite language.


date: '2014-08-07T10:43:00+02:00'
tags:
    - tag: Scripting
---

## Code Files

[Code Files](/uploads/jsexamples.zip)

Note: The C# files are without the ClearScript library, this was to big to include. But you can get it both from within NuGet or from the creator’s webpage.

## Case (js)

I will give a simple example which isn’t necessarily useful, but it will show some features and you can make the script / input as complicated as you want, without compiling the c# again.

In this example we have an JSON as input with an array containing an object with an email, a name and a rating. Of these items we want the amount of valid and invalid email addresses and the total sum of the rating.

## JSON

```json
[
    {
        "name": "Jon",
        "email": "qerty",
        "rating": 7
    },
    {
        "name": "Vincent",
        "email": "info@littledev.nl",
        "rating": 10
    }
]
```

## JavaScript

```javascript
;(function () {
    var emailRegex_str = '[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+.[a-zA-Z]{2,4}'
    var email_re = new RegExp(emailRegex_str)
    var arr = JSON.parse(host.input.json)

    var valid = 0
    var invalid = 0
    var totalRating = 0

    for (var i = 0; i < arr.length; i++) {
        totalRating += arr[i].rating

        var isValid = email_re.test(arr[i]['email'])
        if (isValid) valid++
        else invalid++
    }

    host.output.valid = valid
    host.output.invalid = invalid
    host.output.totalRating = totalRating
})()
```

## C#

C# compiles into one exe with, sometimes, multiple dll’s. If you want to change one thing, you need to open the whole project and recompile it. This does give you a speed increase compared to languages which don’t compile, but it also means that code maintenance and edits are a hassle. That’s why ClearScript is so amazing. You can choose which script engine to use, you can run a script within that engine, set functions and properties to c# native functions and properties. So yeah, awesome.

```C#
using Microsoft.ClearScript.V8;

static void Main(string[] args) {
    HostObject HostObj = new HostObject();

    // Set input json
    HostObj.input["json"] = File.ReadAllText(BaseDir + @"\input.json");
    // The script as a string
    string script = File.ReadAllText(BaseDir + @"\script.js");

    // Running the script
    using (var engine = new V8ScriptEngine()) {
        engine.AddHostObject("host", HostObj);
        engine.AddHostType("Console", typeof(Console));

        engine.Execute(script);
    }

    // Outputting the script
    double average = (double)(int)HostObj.output["totalRating"] / ((int)HostObj.output["invalid"] + (int)HostObj.output["valid"]);
    Console.WriteLine("Got {0} invalid email adresses", HostObj.output["invalid"]);
    Console.WriteLine("Got {0} valid email adresses", HostObj.output["valid"]);
    Console.WriteLine("Total average rating {0:g}", average);
    Console.ReadLine();
}
```

With this snippet you can actually use the “Console” type of C# from within the javascript, this is really handy for debugging. But even more amazing, if you use Visual Studio, and set the engine to the Chakra engine (JS engine of IE), it allows you to debug through the JS.

## Node.Js

Ok this is easy, Node.Js is already JS, so lets be quick about this.

```javascript
;(function () {
    var fs = require('fs')
    var vm = require('vm')

    // setup execution environment
    var env = {
        host: {
            input: {},
            output: {},
        },
    }

    // fill with json
    env.host.input.json = fs.readFileSync('input.json')
    var script = fs.readFileSync('script.js')

    // Run the script
    vm.runInNewContext(script, env)

    // Output
    var out = env.host.output
    var avg = out.totalRating / (out.invalid + out.valid)
    console.log('Got ' + out.invalid + ' invalid email adresses')
    console.log('Got ' + out.valid + ' valid email adresses')
    console.log('Total average rating ' + avg)
})()
```

As you can see, with this example we can even omit the `host` property within the `env` variable, but because I wanted to use the same script file for all examples I left it in.

There are of course more examples out there for other languages. But these where the ones I use and wanted to show. I know for a fact that there is a python JavaScript library. And within C/C++ you should be able to use ClearScript, obviously the syntax does differ, but hè, it should work!
