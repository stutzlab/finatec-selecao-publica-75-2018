import { RhelenaPresentationModel } from 'rhelena'
import { search, resetResultTree } from '../../helper'
import manuh from 'manuh'

export default class SearchBarModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);

        this.searchText = '';
        this.searchTimer = null;
    }

    filterItem(text){
        let result = search(text);
        resetResultTree(text);
        manuh.publish(`search/result`, result);
    }

    setSearchText(newSearchText) {
        this.searchText = newSearchText; 
    }

    handleSearch(text) {
        this.setSearchText(text);
        if (this.searchText.length == 0) {
          this.filterItem('');
        } else if (!!this.searchText && this.searchText.length > 3) {
          //auto-search
          this.scheduleSearch();
        }
      }

    updateSearchText(newSearchText) {
        if (newSearchText != undefined) {
            this.handleSearch(newSearchText);
        }
    }

    scheduleSearch() {
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(() => {
            this.filterItem(this.searchText);
        }, 1500);
    }

    instantSearch(e){
        if(e.key === "Enter"){
            clearTimeout(this.searchTimer);
            this.filterItem(this.searchText);
        }
    }
    

}