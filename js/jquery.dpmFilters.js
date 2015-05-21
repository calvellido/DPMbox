/* ============================================================
 *
 * jquery.dpmFilters.js v0.6.0
 * https://github.com/calvellido/DPMbox
 * Copyright (c) 2014 Juan Valencia Calvellido (juanvalenciacalvellido@gmail.com)
 *
 * ============================================================
 *
 * This library is based on jquery.dav, licensed under the Apache License, Version 2.0.
 * https://github.com/sandro-pasquali/jquery.dav
 * Copyright (c) 2011 Sandro Pasquali (spasquali@gmail.com)
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


/*************************************************
 * Support functions
 *************************************************/

// Use the browser's built-in functionality to quickly and safely escape the string
function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// UNSAFE with unsafe strings; only use on previously-escaped ones!
function unescapeHtml(escapedStr) {
    var div = document.createElement('div');
    div.innerHTML = escapedStr;
    var child = div.childNodes[0];
    return child ? child.nodeValue : '';
}

/*************************************************
 * DPM filters
 *************************************************/

 /* There were two ways of approaching this jquery.dpmFilters functions.
  * If as proper ajax data filters it was necessary to return xml data.
  * This way it would be possible to use them and manipulate the data
  * via the dataFilter parameter in ajax calls.
  * The other way, that is the way that these functions are implemented
  * in DPMbox, is to have it as functions that transforms the received XML
  * data into other structures like JSON objects adapted to DPMbox UI notation.
  */

(function($) {

    //Some directives for JSHint (JS code analyzer)
    'use strict';
    /* jshint browser: true, devel: true, jquery: true, eqeqeq: true, maxerr: 1000, quotmark: single */

    $.fn.extend($,{
        dpmFilters: {

            versionReport: function(dat) {
                console.log('now a davfilter');

                $.dpm(dat).seekToNode('response').eachNode(function(node) {
                    console.log(node);
                    console.log('href: ' + $.dpm(node).seekToNode('href').nodeText());
                });

                return dat;
            },

            /* It will assemble a list of responses into a Javascript data structure,
             * returning an array that can then be manipulated.
             */
            folder: function(dat) {

                $.dpm(dat).seekToNode('response').eachNode(function() {
                });

                return dat;
            },

            /* Similar to folder filter but it will follow the JSON data
             * structure for the DPMbox UI, specifically the grid.
             */
            folderJSON: function(dat) {

                var davTree = [];
                $.dpm(dat).seekToNode('response').eachNode(function(node_response) {
                    davTree.push({'recid': encodeURI($.dpm(node_response).seekToNode('href').nodeText()), 'filename': escapeHtml(decodeURI($.dpm(node_response).seekToNode('href').nodeText())), 'size': $.dpm(node_response).seekToNode('getcontentlength').nodeText(), 'mdate': $.dpm(node_response).seekToNode('getlastmodified').nodeText()});
                });
                return davTree;
            },

            /* Returns an array of the contained nodes that are collections
             */
            tree: function(dat) {
                var davTree = [];
                $.dpm(dat).seekToNode('response').eachNode(function(node_response) {
                    if ($.dpm(node_response).isCollection())
                        davTree.push(node_response);
                });
                return davTree;
            },

            /* Similar to the tree filter but it will build an array filled
             * with objects following the notation for the DPMbox interface:
             * {'id': nodeID, 'text': nodeName, 'icon': icon HTML class};
             * This
             */
            treeJSON: function(dat, datatype) {
                var davTree = [];
                $.dpm(dat).seekToNode('response').eachNode(function(node_response) {
                    if ($.dpm(node_response).isCollectionDPM())
                        davTree.push({'id': w2utils.base64encode($.dpm(node_response).seekToNode('href').nodeText()), 'text': escapeHtml((decodeURI($.dpm(node_response).seekToNode('href').nodeText())).split('/').reverse()[1]), 'icon': 'fa fa-folder-o'});
                });
                return davTree;
            },

            /* Similar as treeDPM, but it will return a tree structure with the main node above its children
             * collections (the main node with the children in its 'nodes' parameter).
             */
            treeJSONparent: function(dat, datatype) {
                var davTree = [];
                $.dpm(dat).seekToNode('response').eachNode(function(node_response) {
                    if ($.dpm(node_response).isCollectionDPM())
                        davTree.push({'id': w2utils.base64encode($.dpm(node_response).seekToNode('href').nodeText()), 'text': escapeHtml((decodeURI($.dpm(node_response).seekToNode('href').nodeText())).split('/').reverse()[1]), 'path': encodeURI($.dpm(node_response).seekToNode('href').nodeText()), 'icon': 'fa fa-folder-o'});
                });
                //The WebDAV/DPM server responds with the root collection first. Now we pop that first collection off the list and make it parent of the others collections
                var davRoot = davTree.shift();
                davRoot.nodes = davTree; //Set the other nodes as children of the parent
                davRoot.icon = 'fa fa-folder'; //This indicates that this node has already been readed
                davRoot.expanded = true; //To show it already open in sidebar
                return davRoot;
            },

            /* Again, similar as treeDPM, but this time it will return a structure with just
             * the children nodes of the given location.
             */
            treeJSONchildren: function(dat, datatype) {
                var davTree = [];
                $.dpm(dat).seekToNode('response').eachNode(function(node_response) {
                    if ($.dpm(node_response).isCollectionDPM())
                        davTree.push({'id': w2utils.base64encode($.dpm(node_response).seekToNode('href').nodeText()), 'text': escapeHtml((decodeURI($.dpm(node_response).seekToNode('href').nodeText())).split('/').reverse()[1]), 'path': encodeURI($.dpm(node_response).seekToNode('href').nodeText()), 'icon': 'fa fa-folder-o'});
                });
                //The WebDAV/DPM server responds with the root collection first. Now we pop that first collection off the list to have only the children
                davTree.shift();
                return davTree;
            },

            /* Returns an array of the contained nodes that are NOT collections
             */
            files: function(dat) {
                var davTree = [];
                $.dpm(dat).seekToNode('response').eachNode(function(node_response) {
                    if (!$.dpm(node_response).isCollection())
                        davTree.push(node_response);
                });
                return davTree;
            },

            /* Similar to the files filter but it will build an array filled
             * with objects following the JSON data structure for the
             * DPMbox UI, specifically the grid:
             * {'recid': href, 'filename': href, 'size': getcontentlength, 'mdate': getlastmodified };
             */
            filesJSON: function(dat) {
                var davTree = [];
                $.dpm(dat).seekToNode('response').eachNode(function(node_response) {
                    if (!$.dpm(node_response).isCollection())
                        davTree.push({'recid': encodeURI($.dpm(node_response).seekToNode('href').nodeText()), 'filename': escapeHtml(decodeURI($.dpm(node_response).seekToNode('href').nodeText())), 'size': Number($.dpm(node_response).seekToNode('getcontentlength').nodeText()), 'mdate': new Date($.dpm(node_response).seekToNode('getlastmodified').nodeText())});
                });
                return davTree;
            },

            /* Again this will be similar to files but this time it will build
             * the structure with all the information that is present in
             * the XML document that a DPM server responds with.
             */
            filesJSONDPM: function(dat) {
                // $.dpm(dat).seekToNode('response');
                // $.dpm(dat).getProperties();
                // var davTree = [];
                // $.dpm(dat).seekToNode('response').eachNode(function(node_response) {
                    // if (!$.dpm(node_response).isCollectionDPM())
                        // davTree.push({'recid': $.dpm(node_response).seekToNode('href').nodeText(), 'filename': decodeURI($.dpm(node_response).seekToNode('href').nodeText()), 'size': Number($.dpm(node_response).seekToNode('getcontentlength').nodeText()), 'mdate': new Date($.dpm(node_response).seekToNode('getlastmodified').nodeText())});
                        // davTree.push({'recid': w2utils.base64encode($.dpm(node_response).seekToNode('href').nodeText()), 'filename': escapeHtml(decodeURI($.dpm(node_response).seekToNode('href').nodeText())), 'size': Number((Number($.dpm(node_response).seekToNode('getcontentlength').nodeText())/1024).toFixed(2)), 'mdate': new Date($.dpm(node_response).seekToNode('getlastmodified').nodeText())});
                        // $.dpm(node_response).getProperties()
                        // davTree.push({'recid': encodeURI($.dpm(node_response).seekToNode('href').nodeText()), 'filename': escapeHtml(decodeURI($.dpm(node_response).seekToNode('href').nodeText())), 'size': Number($.dpm(node_response).seekToNode('getcontentlength').nodeText()), 'mdate': new Date($.dpm(node_response).seekToNode('getlastmodified').nodeText())});
                // });
                // return davTree;
            }
        }
    });
})(jQuery);
