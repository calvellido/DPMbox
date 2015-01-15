---
layout: post
title:  "Towards a new web interface for LCGDM"
date:   2014-10-17 17:19:07
categories: DPMbox
---
Hello! Well, the DPM workshop was held in Naples last Thursday and Friday and it was very interesting. 

In the Disk Pool Manager infrastructure there is already web access implemented. This has been developed as part of the HTTP/WebDAV frontend and is built getting advantage of the Apache WebDAV modules, `mod_dav` and `mod_gridsite`.

<!--![My helpful screenshot]({{ site.baseurl }}/assets/webaccess-1.png)-->

WebDAV is an extension to the HTTP protocol that aims to let users create, rename, modify and remove elements over the web. For this goal it defines some new additional methods/verbs...
In the current web visualization you can explore a collection and download the data and navigate through a collection. But is not possible to upload data, there is no interaction. A reason for this is that HTML forms don't support more HTTP verbs/methods than just GET and POST, and no PUT. So until now for this cases the use of CURL or a proper WebDAV client is needed.

--current view--

We are aiming to improve the actual web access by adding more functionality, creating a web interface integrated with the rest of the DPM software stack, offering an easy tool to manage the data from and into the grid.



