
var value = 2.4;
var sensor_name = 'humidity';
var x_acc,y_acc,z_acc,x_mag,y_mag,z_mag,x_gyr,y_gyr,z_gyr,sensor;
var door,temp,light,humidity;
function DemoRecord(value, sensor_name){
    this.value = value;
    this.sensor_name = sensor_name;

}

function DemoRecordGroup1(x_acc,y_acc,z_acc,x_mag,y_mag,z_mag,x_gyr,y_gyr,z_gyr){
    this.x_acc = x_acc;
    this.y_acc = y_acc;
    this.z_acc = z_acc;
    this.x_gyr = x_gyr;
    this.y_gyr = y_gyr;
    this.z_gyr = z_gyr;
    this.x_mag = x_mag;
    this.y_mag = y_mag;
    this.z_mag = z_mag;
}

function DemoRecordGroup9(door,temp,light,humidity){
    this.door = door;
    this.temp = temp;
    this.light = light;
    this.humidity = humidity;
}
exports.DemoRecord = DemoRecord;
exports.DemoRecordGroup1 = DemoRecordGroup1;
exports.DemoRecordGroup9 = DemoRecordGroup9;