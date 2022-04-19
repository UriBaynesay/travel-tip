
import {locService} from './loc.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);

        // click on map display user cord
        gMap.addListener("click", (mapsMouseEvent) => {
            const {lat,lng} = mapsMouseEvent.latLng.toJSON()
            const place = prompt('enter place name')
            addMarker({lat,lng},place)
           locService.createLoc(place, lat, lng)
            console.log(lat,lng,place)
        });
        })
}

function addMarker(loc,title='Your Location') {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    // added my KEY
    const API_KEY = 'AIzaSyC7-PFigwWJ4vca_uLhDjlUOtXhUGwD4zo'; 
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}