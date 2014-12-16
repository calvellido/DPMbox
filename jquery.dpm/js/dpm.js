/* ============================================================
 *
 * dpm.js
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

var url = '/webdav/';

function refresh(){
    $('#content').empty();
    jQuery.dpm(url).readFolder({
        success:    function(dat, stat) {
            jQuery.dpm(dat).seekToNode('href').eachNode(function(node, i) {
                $('#content').append(jQuery.dpm(node).nodeText() + '<br>');
            });
        },
        dataFilter: jQuery.dpmFilters.folder
    });
}

function handleFiles(input) {
    var file = input[0];
    var name = file.name;
    var size = file.size;
    var type = file.type;
    jQuery.dpm(url + file.name).put({
        complete:  function(dat, stat) {
            console.log('#put');
        },
        data: file,
        contentType: false,
        processData: false,
        async: false
    });
    refresh();
}
