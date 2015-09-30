import domready from 'domready';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

function something(callback) {
  setTimeout(() => {
    callback();
  }, 250 + 1750 * Math.random());
}

function startSomething() {
  return dispatch => {
    let done = false;
    setTimeout(() => {
      if (!done) {
        dispatch(showSpinner());
      }
    }, 750);
    something(() => {
      done = true;
      dispatch(endSomething());
    });
  };
}

function showSpinner() {
  return {
    type: 'SHOW_SPINNER'
  };
}

function endSomething() {
  return {
    type: 'END_SOMETHING'
  };
}

function reducer(state = { status: 'ready' }, action) {
  switch (action.type) {
    case 'END_SOMETHING':
      return Object.assign({}, state, { status: 'done' });
    case 'SHOW_SPINNER':
      return Object.assign({}, state, { status: 'loading...' });
  }
  return state;
}

const store = applyMiddleware(thunkMiddleware)(createStore)(reducer);

class LazySpinnerApp extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.dispatch(startSomething());
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClick} />
        <Status status={this.props.status} />
      </div>
    );
  }
}

const App = connect(state => state)(LazySpinnerApp);

class Status extends Component {
  render() {
    return (
      <span style={{ 'margin-left': '8px' }}>{this.props.status}</span>
    );
  }
}

class Button extends Component {
  render() {
    return (
      <button onClick={this.props.onClick}>Start</button>
    );
  }
}

domready(function () {
  ReactDOM.render(React.createElement(
    Provider,
    { store: store },
    React.createElement(App)
  ), document.getElementById('lazy-spinner-app'));
});
