import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch.jsx'
import { connect } from './react-redux'

class Content extends Component {
    static propTypes = {
        themeColor: PropTypes.string,
    }
    
    componentWillUpdate() {
        console.log('will update');
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
        //themeColor2: state.themeColor
    }
}
Content = connect(mapStateToProps)(Content)
export default Content