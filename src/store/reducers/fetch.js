import {updateObject} from '../utility';

const initialState = {
    err: false,
    songs: [],
    loading: false,
    length: 0
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case "FETCH_START":
            return updateObject(state, {
                err: false,
                loading: true,
            });
        case "FETCH_SUCCESS":
              return updateObject(state, {
                err: false,
                loading: false,
                songs: action.res,
                length: action.len
              });
        case "FETCH_FAIL":
            return updateObject(state, {
                err: true,
                loading: false
            });
        default: return state    
    }
}

export default reducer;