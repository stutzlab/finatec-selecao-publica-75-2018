import React, { Component } from 'react'
import { attachModelToView } from 'rhelena'

import SearchBarModel from './SearchBarModel'

export default class SearchBar extends Component {

    componentWillMount() {
        attachModelToView(new SearchBarModel(), this)
    }

    render() {
        return (
            <input placeholder="Pesquise aqui" type="text" onChange={(e) => this.viewModel.filterItem(e.target.value)} />
        )
    }
}