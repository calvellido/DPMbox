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

(function($) {
  $.fn.extend($,{
    dpmFilters: {


        /**
        * Will assemble a list of responses into a Javascript data structure,
        * returning an array that can then be manipulated.
        */
        folder: function(dat) {

            $.dpm(dat).seekToNode('response').eachNode(function(node, i) {
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
                //if ($.dpm(node_response).isCollection())
                    davTree.push({'recid': $.dpm(node_response).seekToNode('href').nodeText(), 'filename': $.dpm(node_response).seekToNode('href').nodeText(), 'size': decodeURI($.dpm(node_response).seekToNode('href').nodeText()), 'mdate': decodeURI($.dpm(node_response).seekToNode('href').nodeText())});
            });
            return davTree;
        },


        versionReport: function(dat) {
            console.log('now a davfilter');

            $.dpm(dat).seekToNode('response').eachNode(function(node, i) {
                console.log(node);
                console.log('href: ' + $.dpm(node).seekToNode('href').nodeText());
            });

            return dat;
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
         * Similar to the folderTree filter but it will build an array filled
         * with objects following the notation for the DPMbox interface:
         * {'id': nodeID, 'text': nodeName, icon: 'icon HTML class'};
         */
        treeDPM: function(dat) {
            var davTree = [];
            $.dpm(dat).seekToNode('response').eachNode(function(node_response) {
                if ($.dpm(node_response).isCollection())
                    davTree.push({'id': $.dpm(node_response).seekToNode('href').nodeText(), 'text': decodeURI($.dpm(node_response).seekToNode('href').nodeText()), 'icon': 'fa fa-folder-o'});
            });
            return davTree;
        }

    }
  });
})(jQuery);
