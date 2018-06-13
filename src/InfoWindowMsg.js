import React from 'react';

 function InfoWindowMsg (props) {
    return (
      <div>
          {props.activeMarker.title} -
          {props.activeMarker.type} -
          {props.activeMarker.phone}
      </div>
    );
}
export default InfoWindowMsg;
