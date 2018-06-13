import React, { Component } from 'react';
import PropTypes from 'prop-types'


class SearchTypes extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequired,
    updateSearchType: PropTypes.func.isRequired
  }

 SearchForResults = (e) =>{
   e.preventDefault();
   const locations = this.props.locations
   const TypeValu = e.target.id
   const temp = locations.filter( location => location.type === TypeValu);
   this.props.updateSearchType(temp)
};

  render() {
    const SearchForResults = this.SearchForResults.bind(this)
    return (
      <div>
        <h4>Search by Location Type:</h4>
        <a tabIndex="-1" className="search-types" href="# " id = "Mall" onClick={SearchForResults}>Mall</a>
        <a tabIndex="-1" className="search-types" href="# " id = "Park" onClick={SearchForResults}>Park</a>
        <a tabIndex="-1" className="search-types" href="# " id = "Coffee" onClick={SearchForResults}>Coffee</a>
        <a tabIndex="-1" className="search-types" href="# " id = "Hotel" onClick={SearchForResults}>Hotel</a>
     </div>
    );
  }
}
export default SearchTypes;
