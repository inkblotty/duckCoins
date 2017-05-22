import React from 'react';
import axios from 'axios';

import BestExchangeBox from 'presentation/BestExchangeBox.jsx';
import ComparisonControls from 'presentation/ComparisonControls';
import Loading from 'presentation/Loading.jsx';
import ValueBox from 'presentation/ValueBox.jsx';

import { dateTimeFormat } from 'helpers/formatters.js';

class ComparisonContainer extends React.Component {
  state = {
    active: {},
    allDates: [],
    allSources: {},
    activeBase: 'USD',
    date: '',
    hideHighLows: false,
    highLows: {},
    isLoading: true,
    loadingMessage: ''
  };

  getLatest = () => {
    axios.get('/api/latest')
      .then((response) => {
        let { date, highLows, ...newLatest } = response.data;
        let newSources = this.state.allSources;
        newSources[date] = newLatest;

        let newHighLows = this.state.highLows;
        newHighLows[date] = highLows;
        let newDates = this.state.allDates;
        if (newDates.indexOf(date) === -1) {
          newDates.push(date);
        }

        this.setState({
          allDates: newDates,
          allSources: newSources,
          date,
          highLows: newHighLows,
          active: newLatest,
          isLoading: false,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getAllDates = () => {
    axios.get('/api/dates')
      .then((response) => {
        this.setState({
          allDates: response.data
        });
      });
  };

  getValsByDate = (e, dateTimeStr) => {
    // if we've already grabbed that date
    if (e) {
      dateTimeStr = e.target.value;
    }

    if (this.state.allSources[dateTimeStr]) {
      this.setState({
        date: dateTimeStr,
        active: this.state.allSources[dateTimeStr]
      });
    } else {
      this.setState({
        isLoading: true,
      }, () => {
        axios.get(`/api/history/${dateTimeStr}`)
          .then((response) => {
            let { __v, date, _id, highLows, ...newActive } = response.data;
            let newSources = this.state.allSources;
            newSources[dateTimeStr] = newActive;

            let newDates = this.state.allDates;
            if (newDates.indexOf(dateTimeStr) === -1) {
              newDates.push(dateTimeStr);
            }

            let newHighLows = this.state.highLows;
            newHighLows[dateTimeStr] = highLows;

            this.setState({
              active: newActive,
              allDates: newDates,
              allSources: newSources,
              date: dateTimeStr,
              highLows: newHighLows,
              isLoading: false
            })
          });
      });
    }
  };

  getDatesLoop = () => {
    this.timer1 = window.setTimeout(() => {
      this.getAllDates();
      this.getDatesLoop();
    }, 300000);
  }

  componentWillUnmount = () => {
    clearTimeout(this.timer1);
  };

  componentDidMount = () => {
    this.setState({
      loadingMessage: 'Grabbing exchange rates...'
    }, () => {
      this.getLatest();
      this.getAllDates();
      this.getDatesLoop();
    });
  }

  render() {
    let state = this.state;

    return (
      <div>
        <div>
          <div>
            <ComparisonControls dateOpts={ state.allDates } baseCurrencyOpts={ ['USD'] } selectedDate={ state.date }
              selectedCurrency={ state.activeBase } changeDate={ this.getValsByDate } />
          </div>
          { state.isLoading ?
            <div className='o-flex-container c-loading-container'>
              <Loading />
              { state.loadingMessage }
            </div>
            :
            <div className='o-flex-container o-content-container'>
              <ValueBox sources={ state.allSources[state.date] } date={ state.date } />
              <BestExchangeBox { ...state.highLows[state.date] } />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default ComparisonContainer;