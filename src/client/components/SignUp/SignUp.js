import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import VendorStore from './vendor.store';
import SignUpForm from './SignUpForm';
import superagent from 'superagent';
import './SignUp.scss';

const vendorStore = new VendorStore(superagent);

class SignUp extends Component {
  constructor(props) {
    super(props);    
  }

  
  render() {
    return (
      <Provider vendorStore={vendorStore}>
        <SignUpForm />
      </Provider>
    );
  }
}



export default SignUp;


