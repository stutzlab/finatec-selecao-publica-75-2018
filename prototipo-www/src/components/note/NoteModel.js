import { RhelenaPresentationModel, globalState } from 'rhelena';
import { uuidToTopicPath } from '../../helper'
import manuh from 'manuh'

export default class NoteModel extends RhelenaPresentationModel {
    constructor(noteItem, editable){
        super();

        // manuh.subscribe(`fragments/${uuidToTopicPath(this.nodeItem.uuid)}/visible/set`, `Fragment-${this.nodeItem.uuid}`, (msg, info)=> {
        //     if(!info.retained){
        //         this.visible = msg;
        //     }
        // })

        this.editable = editable;
        this.inEdition = editable;
        this.id = noteItem._id ? noteItem._id : null;
        this.text = noteItem.note ? noteItem.note : '' ;    
    }

    editComment(){
        this.inEdition = true;
    }

    updatePropsContent(props){
        this.id = props.note._id ? props.note._id : null;
        this.text = props.note.note ? props.note.note : '' ;    
    }

    saveContent(){
        let data = {
            note: this.text
        }
        if(this.id != null){
            data['_id'] = this.id;
        }
        fetch(`http://localhost:3001/note`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => {
            console.log("response", response);
            if (response.status == 200) {
                console.log(`response code 200`);
                this.updateStatus = 0;
                if(this.editable){
                    console.log(`editable`);
                    this.cleanText();
                    manuh.publish('note/refresh', { refresh: true });
                }else{
                    this.inEdition = false;
                    this.textarea = undefined;    
                }
                this.onFocus = false;
            } else {
                console.log(`response code ${response.status}`)
                this.updateStatus = 1;
                console.log('Save Failed!')
            }
        });
    }

    save(){
        console.log('Call save function!!');
        this.saveContent();
    }

    setTextArea(component) {
        if(component && !this.onFocus){
            setTimeout(()=>{
                component.focus();
                component.scrollTop = 0;
                component.selectionEnd= 0;
                this.onFocus = true;
            }, 10);
        }
    }

    cancel(){
        this.onFocus = false;
        if(this.editable){
            this.text = ''
        }else{
            this.inEdition = false;
            this.textarea = undefined;
        }
    }

    handleChange = (newValue, actionMeta) => {
        this.value = newValue;
    };

    updateContent(value){
        this.text = value;
    }

    cleanText() {
        console.log('Call of cleanText')
        this.text = '';
    }

}