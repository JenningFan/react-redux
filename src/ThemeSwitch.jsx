import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from './react-redux'

class ThemeSwitch extends Component {
    static propTypes = {
        themeColor: PropTypes.string,
        onColorChange: PropTypes.func
    }

    handleOnColorChange(color) {
        if (this.props.onColorChange) {
            this.props.onColorChange(color)
        }
    }

    render() {
        return (
            <div>
                <button style={{ color: this.props.themeColor }} onClick={this.handleOnColorChange.bind(this, 'red')}>red</button>
                <button style={{ color: this.props.themeColor }} onClick={this.handleOnColorChange.bind(this, 'blue')}>blue</button>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        themeColor: state.themeColor
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onColorChange: (color) => {
            dispatch({
                type: 'CHANGE_COLOR',
                themeColor: color
            })
        }
    }
}
ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)
export default ThemeSwitch