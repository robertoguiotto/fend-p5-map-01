// ViewModel section

// Defining JSON list of locations (could have been placed also in a 'Model')
var myMap = {
 locations : ko.observableArray([ //opening observableArray
  {name: "Basilica dei Frari",
  city: "Venice",
  street: "San Polo, 3072",
  lat: 45.4369864,
  lng: 12.3266004,
      display: ko.observable(1), //set ko.observable to being visibile
    },
    {name: "Ponte di Rialto",
    city: "Venice",
    street: "San Marco, 5335",
    lat: 45.4379842,
    lng: 12.335898,
      display: ko.observable(1), //set ko.observable to being visibile
    },
    {name: "Train Station",
    city: "Venice",
    street: "Santa Lucia, 1",
    lat: 45.4410697,
    lng: 12.3210436,
      display: ko.observable(1), //set ko.observable to being visibile
    },
    {name: "Arsenale",
    city: "Venice",
    street: "Castello, 1104",
    lat: 45.4348502,
    lng: 12.3499009,
      display: ko.observable(1), //set ko.observable to being visibile
    },
  ] //closing observableArray
  )
}; // closing myMap


// View Section

// Calling Google Maps API

function initializeMap() { // opening initializeMap function
  var myCoordinates = new google.maps.LatLng(45.4374847,12.3307717);
  var mapOptions = {
   zoom: 15,
   center: myCoordinates
 };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions); // Iterating with getElementById method and calls Google Map API for various locations
    
    setMarkers(map, myMap.locations()); // Adding markers to the map based on locations
} //closing initializeMap function


// Setting up custom windows based on Google Maps' InfoWindow method
var infoWindow = new google.maps.InfoWindow();
function setMarkers(map, locations){ // opening SetMarkers function

  locations.forEach(function(location, order){  // opening forEach( iterating the JSON with locations) 

    if (location.display()){ // opening if statement (choosing the displayed location and showing details)
      var myWindow =
      '<h3>' + location.name + '</h3>'
      + '<h4>' + location.street + ' - ' + location.city + '</h4>';
      
      // define the variable required later for markers position
      var myLatLng = new google.maps.LatLng(location.lat, location.lng); 

      
// defining the SVG icon for markers
      var goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'red',
        fillOpacity: 0.8,
        scale: 0.1,
        strokeColor: 'gold',
        strokeWeight: 1
      };

      //creating the markers and adding DROP animation
      var marker = new google.maps.Marker({ //  opening marker class 
        animation: google.maps.Animation.DROP,
        icon: goldStar,
        map: map,
        position: myLatLng,
        title: location.name,
      }); // closing marker class 


  //  adding listener for infoWindow
  google.maps.event.addListener(marker, 'click', (function(marker) { // opening anon function w/marker parameter that returns another function 
    return function(){ // opening infoWindow function 
      infoWindow.setContent(myWindow);
      infoWindow.open(map, this);
    }; // closing infoWindow function 
  })(marker)); // closing anon function w/marker parameter


    } // closing if statement
  }); // closing forEach 
} // closing setMarkers function

// adding location selection

$("#selection").change(function(){
  var val = $("#selection").val();
  myMap.locations().forEach(function(location, order){
    if (location.select==val){
      location.display(true);
    }
    else{
      location.display(false);
    }
  });
  initializeMap();
});




//  adding listener for triggering the map on load (via initializeMap function)
google.maps.event.addDomListener(window, 'load', initializeMap);

// applying bindings on knockout.js
ko.applyBindings(myMap);
