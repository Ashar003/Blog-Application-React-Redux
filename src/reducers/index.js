import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; //renaming the reducer property (alias)
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
  
});

export default rootReducer;
