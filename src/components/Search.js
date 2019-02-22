import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'

// Places Data
class Search extends Component {

  state = {
    query: '',
    venues: this.props.venues
  }

  updateQuery = (query) => {
    this.setState({ query })

    let allVenues = this.props.venues
    let newVenues

    if(this.state.query && (this.state.query !== '')) {
      const match = new RegExp(escapeRegExp(query), 'i');
      newVenues = allVenues.filter((myVenue) => match.test(myVenue.venue.name))
      this.setState({venues: newVenues})
    } else {
      this.setState({venues: allVenues})
    }
  }

  markerTrigger = (venueTitle) => {
    this.props.markers.map((marker) => {
      if(marker.title === venueTitle) {
        window.google.maps.event.trigger(marker, 'click');
      }
    })
  }

  render() {
    return (
      <aside>
        <div className="search-form">
          <label>Find a school!</label>
          <input
            id="searchQuery"
            type="text"
            placeholder="Search..."
            onChange={(e) => this.updateQuery(e.target.value)}
            value={this.state.query}
          />
        </div>

        {this.state.venues.length !== 0 && (
          <ul className="search-result">
            {this.state.venues.map((myVenue, index) => (
              <li
                key={index}
                tabindex={index}
                className="item"
                onClick={() => this.markerTrigger(myVenue.venue.name)}
              >
                {myVenue.venue.name}
              </li>
            ))}
          </ul>
        )}

        {this.state.venues.length === 0 && (
          <ul className="search-result">
            <li className="item">No place found.</li>
          </ul>
        )}

      </aside>
    )
  }
}

export default Search
