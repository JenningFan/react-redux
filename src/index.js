import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Header from './Header';
import Content from './Content'
import PropTypes from 'prop-types'
import { Provider } from "react-redux";
import { createStore } from 'redux';
import { usersReducer, UsersList } from './User';


// function createStore(reducer) {
//     let state = null
//     const listeners = []

//     const getState = () => state
//     const subscribe = (listener) => listeners.push(listener)
//     const dispatch = (action) => {
//         state = reducer(state, action)
//         listeners.forEach((listener) => {
//             listener()
//         })
//     }
//     dispatch({})
//     return {
//         getState,
//         dispatch,
//         subscribe
//     }
// }
console.log(React, Component === React.Component)

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

//const store = createStore(ThemeReducer)
const store = createStore(usersReducer)



class Index extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}



// ReactDOM.render(
//     <Provider store={store}>
//         <Index />
//     </Provider>,
//     document.getElementById('root')
// );
ReactDOM.render(
    <Provider store={store}>
        <UsersList />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker();
