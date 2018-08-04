import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
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
            const stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}
            //注意此处是取store.dispatch函数指针传入mapDispatchToProps
            const dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {}
            this.setState({
                allProps: {
                    ...stateProps,
                    ...dispatchProps,
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

