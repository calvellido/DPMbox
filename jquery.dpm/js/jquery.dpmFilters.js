/* ============================================================
 *
 * jquery.dpmFilters.js v0.5.0
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

 /*
  * There are two ways of using this...
  * as a filter is necessary to return xml
  *
  */

(function($) {
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

        /**
        * Will assemble a list of responses into a Javascript data structure,
        * returning an array that can then be manipulated.
        */
        folder: function(dat) {

            $.dpm(dat).seekToNode('response').eachNode(function() {
            });

            return dat;
        },

        /**
        * Similar to folder filter but will follow the JSON data structure
        * for the DPMbox UI, specifically the grid.
        */
        folderDPM: function(dat) {

            var davTree = [];
            $.dpm(dat).seekToNode('response').eachNode(function(node_response) {
                davTree.push({'recid': $.dpm(node_response).seekToNode('href').nodeText(), 'filename': decodeURI($.dpm(node_response).seekToNode('href').nodeText()), 'size': $.dpm(node_response).seekToNode('getcontentlength').nodeText(), 'mdate': $.dpm(node_response).seekToNode('getlastmodified').nodeText()});
            });
            return davTree;
        },

        /**
         * Returns an array of the contained nodes that are collections
         */
        tree: function(dat) {
            var davTree = [];
            $.dpm(dat).seekToNode('response').eachNode(function(node_response) {
                if ($.dpm(node_response).isCollection())
                    davTree.push(node_response);
            });
            return davTree;
        },

        /**
         * Similar to the tree filter but it will build an array filled
         * with objects following the notation for the DPMbox interface:
         * {'id': nodeID, 'text': nodeName, 'icon': icon HTML class};
         */
        treeDPM1: function(dat, datatype) {
            console.log("datatype: " + datatype);
            console.log("dat on treeDPM");
            console.log(dat);
            //var xmlDoc = $.parseXML( dat );
            //console.log("datXML");
            //console.log(xmlDoc);
            //var xmldoc = new XMLDocument(xmlString, true);
            //var xmldat = new XMLDocument(dat, true);
            //console.log(xmldat);
            var davTree = [];
            var dat_object = $.parseXML(dat);
            $.dpm(dat_object).seekToNode('response').eachNode(function(node_response) {
                if ($.dpm(node_response).isCollection())
                    davTree.push({'id': $.dpm(node_response).seekToNode('href').nodeText(), 'text': (decodeURI($.dpm(node_response).seekToNode('href').nodeText())).split('/').reverse()[1], 'icon': 'fa fa-folder'});
            });
            //davTree.push({'id': 1, 'text': '1', 'icon': 'fa fa-folder'},{'id': 2, 'text': '2', 'icon': 'fa fa-folder'});
            return davTree;
        },

        treeDPM2: function(dat, datatype) {
            console.log("datatype: " + datatype);
            console.log("dat on treeDPM");
            console.log(dat);
            //var xmlDoc = $.parseXML( dat );
            //console.log("datXML");
            //console.log(xmlDoc);
            //var xmldoc = new XMLDocument(xmlString, true);
            //var xmldat = new XMLDocument(dat, true);
            //console.log(xmldat);
            var davTree = [];
            $.dpm(dat).seekToNode('response').eachNode(function(node_response) {
                if ($.dpm(node_response).isCollection())
                    davTree.push({'id': $.dpm(node_response).seekToNode('href').nodeText(), 'text': (decodeURI($.dpm(node_response).seekToNode('href').nodeText())).split('/').reverse()[1], 'icon': 'fa fa-folder'});
            });
            //davTree.push({'id': 1, 'text': '1', 'icon': 'fa fa-folder'},{'id': 2, 'text': '2', 'icon': 'fa fa-folder'});
            return davTree;
        },

        /**
         * Returns an array of the contained nodes that are NOT collections
         */
        files: function(dat) {
            var davTree = [];
            $.dpm(dat).seekToNode('response').eachNode(function(node_response) {
                if (!$.dpm(node_response).isCollection())
                    davTree.push(node_response);
            });
            return davTree;
        },

        /**
         * Similar to the files filter but it will build an array filled
         * with objects following the JSON data structure for the
         * DPMbox UI, specifically the grid:
         * {'recid': href, 'filename': href, 'size': getcontentlength, 'mdate': getlastmodified };
         */
        filesDPM: function(dat) {
            var davTree = [];
            $.dpm(dat).seekToNode('response').eachNode(function(node_response) {
                if (!$.dpm(node_response).isCollection())
                    davTree.push({'recid': $.dpm(node_response).seekToNode('href').nodeText(), 'filename': decodeURI($.dpm(node_response).seekToNode('href').nodeText()), 'size': $.dpm(node_response).seekToNode('getcontentlength').nodeText(), 'mdate': $.dpm(node_response).seekToNode('getlastmodified').nodeText()});
            });
            return davTree;
        }

    }
  });
})(jQuery);
