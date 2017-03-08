
const constraints = {
    publicName: {
        presence: true,
        length: {
            minimum: 4,
        }
    },
    phone: {
        verifyPhone:'US'
    },
    email:{
        presence: true, 
        email: true
    },
    country:{
        verifyCountry:'n/s'
    },
    vendorLogo:{
        length: {
            is: 1,
            wrongLength:'missing'
        }
    }
};

export default constraints;