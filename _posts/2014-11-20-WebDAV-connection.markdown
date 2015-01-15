---
layout: post
title:  "WebDAV connection"
date:   2014-11-20 17:19:07
categories: DPMbox
---
Hello! Today I want to talk you about a key thing in the development.

Taking the present HTTP/WebDAV frontend implementation the current work is to build an API in the jQuery JavaScript library that can interact with it. This way it is possible to translate WebDAV standard methods like PROPFIND or MKCOL and use the information provided by them in an HTML document via jQuery. The API uses ajax calls to perform the HTTP/WebDAV requests and receive the data in an XHR object.

The other methods are similar to the GET method shown, though attending to particular characteristics. cob is the jQuery ajax call object. Here it's needed to ensure integrity of the call object, verify the DAV method requested and set any authorization information (if necesssary). Then the send function does the actual HTTP send through an ajax request.

To use this API in a document we just call the function needed, which as we have seen is basically an ajax call. Besides the standard methods some more functions are developed in order to operate properly. WebDAV answers with XML data so some parsers will be needed, also other methods to read a single property or navigate across the nodes received.

Once we have standard WebDAV operations supported and tested then we extend the code to cover specific DPM operations. These include replicas management and metalink.



How can we add more interactivity? By building an API in JavaScript, particularly using jQuery, that deals with the HTTP/WebDAV frontend. This will let us use the methods of the WebDAV standard like PROPFIND or MKCOL in an HTML environment and thus manage the information they provide. This API will use XMLHttpRequest operations, also known as XHR. XHR support GET, POST, PUT, and basically any HTTP method and is available in any browser, even in old ones like Internet Explorer 6 or Firefox 3.

This is a simplified version of the API. In this case a GET is shown but the other ones are similar, just considering some particularities, like the PROPFIND needing a depth parameter.
All the methods we are interested in are implemented like the GET method (...).
The headers, that will include for example authorization info, are set by the SetRequestHeader Ajax method.

In the API there are also other methods developed in order to work properly with the data. For example to traverse the nodes received in a PROPFIND, or to select a specific property... (picture)

Actually the developed WebDAV module is the one that deals with the DPM head or DPM disk. Just using these basic methods could be possible to have a functional interface, but once we have
support for these then we aim to have a deeper specific DPM/LFC support like metalink or replicas...
