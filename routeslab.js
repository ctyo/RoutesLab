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

if (id_list.length <= 0) {
  if (title === 'RoutesLab ルーツラボ') {
    if(ret = window.prompt('タイトルを入力してください', '')){
      title = ret;
    }
  }

  ret = window.prompt('表示したいルートラボのIDをカンマ区切りで入力してください。\n画面に遷移します。', '')
  if (ret) {
    window.location.href = '?title='+title+'&id='+ret;
  } else {
    alert ('サンプルの地図を表示します...');
    window.location.href = '?title=湖一周×4&id=f613116caa1ddc2899da15fa933b0aac,3700de6613eaf7637e9bebdd50dc82f7,6f262dd88888240f30706b8c809bfc65';
  }

}


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



