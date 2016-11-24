
var value = 2.4;
var sensor_name = 'humidity';

function DemoRecord(value, sensor_name){
    this.value = value;
    this.sensor_name = sensor_name;

}

module.exports = DemoRecord;