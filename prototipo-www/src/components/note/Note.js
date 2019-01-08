import React, { Component } from 'react'
import { attachModelToView } from 'rhelena'

import NoteModel from './NoteModel'
import noteStyle from './Note.css'

export default class Note extends Component {

    componentWillMount() {
        attachModelToView(new NoteModel(this.props.note, this.props.editable), this)
    }

    editable(){
        return (
            <div>
                <textarea rows={Math.floor(this.state.text.length/80)}
                    style={{width: "90%", minHeight: "100px"}}
                    defaultValue={this.state.text}
                    ref={(component) => this.viewModel.setTextArea(component) }
                    onChange={(e)=>{ this.viewModel.updateContent(e.target.value) }}
                >
                </textarea>
                <div>
                    <button type="button" onClick={(e) => this.viewModel.save()}>Salvar</button>
                    <button type="button" className={noteStyle.cancel} onClick={(e) => this.viewModel.cancel()}>Cancelar</button>
                </div>
            </div>
        )
    }

    staticNote(){
        return (
            <div className={noteStyle.card}>
                <span onDoubleClick={(e) => { e.stopPropagation(); this.viewModel.editComment() }}>
                    {this.state.text}
                </span>
            </div>
        )
    }

    render() {
        return (
            <div style={{"marginBottom": "1rem"}}>
                { !this.state.inEdition && this.staticNote()}
                { this.state.inEdition && this.editable()}
            </div>
        )
    }
}