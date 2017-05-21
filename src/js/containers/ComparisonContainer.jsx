import React from 'react';
import axios from 'axios';

import Loading from 'presentation/Loading.jsx';

import { dateTimeFormat } from 'helpers/formatters.js';

class ComparisonContainer extends React.Component {
  state = {
    latest: {},
    allSources: {},
    activeBase: 'USD',
    date: 'latest',
    isLoading: true,
    loadingMessage: ''
  }

  getLatest = () => {
    axios.get('/api/latest')
      .then((response) => {
        let newLatest = response.data;
        let newSources = this.state.allSources;
        let currentTime = dateTimeFormat(new Date());
        newSources[currentTime] = newLatest;

        this.setState({
          allSources: newSources,
          latest: newLatest,
          isLoading: false,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.setState({
      loadingMessage: 'Grabbing the latest rates...'
    }, () => {
      this.getLatest();
    });
  }

  render() {
    let state = this.state;
    console.log(state);

    return (
      <div>
        { state.isLoading ?
          <div className='o-flex-container u-align-center--vertical'>
            <Loading />
            { state.loadingMessage }
          </div>
        :
          <div>
            Today's Values
            
          </div>
        }
      </div>
    )
  }
}

export default ComparisonContainer;