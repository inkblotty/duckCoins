import React from 'react';
import axios from 'axios';

import Loading from 'presentation/Loading.jsx';

class ComparisonContainer extends React.Component {
  state = {
    activeCoins: [],
    isLoading: true,
    loadingMessage: ''
  }

  componentDidMount = () => {
    this.setState({
      loadingMessage: 'Grabbing current exchange rates...'
    });

    // grab current data from btc-e
    axios.get('/api/btc-e/today')
      .then((response) => {
        console.log(response);

        this.setState({
          isLoading: false,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let state = this.state;

    return (
      <div>
        { state.isLoading ?
          <div className='o-flex-container u-align-center--vertical'>
            <Loading />
            { state.loadingMessage }
          </div>
        :
          <div>Today's Values</div>
        }
      </div>
    )
  }
}

export default ComparisonContainer;