---
layout: post
title:  "Building the interface, and a library change"
date:   2015-02-15 17:19:07
categories:
---
Hello again!! It's been a while but in this period I've been busy finally starting to build the actual interface and connecting it to the DPMbox API methods. 

As stated in past posts I was thinking initially in jQuery UI as a good partner in the interface creation, using some other components when needed, for example [zTree][zTree] for the directory folder management. jQuery UI is very useful but for a *complete* user interface creation I was gonna have to build everything almost from scratch (toolbars, menus, file listings...) and a library like zTree is extremely powerful but it's also like a big dinosaur with a bunch of files to load and manage. Thinking about these issues I stumbled upon [w2ui][w2ui], an awesome JavaScript UI library that offers practically all what I was looking for. By its own description: “w2ui is a modern, intuitive JavaScript UI library for building rich data-driven web application”. Some of its features are:

- Complete w2ui library is only 69kb (minified and gziped) and provides extremely fast load and execution. It is 9 times smaller then *ExtJS* and 7 times smaller then *Kendo UI*. It is just a bit over the size of jQuery. 

- It's really easy to use with simple and *standard* API methods, JSON friendly, and it has a stable and good support from its main developer.

- It has no dependencies except jQuery, is all-in-one solution. It contains all most common UI widgets: layout, grid, sidebar, tabs, toolbar, popup, field controls and forms. No need to put together a collection of mismatched plugins or more libraries.

- The library heavily uses HTML5 and CSS3 and yet supports all major modern browsers. Latest Chrome, FireFox 7+, Safari 5+ and IE 9+ are among supported browsers. 

With this change of libraries is possible that a bit of scope or control was lost but using w2ui I stuck with *not reinventing the wheel* and KISS design principles, making things easier to understand, maintain and even expand. This being said, no worries because all the initially designed and proposed elements are present in this final interface, and since they fit so well I have used almost all w2ui components to build the DPMbox interface. Upon a *layout* divided in a top panel and three horizontal ones under it you can find the *sidebar* managing the directory tree, a *grid* in the center showing the files including a *toolbar*, and then in the right panel there is the directory information. 

{: .imagen_sm}
![DPMbox interface [15-02-2015]]({{ site.baseurl }}/assets/interface-15022015.png)

I still have to check intesively and get deeper into the very deep collections problem but for now the tree it's only built on demand and the grid panel only load the files information when you actually scroll down to look for them.

And of course, you can already check and *interact* with this brand new interface. Yes, it's read-only and has a limited functionality still, but the final version of DPMbox will be built upon this one step by step. Check it out here:

{: .imagen_sm}
[calvellido.es/dpm][dpmdemo]


In the next update, for which you won't have to wait so long as for this one, I will explain how this interface and the DPMbox API work together. 

Seeya!!  =)


[dpmdemo]: http://www.calvellido.es/dpm
[ztree]: http://www.ztree.me
[w2ui]: http://w2ui.com
