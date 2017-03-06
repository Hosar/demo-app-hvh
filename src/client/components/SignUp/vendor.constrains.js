
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
    'country.shortName':{
        presence: {
            message:'Please select a country'
        }
    }
};

export default constraints;