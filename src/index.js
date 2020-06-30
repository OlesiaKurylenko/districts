const GeoHelper = require('./geo.helper');
const FileHelper = require('./file.helper');
const GeoJsonData = require('./geo.json.data');

const testFolder = './states';
const savedFolder = './static';
const radius = 1;

let res = FileHelper.getFiles(testFolder);

let r = FileHelper.readFile(res[0]);

let result = GeoHelper.parseGeoJson(r);
let data = GeoHelper.preparationData(result);

let filename = savedFolder + res[0].replace('/', '_').replace('geojson', 'csv')
let geoJsonData = new GeoJsonData(filename, data, radius);

let sides = geoJsonData.getSides();

let dist1 = GeoHelper.calculateTheDistance(sides.side1.A[0], sides.side1.A[1], sides.side1.B[0], sides.side1.B[1]);
let dist2 = GeoHelper.calculateTheDistance(sides.side2.A[0], sides.side2.A[1], sides.side2.B[0], sides.side2.B[1]);

geoJsonData.setDistSide(dist1, dist2);
let resss = geoJsonData.generatedArrayPoints();

let re2 = resss.map(el => {
    el.isContainsLocation = (GeoHelper.containsLocation(
        el.coordinate[1],
        el.coordinate[0],
        geoJsonData.coordinates.preperedMas.longitude,
        geoJsonData.coordinates.preperedMas.latitude
    ));
    return el;
})
console.log(re2)
/*let mass = readFile(testFolder);

console.log(mass);
let k = GeoHelper.parseGeoJson(mass[0]);
console.log(k[0])
// console.log(GeoHelper.calculateTheDistance(k[0][0][0], k[0][0][1], k[0][5][0], k[0][5][1]));
let coor = { x: 64.84037, y: -147.71807 }//yes
let coor2 = { x: 64.82003, y: -147.79943 }//no
let res = GeoHelper.getMinMax(k[0]);
console.log(res);

let result = GeoHelper.checkcheck(coor2.y, coor2.x, res.arr.x, res.arr.y);

console.log('result $$$$ ', result);


function readFile(path) {
    return fs.readdirSync(path, { withFileTypes: true }).reduce((acc, el) => {
        if (el.isDirectory()) {
            acc.push(readFile(path + el.name + "/"));
        }
        if (el.name.includes('geojson'))
            acc.push(path + el.name);
        return acc;
    }, [])
}

var fs = require('fs');
var path = require('path');
*/

