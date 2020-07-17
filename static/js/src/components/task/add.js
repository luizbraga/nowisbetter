import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import TaskCreateEditForm from '../form/task_form';


export default class CreateTask extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

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

  render() {
    const {list_id} = this.props
    return (
      <div>
        <a onClick={this.handleShow}>Add a task...</a>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <TaskCreateEditForm list_id={list_id} handleClose={this.handleClose}/>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  };
}
