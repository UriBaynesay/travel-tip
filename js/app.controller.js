import { locService } from "./services/loc.service.js";
import { mapService } from "./services/map.service.js";

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onGoLoc = onGoLoc;
window.onDeleteLoc = onDeleteLoc;
window.onMyLocation = onMyLocation;
window.renderLocations = renderLocations;
window.onSearchLoc = onSearchLoc;

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log("Map is ready");
    })
    .catch(() => console.log("Error: cannot init map"));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log("Getting Pos");
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function onAddMarker() {
  console.log("Adding a marker");
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    console.log("Locations:", locs);
    document.querySelector(".locs").innerText = JSON.stringify(locs);
  });
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log("User position is:", pos.coords);
      document.querySelector(
        ".user-pos"
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
    })
    .catch((err) => {
      console.log("err!!!", err);
    });
}
function onPanTo() {
  console.log("Panning the Map");
  mapService.panTo(35.6895, 139.6917);
}

function renderLocations() {
  const list = document.querySelector(".places-list");
  list.innerHTML = `    
    <li class="place">
       Location
    <div class="place-btns">
    <button onclick="onGoLoc(lat,lng)">Go</button>
    <button onclick="onDeleteLoc(locId)">Delete</button>
    </div>
    </li>`;
}

function onGoLoc(lat, lng) {
  mapService.panTo(lat, lng);
  mapService.addMarker({ lat, lng });
}

function onDeleteLoc(locId) {
  locService.deleteLoc(locId);
}

function onMyLocation() {
  getPosition()
    .then((res) => onGoLoc(res.coords.latitude, res.coords.longitude))
    // .then(console.log)
    .catch(console.log);
}

function onSearchLoc(ev) {
  ev.preventDefault();
  const elInput = document.querySelector("input");
  mapService
    .getLocCoords(elInput.value)
    .then((res) => {
      onGoLoc(res.results[0].geometry.location.lat(),res.results[0].geometry.location.lng());
    })
    .catch(console.log)
}
