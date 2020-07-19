import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import TaskCreateEditForm from '../form/TaskCreateEditForm';
import './CreateTask.css'

export default class CreateTask extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    const {taskListId} = this.props
    return (
      <div className="center-icon">
        <i class="fa fa-plus" aria-hidden="true" onClick={this.handleShow}></i>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <TaskCreateEditForm
                taskListId={taskListId}
                handleClose={this.handleClose}/>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  };
}
