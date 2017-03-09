// @flow
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { inject, observer } from 'mobx-react';
import VendorLocation from './VendorLocation';
import { getCurrentPosition } from '../../common/utils';
import ValidationErrors from './ValidationErrors';
import VendorInfo from './VendorInfo';
import DropImage from './DropImage';
import 'react-select/dist/react-select.css';
import './SignUpForm.scss';

type Props = {
    vendorStore: Object
}

type State = {
  lat: number,
  lon: number,
  inputName?: string
};

@inject('vendorStore')
@observer
class SignUpForm extends Component {
    props: Props;
    state: State;  
    submit: () => void;
    onDrop: (files: any) => void;
    closeOverlay: () => void;

    constructor(props: Props) {
        super(props);
        this.state = { lat: 0, lon: 0};
        this.submit = this.submit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
    }    

    onDrop(files: any) {  
        console.log('Files ....');
        console.log(files);

        this.props.vendorStore.setVendorLogo(files);

    }

    componentDidMount() {
        getCurrentPosition().then(position => {            
            this.setState({ lat: position.latitude, lon: position.longitude });
        }, err => {
            console.error('Not able to get the user position');
        });
    }   


    submit() {
        console.log('Inside submit');
        const hasErrors = this.props.vendorStore.validateVendorInfo();
        if (hasErrors)
            return;

        // this.props.vendorStore.submitInfo().then(success => {
        //     //TODO: show success message
        // },err => {
        //     //TODO: show error message
        // });
    }

    closeOverlay(){        
        this.props.vendorStore.resetValidationErrors();
    }


    render() {         
        const store = this.props.vendorStore;       
        const errors = store.validationErrors.peek();        
        const errStyle = store.hasErrorsStyle;  
        
        return (
            <div className="container">
                <div className="bs-docs-section">
                    <ValidationErrors errors={errors} 
                                      hasErrorsStyle={errStyle}
                                      closeOverlay={this.closeOverlay}/>

                    <div className="row">
                        <VendorInfo />
                        {
                            this.state.lat === 0 ? 
                                null : <VendorLocation lat={this.state.lat} lon={this.state.lon} />
                        }
                    </div>    
                    <div className="row">
                        <DropImage onDrop={this.onDrop} vendorLogo={store.vendorLogo} />
                        
                        <div className="col-lg-4 col-md-4">
                            <div className="form-group">
                                <label className="control-label">Send Info:</label>
                                <div>
                                    <button className="btn btn-block btn-info" onClick={this.submit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default SignUpForm;