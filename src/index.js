import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Header from './Header';
import Content from './Content'
import PropTypes from 'prop-types'

function createStore(reducer) {
    let state = null
    const listeners = []

    const getState = () => state
    const subscribe = (listener) => listeners.push(listener)
    const dispatch = (action) => {
        state = reducer(state, action)
        console.log(listeners)
        listeners.forEach((listener) => {
            listener()
        })
    }
    dispatch({})
    return {
        getState,
        dispatch,
        subscribe
    }
}

function ThemeReducer(state, action) {
    if (!state) {
        return {
            themeColor: 'red'
        }
    }
    switch (action.type) {
        case 'CHANGE_COLOR' : return { ...state, themeColor: action.themeColor }
        default: return state
    }
}

const store = createStore(ThemeReducer)


class Index extends Component {
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext() {
        return { store }
    }
    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}



ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
