import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createTask } from '../../actions';

import './QuickNewTask.css'

class QuickNewTask extends Component {

    state = {
        taskTitle: ''
    }

    handleOnChange = (event) => {
        this.setState({taskTitle: event.target.value})
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.dispatchNewTask(event)
        }
    }

    dispatchNewTask = (event) => {
        const { taskListId } = this.props
        const { taskTitle } = this.state
        taskTitle !== ''
            ? this.props.createTask({
                    list_id: taskListId,
                    title: this.state.taskTitle
              })
            : null
        this.setState({taskTitle: ''}) 
    }

    render () {
        const { taskListId } = this.props
        if (taskListId === 'temp') {
            return <div></div>
        }
        return (
            <li className="list-group-item">
                <div className="checkbox-inline">
                    <input type="checkbox" disabled />
                    <input
                        className="quick-new-task"
                        type="text"
                        name='name'
                        placeholder='List item'
                        value={this.state.taskTitle}
                        onBlur={this.dispatchNewTask}
                        onChange={this.handleOnChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </div>
            </li>
        )
    }
}


export default connect(
    null,
    { createTask }
)(QuickNewTask);
