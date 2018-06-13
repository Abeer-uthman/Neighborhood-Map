import React, { Component } from 'react';
import './css/App.css';
import PropTypes from 'prop-types';
import { slide as Menu } from 'react-burger-menu';
import SearchTypes from './SearchTypes';

class ResponsiveMenu extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequired,
    onMenuItlatemClick: PropTypes.func,
    updateSearchType: PropTypes.func
  }
  render() {
    const locations= this.props.locations
    const onMenuItemClick= this.props.onMenuItemClick
    const updateSearchType= this.props.updateSearchType
    return (
    <Menu>
        <h1>Locations Menu</h1>
        {locations.map((location) => (
          <a key={location.id} tabIndex="-1" className="bm-item-list" href="# " id = {location.id} onClick={onMenuItemClick}>
            {location.title}
         </a>
          ))}
        <hr/>
        <SearchTypes locations= {locations} updateSearchType={updateSearchType}/>
    </Menu>
    );
  }
}

export default ResponsiveMenu;
