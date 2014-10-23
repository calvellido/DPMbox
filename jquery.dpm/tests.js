/* ============================================================
 *
 * tests.js
 * https://github.com/calvellido/DPMbox/jquery.dpm
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

function tests()
  {

    var url = '/webdav/';
    //var url = 'http://webdav.cloudme.com/calvellido/';
    //var url = 'https://calvellido:valencia@webdav.cloudme.com/calvellido/';

    /*jQuery.Dav(url).readFolder({
      success:    function(dat, stat) {
        console.log(jQuery.Dav(dat).seekToNode('propstat').seekToNode('getlastmodified').nodeText());
      }
    });

    jQuery.Dav(url).readFolder({
      success:    function(dat, stat) {
        console.log(jQuery.Dav(dat).getNodesByTag('propstat'));
      },
      dataFilter: jQuery.DavFilters.folder
    });
	*/
    /*jQuery.Dav(url).readFolder({
      success:    function(dat, stat) {
        //jQuery.Dav(dat).getNodesByTag('href');
        //console.log(jQuery.Dav(dat).nodeName(0));
        //$('#content').append(jQuery.Dav(dat).getNodesByTag('href')[0].textContent);
        //$('#content').append(jQuery.Dav(dat).getNodesByTag('href')[0].nodeText());
        //$('#content').append(jQuery.Dav(dat).nodeText());
        jQuery.Dav(dat).seekToNode('href').eachNode(function(node, i) {
			$('#content').append(jQuery.Dav(node).nodeText() + '<br>');
        });
      },
      dataFilter: jQuery.DavFilters.folder
    });
    */

    jQuery.Dav(url).readFolder({
		success:    function(dat, stat) {
			//jQuery.Dav(dat).getNodesByTag('href');
			//console.log(jQuery.Dav(dat).nodeName(0));
			//$('#content').append(jQuery.Dav(dat).getNodesByTag('href')[0].textContent);
			//$('#content').append(jQuery.Dav(dat).getNodesByTag('href')[0].nodeText());
			//$('#content').append(jQuery.Dav(dat).nodeText());
			jQuery.Dav(dat).seekToNode('href').eachNode(function(node, i) {
				$('#content').append(jQuery.Dav(node).nodeText() + '<br>');
			});
		},
		dataFilter: jQuery.DavFilters.folder
    });

    //$('body').append('<div>');

    /**
     * Initial tests
     */

    // #get
    jQuery.Dav(url + 'testxml.xml').get({
      complete: function() {
        console.log('#get');
      },
      success:  function(dat, stat) {
        console.log(jQuery.Dav(dat).getNodesByTag('acl'));
      }
    });

    // #post
    jQuery.Dav(url + 'file_0').post({
      complete: function(dat, stat) {
        console.log('#post');
        console.log('post test status: ' + stat);
      },
      data: {
        foo: 'bar',
        bar: 'foo'
      }
    });

    // head
    jQuery.Dav(url + 'file_0').head({
      async: false, // want to make sure we do this prior to next test
      complete:  function(dat, stat) {
        console.log('#head');
        console.log(dat);
      }
    });

    // #propFind
    jQuery.Dav(url + 'file_0').propFind({
      async: false, // want to make sure we do this prior to next test
      success:  function(dat, stat) {
        console.log('#propFind > getcontentlength:');
        console.log(jQuery.Dav(dat).seekToNode('getcontentlength').nodeText());
      },
      data: '<?xml version="1.0" encoding="utf-8" ?>\
              <propfind xmlns="DAV:">\
                <prop>\
                  <P:getcontentlength xmlns:P="DAV:"/>\
                </prop>\
              </propfind>'
    });


    // #getAllProperties
    jQuery.Dav(url + 'testxml.xml').getAllProperties({
      async: false, // want to make sure we do this prior to next test
      complete: function() {
        console.log('#getAllProperties');
      },
      success:  function(dat, stat) {
        console.log(jQuery.Dav(dat).seekToNode('propstat').nodeName());
      }
    });

    /****************************************************
     *
     * Test propPatch-ing, setting, removing, getting.
     *
     ****************************************************/


    // #propPatch > set
    jQuery.Dav(url + 'testxml.xml').propPatch({
      async: false, // want to make sure we do this prior to next test
      complete:  function(dat, stat) {
        console.log('#propPatch > set testingprop to `somevalue`');
        console.log(stat);
      },
      setProperty: {
        name: 'testingprop',
        value: 'somevalue'
      }
    });

    // #getProperty
    jQuery.Dav(url + 'testxml.xml').getProperty({
      async: false, // want to make sure we do this prior to next test
      property: [
        'testingprop'
      ],
      success:  function(dat, stat) {
        console.log('#getProperty > get testingprop, should be `somevalue`');
        console.log(jQuery.Dav(dat).seekToNode('testingprop').nodeText());
      }
    });

    // #propPatch > remove
    jQuery.Dav(url + 'testxml.xml').propPatch({
      complete:  function(dat, stat) {
        console.log('#propPatch > remove testingprop');
        console.log(stat);
      },
      async: false, // want to make sure we do this prior to next test
      removeProperty: {
        name: 'testingprop'
      }
    });

    // #getProperty to test if removed
    jQuery.Dav(url + 'testxml.xml').getProperty({
      async: false, // want to make sure we do this prior to next test
      property: [
        'testingprop'
      ],
      success:  function(dat, stat) {
        console.log('#getProperty > get testingprop, `node:` should be blank');
        console.log('node: ' + jQuery.Dav(dat).seekToNode('testingprop').nodeText())
      }
    });

    // #setProperty
    jQuery.Dav(url + 'testxml.xml').setProperty({
      async: false, // want to make sure we do this prior to next test
      complete:  function(dat, stat) {
        console.log('#setProperty > set testingprop to `somevalue`');
        console.log(stat);
      },
      property: {
        name: 'testingprop',
        value: 'somevalue'
      }
    });

    // #getProperty to test if set
    jQuery.Dav(url + 'testxml.xml').getProperty({
      async: false, // want to make sure we do this prior to next test
      property: [
        'testingprop'
      ],
      success:  function(dat, stat) {
        console.log('#getProperty > get testingprop, should be `somevalue`');
        console.log(jQuery.Dav(dat).seekToNode('testingprop').nodeText())
      }
    });

    // #removeProperty
    jQuery.Dav(url + 'testxml.xml').removeProperty({
      complete:  function(dat, stat) {
        console.log('#removeProperty > remove testingprop');
        console.log(stat);
      },
      async: false, // want to make sure we do this prior to next test
      property: {
        name: 'testingprop'
      }
    });

    // #getProperty to test if removed
    jQuery.Dav(url + 'testxml.xml').getProperty({
      async: false, // want to make sure we do this prior to next test
      property: [
        'testingprop'
      ],
      success:  function(dat, stat) {
        console.log('#getProperty > get testingprop, `node:` should be blank');
        console.log('node: ' + jQuery.Dav(dat).seekToNode('testingprop').nodeText())
      }
    });

    /**************************************************************
     *
     * Test creating/deleting files, using MKCOL, DELETE, and PUT
     *
     **************************************************************/

    // #put
    jQuery.Dav(url + 'testing.html').put({
      complete:  function(dat, stat) {
        console.log('#put');
      },
      data: 'testing creating file with put',
      async: false // want to make sure we do this prior to next test
    });

    // #remove
    jQuery.Dav(url + 'testing.html').remove({
      complete:  function(dat, stat) {
        console.log('#remove');
      },
      async: false // want to make sure we do this prior to next test
    });

    // #mkcol
    jQuery.Dav(url + 'test').mkcol({
      complete:  function(dat, stat) {
        console.log('#mkcol');
      },
      async: false // want to make sure we do this prior to next test
    });

    // #remove
    jQuery.Dav(url + 'test').remove({
      complete:  function(dat, stat) {
        console.log('#remove folder');
      },
      async: false // want to make sure we do this prior to next test
    });

    // #createFile
    jQuery.Dav(url + 'testing.html').createFile({
      complete:  function(dat, stat) {
        console.log('#createFile');
      },
      async: false // want to make sure we do this prior to next test
    });

    // #remove
    jQuery.Dav(url + 'testing.html').remove({
      complete:  function(dat, stat) {
        console.log('#remove file');
      },
      async: false // want to make sure we do this prior to next test
    });

    // #createFolder
    jQuery.Dav(url + 'test').createFolder({
      complete:  function(dat, stat) {
        console.log('#createFolder');
      },
      async: false // want to make sure we do this prior to next test
    });

    // #remove
    jQuery.Dav(url + 'test').remove({
      complete:  function(dat, stat) {
        console.log('#remove folder');
      },
      async: false // want to make sure we do this prior to next test
    });

    /******************************************
     *
     * LOCKING, UNLOCKING
     *
     ******************************************/

    // #put temp lock file
    jQuery.Dav(url + 'testlock.html').put({
      complete:  function(dat, stat) {
        console.log('#put create lockable resource');
      },
      async: false // want to make sure we do this prior to next test
    });

    // storing...
    var tempLockVar = '';

    // #lock
    jQuery.Dav(url + 'testlock.html').lock({
      username: 'sandro',
      success:  function(dat, stat) {
        tempLockVar = jQuery.Dav(dat).seekToNode('href').nodeText();
        console.log('#lock successful');
      },
      async: false // want to make sure we do this prior to next test
    });


    // #unlock
    jQuery.Dav(url + 'testlock.html').unlock({
      lockToken: tempLockVar,
      complete:  function(dat, stat) {
        console.log('#unlock resource');
      },
      async: false // want to make sure we do this prior to next test
    });


    // #remove locked file
    jQuery.Dav(url + 'testlock.html').remove({
      complete:  function(dat, stat) {
        console.log('#remove locked resource');
      },
      async: false // want to make sure we do this prior to next test
    });



    /******************************************
     *
     * Test CHECKIN/CHECKOUT/UNCHECKOUT
     *
     ******************************************/
/*
    // #put -- create a file
    jQuery.Dav(url + 'testing.html').put({
      complete:  function(dat, stat) {
        console.log('#put VCR');
      },
      data: 'checkingin and out',
      async: false // want to make sure we do this prior to next test
    });

    // #versionControl
    jQuery.Dav(url + 'testing.html').versionControl({
      complete:  function(dat, stat) {
        console.log('#versionControl');
      },
      async: false // want to make sure we do this prior to next test
    });

    // #checkout
    jQuery.Dav(url + 'testing.html').checkout({
      complete:  function(dat, stat) {
        console.log('#checkout');
      },
      async: false // want to make sure we do this prior to next test
    });

    // #checkin
    jQuery.Dav(url + 'testing.html').checkin({
      complete:  function(dat, stat) {
        console.log('#checkin');
      },
      async: false // want to make sure we do this prior to next test
    });

    // #checkout
    jQuery.Dav(url + 'testing.html').checkout({
      complete:  function(dat, stat) {
        console.log('#checkout');
      },
      async: false // want to make sure we do this prior to next test
    });
*/
/*
    // #checkin
    jQuery.Dav(url + 'testing.html').checkin({
      success:  function(dat, stat) {
        console.log('#checkin');
        console.log(stat);
      },
      async: false // want to make sure we do this prior to next test
    });
*/
/*
    // #uncheckout
    jQuery.Dav(url + 'testing.html').uncheckout({
      success:  function(dat, stat) {
        console.log('#uncheckout');
        console.log(stat);
      },
      async: false // want to make sure we do this prior to next test
    });
*/
/*
    // #put -- try to put
    jQuery.Dav(url + 'testing.html').put({
      complete:  function(dat, stat) {
        console.log('#put');
      },
      data: 'after checking inout',
      async: false // want to make sure we do this prior to next test
    });

    // #getVersionTreeReport
    jQuery.Dav(url + 'testing.html').getVersionTreeReport({
      async: false, // want to make sure we do this prior to next test
      success:  function(dat, stat) {
        console.log('#getVersionTreeReport');
        console.log(dat);
      },
      dataFilter: jQuery.DavFilters.versionReport
    });

    jQuery.Dav(url + 'jDav.html').propFind({
      data: '<?xml version="1.0" encoding="UTF-8" ?>\
              <propfind xmlns="DAV:">\
                <prop>\
                  <supported-method-set/>\
                </prop>\
              </propfind>',
      success: function(dat,stat) {
        console.log('#methodset');
        console.log(jQuery.Dav(dat).getNodesByTag('multistatus'));
      },
      async: false
    });
*/
  }
