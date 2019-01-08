import Fuse from 'fuse.js'
import each from 'async/each'
import { globalState } from 'rhelena'
let _fuseIndex = null;
let _cf = [];

export let userData = {
  auth : window.localStorage.getItem("prototipo.auth.user.auth") ? JSON.parse(localStorage.getItem("prototipo.auth.user.auth")) : false,
  token: window.localStorage.getItem("prototipo.auth.user.token") ? JSON.parse(localStorage.getItem("prototipo.auth.user.token")) : null
}
    
export const setUserData = userDataParam => {
  console.log(userDataParam);
  if(!userDataParam){
    delete window.localStorage["prototipo.auth.user.auth"]
    delete window.localStorage["prototipo.auth.user.token"]
    userData.auth = false;
    userData.token = null;
  }else{
    window.localStorage.setItem("prototipo.auth.user.auth", JSON.stringify(userDataParam.auth));
    window.localStorage.setItem("prototipo.auth.user.token", JSON.stringify(userDataParam.token));
  }
};

export const uuidToTopicPath = uuid => {
  if(uuid != undefined){
    return uuid.toLowerCase();
  }
};

export const indexCF = cf => {
  let options = {
    shouldSort: true,
    // tokenize: true,
    matchAllTokens: true,
    findAllMatches: true,
    threshold: 0.2,
    location: 0,
    distance: 100,
    // maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "conteudo"
    ]
  };
  _fuseIndex = new Fuse(cf, options);
  _cf = cf; 
}

export const search = text => {
  let result = [];
  if(text.length > 1){
    result = _fuseIndex.search(text);
  }else{
    result = _cf;
  }
  return result
}

export const resetResultTree = text => {
  //reset result tree
  each(_cf, item => {
      if (text.trim().length > 0) {
          globalState[`fragments/${uuidToTopicPath(item.uuid)}/displayChildren/set`] = 1;
          globalState[`fragments/${uuidToTopicPath(item.uuid)}/visible/set`] = 0;
      } else {
          globalState[`fragments/${uuidToTopicPath(item.uuid)}/displayChildren/set`] = null;
          globalState[`fragments/${uuidToTopicPath(item.uuid)}/visible/set`] = 1;
      }
  });
}