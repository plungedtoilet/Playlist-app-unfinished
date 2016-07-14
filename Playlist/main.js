/*!
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Copyright (c) 2011-2016, Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author  Anders Evenrud <andersevenrud@gmail.com>
 * @licence Simplified BSD License
 */
(function(Application, Window, Utils, API, VFS, GUI) {
  'use strict';

  /////////////////////////////////////////////////////////////////////////////
  // WINDOWS
  /////////////////////////////////////////////////////////////////////////////

  function ApplicationPlaylistWindow(app, metadata, scheme, file) {
    Window.apply(this, ['ApplicationPlaylistWindow', {
      icon: metadata.icon,
      title: metadata.name,
      width: 400,
      height: 200
    }, app, scheme, file]);
  }

  ApplicationPlaylistWindow.prototype = Object.create(Window.prototype);
  ApplicationPlaylistWindow.constructor = Window.prototype;

  ApplicationPlaylistWindow.prototype.init = function(wmRef, app, scheme) {
    var root = Window.prototype.init.apply(this, arguments);
    var self = this;

    // Load and set up scheme (GUI) here
    scheme.render(this, 'PlaylistWindow', root);

 

/*-----------------------------------------------------------------------------------*/



var playlists = "";
var playlists2 = "";
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      playlists = xhttp.responseText;
      playlists2 = (playlists + "hi");
    }
  };
  xhttp.open("GET", "/FS/get/home:///PlaylistFile.txt", true);
  xhttp.send();
  OSjs.VFS.write("home:///PlaylistFile.txt", playlists2, function(err, res) { if ( err ) { alert(err); return; } })
}
loadDoc();
var currentHTML = "";
var File = "home:///Music";
function scand(){
OSjs.VFS.scandir("home:///Music", function(err, res) { if ( err ) { alert(err); return; } 
var a = 1;


for(a; a < res.length;a += 1)
{ 

if(res[a].mime == "audio/mpeg"){
currentHTML += "<option value=\"/FS/get/" + res[a].path + "\">" + res[a].filename.replace(".mp3", "") + "</option>";
}else if(res[a].type == "dir"){scanDir(res[a].path);};

document.getElementsByClassName("Window ApplicationPlaylistWindow")[0].childNodes[1].childNodes[2].innerHTML = currentHTML;

} 
vis();

}, {/* options */});
}

function scanDir(File){
var file = File;
OSjs.VFS.scandir(file, function(err, res) { if ( err ) { alert(err); return; } 
var a = 1;


for(a; a < res.length;a += 1)
{ 

if(res[a].mime == "audio/mpeg"){
currentHTML += "<option value=\"/FS/get/" + res[a].path + "\">" + res[a].filename.replace(".mp3", "") + "</option>";
}else if(res[a].type == "dir"){scanDir(res[a].path);};

document.getElementsByClassName("Window ApplicationPlaylistWindow")[0].childNodes[1].childNodes[2].innerHTML = currentHTML;

}

}, {/* options */});
}
scand();
/*-----------------------------------------------------------------------------------*/

function vis(){
var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d'), height = canvas.style.height, width = canvas.style.width;



// here we create our chain
var audio = document.querySelector('audio'),
    audioContext = new AudioContext(),
    source = audioContext.createMediaElementSource(audio),
    analyser = audioContext.createAnalyser();

source.connect(analyser);
analyser.connect(audioContext.destination);

setInterval(function(){
  var freqData = new Uint8Array(analyser.frequencyBinCount);

      analyser.getByteFrequencyData(freqData);

      ctx.clearRect(0, 0, 300, 160);

      for (var i = 0; i < freqData.length; i++ ) {
        var magnitude = freqData[i];
	var td = 240 - (magnitude);
        ctx.fillRect(i*1.5, 160, 1, -magnitude * .6);
        ctx.fillStyle = ("rgb("+ td +", 11, 11)");
      }
 }, 20);
}


return root;
  };

  




ApplicationPlaylistWindow.prototype.destroy = function() {
    Window.prototype.destroy.apply(this, arguments);
  };

  /////////////////////////////////////////////////////////////////////////////
  // APPLICATION
  /////////////////////////////////////////////////////////////////////////////

  function 
ApplicationPlaylist(args, metadata) {
    Application.apply(this, ['ApplicationPlaylist', args, metadata]);
  }

  ApplicationPlaylist.prototype = Object.create(Application.prototype);
  ApplicationPlaylist.constructor = Application;

  ApplicationPlaylist.prototype.destroy = function() {
    return Application.prototype.destroy.apply(this, arguments);
  };

  ApplicationPlaylist.prototype.init = function(settings, metadata) {
    Application.prototype.init.apply(this, arguments);

    var self = this;
    this._loadScheme('./scheme.html', function(scheme) {
      self._addWindow(new ApplicationPlaylistWindow(self, metadata, scheme));
    });
  };

  

  /////////////////////////////////////////////////////////////////////////////
  // EXPORTS
  /////////////////////////////////////////////////////////////////////////////

  OSjs.Applications = OSjs.Applications || {};
  OSjs.Applications.ApplicationPlaylist = OSjs.Applications.ApplicationPlaylist || {};
  OSjs.Applications.ApplicationPlaylist.Class = Object.seal(ApplicationPlaylist);

})(OSjs.Core.Application, OSjs.Core.Window, OSjs.Utils, OSjs.API, OSjs.VFS, OSjs.GUI);





