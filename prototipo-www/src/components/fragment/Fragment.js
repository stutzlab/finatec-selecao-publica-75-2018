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
        let computedStyle = [fragmentStyle.wrap]
        if (this.state.titulo.toLowerCase().match("art")) {
            computedStyle.push(fragmentStyle.break)
        }
        if (this.state.titulo.toLowerCase().match("cap")) {
            computedStyle.push(fragmentStyle.doubleBreak)
        }
        if (this.state.titulo.toLowerCase().match("tulo")) {
            computedStyle.push(fragmentStyle.doubleBreak)
        }
        return (
            <div className={computedStyle.join(' ')}>
                <strong>{this.state.titulo}</strong>
                <span>{this.state.ligacao}</span>
                <span style={{flex:1}}>{this.state.conteudo}</span>
            </div>
        )
    }
}