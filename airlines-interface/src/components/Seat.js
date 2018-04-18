import React, {PureComponent as Component} from 'react';
import axios from 'axios'

class Seat {
  checkIfTaken = () => {
    if ( this.props.takenSeats.indexOf( this.props.seatId ) !== -1 ) { // if this seat is taken
      this.setState({
        isTaken: true
      });
    } else {
      this.setState({
        isTaken: false
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isTaken: false,
      // isSelected: false
    };
  }

  componentDidUpdate() {
    this.checkIfTaken();
  }

  _handleClick = (e) => {
    // console.log( this.props.seatId );
    this.props.getSelectedSeat( this.props.seatId );
    this.setState({
      isSelected: true
    });

  }

  render() {
    return(
      <div className={ this.state.isTaken ? "seat taken" : "seat free" } onClick={ this._handleClick } >
      <div className={ this.props.selectedSeat === this.props.seatId && !this.state.isTaken ? "selected" : null } >
      </div>
      </div>    )
  }
}
