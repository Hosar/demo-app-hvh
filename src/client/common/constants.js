
const Constants = function (){    
    this.wsUrl = 'http://localhost:3000/';    
    this.saveVendor = `${this.wsUrl}vendors/signup`;    
    this.googleMapsKey = 'AIzaSyCkr-Qz6Rc_S8uTFXo8JDsuPKGnspXv7Yo';
    this.mapsUrl = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsKey}&libraries=geometry`;
};

const constants = new Constants();
module.exports.constants = constants;