import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  componentDidMount() {
    this.loadMap()
  }

  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDfXBPz9Ztl2ce-MXmHrLb9s5bEvkup2Z4&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 47.532, lng: 21.624},
          zoom: 13
        });
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}

{/*
  <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
      async defer></script>
  */}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
