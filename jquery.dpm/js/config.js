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

var config = {
	// url: 'http://lxfsra10a01.cern.ch/dpm/cern.ch/home/dteam/aalvarez/public/',
    // url: 'http://lxfsra04a04.cern.ch/dpm/cern.ch/home/dteam/aalvarez/public/',
    server: 'http://localhost',
    root: '/webdav/',
    // server: 'http://lxfsra04a04.cern.ch',
    // root: '/dpm/cern.ch/home/dteam/aalvarez/public/',
    url: function(){ return (config.server + config.root)}
}
