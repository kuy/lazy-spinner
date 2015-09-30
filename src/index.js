import domready from 'domready';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

class Button extends Component {
  render() {
    return (
      <h1>Hello Redux!</h1>
    );
  }
}

domready(function () {
  ReactDOM.render(React.createElement(
    Button
  ), document.getElementById('lazy-spinner-app'));
});
