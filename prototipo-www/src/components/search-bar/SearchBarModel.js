import { RhelenaPresentationModel } from 'rhelena'
import { search, resetResultTree } from '../../helper'
import manuh from 'manuh'

export default class SearchBarModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);
    }

    filterItem(text){
        let result = search(text);
        resetResultTree(text);
        manuh.publish(`search/result`, result);
    }

    

}