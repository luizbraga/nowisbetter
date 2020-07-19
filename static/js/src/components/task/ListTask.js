import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Task from './Task';
import { patchTask } from '../../actions';


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
        return taskList.length === 0
            ? <div></div>
            : <ul className={`list-group${isDone == true ? ' completed' : ''}`}>
                {
                    _.map(taskList, task => {
                        return (
                            <Task key={task.id}
                                    taskData={task}
                                    list_id={taskListId}
                                    onChange={this.handleCheck}/>
                        )
                    })
                }
            </ul>
    }

    render() {
        const { uncompletedList } = this.state;
        const { doneList } = this.state;
        return (
            <div>
                { this.renderTaskLists(uncompletedList) }
                { this.renderTaskLists(doneList, true) }
            </div>
        )
    }
}

export default connect(
    null,
    { patchTask }
  )(ListTask);