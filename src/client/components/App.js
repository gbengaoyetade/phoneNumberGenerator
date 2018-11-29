import React, { Component } from 'react';
import axios from 'axios';
import '../style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: '',
      min: '',
      max: '',
      numbers: [],
      error: '',
      numberInput: null,
      numbersFetched: false,
    };
  }

  componentDidMount() {
    axios
      .get('/api/v1/numbers')
      .then(({ data }) => {
        this.updateAppState(data);
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  updateAppState = (data) => {
    const {
      total, min, max, numbers,
    } = data;
    this.setState({
      total,
      min,
      max,
      numbers,
      numbersFetched: true,
    });
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ numberInput: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ numbersFetched: false });
    const body = { count: this.state.numberInput };
    try {
      await axios.post('/api/v1/numbers/generate', body);
      const response = await axios.get('/api/v1/numbers');
      this.updateAppState(response.data);
    } catch (error) {
      this.setState({ error: 'There was an error completing the request' });
    }
  };

  renderForm = () => (
    <form onSubmit={this.handleSubmit} className="form">
      <input
        type="number"
        className="input"
        onChange={this.handleChange}
        required
      />
      <input type="submit" className="btn" value="Generate Numbers" />
    </form>
  );

  renderTable = (numbers) => {
    if (!numbers.length) {
      return <p className="center">No numbers to display</p>;
    }
    return (
      <table className="card">
        <thead>
          <tr className="text-bold">
            <th>SN</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {numbers.map((number, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  renderLoader = () => <p className="center">Fetching numbers...</p>;

  renderStats = () => {
    const { min, max, total } = this.state;
    return (
      <ul className="card">
        <li>
          <span className="text-bold">Total Numbers:</span> {total}
        </li>
        <li>
          <span className="text-bold">Min Number:</span> {min}
        </li>
        <li>
          <span className="text-bold">Max Number:</span> {max}
        </li>
      </ul>
    );
  };

  render() {
    const { numbers, numbersFetched } = this.state;
    return (
      <div className="wrapper">
        <div className="side-bar">{this.renderForm()}</div>
        <div className="main-section">
          <h2>Phone Numbers</h2>
          {numbersFetched ? this.renderTable(numbers) : this.renderLoader()}
        </div>
        <div className="stats">
          <h2>Stats</h2>
          {this.renderStats()}
        </div>
        <div className="clear" />
      </div>
    );
  }
}
export default App;
