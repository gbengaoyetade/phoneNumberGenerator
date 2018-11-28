import React, { Component } from 'react';
import axios from 'axios';
import '../style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 0,
      min: '',
      max: '',
      numbers: [],
      error: '',
    };
  }

  componentDidMount() {
    axios
      .get('/api/v1/numbers')
      .then(({ data }) => {
        const {
          length, min, max, numbers,
        } = data;
        this.setState({
          length,
          min,
          max,
          numbers,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  render() {
    const { max, min, length } = this.state;
    return (
      <div>
        <h5>Phone number generator</h5>
        <p>Total: {length}</p>
        <p>Min Number: {min}</p>
        <p>Max Number: {max}</p>
      </div>
    );
  }
}
export default App;
