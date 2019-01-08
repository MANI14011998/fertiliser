function initMap() {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: { lat: 47.6229, lng: -122.3165 },
    zoom: 12
  });

  var geocoder = new google.maps.Geocoder();

  $(document).on('click', '#submit', () => {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var clinicAddresses = [];
  var address = document.getElementById('address').value;

  geocoder.geocode({ 'address': address }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {

      var latlong = {
        lat: results[0].geometry.viewport.H.H,
        long: results[0].geometry.viewport.j.H
      };

      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });

      (function(){
        $.ajax({
          url: 'https://locator.aids.gov/data?lat=' + latlong.lat + '&long=' + latlong.long + '&service=clinics',
          type: 'GET',
          dataType: 'jsonp',
          success: function(data){
            findServices(data);
          }
        });

        function findServices(data){
          var myData = data;

          for(var i = 0; i < 5; i ++){
            var newName = (myData.services[2].providers[i].title);
            var newStreet = (myData.services[2].providers[i].streetAddress);
            var newCity = (myData.services[2].providers[i].locality);
            var newState = (myData.services[2].providers[i].region);
            var newZip = (myData.services[2].providers[i].postalCode).substring(0,5);
            var thisAddress = newStreet + ', ' + newCity + ' ' + newState + ', ';
            clinicAddresses[i] = { 'name' : newName };
            clinicAddresses[i].lat = (myData.services[2].providers[i].point.lat);
            clinicAddresses[i].long = (myData.services[2].providers[i].point.long);
            clinicAddresses[i].LatLng = { lat: parseFloat(clinicAddresses[i].lat), lng: parseFloat(clinicAddresses[i].long) };
            $('.clinic-results').append('<p>' + newName + '<br>' + thisAddress + '<span id = "address' + i + '">' + newZip + '</span></p>');
          }

          for(var i = 0; i < 5; i++) {
            console.log(clinicAddresses[i]);
            var marker = new google.maps.Marker({
              title: clinicAddresses[i].name,
              map: resultsMap,
              position: clinicAddresses[i].LatLng
            });
          }
        }
      })();

    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}
