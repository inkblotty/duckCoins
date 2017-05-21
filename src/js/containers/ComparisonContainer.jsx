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
    highLows: {},
    isLoading: true,
    loadingMessage: ''
  };

  getLatest = () => {
    axios.get('/api/latest')
      .then((response) => {
        let newLatest = response.data.currentCoins;
        let newSources = this.state.allSources;
        let currentTime = dateTimeFormat(new Date());
        newSources[currentTime] = newLatest;

        let newHighLows = response.data.highLows;
        let newDates = this.state.allDates;
        if (newDates.indexOf(currentTime) === -1) {
          newDates.push(currentTime);
        }

        this.setState({
          allDates: newDates,
          allSources: newSources,
          date: currentTime,
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

  getValsByDate = (dateTimeStr) => {
    // if we've already grabbed that date
    if (this.state.allSources[dateTimeStr]) {
      this.setState({
        date: dateTimeStr,
        active: this.state.allSources[dateTimeStr]
      });
    } else {
      this.setState({
        isLoading: true,
      });

      axios.get(`/api/history/${dateTimeStr}`)
        .then((response) => {
          let newActive = response.data;
          let newSources = this.state.allSources;
          newSources[dateTimeStr] = newActive;

          let newDates = this.state.allDates;
          if (newDates.indexOf(dateTimeStr) === -1) {
            newDates.push(dateTimeStr);
          }

          this.setState({
            active: newActive,
            allDates: newDates,
            allSources: newSources,
            isLoading: false
          })
        });
    }
  };

  componentDidMount = () => {
    this.setState({
      loadingMessage: 'Grabbing the latest rates...'
    }, () => {
      this.getLatest();
      this.getAllDates();
    });
  }

  render() {
    let state = this.state;
    console.log(state);
    return (
      <div>
        { state.isLoading ?
          <div className='o-flex-container c-loading-container'>
            <Loading />
            { state.loadingMessage }
          </div>
        :
          <div>
            <div>
              <ComparisonControls dateOpts={ state.allDates } baseCurrencyOpts={ ['USD'] } selectedDate={ state.date }
                selectedCurrency={ state.activeBase } />
            </div>
            <div className='o-flex-container'>
              <ValueBox sources={ state.allSources[state.date] } date={ state.date } />
              <BestExchangeBox { ...state.highLows } />
            </div>
          </div>
        }
      </div>
    )
  }
}

export default ComparisonContainer;