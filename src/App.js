import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import './css/App.css';
import MainPage from './MainPage'


class App extends Component {
  state = {
   locations : [],
   query: '',
   GitResult: true
  }
   ////////////// event used to initialize state
   componentDidMount = () => {
     this.setState({
       locations : [
          {id:0, title: 'faisaliyah', phone: '011 273 4003' ,type: 'Mall', lat: 24.6901539, lng: 46.6848635},
          {id:1, title: 'bejery', phone: '011 273 4003' ,type: 'Park', lat: 24.7370098, lng: 46.5746627},
          {id:2, title: 'ritz carlton', phone: '011 273 4003' ,type: 'Hotel', lat: 24.6660623, lng: 46.6304064},
          {id:3, title: 'four seasons', phone: '011 273 4003' ,type: 'Hotel', lat: 24.7111847, lng: 46.6744314},
          {id:4, title: 'java time', phone: '011 273 4003' ,type: 'Coffee', lat: 24.7581432, lng: 46.7338555},
          {id:5, title: 'dr.cafe', phone: '011 273 4003' ,type: 'Coffee', lat: 24.7505079, lng: 46.8243837},
          {id:7, title: 'dunkin donuts', phone: '011 273 4003' ,type: 'Coffee', lat: 24.7839974, lng: 46.8054016},
          {id:8, title: 'hayat', phone: '011 273 4003' ,type: 'Mall', lat: 24.765652, lng: 46.7685615},
          {id:9, title: 'king abdullah', phone: '011 273 4003' ,type: 'Park', lat: 24.6659279, lng: 46.7370247}
        ]
     });
  };
  //// func to update the state.locations by the default values ////////////////////////////
  returnDefault = (e) => {
    e.preventDefault();
    this.setState({
      locations : [
        {id:0, title: 'faisaliyah', phone: '011 273 4003' ,type: 'Mall', lat: 24.6901539, lng: 46.6848635},
        {id:1, title: 'bejery', phone: '011 273 4003' ,type: 'Park', lat: 24.7370098, lng: 46.5746627},
        {id:2, title: 'ritz carlton', phone: '011 273 4003' ,type: 'Hotel', lat: 24.6660623, lng: 46.6304064},
        {id:3, title: 'four seasons', phone: '011 273 4003' ,type: 'Hotel', lat: 24.7111847, lng: 46.6744314},
        {id:4, title: 'java time', phone: '011 273 4003' ,type: 'Coffee', lat: 24.7581432, lng: 46.7338555},
        {id:5, title: 'dr.cafe', phone: '011 273 4003' ,type: 'Coffee', lat: 24.7505079, lng: 46.8243837},
        {id:7, title: 'dunkin donuts', phone: '011 273 4003' ,type: 'Coffee', lat: 24.7839974, lng: 46.8054016},
        {id:8, title: 'hayat', phone: '011 273 4003' ,type: 'Mall', lat: 24.765652, lng: 46.7685615},
        {id:9, title: 'king abdullah', phone: '011 273 4003' ,type: 'Park', lat: 24.6659279, lng: 46.7370247}
      ],
       GitResult: true
    });
  }
  //// func to update the state.query and call searchLocations ////////////////////////////
  handleChange = (e) => {
    const searchValue = e.target.value
    this.setState({query: searchValue})
  }
  // func that make the search by the query value
      searchLocations = (e) => {
        e.preventDefault();
        const val = this.state.query.toLowerCase()
        const locations = this.state.locations
        let value = new RegExp(escapeRegExp(val), 'i')
        value = value.source
        const searchName = locations.filter( location => location.title === value);
        if (searchName.length > 0) {
          this.setState({locations : searchName})
        }else {
          this.setState({GitResult: false})
      }
    }
  ////////////////////////////
  render() {
    const GitResult = this.state.GitResult
    return (
      <div className="App">
        <header role="banner">
          <div id="header">
            <div id="header" tabIndex="0" aria-label="page's title"> Entertainment locations at Riyadh </div>
            </div>
            </header>
          <div className="search-locations">
            <form onSubmit={this.searchLocations.bind(this)}>
              <label>
                Search for a Location Name:
              <input type="text" value={this.state.query} onChange={this.handleChange.bind(this)}/>
              </label>
              <input type="submit" value="Submit" />
            </form>
          <button onClick={this.returnDefault}>
            Cancile
            </button>
        </div>
        { GitResult ? <MainPage locations= {this.state.locations}/> : <h3>Your search returned no results !</h3>}
    </div>
    )
  }
}
export default App;
