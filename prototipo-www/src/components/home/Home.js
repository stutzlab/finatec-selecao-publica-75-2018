import React, { Component } from 'react'
import { attachModelToView } from 'rhelena'

import { Grid, Row, Col } from 'react-flexbox-grid'
import homeStyle from './Home.css'
import HomeModel from './HomeModel'

import Fragment from '../fragment/Fragment'
import SearchBar from '../search-bar/SearchBar'
import Note from '../note/Note'

export default class Home extends Component {

    componentWillMount() {
        attachModelToView(new HomeModel(), this)
    }

    render() {
        return (
            <div className={homeStyle.wrap}>
                <Grid fluid style={{ minWidth: '100%' }}>
                    <Row>
                        <Col xs={9} md={9}>
                            <Row>
                                <Col xs={12} md={12} style={{ display: "flex"}}>
                                    <SearchBar></SearchBar>
                                </Col>
                                <Col xs={12} md={12}>
                                    { this.state.fragments.map(f => <Fragment key={f.uuid} node={f}></Fragment> )}
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={3} md={3} style={{background: "#FBFBFB", paddingLeft: "1rem", borderLeft:"1px solid #F3F3F3"}}>
                            <Row>
                                <Col xs={12} md={12}>
                                    <h3>Nova Anotação</h3>
                                    <div>
                                        <Note note={{ note: "" }} editable></Note>
                                    </div>

                                    <h3 style={{marginBottom: 0}}>Anotações</h3>
                                    <h5>(clique duas vezes para editar)</h5>
                                    { this.state.notes.map(n => <Note note={n}></Note> )}
                                    
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        
                    </Row>
                </Grid>
            </div>
        )
    }
}