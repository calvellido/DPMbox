/* ============================================================
 *
 * dpmbox-ui.js
 * https://github.com/calvellido/DPMbox
 * Copyright (c) 2014 Juan Valencia Calvellido (juanvalenciacalvellido@gmail.com)
 *
 * ============================================================
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * ============================================================ */

 //A file to store the server and other configuration values

 /* If you're running DPMbox on the same server as a DPM node you should not touch
  * the server and root parameters as they will be obtained automatically from the
  * location.
  * If you are using DPMbox to connect to an external DPM or WebDAV server, please
  * assign these values appropiately. The server value must be like
  * 'http://http://lxfsra04a04.cern.ch'
  * and the root parameter (the directory at where the interface will start to read content)
  * must be some thing like '/dpm/cern.ch/home/dteam/aalvarez/public/' (ending backslash needed).
  */

var config = {
    display_name: 'Disk Pool Manager', //This will be the title name displayed in the interface
    // server: 'http://localhost',
    // root: '/webdav/',
    // server: 'http://lxfsra04a04.cern.ch',
    // root: '/dpm/cern.ch/home/dteam/aalvarez/public/',
    // server: 'http://arioch.cern.ch', //Can't access via https (need to figure it out why)
    // root: '/dpm/', //The backslash at end is needed
    server: location.protocol + '//' + location.host, //Can't access via https (need to figure it out why)
    root: location.pathname, //The backslash at end is needed

    url: function(){ return (config.server + config.root)}
}
