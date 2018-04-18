import React, {PureComponent as Component} from 'react';
import axios from 'axios';

class SearchingArea extends Component{
  constructor(props){
    super(props)
    this.state = {from:''};
    this.state = {to:''}
    this._fromChange = this._fromChange.bind(this);
    this._toChange = this._toChange.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
  }


  _fromChange(e) {
    this.setState( { from: e.target.value } );
    console.log(`From value is ${e.target.value}`);
  }
  _toChange(e) {
    this.setState( { to: e.target.value } )
    console.log(`To value is ${e.target.value}`);
  }

  _handleSearch(e){
    e.preventDefault();
    let to = this.state.to
    let from = this.state.from
    this.setState({})
    this.props.onSubmit(this.state.from, this.state.to);
  }



  render(){
    return(
      <div>
        <form onSubmit={this._handleSearch}>
          <input type="text" onChange={this._fromChange} placeholder="from"/>
          <input type="text" onChange={this._toChange} placeholder="to"/>
          <input type="submit" value="Search"/>

        </form>
      </div>
    );
  }
}
function SearchResults(props){
  console.log(props.flights)
    return(
      <div>

          <p>{props.flight.origin}</p>

      </div>
    );
  }

class Flights extends Component{
  constructor(props){
    super(props); //NEEDS CHANGING BASED ON BACKEND
    this.state = {flights: []};
    this.searchFlights =this.searchFlights.bind(this);

  }

  searchFlights(f, t){
    console.log(`searching for ${f} and ${t}`)
    console.log(this)
    axios({
      method: 'GET',
      url: `http://localhost:3333/flights.json`,
      responseType: 'json',

    }).then(function(p){
      console.log(p.data[0].origin);
      for(let i = 0; i < p.data.length-1; i++){
        if (p.data[i].origin === f && p.data[i].destination === t){
          console.log(p.data[i].flight_number);
          console.log(this);
          this.setState({flights: p.data[i]})
        }
      }
    }.bind(this))
  }





  render(){
    return(
      <div>
        <h1>Search for Flights</h1>
        <SearchingArea onSubmit={this.searchFlights}/>
        <SearchResults flights={this.state.flights}/>
      </div>
    );
  }
}


export default Flights;
