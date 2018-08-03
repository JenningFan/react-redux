import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch.jsx'
import Connect from './Connect'

class Content extends Component {
    static propTypes = {
        themeColor: PropTypes.string
    }
    
    render() {
        return (
            <div>
                <p style={{ color: this.props.themeColor }}>React content</p>
                <ThemeSwitch />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        themeColor: state.themeColor
    }
}
Content = Connect(mapStateToProps)(Content)
export default Content