// @flow
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import { constants } from '../../../common/constants';
import { inject } from 'mobx-react';

const Map = withScriptjs(withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: props.lat, lng: props.lon }}
      onClick={props.onMapClick}>

      <Marker
        position={{ lat: props.lat, lng: props.lon }}
        onClick={() => {
          console.log('Clicked!');
        }}>
        <InfoWindow>
          <div>Your business</div>
        </InfoWindow>
      </Marker>
    </GoogleMap>);
}
));

const getLocationObj = (lat,lon) => {
  return {
      location: { lat: lat, lon: lon }
  };
};

type Props = {
  vendorStore: Object,
  lat: Number,
  lon: Number,
  mapsUrl: string
};

type State = {
  location: Object
};

type DefaultProps = {
  mapsUrl: string
};

@inject('vendorStore')
class VendorLocation extends Component {
  props: Props;
  state: State;
  static defaultProps: DefaultProps;

  setMarker: (e: any) => void;

  constructor(props: Props) {
    super(props);
    this.setMarker = this.setMarker.bind(this);    
  }

  
  componentWillMount() {
    const lat = this.props.lat;
    const lon = this.props.lon;
    const location = getLocationObj(lat,lon);
    this.state = location;
    this.props.vendorStore.setVendorInfo(location);
  }
  

  setMarker(e: any) {
    const lat = e.latLng.lat();
    const lon = e.latLng.lng();
    const location = getLocationObj(lat,lon);
    this.setState(location);
    this.props.vendorStore.setVendorInfo(location);
  }


  render() {
    return (
      <div className="col-lg-4 col-md-4">
        <div className="bs-component">
          <div className="form-group">
            <label className="control-label">Location:</label>
            <div style={{ height: '350px' }}>
              <Map googleMapURL={this.props.mapsUrl}
                loadingElement={
                  <div style={{ height: '100%' }}>
                    Loading...
                      </div>
                }
                containerElement={
                  <div style={{ height: '100%' }} />
                }
                mapElement={
                  <div style={{ height: '100%' }} />
                }
                onMapClick={this.setMarker}
                lat={this.state.location.lat}
                lon={this.state.location.lon} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VendorLocation.propTypes = {
  lat: React.PropTypes.number.isRequired,
  lon: React.PropTypes.number.isRequired
};

VendorLocation.defaultProps = {
  mapsUrl: constants.mapsUrl
};

export default VendorLocation;

