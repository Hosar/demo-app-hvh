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
        country: {}
    }



    @action setVendorInfo(vendorInfo) {
        this.vendorInfo = {
            ...this.vendorInfo,
            ...vendorInfo
        };        
    }

    @action setVendorLogo(files){        
        this.vendorLogo.replace(files);
    }

    @observable
    validationErrors = [];

    @observable
    vendorLogo = [];

    @computed
    get hasErrorsStyle(){        
        if (this.validationErrors.length === 0)
            return {width:'0'};
        
        return {width:'100%'};
    }

    @computed
    get hasErrors() {
        validate.validators.verifyPhone = validatePhone;
        const _hasErrors = validate(this.vendorInfo, constrains);
        return _hasErrors;
    }

    validateVendorInfo(){
        validate.validators.verifyPhone = validatePhone;        
        const errs = validate(this.vendorInfo, constrains);
        if (!errs && this.hasVendorLogo()){
            this.resetValidationErrors();
            return;
        }
        const _errs = !errs ? [] : errs;
        const errorDescription = 0;
        const errors = R.props(Object.keys(_errs))(_errs).map(_errs => _errs[errorDescription]);
        if (this.vendorLogo.length <= 0)
             errors.push('Please add a logo image');

        this.validationErrors.replace(errors);
        return this.validationErrors.peek();        
    }

    hasVendorLogo(){
        return this.vendorLogo.length > 0 ? true : false;
    }

    resetValidationErrors(){
        this.validationErrors.replace([]);
    }   

    submitInfo(){
        const file = this.vendorLogo[0];
        return this.httpHandler.post(constants.saveVendor)
                               .field('vendorInfo', JSON.stringify(this.vendorInfo))
						       .attach('vendorLogo',file);
                         
    }
}



export default VendorStore;