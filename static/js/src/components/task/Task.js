import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import TaskCreateEditForm from '../form/TaskCreateEditForm';


export default class Task extends Component {
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
    const { taskData } = this.props;
    const { list_id } = this.props;

    return (
      <li className="list-group-item">
        <div className="checkbox-inline">
          <input type="checkbox" id={taskData.id} defaultChecked={taskData.is_done} onChange={this.props.onChange} />
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
