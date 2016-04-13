---
layout: post
title:  "Interface mockup"
date:   2014-12-22 17:19:07
categories:
---
Hello again! While the work on the API continues I want to show you an advance of what it will be the next step. Using the data provided by this WebDAV API the user interface design will take advantage of jQuery UI potential. Since jQuery and jQuery UI are widely known libraries this interface will be hopefully easy to understand and maintain, and could also be easily adapted for other uses or modified for extended support in the future. 

For this frontend development some setbacks will be taken in consideration. These two are interconnected:

- Very deep collections or cases with hundreds of files inside a directory could be problematic to load, so a lazy loading technique will be used, and in an asynchronous way. 

- And just not only for loading, also for the user experience this high number of data nodes inside a collection could be troublesome. Then it will be mandatory to use pagination when a certain number of nodes are read.


In the following image you can see an initial sketch design of the DPM user interface. You can see the nodes tree, a data section, an information column and other elements that will be needed in the final design:

{: .imagen_sm}
![Web access scheme 1]({{ site.baseurl }}/assets/tentativedesign.png)

Beside this I've also developed a small mockup with jQuery UI. Obviously it's not functional yet and it is subject to changes, but it can show a first approach and the actual appearance on a browser. You can check it out on the folowing link: 

{: .imagen_sm}
[calvellido.es/dpmproposal][dpmdemo]


[dpmdemo]: http://www.calvellido.es/dpmproposal
