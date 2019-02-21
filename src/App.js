import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import axios from 'axios'

class App extends Component {
  state = {
    venues: []
  }

  componentDidMount() {
    this.getVenues()
  }

  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDfXBPz9Ztl2ce-MXmHrLb9s5bEvkup2Z4&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "VLS11PS32XOIVKIKN5PZDC0XHT54T5EIGRDDYIMKDIEYQLBU",
      client_secret: "QHKRPNJY24ARGZ3DW5KH45STRZRXA3DUVYFBDP2I1P3UN3Y0",
      query: "school",
      near: "Debrecen",
      v: "20182507"
    }

    /*
    * axios does the same thing as a FETCH API
    * Reference: https://github.com/axios/axios
    */
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.loadMap())
      })
      .catch(error => {
        alert(`Sorry, data from Foursquare couldn't be fetched!`)
        console.log("Data fetching error" + error)
      })
  }

  initMap = () => {
    //Creating map, center is in Debrecen, Hungary
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.532, lng: 21.624},
      zoom: 13
    });

    //Creating infowindow
    const infowindow = new window.google.maps.InfoWindow();

    //Displaying markers
    this.state.venues.map(myVenue => {
      /*
      *Reference: https://developers.google.com/maps/documentation/javascript/infowindows
      *Content of the infowindow
      */
      const contentString = `${myVenue.venue.name}<br><i>${myVenue.venue.location.address}</i>
      <br><br><i>Data provided by Foursquare.</i>`

      //Creating marker
      const marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: myVenue.venue.name
      });

      function animationEffect() {
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(function(){ marker.setAnimation(null) }, 550)
      }

      marker.addListener('click', function() {
        //Change content
        infowindow.setContent(contentString)
        animationEffect()
        //Opening the info window when clicking on the marker
        infowindow.open(map, marker)
      });
    })
  }

  render() {
    return (
      <main>
        <div id="header"><Header /></div>
        <div id="map"></div>
      </main>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
