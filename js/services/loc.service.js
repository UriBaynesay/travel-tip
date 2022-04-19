export const locService = {
  createLoc,
  getLocs,
};

import { storageService } from "./storage.service.js";
import { utils } from "./utils.js";

const LOCATION_KEY = "locationDB";

const locs = storageService.load(LOCATION_KEY)
  ? storageService.load(LOCATION_KEY)
  : [
      { name: "Greatplace", lat: 32.047104, lng: 34.832384 },
      { name: "Neveragain", lat: 32.047201, lng: 34.832581 },
    ];

// createLoc("home", 32.047104, 34.832384, "")

function createLoc(name, lat, lng) {
    const loc={
        id: utils.makeId(),
        name,
        lat,
        lng,
        // weather,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      locs.push(loc);
      storageService.save(LOCATION_KEY,locs)
  return Promise.resolve(loc);
}

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs);
    }, 2000);
  });
}

function deleteLoc(locId){
  locs.splice(locs.findIdx(loc=>loc.id=locId),1);
  storageService.save(LOCATION_KEY,locs);
}