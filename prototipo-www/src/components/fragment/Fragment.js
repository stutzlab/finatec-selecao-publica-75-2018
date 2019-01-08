import React, { Component } from 'react'
import { attachModelToView } from 'rhelena'

import FragmentModel from './FragmentModel'
import fragmentStyle from './Fragment.css'

export default class Fragment extends Component {

    componentWillMount() {
        attachModelToView(new FragmentModel(this.props.node), this)
    }

    render() {
        if(this.state.visible == 0) {
            return (<div></div>);
        }
        return (
            <div>
                <span>{this.state.nodeItem.titulo}</span>
                <span>{this.state.nodeItem.conteudo}</span>
            </div>
        )
    }
}