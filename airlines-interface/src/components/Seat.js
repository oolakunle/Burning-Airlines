import React, { PureComponent as Component } from 'react';


class Seat extends Component {
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
    console.log( this.props.seatId );
    this.props.getSelectedSeat( this.props.seatId );
    this.setState({
      isSelected: true
    });

  }

  render() {
    // console.log( this.props.selectedSeat );
    return (
      <div className={ this.state.isTaken ? "seat taken" : "seat free" } onClick={ this._handleClick } >
        <div className={ this.props.selectedSeat === this.props.seatId && !this.state.isTaken ? "selected" : null } >

        </div>
      </div>
    );
  }
}


class SeatMap extends Component {
  getSelectedSeat = (s) => {
    this.setState({
      selectedSeat: s
    });
    this.props.passSeat(s);
  }


  constructor(props) {
    super(props);
    this.state = {
      selectedSeat: ""
    };
  }

  render() {
    return (
      <div>
        <h2>Seat Map</h2>
        <p>Please choose an available seat</p>
        <div className="grid-container" >
          {/* make a row for number of rows */}
          { [...Array(this.props.rows)].map((e, i) =>
            <div className="grid-row" key={i}>
              {/* row letter */}
              <span className="row-num">{ String.fromCharCode(i+65) }</span>
              {/*  make seat re num of cols */}
              { [...Array(this.props.columns)].map((e, j) =>
                <Seat
                  key={`${String.fromCharCode(i+65)}${j+1}`}
                  seatId={`${String.fromCharCode(i+65)}${j+1}`}
                  takenSeats={ this.props.takenSeats }
                  getSelectedSeat={ this.getSelectedSeat }
                  selectedSeat={ this.state.selectedSeat }
                />
              ) }
            </div>
          ) }
        </div>
        <p>Selected Seat: { this.state.selectedSeat }</p>
      </div>
    );
  }
}

export default SeatMap;
