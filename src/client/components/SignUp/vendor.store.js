import { observable, computed, action, reaction, when } from 'mobx';
import validate from 'validate.js';
import constrains from './vendor.constrains';
import { constants } from '../../common/constants';
import R from 'ramda';

const validatePhone = function (value, options, key, attributes) {
    if (!value)
        return null;

    const patt = options === 'US' ? /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/g : /^[0-9]*$/g;
    const valid = patt.test(value);
    if (!valid)
        return 'Not a valid phone number';

    return null;
};

const validateCountry = function (value, options, key, attributes) {    
    if ((value.shortName === 'n/s') || (!value.shortName))
        return '- Please select';

    return null;
};

class VendorStore {
    constructor(httpHandler) {
        this.httpHandler = httpHandler;
    }
    location = {
        lat: null,
        lon: null
    }

    @action setPosition(lat, lon) {
        this.location.lat = lat;
        this.location.lon = lon;
    }
    @observable vendorInfo = {
        publicName: null,
        country: {},
        email: null,
        phone: null,
        vendorLogo: []
    }



    @action setVendorInfo(vendorInfo) {
        this.vendorInfo = {
            ...this.vendorInfo,
            ...vendorInfo
        };
    }

    @action setVendorLogo(files){ 
        this.vendorInfo.vendorLogo.replace(files);
    }

    @observable
    validationErrors = [];    

    @computed
    get hasErrorsStyle(){        
        if (this.validationErrors.length === 0)
            return {width:'0'};
        
        return {width:'100%'};
    }

    @computed
    get hasErrors() {
        validate.validators.verifyPhone = validatePhone;
        validate.validators.verifyCountry = validateCountry;
        const _hasErrors = validate(this.vendorInfo, constrains);
        return _hasErrors;
    }

    validateVendorInfo(){
        validate.validators.verifyPhone = validatePhone;
        validate.validators.verifyCountry = validateCountry;
        const errs = validate(this.vendorInfo, constrains); 
        const _errs = !errs ? [] : errs;
        const errorDescription = 0;
        const errors = R.props(Object.keys(_errs))(_errs).map(_errs => _errs[errorDescription]);

        this.validationErrors.replace(errors);
        return this.validationErrors.peek();        
    }    

    resetValidationErrors(){
        this.validationErrors.replace([]);
    }   

    submitInfo(){
        const file = this.vendorInfo.vendorLogo[0];
        delete this.vendorInfo.vendorLogo;
        return this.httpHandler.post(constants.saveVendor)
                               .field('vendorInfo', JSON.stringify(this.vendorInfo))
						       .attach('vendorLogo',file);
                         
    }
}



export default VendorStore;