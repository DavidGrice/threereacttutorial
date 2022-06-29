import React, { Component } from 'react';
import styles from'./App.module.css';

import { Globe } from './components/index';
import { fetchPointDataLocal } from './assets/api';

class App extends Component {
    state = {
      pointData: {},
    }

  componentDidMount() {
    const fetchedPointDataLocal = fetchPointDataLocal();
    this.setState({
      pointData: fetchedPointDataLocal,
    })
  }

  render() {
    const {pointData} = this.state;
    return (
      <Globe 
      pointData={pointData}
      />
    )
  }
}

export default App;
