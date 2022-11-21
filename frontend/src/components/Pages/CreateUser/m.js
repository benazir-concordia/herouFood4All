const apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?&address=";

class GooglePlaces extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      autocomplete: {},
    };
  }
  
  componentDidMount() {
    this.initAutocomplete();
  }

  initAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      (this.refs.autoCompletePlaces), {types: ['geocode']});
    autocomplete.addListener('place_changed', this.fillInAddress);
    this.setState({ autocomplete });
  }
  
  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }

  fillInAddress() {
    const componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    };
    // Get the place details from the autocomplete object.
    const place = autocomplete.getPlace();
    for (let component in componentForm) {
      this.refs.component.value = '';
      this.refs.component.disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        const val = place.address_components[i][componentForm[addressType]];
        this.refs.addressType.value = val;
      }
    }
  }
	
  render() {
    return (
      <div>
        <h1>Google Places autocomplete</h1>

        <div id="locationField">
          <input 
            id="autocomplete" 
            placeholder="Enter your address"
            onFocus={this.geolocate}
            onChange={this.handleInputChange}
            ref="autoCompletePlaces"
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <GooglePlaces />,
  document.getElementById('root')
);