
class GeoJsonData {

    constructor(fileName, coordinates, radius) {
        this.fileName = fileName;
        this.side1 = 0;
        this.side2 = 0;

        this.coordinates = coordinates;
        this.data = [];
        this.radius = radius || 2;
        this.stepLongitude = 0;
        this.stepLatitude = 0;
    }
    setDistSide(side1, side2) {
        this.side1 = side1;
        this.side2 = side2;
        let sides = this.getSides();
        let step1 = sides.side1.B[0] - sides.side1.A[0];
        let step2 = sides.side2.B[1] - sides.side2.A[1];

        this.stepLongitude = (step1 / side1) * this.radius;
        this.stepLatitude = (step2 / side2) * this.radius;
        console.log(this.stepLongitude, this.stepLatitude)
    }
    getSides() {
        return {
            side1: {
                A: [this.coordinates.longitude.min.value, this.coordinates.latitude.min.value],
                B: [this.coordinates.longitude.max.value, this.coordinates.latitude.min.value]
            },
            side2: {
                A: [this.coordinates.longitude.min.value, this.coordinates.latitude.min.value],
                B: [this.coordinates.longitude.min.value, this.coordinates.latitude.max.value]
            }
        }
    }

    generatedArrayPoints() {
        let k = 0;
        for (let i = this.coordinates.longitude.min.value + this.stepLatitude; i < this.coordinates.longitude.max.value; i += this.stepLatitude * 2) {
            for (let j = this.coordinates.latitude.min.value + this.stepLongitude; j < this.coordinates.latitude.max.value; j += this.stepLongitude * 2) {
                this.data.push({
                    coordinate: [j, i],
                    isContainsLocation: false
                });
                k++;
                if (k > 160) return;
            }
        }
        return this.data;
    }
    updateData(data) {
        this.data = data;
    }
}
module.exports = GeoJsonData;