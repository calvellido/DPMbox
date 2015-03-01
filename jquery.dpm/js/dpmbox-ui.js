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


// var url = 'http://lxfsra10a01.cern.ch/dpm/cern.ch/home/dteam/aalvarez/public/';
// var url = 'http://lxfsra04a04.cern.ch/dpm/cern.ch/home/dteam/aalvarez/public/';
// var server = 'http://localhost';
// var root = '/webdav/';
var server = 'http://lxfsra04a04.cern.ch';
var root = '/dpm/cern.ch/home/dteam/aalvarez/public/';
var url = server + root;

//Location where DPMbox is hosted
var dpmbox_pathname = location.pathname.slice(0, -1);



// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
} else {
    alert('The File APIs are not fully supported in this browser.');
}


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
 * A function to refresh the grid content
 */
function refreshContent(directory_route){
    $.dpm(server + directory_route).readFolder({
        success:    function(dat) {
            w2ui.grid.clear();
            w2ui.grid.add(dat);
        },
        dataFilter: $.dpmFilters.filesDPM
    });
}


/*
 * Layout definition
 */
$(function() {
    var pstyle_borderless = 'background-color: #FFF; padding: 5px; overflow-y:hidden;';
    var pstyle_borderleft = 'background-color: #FFF; border-left: 1px solid #CCC; padding: 5px; height: 95%; text-align: center;';
    var pstyle_borderright = 'background-color: #FFF; border-right: 1px solid #CCC; padding: 5px; height: 95%;';

    $('#layout').w2layout({
        name: 'layout',
        panels: [
            { type: 'top',  size: 60, resizable: false, style: pstyle_borderless, content: '<div id="label-main"><b>Disk Pool Manager</b></div><div id="breadcrumb">'+ server.slice(7) + root.replace(/\//g,'</a> > <a href="">') + '</div>' },
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
            toolbarDelete   : true
        },
        header: 'List of Names',
        /*toolbar: {
            items: [
                { type: 'button',  id: 'upload',  caption: 'Upload', icon: 'fa fa-upload' },
                { type: 'button',  id: 'download',  caption: 'Download', icon: 'fa fa-download' }
            ]
        },*/
        columns: [
			{"caption":"Filename","field":"filename","size":"40%","min":"15","max":"","sortable":true,"resizable":true, "render": function (record) {return (record.filename).split('/').pop();}},
			{"caption":"Size","field":"size","size":"20","min":"15","max":"","sortable":true,"resizable":true, "render": function (record) {return (Number(record.size)/1024).toFixed(2) + " KB";}},
			// {"caption":"Size (KB)","field":"size","size":"20","min":"15","max":"","sortable":true,"resizable":true, "render": 'number:2'},
			{"caption":"Modified","field":"mdate","size":"40%","min":"15","max":"","sortable":true,"resizable":true}
        ],
        records: [
        ],
        onClick: function (event) {
            /*w2ui['grid2'].clear();
            var record = this.get(event.recid);
            w2ui['grid2'].add([
                { recid: 0, name: 'ID:', value: record.recid },
                { recid: 1, name: 'First Name:', value: record.fname },
                { recid: 2, name: 'Last Name:', value: record.lname },
                { recid: 3, name: 'Email:', value: record.email },
                { recid: 4, name: 'Date:', value: record.sdate }
            ]);*/
            //var record = this.get(event.recid);
            //console.log(event);
            //w2ui['layout'].content('right', '<div class="label-section">Properties</div>' + record.filename + '<br>' + record.size + '<br>' + record.mdate + '<br>');
        },
        onDelete: function (event) {
            console.log('#delete');
            console.log(w2ui.grid.getSelection());
            $.dpm(server + w2ui.grid.getSelection()).remove({
                //success: refreshContent(w2ui.sidebar.selected)
            });
        }
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
            { type: 'button',  id: 'delete',  caption: 'Delete', icon: 'fa fa-times' },
            { type: 'spacer' },
            { type: 'button',  id: 'upload',  caption: 'Upload', icon: 'fa fa-upload' },
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
        ],
        onClick: function (event) {
            var button = this.get(event.target);
            if (button.id == 'upload'){
                selectDialogueLink.click();
            }
            else if (button.id == 'delete'){
                w2ui.grid.delete();
            }
            else if (button.id == 'download'){
                console.log('#download');
                downloadFile(server + w2ui.grid.getSelection());
            }
        }
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
            var record = this.get(event.target);
            $.dpm(server + event.target).readFolder({
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
            $.dpm(server + event.target).readFolder({
                success:    function(dat) {
                    w2ui.grid.clear();
                    w2ui.grid.add(dat);
                    w2ui['layout'].content('right', '<div class="label-section">Properties</div><br><br><img width="100px" height="100px" alt="collection" src="/dpm/img/folder.png"><br><div style="margin-top:8px; font-size:14px;">Collection</div><br><b>Name: </b>' + record.text + '<br><br><b>Route: </b>' + record.id + '<br><br><b>Children: </b>' + record.nodes.length + '<br><br><b>Files: </b>' + w2ui['grid'].total);
                },
                dataFilter: $.dpmFilters.filesDPM
            });
            item_selected = w2ui.sidebar.selected;
            console.log(dpmbox_pathname);
            var route = dpmbox_pathname + event.target;
            history.pushState(null, null, route);
            $('#breadcrumb').html(server.slice(7) + route.replace(/\//g,'</a> > <a href="">'));
        },
        /*onDblClick: function(event) {
            $.dpm(event.target).readFolder({
                success:    function(dat) {
                },
                dataFilter: $.dpmFilters.treeDPM
            });
            event.onComplete = function () {
                w2ui['sidebar'].expand(event.target);
            }
        },*/
        menu: ["Menu1", "Menu2"]
    });
    /*w2ui.sidebar.on('*', function (event) {
        console.log('Event: ' + event.type + ' Target: ' + event.target);
        console.log(event);
    });*/
});


var fileSelector = document.createElement('input');
fileSelector.setAttribute('type', 'file');
fileSelector.setAttribute('multiple', 'multiple');

var selectDialogueLink = document.createElement('a');
selectDialogueLink.setAttribute('href', '');
selectDialogueLink.innerText = "Select File";

selectDialogueLink.onclick = function () {
    fileSelector.click();
    return false;
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        // output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ', f.size, ' bytes, last modified: ', f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a', '</li>');
        output.push(escape(f.name), '(', f.type || 'n/a', ') - ', f.size, ' bytes, last modified: ', f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a', '\n');
        $.dpm(server + w2ui.sidebar.selected + f.name).put({
            complete:  function(dat, stat) {
                console.log('#put');
                $.dpm(server + w2ui.sidebar.selected + this.data.name + '?metalink').get({
                    success: function(dat){
                        console.log(this.file.name);
                        var metalink = dat.getElementsByTagName('url')[0].textContent;
                        console.log(metalink);
                        $.dpm(metalink).put({
                            complete:  function(dat, stat) {
                                console.log('#put2');
                                //console.log(this.data.name);
                                //console.log(this.this.data.name);
                            },
                            data: this.file,
                            contentType: false,
                            processData: false
                        });
                    },
                    file: this.data
                });
                alert(output.join(''));
                refreshContent(w2ui.sidebar.selected);
            },
            data: f,
            contentType: false,
            processData: false
        });
    }
}

document.body.appendChild(selectDialogueLink);
fileSelector.addEventListener('change', handleFileSelect, false);



/*
 * ! DownloadJS v0.5.2
 * Denis Radin aka PixelsCommander
 * Article about: http://pixelscommander.com/javascript/javascript-file-download-ignore-content-type
 */
window.downloadFile = function (sUrl) {
    //iOS devices do not support downloading. We have to inform user about this.
    if (/(iP)/g.test(navigator.userAgent)) {
        alert('Your device does not support files downloading. Please try again in desktop browser.');
        return false;
    }
    //If in Chrome or Safari - download via virtual link click
    if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
        //Creating new link node.
        var link = document.createElement('a');
        link.href = sUrl;

        if (link.download !== undefined) {
            //Set HTML5 download attribute. This will prevent file from opening if supported.
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }
        //Dispatching click event.
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }
    // Force file download (whether supported by server).
    //if (sUrl.indexOf('?') === -1) {
    //    sUrl += '?download';
    //}
    window.open(sUrl, '_self');
    return true;
}
window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

