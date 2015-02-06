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


var url = '/webdav/';

//var currentFolder = [];
//var currentFolderJSON = JSON.stringify(currentFolder);


/*
 * Refresh function definition
 */
//$(function( refresh ) {
	//setGrid();
    //refresh();
//});


/*
 * A function to update the sidebar content
 */
// function refresh(){
$(function() {
    $.dpm(url).readFolder({
        success:    function(dat) {
            w2ui.sidebar.add(dat);
        },
        dataFilter: $.dpmFilters.treeDPM
    });
});


/*
 * Layout definition
 */
$(function() {
    var pstyle_borderless = 'background-color: #FFF; padding: 5px; overflow-y:hidden;';
    var pstyle_borderleft = 'background-color: #FFF; border-left: 1px solid #CCC; padding: 5px; height: 95%';
    var pstyle_borderright = 'background-color: #FFF; border-right: 1px solid #CCC; padding: 5px; height: 95%';

    $('#layout').w2layout({
        name: 'layout',
        panels: [
            { type: 'top',  size: 60, resizable: false, style: pstyle_borderless, content: '<div id="label-main"><b>Disk Pool Manager</b></div><div id="breadcrumb">dpm > cern.ch > home</div>' },
            { type: 'left', size: '20%', resizable: true, style: pstyle_borderright, content: '<div class="label-section">Workspace</div><div id="sidebar" style="height: 90%; width: 100%;"></div>' },
            { type: 'main', size: '60%', resizable: true, style: pstyle_borderless, content: '<div class="label-section">Data</div><div id="toolbar" style="padding: 4px; border-radius: 3px"></div><div id="grid"; style="width: 100%; height: 85%;"></div>' },
            { type: 'right', size: '20%', resizable: true, style: pstyle_borderleft, content: '<div class="label-section">Properties</div>' }
        ]
    });
});


/*
 * Grid definition
 */
// function setGrid() {
$(function() {
    $('#grid').w2grid({
        name: 'grid',
        show:{"footer":true,
            "toolbar":true,
            "header":false,
            toolbarReload   : true,
            toolbarColumns  : true,
            toolbarSearch   : true,
            toolbarAdd      : true,
            toolbarDelete   : true,
            toolbarSave     : true},
        header: 'List of Names',
        columns: [
			{"caption":"Filename","field":"filename","size":"40%","min":"15","max":"","sortable":true,"resizable":true},
			{"caption":"Size","field":"size","size":"20","min":"15","max":"","sortable":true,"resizable":true},
			{"caption":"Modified","field":"mdate","size":"40%","min":"15","max":"","sortable":true,"resizable":true}
        ],
        records: [
			{"recid":1,"filename":"test_01","size":"128","mdate":"Thu, 26 Jun 2014 12:11:01 GMT"},
			{"recid":2,"filename":"test_02","size":"24","mdate":"Thu, 26 Jun 2014 15:21:01 GMT"},
			{"recid":3,"filename":"test_03","size":"16","mdate":"Fri, 22 Ago 2014 14:16:37 GMT"},
			{"recid":4,"filename":"test_04","size":"24","mdate":"Thu, 26 Jun 2014 12:11:31 GMT"},
			{"recid":5,"filename":"test_05","size":"342","mdate":"Thu, 21 Ago 2014 13:11:21 GMT"},
			{"recid":6,"filename":"test_06","size":"1023","mdate":"Thu, 21 Ago 2014 12:11:01 GMT"},
			{"recid":7,"filename":"test_07","size":"8","mdate":"Fri, 22 Ago 2014 13:10:11 GMT"},
			{"recid":8,"filename":"test_08","size":"8","mdate":"Thu, 26 Jun 2014 12:11:01 GMT"},
            {"recid":9,"filename":"test_09","size":"128","mdate":"Thu, 26 Jun 2014 12:11:01 GMT"},
			{"recid":10,"filename":"test_10","size":"24","mdate":"Thu, 26 Jun 2014 15:21:01 GMT"},
			{"recid":11,"filename":"test_11","size":"16","mdate":"Fri, 22 Ago 2014 14:16:37 GMT"},
			{"recid":12,"filename":"test_12","size":"24","mdate":"Thu, 26 Jun 2014 12:11:31 GMT"},
			{"recid":13,"filename":"test_13","size":"342","mdate":"Thu, 21 Ago 2014 13:11:21 GMT"},
			{"recid":14,"filename":"test_14","size":"1023","mdate":"Thu, 21 Ago 2014 12:11:01 GMT"},
			{"recid":15,"filename":"test_15","size":"8","mdate":"Fri, 22 Ago 2014 13:10:11 GMT"},
			{"recid":16,"filename":"test_16","size":"8","mdate":"Thu, 26 Jun 2014 12:11:01 GMT"},
            {"recid":17,"filename":"test_17","size":"128","mdate":"Thu, 26 Jun 2014 12:11:01 GMT"},
			{"recid":18,"filename":"test_18","size":"24","mdate":"Thu, 26 Jun 2014 15:21:01 GMT"},
			{"recid":19,"filename":"test_19","size":"16","mdate":"Fri, 22 Ago 2014 14:16:37 GMT"}
        ]
    });
});


/*
 * Toolbar definition
 */
$(function () {
    $('#toolbar').w2toolbar({
        name: 'toolbar',
        items: [
            { type: 'button',  id: 'copy',  caption: 'Copy', icon: 'fa fa-copy' },
            { type: 'button',  id: 'cut',  caption: 'Cut', icon: 'fa fa-cut' },
            { type: 'button',  id: 'paste',  caption: 'Paste', icon: 'fa fa-paste' },
            { type: 'break',  id: 'break0' },
            { type: 'button',  id: 'lock',  caption: 'Lock', icon: 'fa fa-lock' },
            { type: 'break',  id: 'break1' },
            { type: 'button',  id: 'delete',  caption: 'Delete', icon: 'fa fa-times' },
            { type: 'spacer' },
            { type: 'button',  id: 'download',  caption: 'Download', icon: 'fa fa-download' }
            /*{ type: 'check',  id: 'item1', caption: 'Check', icon: 'fa fa-check', checked: true },
            { type: 'break',  id: 'break0' },
            { type: 'menu',   id: 'item2', caption: 'Menu', icon: 'fa fa-table', count: 17, items: [
                { text: 'Item 1', icon: 'fa fa-camera', count: 5 },
                { text: 'Item 2', icon: 'fa fa-picture', disabled: true },
                { text: 'Item 3', icon: 'fa fa-glass', count: 12 }
            ]},
            { type: 'break', id: 'break1' },
            { type: 'radio',  id: 'item3',  group: '1', caption: 'Radio 1', icon: 'fa fa-star', checked: true },
            { type: 'radio',  id: 'item4',  group: '1', caption: 'Radio 2', icon: 'fa fa-heart' },
            { type: 'break', id: 'break2' },
            { type: 'drop',  id: 'item5', caption: 'Drop Down', icon: 'fa fa-plus', html: '<div style="padding: 10px">Drop down</div>' },
            { type: 'break', id: 'break3' },
            { type: 'html',  id: 'item6',
                html: '<div style="padding: 3px 10px;">'+
                      ' Input:'+
                      '    <input size="10" style="padding: 3px; border-radius: 2px; border: 1px solid silver"/>'+
                      '</div>'
            },
            { type: 'spacer' },
            { type: 'button',  id: 'item7',  caption: 'Item 5', icon: 'fa fa-flag' }*/
        ]
    });
});


/*
 * Sidebar definition
 */
$(function () {
    //var item_selected = ''; //For the onClick behaviour control
    $('#sidebar').w2sidebar({
        name: 'sidebar',
        /*nodes: [
            { id: 'level-1', text: 'Level 1', img: 'icon-folder', expanded: true, groupShowHide: false,
              nodes: [ { id: 'level-1-1', text: 'Level 1.1', icon: 'fa fa-home' },
                       { id: 'level-1-2', text: 'Level 1.2', icon: 'fa fa-star' },
                       { id: 'level-1-3', text: 'Level 1.3', icon: 'fa fa-star-o' }
                     ]
            },
            { id: 'level-2', text: 'Level 2', img: 'icon-folder', expanded: true, groupShowHide: false,
              nodes: [ { id: 'level-2-1', text: 'Level 2.1', img: 'icon-folder', count: 3,
                           nodes: [
                           { id: 'level-2-1-1', text: 'Level 2.1.1', icon: 'fa fa-star-o' },
                           { id: 'level-2-1-2', text: 'Level 2.1.2', icon: 'fa fa-star-o', count: 67 },
                           { id: 'level-2-1-3', text: 'Level 2.1.3', icon: 'fa fa-star-o' }
                       ]},
                       { id: 'level-2-2', text: 'Level 2.2', icon: 'fa fa-star-o' },
                       { id: 'level-2-3', text: 'Level 2.3', icon: 'fa fa-star-o' }
                     ]
            }
        ],*/
        //onCollapse: function (event) { event.preventDefault() },
        onClick: function (event) {
            $.dpm(event.target).readFolder({
                success:    function(dat) {
                    w2ui.sidebar.add(event.target, dat);
                    /* Estudiar el mejor comportamiento de expansión de nodos */
                    /*if (item_selected == event.target){
                        console.log(item_selected);
                        console.log(event.target);
                        w2ui.sidebar.toggle(event.target);
                    }
                    else{
                    }
                    */
                },
                dataFilter: $.dpmFilters.treeDPM
            });
            $.dpm(event.target).readFolder({
                success:    function(dat) {
                    w2ui.grid.clear();
                    w2ui.grid.add(dat);
                },
                dataFilter: $.dpmFilters.folderDPM
            });
            item_selected = w2ui.sidebar.selected;
        },
        menu: ["Menu1", "Menu2"]
    });
    /*w2ui.sidebar.on('*', function (event) {
        console.log('Event: ' + event.type + ' Target: ' + event.target);
        console.log(event);
    });*/
});

