/**
 * 初期化
 */
var opts = {
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(39, 138),
    styles: [{
      stylers: [
        {gamma: 0},
        {lightness: 0},
        {saturation: -60},
        {inverse_lightness: false}
      ]
    }]
  };
map = new google.maps.Map(document.getElementById("map"), opts);


var url = new URL(window.location);
var title = url.searchParams.get('title') ? url.searchParams.get('title') + ' | RoutesLab ルーツラボ' : 'RoutesLab ルーツラボ';
document.title = title;
var id_list = url.searchParams.get('id') ? url.searchParams.get('id').split(',') : [];
var layers = new Map();


id_list.forEach(function(id){
    var xmlurl = 'https://latlonglab.yahoo.co.jp/route/get?&format=kml&rd=2000&id=' + id;
    var routeLayer = new google.maps.KmlLayer({
        url: xmlurl
      });
    routeLayer.setMap(map);
    layers.set(id, routeLayer);

    google.maps.event.addListener(routeLayer, 'click', function(kmlEvent) {
        var pageurl ='https://latlonglab.yahoo.co.jp/route/watch?id=' + id;
         window.open(pageurl, 'newtab');
    });
});
google.maps.event.addListenerOnce(map, 'idle', function(){
    map.fitBounds(map.getBounds());
});



