import _ from 'lodash';
import React, {Component} from 'react';
import Task from './task';
import { patchTask } from '../../actions';


class ListTask extends Component {
    state = {
        taskList: [],
        uncompletedList: [],
        doneList: []
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return nextProps.taskList === prevState.taskList
            ? {}
            : {
                taskList: nextProps.taskList,
                uncompletedList: _.filter(nextProps.taskList, (o) => {return !o.is_done}),
                doneList: _.filter(nextProps.taskList, 'is_done')
            }
    }

    handleCheck = (event) => {
        const { checked } = event.target
        const { id } = event.target
        patchTask(id, {'is_done': checked})
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

export default ListTask;