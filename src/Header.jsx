import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Connect from './Connect'

class Header extends Component {

    static propTypes = {
        themeColor: PropTypes.string
    }

    render() {
        return (
            <h1 style={{ color: this.props.themeColor }}>React book</h1>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        themeColor: state.themeColor
    }
}
Header = Connect(mapStateToProps)(Header)
export default Header