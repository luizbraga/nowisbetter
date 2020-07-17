import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import TaskListReducer from './reducer_list_tasks';
import UserReducer from './reducer_users';



const rootReducer = combineReducers({
  task_lists: TaskListReducer,
  users: UserReducer,
  form: formReducer,
});

export default rootReducer;
