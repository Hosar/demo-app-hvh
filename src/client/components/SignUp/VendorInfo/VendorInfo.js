// @flow
import React, { Component } from 'react';
import {inject} from 'mobx-react';
import Select from 'react-select';

type Props = {
    vendorStore: any | Object,
    countries: Array<Object>
};

type State = {
        selectedCtry: Object;
};

type DefaultProps = { 
    countries: Array<Object> 
};

@inject('vendorStore')
class VendorInfo extends Component {
    props : Props;
    static defaultProps: DefaultProps;
    state: State;
    setState : () => void;
    selectCountry: () => void;    
    defaultProps: Object;
    inputName: Object;
    inputEmail: Object;
    inputPhone: Object;
    inputWebSite: Object;
    objCountry = {
        shortName:'n/s',
        longName:'Please select...'
    }

    constructor(props: Props){
        super(props);
        this.state = { selectedCtry: {value:this.objCountry.shortName} };
        this.selectCountry = this.selectCountry.bind(this);
    }
    
    selectCountry(coutry : {value: string, label: string}) {    
        const store = this.props.vendorStore;
        store.setVendorInfo({
            country:{shortName:coutry.value,longName:coutry.label}
        });
        
        this.setState({ selectedCtry: coutry });
    }

    componentDidMount() {
        const store = this.props.vendorStore;
        store.setVendorInfo({
            country:this.objCountry
        });
    }
    

    
    

    render() {        
        const store = this.props.vendorStore;
        return (
            <div className="col-lg-4 col-lg-offset-2 col-md-4">
                <div className="bs-component">
                    <div className="form-group">
                        <label className="control-label" htmlFor="inputName">Name:</label>
                        <input type="text"
                            className="form-control" id="inputName"
                            ref={input => this.inputName = input}
                            onBlur={() => store.setVendorInfo({publicName:this.inputName.value})} />
                    </div>
                    <div className="form-group">
                        <label className="control-label" htmlFor="inputEmail">Email:</label>
                        <input type="text"
                            className="form-control" id="inputEmail"
                            ref={input => this.inputEmail = input}
                            onBlur={() => store.setVendorInfo({email:this.inputEmail.value})} />
                    </div>
                    <div className="form-group">
                        <label className="control-label" htmlFor="inputPhone">Phone:</label>
                        <input type="text"
                            className="form-control" id="inputPhone"
                            placeholder="(ddd)ddd-dddd"
                            ref={input => this.inputPhone = input}
                            onBlur={() => store.setVendorInfo({phone:this.inputPhone.value})} />
                    </div>
                    <div className="form-group">
                        <label className="control-label" htmlFor="inputWebSite">Web Site:</label>
                        <input type="text"
                            className="form-control" id="inputWebSite"
                            ref={input => this.inputWebSite = input}
                            onBlur={() => store.setVendorInfo({webSite:this.inputWebSite.value})} />
                    </div>
                    <div className="form-group">
                        <label className="control-label" htmlFor="inputCountry">Country:</label>
                        <Select name="inputCountry" value={this.state.selectedCtry.value}
                            options={this.props.countries} onChange={this.selectCountry} />
                    </div>
                </div>
            </div>
        );
    }
}

VendorInfo.defaultProps = {
    countries: [
        { value: 'n/s', label: 'Please select...'},
        { value: 'MX', label: 'Mexico' },
        { value: 'US', label: 'United States' },
        { value: 'CA', label: 'Canada' }
    ]    
};

VendorInfo.propTypes = {
    vendorStore: React.PropTypes.object
};

export default VendorInfo;