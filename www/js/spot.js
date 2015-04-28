var nskana = (function() {


  var spot = null;
  var spotMarkers = {};
  var map = null;
  var selected = "";
  var largemap = true;

  function buildSpotList() {
      
    for ( category in spot.categories ){
              
        // Create Category
        $("#spot_categories").append(
            $('<li data-role="collapsible" data-inset="false" data-iconpos="right">').append(
                $('<h3>').text(spot.categories[category].name),
                $('<ul  data-role="listview" id="'+ spot.categories[category].id +'">')
                    
                    .listview().listview('refresh')
            ).collapsible().collapsible('refresh')
        ).listview().listview('refresh');
        }
              
        // Create MIDOKORO in Category
        for ( i in spot.lists ){
            $("#"+spot.lists[i].category).append('<li><a href="index.html">' + spot.lists[i].title + '</a></li>');
            $("#"+spot.lists[i].category).listview().listview('refresh');
            $(document).on("click", "#"+ spot.lists[i].category+" li", function(event) {
                             selected = $(this).text();
                             $("#spotpanel").panel("close");
                             window.scrollTo(0,0);
                             });
        }
              
            
  }
  function getSpotDefaultData() {
      $.ajax({
       url: 'spot.json',
       async: false,
       dataType: 'json'
      }).success(function(data) {
      console.log('spot.json read  successuly!');
       spot = data;
      }).error(function(data,text,err) {
       console.log('spot.json read error!: ' + text);
      });
  }
 var w = new $.Deferred;
  function setSpotData() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT,
        0,
        gotFS,
        function(evt) { console.log('E gotFS'); w.reject('E'); });
    return w.promise();
  }
  function gotFS(fileSystem) {
    console.log('gotFS!');
    fileSystem.root.getFile('my_spot.json',
        { create: true, exclusive: false },
        gotFileEntry,
        function(evt) { w.reject('E'); });
  }
  function gotFileEntry(fileEntry) {
    console.log('gotFileEntry!!');
    fileEntry.createWriter(gotFileWriter,
        function(evt) { 
          console.log("E gotFileWriter");
          w.reject('E'); 
        });
  }
  function gotFileWriter(writer) {
    var string = JSON.stringify(spot);
    writer.onwriteend = function(evt) {
      console.log('OnTruncated!!');
      writer.seek(0);
      writer.onwriteend = function(evt) {
        console.log('OnWriteEnd!!');
        w.resolve();  
      };
      writer.write(string);
      w.resolve();
    };
    writer.onerror = function(evt) {
      console.log('OnError!');
      w.reject('E');
    };
    writer.onabort = function(evt) {
      console.log('OnAbort');
      w.reject('E');
    };  
    writer.onwrite = function(evt) {
      console.log('OnWrite!');
    };
    writer.truncate(0);
    console.log('my_spot.json was written!!');
  }
 var d = new $.Deferred;
  function getSpotData() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
    checkData,
    function(evt) {
        console.log('E checkData!');
        d.reject('E');
    });
    return d.promise();
  }

  function checkData(fileSystem) {

    var reader = fileSystem.root.createReader();
    reader.readEntries(function(entries){
      var i;
      for ( i = 0; i< entries.length; i++){
      //  alert(entries[i].toURL());
      }
    },function(){ });
    fileSystem.root.getFile('my_spot.json',
        { create: false, exclusive: false },
        checkSavedFileEntry,
        function(evt) {
          console.log('E checkSavedFileEntry!');
          console.log("my_spot doesn't exists!");
          d.reject('E');
        });
  }

  function checkSavedFileEntry(fileEntry) {
    console.log('checkMyFileEntry!!');
    fileEntry.file(checkFile,
        function(evt) {
          console.log('E checkFile!');
          d.reject('E');
        });
  }

  function checkFile(file) {
    console.log('checkFile!');
    //if (file.Type ) {
      //alert(file.Type);
      var checker = new FileReader();
      checker.onerror = function(evt) {
        console.log('onError!');
        d.reject('E'); };
      checker.onabort = function(evt) {
        console.log('onAbort!');
        d.reject('E'); };
      checker.onloadstart = function(evt) {
        console.log('onStart!'); };
      checker.onloadend = function(evt) {
        console.log('OnLoadEnd!');
        if (evt.target.result == null) {
          console.log("my_spot file content doesn't exists!");
          d.reject('E');
        }else {
          console.log('MY_SPOT file exists!');
          spot = JSON.parse(evt.target.result);
          d.resolve();
        }
      };
      checker.readAsText(file);
      console.log('my_spot file was read as Text!!');
    //}else {
      //console.log('my_spot file is not file!');
      //d.reject('E');
    //}
  }
  function createMap() {
    

    var KANAGAWA = new plugin.google.maps.LatLng(
        spot.map.center.lat, spot.map.center.lng);


    var map_button = document.getElementById('map-button');
    map_button.addEventListener('click', onMapBtnClicked, false);
    
    //var large_map_button = document.getElementById('large-map-button');
    //large_map_button.addEventListener('click', onLargeMapBtnClicked, false);

    var div = document.getElementById('map_canvas');
    map = plugin.google.maps.Map.getMap(div,
        {'controls': { 'myLocationButton': true },
      'camera': {'latLng': KANAGAWA, 'zoom': spot.map.zoomlevel }});
      map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
      
      $("#spotpanel").on('panelbeforeopen',function(){ 
        //map.setVisible(false);

      });
      $("#spotpanel").on('panelclose',function(){ 
      
         map.setVisible(true); 
         spotMarkers[selected].getPosition(function(selected_latlng){
          map.moveCamera({ 'target':selected_latlng, 'tilt':0, 'zoom':16  });
          
         });

         spotMarkers[selected].showInfoWindow();
          
          for (k in spot.lists) {
            if (selected == spot.lists[k].title) {
              $('#spot-name').text(spot.lists[k].name);
              $('#spot-description').text(spot.lists[k].description);
              $('#spot-howtogetthere').text(spot.lists[k].howtogetthere);
              $('#spot-check').checkboxradio('enable');
              if (spot.lists[k].status == 'checked') {
                $('#spot-check').prop("checked",true).checkboxradio("refresh");
              }else {
                $('#spot-check').prop("checked",false).checkboxradio("refresh");
              }
              $('#spot-image').attr("src", spot.lists[k].image);
            }
          }
      
      });
      
     
        //var divmap = document.getElementById('map_canvas');
        //divmap.style.backgroundColor = 'lightgray';
        //var bounds = [
        //  new plugin.google.maps.LatLng(
        //      35.400187, 139.531897
        //      ),
        //  new plugin.google.maps.LatLng(
        // 
        //     35.398696, 139.530513
        //
        //      )
        //  ];
        //map.addGroundOverlay({ 
        //  'url':"www/res/totsuka_map.jpg",
        //  'bounds':bounds,
        //  'anchor':[0,0],
        //  'opacity':0.5,
        //  'bearing':0
        //},function(groundOverlay){
       // 
       // });


        map.setVisible(true); 
        
        buildSpotList();



  } 
  
  
  
  var n = new $.Deferred;
  function doNothing() {
    console.log('doNothing');
    n.resolve();
    return n.promise();
  }
  function onMapReady(map) {
    for (i in spot.lists) {
      var motto_manabitai_basyo = new plugin.google.maps.LatLng(
          spot.lists[i].position.lat, spot.lists[i].position.lng);
      var opts = {};
      opts['position'] = motto_manabitai_basyo;
      opts['title'] = spot.lists[i].title;
      opts['snippet'] = spot.lists[i].name;
      if (spot.lists[i].status == 'checked') {
        opts['icon'] = 'www/res/icons/green.png';
      }else {
        opts['icon'] = 'www/res/icons/red.png';
      }
      map.addMarker(opts, function(marker) {
        spotMarkers[marker.getTitle()] = marker;
        marker.addEventListener(
          plugin.google.maps.event.MARKER_CLICK, function() {
          $('#spot-name').text("");
          $('#spot-description').text("");
          $('#spot-howtogetthere').text("");
          $('#spot-check').checkboxradio('disable');
          $('#spot-check').checkboxradio('refresh');
          $('#spot-image').attr("src","res/default.png");
          marker.showInfoWindow();
           for (k in spot.lists) {
            if (marker.getTitle() == spot.lists[k].title) {
              $('#spot-name').text(spot.lists[k].name);
              $('#spot-description').text(spot.lists[k].description);
              $('#spot-howtogetthere').text(spot.lists[k].howtogetthere);

              $('#spot-check').checkboxradio('enable');
              if (spot.lists[k].status == 'checked') {
                $('#spot-check').prop("checked",true).checkboxradio('refresh');
              }else{
                $('#spot-check').prop("checked",false).checkboxradio('refresh');
              }
                $('#spot-image').attr("src",spot.lists[k].image);
            }
          }
                
        });
        marker.addEventListener(
          plugin.google.maps.event.INFO_CLICK, function() {
          for (k in spot.lists) {
            if (marker.getTitle() == spot.lists[k].title) {
              $('#spot-name').text(spot.lists[k].name);
              $('#spot-description').text(spot.lists[k].description);
              $('#spot-howtogetthere').text(spot.lists[k].howtogetthere);

              $('#spot-check').checkboxradio('enable');
              if (spot.lists[k].status == 'checked') {
                $('#spot-check').prop("checked",true).checkboxradio('refresh');
              }else{
                $('#spot-check').prop("checked",false).checkboxradio('refresh');
              }
                $('#spot-image').attr("src",spot.lists[k].image);
            }
          }
        });
      });
    }
    var contentheight = $(window).height() - $('#map-header').height() - $('#map-footer').height();
   divmap.style.height = contentheight / 2 + 'px';
   map.refreshLayout();
   
  }
   function onMapBtnClicked() {
    
    if ( largemap ) {
        var divmap = document.getElementById('map_canvas');
        var contentheight = $(window).height() - $('#map-header').height() - $('#map-footer').height();
        divmap.style.height = contentheight + 'px';
        map.refreshLayout();
        largemap = false;
        $("#map-button").text("小さな地図").button('refresh');
    }else{
        var divmap = document.getElementById('map_canvas');
        var contentheight = $(window).height() - $('#map-header').height() - $('#map-footer').height();
        divmap.style.height = contentheight / 2 + 'px';
        map.refreshLayout();
        largemap = true;
        $("#map-button").text("大きな地図").button('refresh');
    }
  }
  function onFlipDisabled() {
    $('#spot-check').checkboxradio('disable');
  }
  function onFlipChanged() {
    $('#spot-check').on('change', function(evt) {
      var val = $('#spot-check').prop("checked");
      var name = $('#spot-name').text();
      if (val == true) {
        for (i in spot.lists) {
          if (spot.lists[i].name == name) {
            spot.lists[i].status = 'checked';
            var marker = spotMarkers[spot.lists[i].title];
            if (marker != null) {
              console.log('green!');
              marker.remove();
              var motto_manabitai_basyo = new plugin.google.maps.LatLng(
                spot.lists[i].position.lat,
                spot.lists[i].position.lng);
              var opts = {};
              opts['position'] = motto_manabitai_basyo;
              opts['title'] = spot.lists[i].title;
              opts['snippet'] = spot.lists[i].name;
              if (spot.lists[i].status == 'checked') {
                opts['icon'] =
                  'www/res/icons/green.png';
              }else {
                opts['icon'] =
                  'www/res/icons/red.png';
              }
              map.addMarker(opts, function(marker) {
                spotMarkers[marker.getTitle()] = marker;
                marker.addEventListener(
                  plugin.google.maps.event.MARKER_CLICK, function() {
                  $('#spot-name').text("");
                  $('#spot-description').text("");
                  $('#spot-howtogetthere').text("");
                  $('#spot-check').checkboxradio('disable');
                  $('#spot-check').checkboxradio('refresh');
                  $('#spot-image').attr("src","res/default.png");
                  marker.showInfoWindow();
                  for (k in spot.lists) {
                    if (marker.getTitle() == spot.lists[k].title) {
                      $('#spot-name').text(spot.lists[k].name);
                      $('#spot-description').text(
                        spot.lists[k].description);
                      $('#spot-howtogetthere').text(
                        spot.lists[k].howtogetthere);
                      $('#spot-check').checkboxradio('enable');
                      if (spot.lists[k].status == 'checked') {
                        $('#spot-check').prop("checked",true).checkboxradio('refresh');
                      }else{
                        $('#spot-check').prop("checked",false).checkboxradio('refresh');
                      }
                      $('#spot-image').attr("src", spot.lists[k].image);
                    }
                  }
  
                });
                marker.addEventListener(
                  plugin.google.maps.event.INFO_CLICK, function() {
                  for (k in spot.lists) {
                    if (marker.getTitle() == spot.lists[k].title) {
                      $('#spot-name').text(spot.lists[k].name);
                      $('#spot-description').text(
                        spot.lists[k].description);
                      $('#spot-howtogetthere').text(
                        spot.lists[k].howtogetthere);
                      $('#spot-check').checkboxradio('enable');
                      if (spot.lists[k].status == 'checked') {
                        $('#spot-check').prop("checked",true).checkboxradio('refresh');
                      }else{
                        $('#spot-check').prop("checked",false).checkboxradio('refresh');
                      }
                      $('#spot-image').attr("src",spot.lists[k].image);
                    }
                  }
                });
              });
              console.log('greened!');
            }
          }
        }
      }else{
        for (i in spot.lists) {
          if (spot.lists[i].name == name) {
            spot.lists[i].status = 'unchecked';
            var marker = spotMarkers[spot.lists[i].title];
            if (marker != null) {
              console.log('red!');
              marker.remove();
              var motto_manabitai_basyo = new plugin.google.maps.LatLng(
                  spot.lists[i].position.lat,
                  spot.lists[i].position.lng);
              var opts = {};
              opts['position'] = motto_manabitai_basyo;
              opts['title'] = spot.lists[i].title;
              opts['snippet'] = spot.lists[i].name;
              if (spot.lists[i].status == 'checked') {
                opts['icon'] =
                  'www/res/icons/green.png';
              }else {
                opts['icon'] =
                  'www/res/icons/red.png';
              }
              map.addMarker(opts, function(marker) {
                spotMarkers[marker.getTitle()] = marker;
                marker.addEventListener(
                  plugin.google.maps.event.MARKER_CLICK, function() {
                  marker.showInfoWindow();
                });
                marker.addEventListener(
                  plugin.google.maps.event.INFO_CLICK, function() {
                  for (k in spot.lists) {
                    if (marker.getTitle() == spot.lists[k].title) {
                      $('#spot-name').text(spot.lists[k].name);
                      $('#spot-description').text(
                        spot.lists[k].description);
                      $('#spot-howtogetthere').text(
                        spot.lists[k].howtogetthere);
                      $('#spot-check').checkboxradio('enable');
                      if (spot.lists[k].status == 'checked') {
                        $('#spot-check').prop("checked",true).checkboxradio('refresh');
                      }else{
                        $('#spot-check').prop("checked",false).checkboxradio('refresh');
                      }
                      $('#spot-image').attr("src",spot.lists[k].image);
                    }
                  }
                });
              });
              console.log('reded!');
            }
          }
        }
      }
      setSpotData();
    });
  }


function Api() {
}
Api.prototype.go = function() {
  
 getSpotDefaultData();
 getSpotData()
 .then(createMap,createMap)
 .then(onFlipDisabled())
 .then(onFlipChanged());
};
var kana = {
  test: 'test!!!',
    create: function() {
          return new Api();
        }
  };

  return kana;

})();
