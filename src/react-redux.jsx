import React, { Component } from 'react'
import PropTypes from 'prop-types'


export const connect =  (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
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
            //因为每个组件关注的共享数据都各不相同，因而需要mapStateToProps函数告诉Connect组件去store的state中取哪些数据
            const stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}
            console.log(store.getState())
            console.log(stateProps)
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

export class Provider extends Component {
    static propTypes = {
        store: PropTypes.object,
        children: PropTypes.any
    }

    static childContextTypes = {
        store: PropTypes.object
    }

    //getChildContext这个方法就是设置context的过程，它返回的对象就是context，所有的子组件都可以访问到这个对象
    getChildContext() {
        return { store: this.props.store }
    }

    render() {
        //Provider就是一个容器组件，会把嵌套的内容原封不动作为自己的子组件渲染出来。
        return (
            <div>
                { this.props.children }
            </div>
        )
    }
    
}

