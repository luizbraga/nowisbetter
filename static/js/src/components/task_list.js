import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchLists} from '../actions';
import {fetchUsers} from '../actions';
import {createEmptyTaskList} from '../actions';
import {createTaskList} from '../actions';
import {updateTaskList} from '../actions';
import InlineInput from './inline_edit';

import CreateTask from './task/add';
import ListTask from './task/list';


class TaskListIndex extends Component {
  componentDidMount() {
    this.props.fetchLists();
    this.props.fetchUsers();
  }

  renderTitle(task_list) {
    const {title} = task_list
    if (title) {
      return (
        <InlineInput
          value={title}
          change={this.props.updateTaskList}
          propName='title'
          element_id={task_list.id} />
      )
    } else {
      return (
        <input
          className="form-control"
          type="text"
          name="title"
          onBlur={(e)=>this.props.createTaskList(task_list.id, e.target.value)}
        />)
    }
  }

  renderTaskList() {
    return _.map(this.props.task_lists, task_list => {
      const { tasks } = task_list
      return (
        <li className="list-group-item col-lg-3" key={task_list.id}>
          {this.renderTitle(task_list)}
          <ListTask taskListId={task_list.id} taskList={tasks} />
          <CreateTask list_id={task_list.id} />
        </li>
      );
    })
  }

  onCreateClick = () => {
    this.props.createEmptyTaskList();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-3">
            <h4>Tasks</h4>
          </div>
          <div className="col-lg-9">
            <button
              className="btn btn-default pull-right"
              onClick={this.onCreateClick}>
              Add a List
            </button>
          </div>
        </div>
        <div className="row">
          <ul className="list-group">
            {this.renderTaskList()}
          </ul>
        </div>
      </div>
    )
  }
}

// Consuming from state
function mapStateToProps(state) {
  return {task_lists: state.task_lists}
}

// Identical to mapFetchPostoToProps
// If u want to do some computation, create the function
export default connect(
    mapStateToProps,
    { fetchLists, fetchUsers, createEmptyTaskList, createTaskList, updateTaskList }
  )(TaskListIndex);
