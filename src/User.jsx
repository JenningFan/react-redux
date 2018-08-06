import { connect } from "./react-redux";
import React, { Component } from 'react'

const usersReducer = (state, action) => {
    if (!state) {
        return [{
            username: 'zn',
            age: 12,
            gender: 'male'
        }]
    }
    switch (action.type) {
        case 'ADD_USER':
            return [...state, action.user]
        case 'DELETE_USER':
            {
                let temp = [...state];
                temp.splice(action.index, 1)
                return temp
            }
        case 'UPDATE_USER':
            {
                let temp = [...state];
                temp[action.index] = { ...temp[action.index], ...action.user }
                return temp
            }
        default:
            return state
    }
}

class User extends Component {
    render() {
        const { user, onDeleteUser, index } = this.props
        return (
            <div>
                <div>Name: { user.username }</div>
                <div>Age: { user.age }</div>
                <div>Gender: { user.gender }</div>
                <button onClick={ onDeleteUser(index) }>删除</button>
            </div>
        )
    }
}

class UsersList extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            age: '',
            gender: ''
        }
    }

    handleUserChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleAgeChange(event) {
        this.setState({
            age: event.target.value
        })
    }

    handleGenderSelect(event) {
        this.setState({
            gender: event.target.value
        })
    }

    render() {
        const user = {
            username: this.state.username,
            age: this.state.age,
            gender: this.state.gender
        }
        return (
            <div>
                {/* 输入用户信息，点击“新增”按钮可以增加用户 */}
                <div className='add-user'>
                    <div>Username: <input type='text' onChange={this.handleUserChange.bind(this)} /></div>
                    <div>Age: <input type='number' onChange={this.handleAgeChange.bind(this)} /></div>
                    <div>
                        Gender:
                        <label>Male: <input type='radio' name='gender' value='male' onChange={this.handleGenderSelect.bind(this)} /></label>
                        <label>Female: <input type='radio' name='gender' value='female' onChange={this.handleGenderSelect.bind(this)} /></label>
                    </div>
                    <button onClick={() => {console.log(this);console.log(user); this.props.onAddUser(user)}}>增加</button>
                </div>
                {/* 显示用户列表 */}
                <div className='users-list'>
                    { this.props.users.map((user, index) => <User key={index} user={user} index={index} onDeleteUser={this.props.onDeleteUser} />) }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        users: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddUser: (user) => {
            dispatch({
                type: 'ADD_USER',
                user: user
            })
        },
        onDeleteUser: (index) => {
            dispatch({
                type: 'DELETE_USER',
                index: index
            })
        }
    }
}
UsersList = connect(mapStateToProps, mapDispatchToProps)(UsersList)
export { usersReducer, UsersList }


