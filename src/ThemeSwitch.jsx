import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ThemeSwitch extends Component {
    static contextTypes = {
        store: PropTypes.object
    }

    constructor() {
        super()
        this.state = {
            themeColor: ''
        }
    }

    componentWillMount() {
        console.log('component will mount')
        const { store } = this.context
        this._updateThemeColor()
        // 因为不涉及到组件从页面中增加或删除，所以componentWillMount只会在组件初次被render时执行一次，则store.subscribe也只会订阅一次
        store.subscribe(() => { this._updateThemeColor() })   
    }
    componentDidMount() {
        console.log('component did mount')
    }

    componentDidUpdate() {
        console.log('component did update')
    }
    componentWillUpdate() {
        console.log('component will update')
    }

    handleOnColorChange(color) {
        const { store } = this.context
        store.dispatch({
            type: 'CHANGE_COLOR',
            themeColor: color
        })
    }

    _updateThemeColor() {
        const { store } = this.context
        const state = store.getState()
        this.setState({
            themeColor: state.themeColor
        })
    }
    render() {
        return (
            <div>
                <button style={{ color: this.state.themeColor }} onClick={this.handleOnColorChange.bind(this, 'red')}>red</button>
                <button style={{ color: this.state.themeColor }} onClick={this.handleOnColorChange.bind(this, 'blue')}>blue</button>
            </div>
        )
    }
}
export default ThemeSwitch