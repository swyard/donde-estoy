// document.addEventListener('DOMContentLoaded', main)

// BUTTON HANDLERS
document.getElementById("approx-coords")?.addEventListener("click", fetchApproxCoords);
document.getElementById("precise-coords")?.addEventListener("click", fetchPreciseCoords);
document.getElementById("watch-position")?.addEventListener("click", watchPosition);
document.getElementById("clear-watch")?.addEventListener("click", clearWatch);

// APPROX
function fetchApproxCoords() {
    navigator.geolocation.getCurrentPosition(approxCoordsSuccessCallback, errorCallback);
}

function approxCoordsSuccessCallback(position: GeolocationPosition) {
    console.log("approx position: ", position.coords);
}

// PRECISE
const preciseOptions: PositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 60000, // 1m
    timeout: 10000 // 10s
}

// only works if wifi triangulation / location services enabled
function fetchPreciseCoords() {
    navigator.geolocation.getCurrentPosition(preciseCoordsSuccessCallback, errorCallback, preciseOptions);
}

function preciseCoordsSuccessCallback(position: GeolocationPosition) {
    console.log("precise position: ", position.coords);
}

// WATCH
const watchOptions: PositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 5000, // 5s
    timeout: 10000 // 10s
}

let watchId: number | undefined;
function watchPosition(): number {
    if (watchId !== undefined) {
        console.log("already watching, id: ", watchId);
        return watchId;
    }

    // still returns id even if error, doesn't watch in reality
    watchId = navigator.geolocation.watchPosition(watchPositionSuccessCallback, errorCallback, watchOptions);
    console.log("watching position, id: ", watchId);
    return watchId;
}

function watchPositionSuccessCallback(position: GeolocationPosition) {
    console.log("watch position: ", position.coords);
}

function clearWatch() {
    if (watchId === undefined) {
        console.log("not watching");
    } else {
        navigator.geolocation.clearWatch(watchId);
        console.log("clear watch, id: ", watchId);
        watchId = undefined;
    }
}

// ERROR
function errorCallback(positionError: GeolocationPositionError) {
    console.log("position error: ", positionError);
}

// todo: 
// determine perm state: location services enabled or not
// check accuracy for which type of location used: <100m location services, 100-500m-5000m Wifi or IP fallback
// watch position: if accuracy increase then real location else ip