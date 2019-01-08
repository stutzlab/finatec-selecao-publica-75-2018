import { RhelenaPresentationModel, globalState } from 'rhelena';
import { uuidToTopicPath } from '../../helper'
import manuh from 'manuh'

export default class FragmentModel extends RhelenaPresentationModel {
    constructor(node){
        super();

        // this.nodeItem = node;
        this.titulo = node.titulo;
        this.uuid = node.uuid;
        this.conteudo = node.conteudo;

        if(this.uuid.indexOf('inciso') != -1 || this.uuid.indexOf('alinea') != -1){
            this.ligacao = '';
        }else{
            this.ligacao = ' - ';
        }

        manuh.subscribe(`fragments/${uuidToTopicPath(this.uuid)}/visible/set`, `Fragment-${this.uuid}`, (msg, info)=> {
            if(!info.retained){
                this.visible = msg;
            }
        })
        this.visible = globalState[`fragments/${uuidToTopicPath(this.uuid)}/visible/set`]
        this.visible = this.visible == null ? 1 : this.visible
    }



}