import { RhelenaPresentationModel, globalState } from 'rhelena'
import { uuidToTopicPath, indexCF } from '../../helper'
import manuh from 'manuh'
import each from "async/each"
import cf from './cf.json'
import { isRegExp } from 'util';

export default class HomeModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);

        this.showInputs = false;
        this.fetched = false;
        this.fragments = cf;
        this.notes = [];
        this.fuse = null;
        this.search = '';

        indexCF(cf);        

        manuh.subscribe(`search/result`, 'HomeModel', (msg, info) => {
            if(!info.retained){
                this.showResultElements(msg);
            }
        })

        manuh.subscribe(`note/refresh`, 'HomeModel', (msg, info) => {
            if(!info.retained){
                if(msg.refresh){
                    this.loadNotes();
                }
            }
        })

        this.loadNotes();
    }

    showResultElements(elements) {
        this.fragments = [];
        each(elements, item => {
          globalState[`fragments/${uuidToTopicPath(item.uuid)}/visible/set`] = 1;
          // make all the path visible
          let parentTopicsArr = uuidToTopicPath(item.uuid).split(/-/g);
          while (parentTopicsArr.length > 1) {
            parentTopicsArr = parentTopicsArr.slice(0, parentTopicsArr.length - 1);
            const parent = parentTopicsArr.reduce((a, b) => `${a}-${b}`);
            globalState[`fragments/${parent}/visible/set`] = 1;
          }
        });
        setTimeout(() => {
          this.fragments = cf;
        }, 10);
    }

    loadNotes() {
        fetch(`http://localhost:3001/note/list`, { method: "get", })
            .then(res => res.json())
            .then(res => {
                this.notes = res;
            });
    }

    addNote() {

    }

}