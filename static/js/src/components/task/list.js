import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Task from './task';
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

    render() {
        const { taskListId } = this.props;
        const { uncompletedList } = this.state;
        const { doneList } = this.state;
        return (
            <div>
                <ul className="list-group">
                {
                    _.map(uncompletedList, task => {
                        return (
                            <Task key={task.id} taskData={task} list_id={taskListId} onChange={this.handleCheck}/>
                        );
                    })
                }
                </ul>
                <ul className="list-group done">
                {
                    _.map(doneList, task => {
                        return (
                            <Task key={task.id} taskData={task} list_id={taskListId} onChange={this.handleCheck}/>
                        );
                    })
                }
                </ul>
            </div>
        )
    }
}

export default connect(
    null,
    { patchTask }
  )(ListTask);