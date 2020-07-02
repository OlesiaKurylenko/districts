const GeoHelper = require('./geo.helper');
const FileHelper = require('./file.helper');
const GeoJsonData = require('./geo.json.data');
const fs = require('fs');

const testFolder = './states';
const savedFolder = './static/';
const radius = 0.5;

function start() {
    let fileHelper = new FileHelper();

    let files = fileHelper.getFiles(testFolder);
    //processFile(files[0]);
    /*for (let i = 0; i < 1; i++) {
        processFile(files[i]);
    }*/
    processFile(files[0]);
    console.log('FINISH');
}



function processFile(file) {
    let r = new FileHelper().readFile(file);
    let result = GeoHelper.parseGeoJson(r);
    let data = GeoHelper.preparationData(result);
    let poligon = result.reduce((acc, el, index) => {
        acc.push({ lng: el[0], lat: el[1] });
        return acc;
    }, []);
    new FileHelper().writeFile2('./static/poligon.json', JSON.stringify({ data: poligon }));

    let filename = file.replace('./', '').split("/").join("_").replace('.geojson', '')
    let geoJsonData = new GeoJsonData(filename, data, radius);

    let sides = geoJsonData.getSides();

    let dist1 = GeoHelper.calculateTheDistance(sides.side1.B[1], sides.side1.B[0], sides.side1.A[1], sides.side1.A[0]);
    let dist2 = GeoHelper.calculateTheDistance(sides.side2.A[1], sides.side2.A[0], sides.side2.C[1], sides.side2.C[0]);


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
    });
    let prep = re2.filter(data => data.isContainsLocation === 1)
        .map(el => `${geoJsonData.fileName};${el.coordinate};${radius};`);

    let prep2 = re2.filter(data => data.isContainsLocation === 1)
        .reduce((acc, el, index) => {
            acc[`point${index}`] = {
                center: {
                    lng: el.coordinate[1],
                    lat: el.coordinate[0]
                },
                population: radius
            }
            return acc;
        }, {}
        );
    console.log('###', dist1, dist2)
    let res2 = new FileHelper().writeFile2('./static/test.json', JSON.stringify(prep2));

    let path = savedFolder + geoJsonData.fileName + '.csv';

    let res = new FileHelper().writeFile2(path, prep.join('\n'));
    return res;
}
//new FileHelper().writeFile2('path.txt', ['kkk', 'rr']);
start();


/*let mass = readFile(testFolder);
console.log(re2)
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

