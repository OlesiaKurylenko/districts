// This example creates circles on the map, representing populations in North
// America.

// First, create an object containing LatLng and population for each city.
let map = null;

let bermudaTriangle = null;
// var citymap = data;
let triangleCoords = [{ lng: -147.813844, lat: 64.83443999927472 }];
let CircleCoords = null;
function initMap(arr) {
    // Create the map.
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: triangleCoords[0],
        mapTypeId: 'terrain'
    });
    bermudaTriangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#FF1ss00",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "FFF",
        fillOpacity: 0.35
    });
    bermudaTriangle.setMap(map);
    console.log(bermudaTriangle)
    for (let city in CircleCoords) {
        let cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            center: data[city].center,
            radius: (data[city].population) * 1000
        });
        cityCircle.setMap(map);
    }
    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.


}

fetch('http://localhost:5500/static/test.json')
    .then(d => d.json())
    .then(r => {
        data = r;
        CircleCoords = data;
        initMap();
    })
    .catch(e => console.error('Boo...' + e));


fetch('http://localhost:5500/static/poligon.json')
    .then(d => d.json())
    .then(data => {
        triangleCoords = data.data;

        initMap();
    })
    .catch(e => console.error('Boo...' + e));