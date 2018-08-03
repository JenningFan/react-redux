import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default (mapStateToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }

        constructor() {
            super()
            this.state = { allProps: {} }
        }

        componentWillMount() {
            const { store } = this.context
            this._updateProps()
            store.subscribe(() => { this._updateProps() })
        }

        _updateProps() {
            const { store } = this.context
            console.log(store)
            const stateProps = mapStateToProps(store.getState(), this.props)
            this.setState({
                allProps: {
                    ...stateProps,
                    ...this.props
                }
            })
        }

        render() {
            return (
                <WrappedComponent {...this.state.allProps} />
            )
        }
    }
    return Connect
}

