/* ============================================================
 *
 * jquery.dpmFilters.js v0.5.0
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

(function($) {
  $.fn.extend($,{
    dpmFilters: {

      /**
       * Will assemble a list of responses into a Javascript data structure,
       * returning an array that can then be manipulated.
       */
      folder: function(dat) {
        var i, curN;
        $.dpm(dat).seekToNode('response').eachNode(function(node, i) {
        });

        return dat;
      },

      versionReport: function(dat) {
        console.log('now a davfilter');

        $.Dav(dat).seekToNode('response').eachNode(function(node, i) {
          console.log(node);
          console.log('href: ' + $.dpm(node).seekToNode('href').nodeText());
        });

        return dat;
      }

    }
  });
})(jQuery);
