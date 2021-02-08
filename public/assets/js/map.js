var styleArray = [{
  "featureType": "administrative",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#001b83"
  }]
},
{
  "featureType": "landscape",
  "elementType": "all",
  "stylers": [{
    "color": "#f0f8ff"
  }]
},
{
  "featureType": "poi",
  "elementType": "all",
  "stylers": [{
    "visibility": "off"
  }]
},
{
  "featureType": "road",
  "elementType": "all",
  "stylers": [{
      "saturation": -100
    },
    {
      "lightness": 45
    }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "all",
  "stylers": [{
    "visibility": "simplified"
  }]
},
{
  "featureType": "road.arterial",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
},
{
  "featureType": "transit",
  "elementType": "all",
  "stylers": [{
    "visibility": "off"
  }]
},
{
  "featureType": "water",
  "elementType": "all",
  "stylers": [{
      "color": "#4c5fa8"
    },
    {
      "visibility": "on"
    }
  ]
}
]

var mapOptions = {
center: new google.maps.LatLng(23.874936, 90.385821),
zoom: 5,
styles: styleArray,
scrollwheel: false,
backgroundColor: '#001b83',
mapTypeControl: false,
mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementsByClassName("maps")[0],
mapOptions);
var myLatlng = new google.maps.LatLng(23.874936, 90.385821);
var focusplace = {lat: 55.864237, lng: -4.251806};
var marker = new google.maps.Marker({
position: myLatlng,
map: map,
icon: {
  url: "assets/images/map-marker.png"
}
})