**DPMbox**
======
An interactive user-friendly web interface for a disk-based grid storage system.

----------


Description
----------


The **Disk Pool Manager** (*DPM*) is a lightweight storage solution for grid sites. It offers a simple way to create a disk-based grid storage element and supports relevant protocols (*SRM, gridFTP, RFIO*) for file management and access. It focus on manageability (ease of installation, configuration, low effort of maintenance), while providing all required functionality for a grid storage solution (support for multiple disk server nodes, different space types, multiple file replicas in disk pools). It is installed in 185 different sites, with more than 200 instances running as of today [[1](#WLCG)].

As an effort to move towards standard protocols that removes the need of special client tools, *DPM* started offering a *WebDAV/HTTP* interface, facilitating the access to grid storage via easily available clients as web browsers, or *WebDAV* clients. However, the current pure *HTTP* implementation only offers a primitive read-only interface via browsers, which limits the use cases to the mere navigation of directories and download of files. Attracting less technical users from non *HEP* (High Energy Physics) communities has been an objective for the last years. Precisely this partially triggered the interest on the *HTTP* protocol, and now follows naturally with a more intuitive, easy to use and user appealing graphic user interface. This project will provide a web interface that will integrate with the rest of the software stack, providing an easy and intuitive tool to both technical and nontechnical users to manage their data from and into the grid. The purpose is not to create a cloud storage system copycat, but to get advantage of the features that *DPM* grid system already offers (performance, different accessing protocols, data replication, etc.) adding the ease of use of the increasingly widespread cloud storage systems like *Dropbox*, *OneDrive* or *Google* *Drive*.

As a web development the project **DPMbox** will use standard web technologies as *HTML5* [[7](#W3-html)], *CSS3* [[8](#W3-css)] or *JavaScript* [[9](#MozillaDN-JS)] and the final product must allow users to browse and access their data stored in *DPM* grid elements that provide the *HTTP* protocol in a manner that is straight forward for inexperienced users. With this said, the focus will be held mainly on usability and ease of use but other requirements must also be taken into consideration, including, obviously, security constraints. This interface will allow uploading new data to the directory a user is currently viewing, either via web formularies or in a drag-and-drop fashion. It should also add the ability to perform other sort of basic namespace management, as renaming or deleting. A read-only mode would be of interest as well as any other additional features that may be deemed of interest during development.

As the rest of the software involved in *DPM* the project will be developed under the *Apache License version 2.0* [[10](#ApacheLicense)].



References:
----------

<a name="WLCG"></a>
[1] WLCG data management stats
http://gstat-wlcg.cern.ch/apps/gt/dm/

<a name="DPM"></a>
[2] DPM
https://svnweb.cern.ch/trac/lcgdm/wiki/Dpm

<a name="DPM-http"></a>
[3] DPM HTTP/WebDAV interface
https://svnweb.cern.ch/trac/lcgdm/wiki/Dpm/WebDAV

<a name="DPM-FPS"></a>
[4] DPM: Future Proof Storage
http://iopscience.iop.org/1742-6596/396/3/032015

<a name="DPM-LFC"></a>
[5] Web enabled data management with DPM & LFC
http://iopscience.iop.org/1742-6596/396/5/052006

<a name="LCG"></a>
[6] CERN LCG File Catalog
http://prod-lfc-shared-central.cern.ch/grid/

<a name="W3-html"></a>
[7] W3 Consortium HTML specifications
http://www.w3.org/TR/html51/

<a name="W3-css"></a>
[8] W3 Consortium CSS specifications
http://www.w3.org/TR/css-2010/

<a name="MozillaDN-JS"></a>
[9] Mozilla Developer Network JavaScript Documentation
https://developer.mozilla.org/en-US/docs/Web/JavaScript

<a name="ApacheLicense"></a>
[10] Apache License 2.0
http://www.apache.org/licenses/LICENSE-2.0.html
