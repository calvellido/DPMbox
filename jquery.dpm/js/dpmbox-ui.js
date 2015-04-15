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


//An anonymous function to keep things outside the global scope
// (function (window, document, undefined) {

    //Activate an exhaustive mode in JavaScript code 'hinters' like JSHint or JSLint
    'use strict';
    /* jshint browser: true, devel: true, jquery: true, eqeqeq: true, maxerr: 1000, quotmark: single */

  // /**
   // * Selectors
   // */
  // var menu = document.querySelector('.menu');
  // var users = document.querySelectorAll('.user');
  // var signout = document.querySelector('.signout');
//
  // /**
   // * Methods
   // */
  // function toggleMenu (event) {
    // if (!this.classList.contains('active')) {
      // this.classList.add('active');
    // }
    // event.preventDefault();
  // }
  // function showUsers (users) {
    // for (var i = 0; i < users.length; i++) {
      // var self = users[i];
      // self.classList.add('visible');
    // }
  // }
  // function signout (users) {
    // var xhr = new XMLHttpRequest();
  // }
//
  // /**
   // * Events/APIs/init
   // */
  // menu.addEventListener('click', toggleMenu, false);
  // signout.addEventListener('click', signout, false);
  // showUsers(users);
//
//

    //Location where DPMbox is hosted
    var dpmbox_pathname = location.pathname.slice(0, -1);


    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
    }
    else {
        alert('The File APIs are not fully supported in this browser. File upload won\'t be possible.');
    }


    /*
     * Functions to be executed at start (DOM ready)
     */
    $(function() {
        setLayout();
        setSidebar();
        refreshSidebar();
        setGrid();
        setToolbar();
    });


    /*
     * Files download
     */

    var fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');

    var selectDialogueLink = document.createElement('a');
    selectDialogueLink.setAttribute('href', '');
    selectDialogueLink.innerText = 'Select File';

    selectDialogueLink.onclick = function () {
        fileSelector.click();
        return false;
    };

    function handleFileSelect(evt) {

        var files = evt.target.files; // FileList object

        // files is a FileList of File objects. List some properties.
        var output = [];
        //var req = {};
        for (var i = 0, f = files[i]; i < files.length; i++) {
            // output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ', f.size, ' bytes, last modified: ', f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a', '</li>');
            output.push(encodeURI(f.name), '(', f.type || 'n/a', ') - ', f.size, ' bytes, last modified: ', f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a', '\n');

            w2ui.grid.lock('Uploading' + encodeURI(f.name), true);

            /* We create a first PUT request
             * The server will answer with the Location
             */
            var req = new XMLHttpRequest();
            req.open('PUT', config.server + w2ui.sidebar.selected + f.name, false);
            req.setRequestHeader('X-No-Redirect', 1);
            req.send(f);

            //Put to the Location received, actual upload will be done now
            $.dpm(req.getResponseHeader('Location')).put({
                complete:  function(dat, stat) {
                    w2ui.grid.unlock();
                    alert(output.join(''));
                    refreshContent(w2ui.sidebar.selected);
                },
                data: f,
                contentType: false,
                processData: false
            });

            /*$.dpm(config.server + w2ui.sidebar.selected + f.name).put({
                complete:  function(dat, stat) {
                    /*$.dpm(config.server + w2ui.sidebar.selected + this.data.name + '?metalink').get({
                        success: function(dat){
                            console.log(this.file.name);
                            var metalink = dat.getElementsByTagName('url')[0].textContent;
                            console.log(metalink);
                            $.dpm(metalink).put({
                                complete:  function(dat, stat) {
                                    //console.log(this.data.name);
                                    //console.log(this.this.data.name);
                                },
                                data: this.file,
                                contentType: false,
                                processData: false
                            });
                        },
                        file: this.data
                    });*/
                    /*alert(output.join(''));
                    refreshContent(w2ui.sidebar.selected);
                },
                actual_data: f,
                headers: {'X-No-Redirect': 1},
                data: " ",
                contentType: false,
                processData: false
            });*/
        }
    }

    document.body.appendChild(selectDialogueLink);
    fileSelector.addEventListener('change', handleFileSelect, false);


    /*
     * ! DownloadJS v0.5.2
     * Denis Radin aka PixelsCommander
     * Article about: http://pixelscommander.com/en/javascript/javascript-file-download-ignore-content-type/
     */
    var downloadFile = function (sUrl) {
        //iOS devices do not support downloading. We have to inform user about this.
        if (/(iP)/g.test(navigator.userAgent)) {
            alert('Your device does not support files downloading. Please try again in desktop browser.');
            return false;
        }
        //If in Chrome or Safari - download via virtual link click
        if (downloadFile.isChrome || downloadFile.isSafari) {
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
    };

    downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;


    /*
     * A function to update the sidebar content
     */
    function refreshSidebar(){
        $.dpm(config.url()).readFolder({
            success:    function(dat, stat, xhr) {
                // w2ui.sidebar.add(dat);
                w2ui.sidebar.add($.dpmFilters.treeDPM2(dat));
                //w2ui.sidebar.add([{'id': 1, 'text': '1', 'icon': 'fa fa-folder'},{'id': 2, 'text': '2', 'icon': 'fa fa-folder'},{'id': 3, 'text': '3', 'icon': 'fa fa-folder'},{'id': 4, 'text': '4', 'icon': 'fa fa-folder'}]);
            }
            // dataType: "text",
            // dataFilter: $.dpmFilters.treeDPM1
        });
    }


    /*
     * A function to refresh the grid content
     */
    function refreshContent(directory_route){
        console.log(config.server + directory_route);
        $.dpm(config.server + directory_route).readFolder({
            success:    function(dat) {
                w2ui.grid.clear();
                w2ui.grid.add($.dpmFilters.filesDPM(dat));
            }
        });
    }


    /*
     * Layout definition
     */
    function setLayout(){
        var pstyle_borderless = 'background-color: #FFF; padding: 5px; overflow-y:hidden;';
        var pstyle_borderleft = 'background-color: #FFF; border-left: 1px solid #CCC; padding: 5px; height: 95%; text-align: center;';
        var pstyle_borderright = 'background-color: #FFF; border-right: 1px solid #CCC; padding: 5px; height: 95%;';

        $('#layout').w2layout({
            name: 'layout',
            panels: [
                { type: 'top',  size: 60, resizable: false, style: pstyle_borderless, content: '<div id="label-main"><b>Disk Pool Manager</b></div><div id="breadcrumb">'+ config.server.slice(7) + config.root.replace(/\//g,'</a> > <a href="">') + '</div>' },
                { type: 'left', size: '20%', resizable: true, style: pstyle_borderright, content: '<div class="label-section">Workspace</div><div id="sidebar" style="height: 90%; width: 100%;"></div>' },
                { type: 'main', size: '60%', resizable: true, style: pstyle_borderless, content: '<div class="label-section">Data</div><div id="toolbar" style="padding: 4px; border-radius: 3px"></div><div id="grid"; style="width: 100%; height: 85%;"></div>' },
                { type: 'right', size: '20%', resizable: true, style: pstyle_borderleft, content: '<div class="label-section">Properties</div>' }
            ]
        });
    }


    /*
     * Grid definition
     */
    function setGrid() {
        $('#grid').w2grid({
            name: 'grid',
            show:{'footer': true,
                'toolbar': true,
                'header': false,
                toolbarReload   : true,
                toolbarColumns  : true,
                toolbarSearch   : true,
                toolbarDelete   : true
            },
            multiSearch: true,
            searches: [
                { field: 'filename', caption: 'Filename ', type: 'text' },
                { field: 'size', caption: 'Size', type: 'float' },
                { field: 'mdate', caption: 'Modified', type: 'date' }
            ],
            sortData: [{ field: 'filename', direction: 'ASC' }],
            /*toolbar: {
                items: [
                    { type: 'button',  id: 'upload',  caption: 'Upload', icon: 'fa fa-upload' },
                    { type: 'button',  id: 'download',  caption: 'Download', icon: 'fa fa-download' }
                ]
            },*/
            columns: [
                {'caption':'Filename','field':'filename','size':'40%','min':'15','max':'','sortable':true,'resizable':true, 'render': function (record) {return (record.filename).split('/').pop();}},
                // {'caption':'Size','field':'size','size':'20','min':'15','max':'','sortable':true,'resizable':true, 'render': function (record) {return (Number(record.size)/1024).toFixed(2) + ' KB';}},
                {'caption':'Size','field':'size','size':'20','min':'15','max':'','sortable':true,'resizable':true, 'render': function (record) {return (record.size + ' KB');}},
                // {'caption':'Size','field':'size','size':'20','min':'15','max':'','sortable':true,'resizable':true},
                {'caption':'Modified','field':'mdate','size':'40%','min':'15','max':'','sortable':true,'resizable':true}
            ],
            records: [
            ],
            /*menu: [
                { id: 1, text: 'Download', icon: 'fa fa-download' },
                { id: 2, text: 'Delete Item', icon: 'fa fa-times' }
            ],*/
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
                //w2ui['layout'].content('right', '<div class='label-section'>Properties</div>' + record.filename + '<br>' + record.size + '<br>' + record.mdate + '<br>');
            },
            onDelete: function (event) {
                var deleteArray = w2ui.grid.getSelection();
                for (var i = 0; i < deleteArray.length; i++) {
                    $.dpm(config.server + deleteArray[i]).remove({
                        // success: alert(config.server + deleteArray[i] + " has been deleted")
                    });
                }
            }
        });
    }


    /*
     * Toolbar definition
     */
    function setToolbar(){
        $('#toolbar').w2toolbar({
            name: 'toolbar',
            items: [
                { type: 'button',  id: 'col_new',  caption: 'New directory', icon: 'fa fa-plus-square' },
                { type: 'button',  id: 'col_delete',  caption: 'Delete directory', icon: 'fa fa-minus-square' },
                //{ type: 'break',  id: 'break0' },
                //{ type: 'button',  id: 'delete',  caption: 'Delete', icon: 'fa fa-times' },
                { type: 'spacer' },
                { type: 'button',  id: 'upload',  caption: 'Upload', icon: 'fa fa-upload' },
                { type: 'button',  id: 'download',  caption: 'Download', icon: 'fa fa-download' }
            ],
            onClick: function (event) {
                var button = this.get(event.target);
                if (button.id === 'upload'){
                    selectDialogueLink.click();
                }
                else if (button.id === 'download'){
                    downloadFile(config.server + w2ui.grid.getSelection());
                }
                else if (button.id === 'col_new'){
                    var collection_name = "new_collection";
                    alert("Name of the new collection: " + collection_name);
                    $.dpm(config.server + w2ui.sidebar.selected + collection_name).mkcol({
                        success: function() {
                            alert("Collection " + collection_name + " created");
                            $.dpm(config.server + w2ui.sidebar.selected + collection_name).readFolder({
                                success:    function(dat) {
                                    w2ui.sidebar.add(w2ui.sidebar.selected, $.dpmFilters.treeDPM2(dat));
                                }
                            });
                        }
                    });
                }
                else if (button.id === 'col_delete'){
                    alert(config.server + w2ui.sidebar.selected + " will be deleted\n\nAre you sure?");
                    $.dpm(config.server + w2ui.sidebar.selected).remove({
                        success: function() {
                            alert("Collection deleted");
                            w2ui.sidebar.remove(w2ui.sidebar.selected);
                            refreshContent(w2ui.sidebar.get(w2ui.sidebar.selected).parent['id']);
                        }
                    });
                }
            }
        });
    }


    /*
     * Sidebar definition
     */
    function setSidebar() {
        // //var item_selected = ''; //For the onClick behaviour control
        $('#sidebar').w2sidebar({
            name: 'sidebar',
            nodes: [
            ],
            // //onCollapse: function (event) { event.preventDefault() },
            onClick: function (event) {
                var record = this.get(event.target);
                $.dpm(config.server + event.target).readFolder({
                    success:    function(dat) {
                        w2ui.sidebar.add(event.target, $.dpmFilters.treeDPM2(dat));
                        // w2ui.sidebar.add(event.target, dat);
                        /* Estudiar el mejor comportamiento de expansión de nodos */
                        /*if (item_selected == event.target){
                            console.log(item_selected);
                            console.log(event.target);
                            w2ui.sidebar.toggle(event.target);
                        }
                        else{
                        }
                        */
                    }
                    // dataType: 'text',
                    // dataFilter: $.dpmFilters.treeDPM1
                });
                $.dpm(config.server + event.target).readFolder({
                    success:    function(dat) {
                        w2ui.grid.clear();
                        w2ui.grid.add($.dpmFilters.filesDPM(dat));
                        w2ui.layout.content('right', '<div class="label-section">Properties</div><br><br><img width="100px" height="100px" alt="collection" src="/dpm/img/folder.png"><br><div style="margin-top:8px; font-size:14px;">Collection</div><br><b>Name: </b>' + record.text + '<br><br><b>Route: </b>' + escapeHtml(decodeURI(record.id)) + '<br><br><b>Children: </b>' + record.nodes.length + '<br><br><b>Files: </b>' + w2ui.grid.total);
                    }
                });
                // item_selected = w2ui.sidebar.selected;
                var route = dpmbox_pathname + event.target;
                history.pushState(null, null, route);
                console.log(decodeURI(route));
                $('#breadcrumb').html(config.server.slice(7) + escapeHtml(decodeURI(route)).replace(/\//g,'</a> > <a href="">'));
            },
            // /*onDblClick: function(event) {
                // $.dpm(event.target).readFolder({
                    // success:    function(dat) {
                    // },
                    // dataFilter: $.dpmFilters.treeDPM
                // });
                // event.onComplete = function () {
                    // w2ui['sidebar'].expand(event.target);
                // }
            // },*/
            // menu: ["Menu1", "Menu2"]
        });
        // /*w2ui.sidebar.on('*', function (event) {
            // console.log('Event: ' + event.type + ' Target: ' + event.target);
            // console.log(event);
        // });*/
    }


// })(window, document); //End of anonymous function to keep things outside the global scope


