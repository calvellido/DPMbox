---
layout: post
title:  "Towards a new web interface for LCGDM"
date:   2014-10-17 17:19:07
categories: DPMbox
---
Hello! Well the DPM workshop was held in Naples last Thursday and Friday and it was really interesting. There were a lot of contributors and I gather some helpful information for the development of DPMbox. By the way you can check the slides of my presentation [here]({{ site.baseurl }}/assets/DPMWorkshop.pdf), though I will extend that information in this blog.

Today I want to show you the state of the art in the DPM. Right now there is already web access implemented in the Disk Pool Manager infrastructure. This has been developed as part of the HTTP/WebDAV frontend and is built getting advantage of the Apache WebDAV modules, `mod_dav` and `mod_gridsite`.

{: .imagen_sm}
![Web access scheme 1]({{ site.baseurl }}/assets/webaccess-2.png)

WebDAV is an extension to the HTTP protocol that aims to let users create, rename, modify and remove elements over the web. For this goal it defines some new additional methods to the *traditional* ones (`POST`, `GET`, `PUT`), these are methods like `PROPFIND`, `MKCOL`... You can read the complete specification in [this link][webdav].
In the current web visualization you can explore a collection, download the data and navigate through a collection. But is not possible to upload data, there is no interaction. A reason for this is that HTML forms don't support more HTTP verbs/methods than just `GET` and `POST`, and no `PUT`. So until now for this cases the use of CURL or a proper WebDAV client is needed.

{: .imagen_sm}
![Web access scheme 2]({{ site.baseurl }}/assets/webaccess-1.png)

We are aiming to improve the actual web access by adding more functionality, creating a web interface integrated with the rest of the DPM software stack, offering an easy tool to manage the data from and into the grid. This is the current view accesing through a web browser:

![Actual WebDAV access view]({{ site.baseurl }}/assets/webaccess-3.png)

[webdav]:	[http://www.webdav.org/specs/rfc4918.html]



