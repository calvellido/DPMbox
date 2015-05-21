/* ============================================================
 *
 * tests.js
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
 * Testing functions suite for jQuery.dpm.js
 *************************************************/

 /* Basically it will check if the server defined in config.js is a
  * valid WebDAV server executing all the HTTP/WebDAV methods of jQuery.dpm.js.
  * This way you can observe these calls seeing if the server works properly.
  */

function tests(){

    //Some directives for JSHint (JS code analyzer)
    'use strict';
    /* jshint browser: true, devel: true, jquery: true, eqeqeq: true, maxerr: 1000, quotmark: single, multistr: true*/

    var url = config.url(); //Defined here to avoid calling the functions multiple times unnecessaryly

    // $.dpm(url).readFolder({
        // async: false, //Set synchronous to complete this test before the next one
		// success:    function(dat, stat) {
			// //$.dpm(dat).getNodesByTag('href');
			// //console.log($.dpm(dat).nodeName(0));
			// //$('#content').append($.dpm(dat).getNodesByTag('href')[0].textContent);
			// //$('#content').append($.dpm(dat).getNodesByTag('href')[0].nodeText());
			// //$('#content').append($.dpm(dat).nodeText());
			// $.dpm(dat).seekToNode('href').eachNode(function(node, i) {
				// $('#content').append($.dpm(node).nodeText() + '<br>');
			// });
		// },
		// dataFilter: $.dpmFilters.folder
    // });


    /****************************************************
     * Initial tests
     ****************************************************/

    //#get
    $.dpm(url + 'testxml.xml').get({
        async: false, //Set synchronous to complete this test before the next one
        complete: function() {
            console.log('#get');
        },
        success:  function(dat, stat) {
            console.log($.dpm(dat).getNodesByTag('acl'));
        }
    });

    //#post
    $.dpm(url + 'file_0').post({
        async: false, //Set synchronous to complete this test before the next one
        complete: function(dat, stat) {
            console.log('#post');
            console.log('post test status: ' + stat);
        },
        data: {
            foo: 'bar',
            bar: 'foo'
        }
    });

    //head
    $.dpm(url + 'file_0').head({
        async: false, //Set synchronous to complete this test before the next one
        complete:  function(dat, stat) {
            console.log('#head');
            console.log(dat);
        }
    });

    //#propFind
    $.dpm(url + 'file_0').propFind({
        async: false, //Set synchronous to complete this test before the next one
        success:  function(dat, stat) {
            console.log('#propFind > getcontentlength:');
            console.log($.dpm(dat).seekToNode('getcontentlength').nodeText());
        },
        data: '<?xml version="1.0" encoding="utf-8" ?>\
              <propfind xmlns="DAV:">\
                <prop>\
                  <P:getcontentlength xmlns:P="DAV:"/>\
                </prop>\
              </propfind>'
    });

    //#getAllProperties
    $.dpm(url + 'testxml.xml').getAllProperties({
        async: false, //Set synchronous to complete this test before the next one
        complete: function() {
            console.log('#getAllProperties');
        }
    });


    /****************************************************
     * Test propPatch-ing, setting, removing, getting
     ****************************************************/

    //#propPatch > set
    $.dpm(url + 'testxml.xml').propPatch({
        async: false, //Set synchronous to complete this test before the next one
            complete:  function(dat, stat) {
                console.log('#propPatch > set testingprop to `somevalue`');
                console.log(stat);
        },
        setProperty: {
            name: 'testingprop',
            value: 'somevalue'
        }
    });

    //#getProperty
    $.dpm(url + 'testxml.xml').getProperty({
        async: false, //Set synchronous to complete this test before the next one
        property: [
            'testingprop'
        ],
        success:  function(dat, stat) {
            console.log('#getProperty > get testingprop, should be `somevalue`');
            console.log($.dpm(dat).seekToNode('testingprop').nodeText());
        }
    });

    //#propPatch > remove
    $.dpm(url + 'testxml.xml').propPatch({
        complete:  function(dat, stat) {
            console.log('#propPatch > remove testingprop');
            console.log(stat);
        },
        async: false, //Set synchronous to complete this test before the next one
        removeProperty: {
            name: 'testingprop'
        }
    });

    //#getProperty to test if removed
    $.dpm(url + 'testxml.xml').getProperty({
        async: false, //Set synchronous to complete this test before the next one
        property: [
            'testingprop'
        ],
        success:  function(dat, stat) {
            console.log('#getProperty > get testingprop, `node:` should be blank');
            console.log('node: ' + $.dpm(dat).seekToNode('testingprop').nodeText())
        }
    });

    //#setProperty
    $.dpm(url + 'testxml.xml').setProperty({
        async: false, //Set synchronous to complete this test before the next one
        complete:  function(dat, stat) {
            console.log('#setProperty > set testingprop to `somevalue`');
            console.log(stat);
        },
        property: {
            name: 'testingprop',
            value: 'somevalue'
        }
    });

    //#getProperty to test if set
    $.dpm(url + 'testxml.xml').getProperty({
        async: false, //Set synchronous to complete this test before the next one
        property: [
            'testingprop'
        ],
        success:  function(dat, stat) {
            console.log('#getProperty > get testingprop, should be `somevalue`');
            console.log($.dpm(dat).seekToNode('testingprop').nodeText())
        }
    });

    //#removeProperty
    $.dpm(url + 'testxml.xml').removeProperty({
        complete:  function(dat, stat) {
            console.log('#removeProperty > remove testingprop');
            console.log(stat);
        },
        async: false, //Set synchronous to complete this test before the next one
        property: {
            name: 'testingprop'
        }
    });

    //#getProperty to test if removed
    $.dpm(url + 'testxml.xml').getProperty({
        async: false, //Set synchronous to complete this test before the next one
        property: [
            'testingprop'
        ],
        success:  function(dat, stat) {
            console.log('#getProperty > get testingprop, `node:` should be blank');
            console.log('node: ' + $.dpm(dat).seekToNode('testingprop').nodeText())
        }
    });


    /**************************************************************
     * Test creating/deleting files, using MKCOL, DELETE, and PUT
     **************************************************************/

    //#put
    $.dpm(url + 'testing.html').put({
        complete:  function(dat, stat) {
            console.log('#put');
        },
        data: 'testing creating file with put',
        async: false //Set synchronous to complete this test before the next one
    });

    //#remove
    $.dpm(url + 'testing.html').remove({
        complete:  function(dat, stat) {
            console.log('#remove');
        },
        async: false //Set synchronous to complete this test before the next one
    });

    //#mkcol
    $.dpm(url + 'test').mkcol({
        complete:  function(dat, stat) {
            console.log('#mkcol');
        },
        async: false //Set synchronous to complete this test before the next one
    });

    //#remove
    $.dpm(url + 'test').remove({
        complete:  function(dat, stat) {
            console.log('#remove folder');
        },
        async: false //Set synchronous to complete this test before the next one
    });

    //#createFile
    $.dpm(url + 'testing.html').createFile({
        complete:  function(dat, stat) {
            console.log('#createFile');
        },
        async: false //Set synchronous to complete this test before the next one
    });

    //#remove
    $.dpm(url + 'testing.html').remove({
        complete:  function(dat, stat) {
            console.log('#remove file');
        },
        async: false //Set synchronous to complete this test before the next one
    });

    //#createFolder
    $.dpm(url + 'test').createFolder({
        complete:  function(dat, stat) {
            console.log('#createFolder');
        },
        async: false //Set synchronous to complete this test before the next one
    });

    //#remove
    $.dpm(url + 'test').remove({
        complete:  function(dat, stat) {
            console.log('#remove folder');
        },
        async: false //Set synchronous to complete this test before the next one
    });


    /******************************************
    * Locking, unlocking
    ******************************************/

    //#put temp lock file
    $.dpm(url + 'testlock.html').put({
        complete:  function(dat, stat) {
            console.log('#put create lockable resource');
        },
        async: false //Set synchronous to complete this test before the next one
    });

    //storing...
    var tempLockVar = '';

    //#lock
    $.dpm(url + 'testlock.html').lock({
        username: 'sandro',
        success:  function(dat, stat) {
            tempLockVar = $.dpm(dat).seekToNode('href').nodeText();
            console.log('#lock successful');
        },
        async: false //Set synchronous to complete this test before the next one
    });


    //#unlock
    $.dpm(url + 'testlock.html').unlock({
        lockToken: tempLockVar,
        complete:  function(dat, stat) {
            console.log('#unlock resource');
        },
        async: false //Set synchronous to complete this test before the next one
    });


    //#remove locked file
    $.dpm(url + 'testlock.html').remove({
        complete:  function(dat, stat) {
            console.log('#remove locked resource');
        },
        async: false //Set synchronous to complete this test before the next one
    });



    /******************************************
     * Test CHECKIN/CHECKOUT/UNCHECKOUT
     ******************************************/
/*
    //#put -- create a file
    $.dpm(url + 'testing.html').put({
      complete:  function(dat, stat) {
        console.log('#put VCR');
      },
      data: 'checkingin and out',
      async: false //Set synchronous to complete this test before the next one
    });

    //#versionControl
    $.dpm(url + 'testing.html').versionControl({
      complete:  function(dat, stat) {
        console.log('#versionControl');
      },
      async: false //Set synchronous to complete this test before the next one
    });

    //#checkout
    $.dpm(url + 'testing.html').checkout({
      complete:  function(dat, stat) {
        console.log('#checkout');
      },
      async: false //Set synchronous to complete this test before the next one
    });

    //#checkin
    $.dpm(url + 'testing.html').checkin({
      complete:  function(dat, stat) {
        console.log('#checkin');
      },
      async: false //Set synchronous to complete this test before the next one
    });

    //#checkout
    $.dpm(url + 'testing.html').checkout({
      complete:  function(dat, stat) {
        console.log('#checkout');
      },
      async: false //Set synchronous to complete this test before the next one
    });
*/
/*
    //#checkin
    $.dpm(url + 'testing.html').checkin({
      success:  function(dat, stat) {
        console.log('#checkin');
        console.log(stat);
      },
      async: false //Set synchronous to complete this test before the next one
    });
*/
/*
    //#uncheckout
    $.dpm(url + 'testing.html').uncheckout({
      success:  function(dat, stat) {
        console.log('#uncheckout');
        console.log(stat);
      },
      async: false //Set synchronous to complete this test before the next one
    });
*/
/*
    //#put -- try to put
    $.dpm(url + 'testing.html').put({
      complete:  function(dat, stat) {
        console.log('#put');
      },
      data: 'after checking inout',
      async: false //Set synchronous to complete this test before the next one
    });

    //#getVersionTreeReport
    $.dpm(url + 'testing.html').getVersionTreeReport({
      async: false, //Set synchronous to complete this test before the next one
      success:  function(dat, stat) {
        console.log('#getVersionTreeReport');
        console.log(dat);
      },
      dataFilter: $.dpmFilters.versionReport
    });

    $.dpm(url + 'jDav.html').propFind({
      data: '<?xml version="1.0" encoding="UTF-8" ?>\
              <propfind xmlns="DAV:">\
                <prop>\
                  <supported-method-set/>\
                </prop>\
              </propfind>',
      success: function(dat,stat) {
        console.log('#methodset');
        console.log($.dpm(dat).getNodesByTag('multistatus'));
      },
      async: false
    });
*/
}
