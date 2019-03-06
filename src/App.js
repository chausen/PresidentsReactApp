import React, { Component } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import PresidentCard from './components/PresidentCard';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  numClosestPresidents = 3;

  constructor (props) {
    super(props)
    this.state = {
      startDate: new Date(),
      closestPresidentsByAge: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let usersBirthday = this.state.startDate
    this.setState({
      closestPresidentsByAge: []
    });

    axios.get('http://localhost:4000/presidents/get')
      .then(res => {        
        console.log('Got data: ' + res.data);

        let presidents = res.data;

        presidents.sort( this.compareBirthdays(a, b) );
                                
        for (let i = 0; i < presidents.length; i++) {
          if (this.Older(usersBirthday, (presidents[i].birthday)) ||
              i == presidents.length - 1) {
            this.spreadSearch(presidents, i);
            break;
          }
        }
      });
  }

  compareBirthdays(birthday1, birthday2) {
    if ( (birthday1.getMonth() < birthday2.getMonth()) ||
         (birthday1.getMonth() === birthday2.getMonth()) &&
         (birthday1.getDay() < birthday.getDay()) ) {
         
      return -1;
    }
    if ( (birthday1.getMonth() > birthday2.getMonth()) ||
         (birthday1.getMonth() === birthday2.getMonth()) &&
         (birthday1.getDay() > birthday.getDay()) ) {

      return 1;
    }
    return 0;         
  }

  spreadSearch(presidents, indexOfFirstYoungestPresident) {
    let closestPresidents = [];
    let usersBirthday = this.state.startDate;
    let backwardIndex = indexOfFirstYoungestPresident;
    let forwardIndex = indexOfFirstYoungestPresident;
    let exhaustedRightSide = fowardIndex >= presidents.length;
    let exhaustedLeftSide = backwardIndex < 0;
    
    while (closestPresidents.length < this.numClosestPresidents && 
           !(exhaustedLeftSide && exhaustedRightSide)) {
      console.log('forwardIndex: ' + forwardIndex);
      console.log('backwardIndex: ' + backwardIndex);
      console.log('closestPresidents.length: ' + closestPresidents.length);
      if ( !exhaustedRightSide &&
           Math.abs(presidents[forwardIndex].birthday - usersBirthday) < Math.abs(presidents[backwardIndex].birthday - usersBirthday) ) {

        closestPresidents.push(presidents[forwardIndex]);
        forwardIndex++;
        if (forwardIndex >= presidents.length)
          exhaustedRightSide = true;
      } else if ( !exhaustedLeftSide &&
                  Math.abs(presidents[forwardIndex].birthday - usersBirthday) > Math.abs(presidents[backwardIndex].birthday - usersBirthday) ) {

        closestPresidents.push(presidents[backwardIndex]);
        backwardIndex--;
        if (backwardIndex < 0)
          exhaustedLeftSide = true;
      } else { // they are equal

        if (!exhaustedRightSide) {
          closestPresidents.push(presidents[forwardIndex]);
          forwardIndex++;
          if (forwardIndex >= presidents.length) exhaustedRightSide = true;
        }
        if (closestPresidents.length < this.numClosestPresidents) {
          closestPresidents.push(presidents[backwardIndex]);
          backwardIndex++;          
          if (backwardIndex < 0) exhaustedLeftSide = true;
        }
      }
    }

    console.log('Closest presidents: ' + closestPresidents);

    this.setState({
      closestPresidentsByAge: closestPresidents.map( pres => 
                                <PresidentCard president={pres} /> )
    });
  }

  render() {
    return (
      <div className = "container">
        <h3 className = "container-header">Which US presidents' birthdays are closest to your's?</h3>        
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <label className = "datepicker-label">Enter your birthday:</label>
            <DatePicker
              selected={ this.state.startDate }
              onChange={ this.handleChange }
              name="startDate"              
            />
          </div>
          <div className="form-group">
            <button className="btn btn-success">Calculate</button>
          </div>
        </form>
        <div className = 'president-matches'>
          {this.state.closestPresidentsByAge}
        </div>
      </div>
    );
  }
}

export default App;