import React, { useEffect } from 'react';
import places from 'places.js';
const LocationSearch = () => {
    useEffect(() => {
      const placesAutocomplete = places({
        appId: 'plEHFE8OXN3L',
        apiKey: 'a6eb12d44e181f3c3c3d02bd7cf7b2fd',
        container: document.querySelector('#address')
      });
  
      const $address = document.querySelector('#address-value');
  
      placesAutocomplete.on('change', function(e) {
        $address.textContent = e.suggestion.value;
      });
  
      placesAutocomplete.on('clear', function() {
        $address.textContent = 'none';
      });
  
      return () => {
        placesAutocomplete.destroy();
      };
    }, []);
  
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h6 className="text-center">Type your location (New York, London, Delhi, Tokyo)</h6>
            <input type="search" id="address" className="form-control" placeholder="Where are we going?" />
          </div>
        </div>
      </div>
    );
  };
  
  export default LocationSearch;
  