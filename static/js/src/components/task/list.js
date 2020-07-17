import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import TaskCreateEditForm from '../form/task_form';
import {editTask} from '../../actions';



export default class ListTask extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCheck = this.handleCheck.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleCheck(event) {
    const { taskData } = this.props
    const {checked} = event.target
    taskData.is_done = checked
    taskData.list_id = this.props.list_id
    editTask(taskData.id, taskData)
  }

  render() {
    const { taskData } = this.props;
    const { list_id } = this.props;


    return (
      <li className="list-group-item">
        <div className="checkbox-inline">
          <input type="checkbox" defaultChecked={taskData.is_done} onChange={this.handleCheck} />
          <div onClick={this.handleShow}> {taskData.title}</div>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <TaskCreateEditForm
                initialValues={taskData}
                list_id={list_id}
                handleClose={this.handleClose}
              />
            </div>
          </Modal.Body>
        </Modal>
      </li>
    )
  }
}
