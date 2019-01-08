import { RhelenaPresentationModel, globalState } from 'rhelena';
import { uuidToTopicPath } from '../../helper'
import manuh from 'manuh'

export default class FragmentModel extends RhelenaPresentationModel {
    constructor(node){
        super();

        this.nodeItem = node;
        this.uuid = node.uuid;
        this.conteudo = node.conteudo;

        manuh.subscribe(`fragments/${uuidToTopicPath(this.nodeItem.uuid)}/visible/set`, `Fragment-${this.nodeItem.uuid}`, (msg, info)=> {
            if(!info.retained){
                this.visible = msg;
            }
        })
        this.visible = globalState[`fragments/${uuidToTopicPath(this.uuid)}/visible/set`]
        this.visible = this.visible == null ? 1 : this.visible
    }



}