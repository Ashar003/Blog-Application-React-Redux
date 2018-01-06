import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function (state = {} , action){//we will default the state to be a empty a object
    switch (action.type){
        case DELETE_POST:
            return _.omit(state, action.payload);
        case FETCH_POST:
       // const post = action.payload.data;
       // const newState = { ...state };
       // newState[post.id] = post;
        //return newState;

        return { ...state, [action.payload.data.id]: action.payload.data}; //Identical to es5 code above
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
             

    default:
        return state;
    }
}

//With help of lodash we can extract one propety from the array and set the contents of the array as an object