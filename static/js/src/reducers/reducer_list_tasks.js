import _ from 'lodash';
import {CREATE_EMPTY_LIST} from '../constants';
import {CREATE_TASK_LIST} from '../constants';
import {UPDATE_TASK_LIST} from '../constants';
import {FETCH_LIST} from '../constants';
import {DELETE_LIST} from '../constants';

import {CREATE_EDIT_TASK} from '../constants';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_LIST:
      return _.omit(state, action.payload);

    case CREATE_EMPTY_LIST:
      return { ...state, ['temp']: {'id': 'temp', 'title': ''} }
    
    case CREATE_TASK_LIST:
      const newState = _.omit(state, ['temp'])
      return { ...newState, [action.payload.data.id]: action.payload.data }
    
    case UPDATE_TASK_LIST:
      return { ...state, [action.payload.data.id]: action.payload.data }
    
    case FETCH_LIST:
      // create a list of objects based on a key
      const data = _.mapKeys(action.payload.data, 'id')
      _.map(data, task_list => {
        data[task_list.id].tasks = _.mapKeys(task_list.tasks, 'id')
      });
      return data

    case (CREATE_EDIT_TASK):
      const task = action.payload.data
      const new_task_list = {...state[task.list_id].tasks, }
      new_task_list[task.id] = task;

      const tasklist = state[task.list_id]
      tasklist.tasks = new_task_list

      return {...state, [tasklist.id]: tasklist }

    default:
      return state;
  }

}
