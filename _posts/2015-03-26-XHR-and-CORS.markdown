---
layout: post
title:  "XMLHttpRequest and Cross-Origin Resource Sharing"
date:   2015-03-26 20:35:14
categories:
---
Hello there! I'll write today a brief review of how DPMbox manage the file uploads, and how we solved a small problem that had complicated this feature.

So, the steps to upload a file to the Disk Pool Manager would be as folllows:

{: .imagen_sm}
![DPM uploads [15-02-2015]]({{ site.baseurl }}/assets/uploads.png)

In the DPM architecture one entity handles the namespace with the metadata, and other ones store the files with the actual data. This means that any request must go through a server hosting the namespace first, and then redirect to the disk node storing the physical file. We execute a PUT call and the file won't be yet uploaded but DPM will answer back, then our web application has to try a second time. The URL needed to actually do the PUT would look like this, you can see the specific DPM node where the file will be uploaded, including a token validating the transaction:

`http://lxfsra04a04.cern.ch/srv/dpm/01/nogroup/2015-03-02/XHR.js.zip.2900489.0?sfn=%2Fdpm%2Fcern.ch%2Fhome%2Fdteam%2Faalvarez%2Fpublic%2Fcollection_d%2FXHR.js.zip&dpmtoken=dbf5fcbe-7c31-4849-aa57-b07c6b474f5e&token=ojkU%2FdgyPqTYEvu4TfZAyueVDqQ%3D%401425288602%401`

User agents commonly apply same-origin restrictions to network requests. These restrictions prevent a client-side Web application as DPMbox running from one origin from obtaining data retrieved from another origin, and also limit unsafe HTTP requests that can be automatically launched toward destinations that differ from the running application's origin. In user agents that follow this pattern, network requests typically include user credentials with cross-origin requests, including HTTP authentication and cookie information. As DPMbox relies heavily on XHR calls this has to be handled carefully or we'll face a lot of error messages like this:

`Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://lxfsra04a04.cern.ch/dpm/cern.ch/home/dteam/aalvarez/public/test5.file. (Reason: CORS header 'Access-Control-Allow-Origin' missing).`

You can check a bit of history of XHR and CORS and why is this happening here [[2]][CORS2].

Back in our development, the DPM initial behaviour was to answer with a 302 code indicating `redirection`, and then the browser will try *transparently* to reach that new location. That would work it out, but the thing is that 30x responses are treated as error by CORS specification [[1]] [w3CORS]:

>This is the **actual request**. Apply the make a request steps and observe the request rules below while making the request.

>**If the response has an HTTP status code of 301, 302, 303, 307, or 308** Apply the cache and network error steps.

>(...)

>Whenever the **network error steps** are applied, terminate the algorithm that invoked this set of steps and set the cross-origin request status to network error.

>Note: This has no effect on setting of user credentials. I.e. if the block cookies flag is unset, cookies will be set by the response.

>Whenever the **cache and network error steps** are applied, follow these steps:

>Remove the entries in the preflight result cache where origin field value is a case-sensitive match for source origin and url field value is a case-sensitive match for request URL.

>Apply the network error steps acting as if the algorithm that invoked the cache and network error steps invoked the network error steps instead.


So with ths configuration it would be impossible to get any information of the response, not any header at a JavaScript level, specifically the `Location` header. Finally, the solution given was manage the uploads though a first empty PUT including a header `X-No-Redirect` and the server will answer with a *202 Accepted* response. We can extract any header from this type of response as it's not treated as error for XHR CORS requests.

After this we have to add this new header information to our server CORS security settings and add it to the directive `Access-Control-Expose-Headers`. There's a lot of tutorials for different servers CORS configuration, for example you can check this one for Apache [[2]][CORS3]. But in the end, in the server side we would need to configurate it as to response with this headers:

{% highlight xml %}
Access-Control-Allow-Origin: UrlWhereDPMboxIsHosted.host
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: ACL, CANCELUPLOAD, CHECKIN, CHECKOUT, COPY, DELETE, GET, HEAD, LOCK, MKCALENDAR, MKCOL, MOVE, OPTIONS, POST, PROPFIND, PROPPATCH, PUT, REPORT, SEARCH, UNCHECKOUT, UNLOCK, UPDATE, VERSION-CONTROL
Access-Control-Allow-Headers: Authorization, Overwrite, Destination, Content-Type, Depth, User-Agent, Translate, Range, Content-Range, Timeout, X-File-Size, X-Requested-With, Accept, Accept-Version, If-Modified-Since, X-File-Name, Cache-Control, Location, Lock-Token, If, X-No-Redirect 
Access-Control-Expose-Headers: DAV, content-length, Allow, Location 
{% endhighlight js %}


At first, find a solution to this problem was tough since I'm not very familiar with this Cross-Origin Resource Sharing HTML5 new settings, but after all it was properly (and happily) solved. Good night!

_____________

###References:

<a name="W3 CORS specification"></a>
[1] W3 CORS specification
<a href="http://www.w3.org/TR/cors/" target="_blank">w3.org/TR/cors</a>

<a name="W3 CORS specification"></a>
[2] Unleash your AJAX requests
<a href="http://dev.housetrip.com/2014/04/17/unleash-your-ajax-requests-with-cors/" target="_blank">dev.housetrip.com/2014/04/17/unleash-your-ajax-requests-with-cors</a>

<a name="CORS and complex AJAX requests"></a>
[3] CORS and complex AJAX requests
<a href="http://www.danieldemmel.me/blog/2013/01/18/getting-cross-origin-resource-sharing-with-complex-jquery-ajax-requests" target="_blank">danieldemmel.me/blog/2013/01/18/getting-cross-origin-resource-sharing-with-complex-jquery-ajax-requests</a>

[w3CORS]: http://www.w3.org/TR/cors
[CORS2]: http://dev.housetrip.com/2014/04/17/unleash-your-ajax-requests-with-cors/
[CORS3]: http://www.danieldemmel.me/blog/2013/01/18/getting-cross-origin-resource-sharing-with-complex-jquery-ajax-requests/
