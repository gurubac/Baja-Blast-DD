//google maps stuff

/* Note: This example requires that you consent to location sharing when
 * prompted by your browser. If you see the error "Geolocation permission
 * denied.", it means you probably did not give permission for the browser * to locate you. */
let pos;
let map;
let bounds;
let infoWindow;
let currentInfoWindow;
let service;
let infoPane;
function initMap() {
  // Initialize variables
  bounds = new google.maps.LatLngBounds();
  infoWindow = new google.maps.InfoWindow();
  currentInfoWindow = infoWindow;
  /* TODO: Step 4A3: Add a generic sidebar */
  infoPane = document.getElementById("panel");

  // Try HTML5 geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map = new google.maps.Map(document.getElementById("map"), {
          center: pos,
          zoom: 15,
        });
        bounds.extend(pos);

        infoWindow.setPosition(pos);
        infoWindow.setContent(
          "Click on the pins to view nearby Taco Bell locations."
        );
        infoWindow.open(map);
        map.setCenter(pos);

        // Call Places Nearby Search on user's location
        getNearbyPlaces(pos);
      },
      () => {
        // Browser supports geolocation, but user has denied permission
        handleLocationError(true, infoWindow);
      }
    );
  } else {
    // Browser doesn't support geolocation
    handleLocationError(false, infoWindow);
  }
}

// Handle a geolocation error
function handleLocationError(browserHasGeolocation, infoWindow) {
  // Set default location to Sydney, Australia
  pos = { lat: -33.856, lng: 151.215 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: pos,
    zoom: 15,
  });

  // Display an InfoWindow at the map center
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Geolocation permissions denied. Using default location."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
  currentInfoWindow = infoWindow;

  // Call Places Nearby Search on the default location
  getNearbyPlaces(pos);
}

// Perform a Places Nearby Search Request
function getNearbyPlaces(position) {
  let request = {
    location: position,
    rankBy: google.maps.places.RankBy.DISTANCE,
    keyword: "Taco Bell",
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, nearbyCallback);
}

// Handle the results (up to 20) of the Nearby Search
function nearbyCallback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarkers(results);
  }
}

// Set markers at the location of each place result
function createMarkers(places) {
  places.forEach((place) => {
    let marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name,
    });

    /* TODO: Step 4B: Add click listeners to the markers */
    // Add click listener to each marker
    google.maps.event.addListener(marker, "click", () => {
      let request = {
        placeId: place.place_id,
        fields: [
          "name",
          "formatted_address",
          "geometry",
          "rating",
          "website",
          "photos",
        ],
      };

      /* Only fetch the details of a place when the user clicks on a marker.
       * If we fetch the details for all place results as soon as we get
       * the search response, we will hit API rate limits. */
      service.getDetails(request, (placeResult, status) => {
        showDetails(placeResult, marker, status);
      });
    });

    // Adjust the map bounds to include the location of this marker
    bounds.extend(place.geometry.location);
  });
  /* Once all the markers have been placed, adjust the bounds of the map to
   * show all the markers within the visible area. */
  map.fitBounds(bounds);
}

/* TODO: Step 4C: Show place details in an info window */
// Builds an InfoWindow to display details above the marker
function showDetails(placeResult, marker, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    let placeInfowindow = new google.maps.InfoWindow();
    let rating = "None";
    if (placeResult.rating) rating = placeResult.rating;
    let placeResultStringArray = placeResult.formatted_address.split(",");
    let lurl = `https://bajablast.live/${placeResultStringArray[0]}`;
    placeInfowindow.setContent(
      "<div><strong>" +
        placeResult.name +
        "</strong><br>" + 
        placeResultStringArray[0]+","+placeResultStringArray[1]+","+placeResultStringArray[2]+
        "<br>" +
        "Rating: " +
        rating +
        "</div>"
    );
    placeInfowindow.open(marker.map, marker);
    currentInfoWindow.close();
    currentInfoWindow = placeInfowindow;
    // showPanel(placeResult);
  } else {
    console.log("showDetails failed: " + status);
  }
}

/* TODO: Step 4D: Load place details in a sidebar */
// Displays place details in a sidebar
function showPanel(placeResult) {
  // If infoPane is already open, close it
  if (infoPane.classList.contains("open")) {
    infoPane.classList.remove("open");
  }

  // Clear the previous details
  while (infoPane.lastChild) {
    infoPane.removeChild(infoPane.lastChild);
  }

  /* TODO: Step 4E: Display a Place Photo with the Place Details */
  // Add the primary photo, if there is one
  if (placeResult.photos) {
    let firstPhoto = placeResult.photos[0];
    let photo = document.createElement("img");
    photo.classList.add("hero");
    photo.src = firstPhoto.getUrl();
    infoPane.appendChild(photo);
  }

  // Add place details with text formatting
  let name = document.createElement("h1");
  name.classList.add("place");
  name.textContent = placeResult.name;
  infoPane.appendChild(name);
  if (placeResult.rating) {
    let rating = document.createElement("p");
    rating.classList.add("details");
    rating.textContent = `Rating: ${placeResult.rating} \u272e`;
    infoPane.appendChild(rating);
  }
  let address = document.createElement("p");
  address.classList.add("details");
  address.textContent = placeResult.formatted_address;
  infoPane.appendChild(address);
  if (placeResult.website) {
    let websitePara = document.createElement("p");
    let websiteLink = document.createElement("a");
    let websiteUrl = document.createTextNode(placeResult.website);
    websiteLink.appendChild(websiteUrl);
    websiteLink.title = placeResult.website;
    websiteLink.href = placeResult.website;
    websitePara.appendChild(websiteLink);
    infoPane.appendChild(websitePara);
  }

  // Open the infoPane
  infoPane.classList.add("open");
}
