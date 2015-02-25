---
layout: post
title:  "WebDAV connection"
date:   2014-11-20 17:19:07
categories:
---
Hello! In this post I want to talk you about a key thing in the development, and that is the way to *talk* with the current DPM software stack.

How can we add more interactivity to the current webview? We have to communicate with the current implementation, so we need to build an API that deals with the HTTP/WebDAV frontend. This can be done in JavaScript, particularly using jQuery. Now the current work is to build this JavaScript library that can interact with it. This will let us use methods of the WebDAV standard like `PROPFIND` or `MKCOL` in an HTML environment and thus manage the information they provide. This API will use `XMLHttpRequest` operations, also known as `XHR`. These are basically ajax calls that perform the HTTP/WebDAV requests and receive the data in a JavaScript `XHR` object. An `XMLHttpRequest` support `GET`, `POST`, `PUT`, and basically any HTTP method, and is available in any browser, even in old ones like Internet Explorer 6 or Firefox 3.

This is a simplified version of the API. In this case a `GET` is shown but the other ones are are implemented in a similar way though considering some particularities (like the `PROPFIND` needing a depth parameter). 

{% highlight js %}

$.fn.extend($,{
	Dav: function(res) {
		var api = function() {

			this.get = function(cob) {
				this.prepare(cob, 'GET');
				return this.send(cob);
			};

			this.prepare = function(cob, typ) {
				cob           = cob || {};
				cob.url       = resourceUrl;
				cob.headers   = cob.headers || {};

				cob.type      = typ || 'GET';
				cob.dataType  = cob.dataType || 'xml';
			};

			this.send = function(cob) {
				lastRequest = $.ajax(cob);
				return lastRequest;
			};

		};
		return new api;
    }
};

{% endhighlight %}


`cob` is the jQuery ajax call object, in the prepare function the DAV call is built. There it's needed to ensure integrity of the call object, verify the DAV method requested and set any authorization information (if necesssary). The headers that will include that information are set by the `SetRequestHeader` ajax method. After that the send function does the actual `HTTP send` through an ajax request.

To use this API in an HTML document we just call the function needed, which as we have seen is basically an ajax call that we can process if it success. Here's an example with a `textxml.xml` file and other one creating a `test` collection: 

{% highlight js %}

// #get
jQuery.dpm(url + 'testxml.xml').get({
	complete: function() {
		console.log('#get');
	},
	success:  function(dat, stat) {
		console.log(jQuery.dpm(dat).getNodesByTag('acl'));
	}
});

//#mkcol
jQuery.Dav(url + 'test').mkcol({
	complete:  function(dat, stat) {
		console.log('#mkcol');
	},
	async: false
});

{% endhighlight %}

In the API there are also other methods developed in order to work properly with the data. For example to traverse the nodes received in a `PROPFIND`, or to select a specific property... WebDAV answers with XML data so some parsers will be needed too.

{% highlight js %}

this.getAllProperties = function(cob) {
	cob.data    = XmlHeader + '\
				<D:propfind xmlns:D="DAV:">\
				<D:allprop/>';

	if(isArray(cob.includes)) {
		cob.data    +=  '<D:include>';

		for(var i=0; i < d.includes.length; i++) {
			cob.body  += '<D:' + d.includes[i] + '/>';
		}

		cob.data    +=  '</D:include>';
	}

	cob.data      += '</D:propfind>';
	return this.propFind(cob);
};

{% endhighlight %}

As you can see in the way the code communicate with the DPM software stack, is the developed WebDAV module the one that deals with the DPM head or DPM disk actually. 

By supporting these standard WebDAV operations in our API it could be possible to build a functional HTML interface, but once we have completed the development for them the goal will be to cover specific DPM/LFC issues like the `replica` (a specific location for a file) and `metalink` (the full list of locations for a certain file) management, this would be very helpful for broken file location links.
