import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Task from './Task';
import { patchTask } from '../../actions';
import QuickNewTask from './QuickNewTask';
import './ListTask.css'


class ListTask extends Component {
    state = {
        uncompletedList: [],
        doneList: []
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { taskList } = nextProps
        const uncompletedList = _.filter(taskList, (o) => {return !o.is_done})
        const doneList = _.filter(taskList, 'is_done')
        return uncompletedList === prevState.uncompletedList && doneList == prevState.doneList
            ? {}
            : { uncompletedList, doneList }
    }

    handleCheck = (event) => {
        const { checked } = event.target
        const { id } = event.target
        this.props.patchTask(id, {'is_done': checked})
    }

    renderTaskLists(taskList, isDone) {
        const { taskListId } = this.props;
        return (
            <ul className={`list-group${isDone == true ? ' completed' : ''}`}>
                {
                    taskList.length === 0
                    ? <div></div>
                    : _.map(taskList, task => {
                        return (
                            <Task key={task.id}
                                  taskData={task}
                                  list_id={taskListId}
                                  onChange={this.handleCheck}/>
                        )
                    })
                }
                {isDone == true ? <div></div> : <QuickNewTask taskListId={taskListId} />}
            </ul>
        )
    }

    render() {
        const { uncompletedList } = this.state;
        const { doneList } = this.state;
        return (
            <div>
                { this.renderTaskLists(uncompletedList) }
                { doneList.length === 0 ? <div></div> : <hr></hr> }
                {this.renderTaskLists(doneList, true)}
            </div>
        )
    }
}

export default connect(
    null,
    { patchTask }
  )(ListTask);