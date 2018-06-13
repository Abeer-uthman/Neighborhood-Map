import React, { Component } from 'react';
import './css/App.css';
import PropTypes from 'prop-types';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ResponsiveMenu from './ResponsiveMenu';
import InfoWindowMsg from './InfoWindowMsg';

export class MainPage extends Component {
  constructor() {
    super();
    this.state = {
    initialCenter: {lat: parseFloat(24.7347384),lng: parseFloat(46.7002298)},
    zoom : 11,
    activeMarker: [],
    activePosition: {},
    showingInfoWindow: false,
    menuItemClicked: false,
    searchTypeClicked: false,
    locationAddress: '',
    results: []
  }
}
static propTypes = {
  locations: PropTypes.array.isRequired,
}
//////////////////////////////////
onMarkerClick = (props, marker, e) =>{
  const locations = this.props.locations
  let markerName
  for (let location of locations) {
    if (location.title === marker.name) {
      markerName = location
    }
  }
  this.setState({
    activeMarker: markerName,
    activePosition: marker,
    showingInfoWindow: true,
    initialCenter: marker.position,
    zoom : 12
  });
};
///////////////////////
onMenuItemClick = (e) =>{
  e.preventDefault();
  const locations = this.props.locations
  const locationId = e.target.id
  let lat, lng, markerName
  for (let location of locations) {
    if (location.id == locationId) {
      lat = parseFloat(location.lat)
      lng = parseFloat(location.lng)
      markerName = location
    }
  }
  this.setState({
    activePosition: {lat:lat , lng:lng},
    activeMarker: markerName,
    menuItemClicked: true
  });
  this.initFourSquare(lat,lng)
};
///////////////////////
onMapClicked = (props) => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      menuItemClicked: false,
      searchTypeClicked: false,
      activeMarker: [],
      activePosition: {},
      results: [],
      initialCenter: {lat: parseFloat(24.7347384),lng: parseFloat(46.7002298)},
      zoom : 11
    })
  }
};
///////////////////////
updateSearchType = (temp) => {
   this.setState({results : temp,
         searchTypeClicked: true })
};
////////////////////////
initFourSquare = (latValue,lngValue) => {
  var info = []
  var address = ''
  //fetch API url
     var api_url = "https://api.foursquare.com/v2/venues/search";
     var client_id = "OCOA3PCHPPHP4D4450K0Y02NQNNQB3RYAIQR4B5OLUOTVPZG"; // My API client id
     var client_secret = "VO4XQYUHGGEQR5A11UKBNYSZJ0GOVPZ0OC5V3Z50IN3X12UC"; // My API client secret
     var lat = latValue;
     var lng = lngValue;
     var version = "20130815";
     var FourSquareAPI = api_url + '?client_id=' + client_id + '&client_secret=' + client_secret + '&ll=' + lat + ',' + lng + '&v=' + version;
      return fetch(FourSquareAPI)
          .then(data => {
            return data.json()
          }).then(response => {
                 info = response.response.venues
                 address = info[0].location.crossStreet
                 this.setState({
                   locationAddress: address })
               })
             .catch((error) => {
               window.alert("problem in loading the data!!")
               })
   };
//////////////////////////
gm_authFailure(){
    window.alert("Error in loading google maps");
}
componentDidMount(){
    window.gm_authFailure = this.gm_authFailure;
}
/////////////////////////
  render() {
    const locations= this.props.locations
    const initialCenter= this.state.initialCenter
    const zoom= this.state.zoom
    const activeMarker= this.state.activeMarker
    const activePosition= this.state.activePosition
    const showingInfoWindow= this.state.showingInfoWindow
    const menuItemClicked= this.state.menuItemClicked
    const searchTypeClicked= this.state.searchTypeClicked
    const locationAddress = this.state.locationAddress
    const results= this.state.results
    ///////////////////////////////////////////////////
    const onMarkerClick= this.onMarkerClick
    const onMenuItemClick= this.onMenuItemClick
    const onMapClicked= this.onMapClicked
    const updateSearchType= this.updateSearchType

    return (
   <div id="maincontent" role="main">
      <div id="responsive-menu"  aria-label="location's names and types"  tabIndex="0">
          <ResponsiveMenu locations= {locations} onMenuItemClick={onMenuItemClick}
          updateSearchType= {updateSearchType}/>
      </div>
      <div id="map-container" aria-label="map from google">
          <Map  role="application" google={this.props.google} zoom={zoom}
              initialCenter={{
                lat: initialCenter.lat,
                lng: initialCenter.lng}}  onClick={onMapClicked}
                >
                {locations.map((location) => (
                  <Marker key={location.id}
                   name={location.title}
                   position={{lat: parseFloat(location.lat), lng: parseFloat(location.lng)}}
                   onClick={onMarkerClick}
                  />
                ))}

                <InfoWindow marker={activePosition}  visible={showingInfoWindow}>
                  <h1>
                    <InfoWindowMsg activeMarker= {activeMarker}/>
                    </h1>
                </InfoWindow>

                <InfoWindow position={activePosition}  visible={menuItemClicked}>
                  <h1>
                    <InfoWindowMsg activeMarker= {activeMarker}/>
                      street: {locationAddress}
                  </h1>
                </InfoWindow>

                {results.map((result) => (
                  <InfoWindow key={result.id}
                   position={{lat: parseFloat(result.lat), lng: parseFloat(result.lng)}}
                   visible={searchTypeClicked}>
                  <h1>{result.title}</h1>
                  </InfoWindow>
                ))}

          </Map>
     </div>
  </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCLgJpG2dYd6Q8VeilF6eczZJ83kW01BK0')
})(MainPage)
