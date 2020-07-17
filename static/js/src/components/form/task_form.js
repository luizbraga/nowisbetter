import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import {editTask, createTask} from '../../actions';
import DatePickerComponent from './datepicker';
import MultiselectComponent from './multiselect';
import { push } from 'react-router-redux';


class TaskCreateEditForm extends Component {

  renderField(field) {
    const {meta: {touched, error}} = field;
    const class_name = `form-group ${touched && error ? 'has-danger':''}`

    return(
      <div className={class_name}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error: ''}
        </div>
      </div>
    )
  }

  renderContentField(field) {
    return(
      <div className="form-group">
        <label>{field.label}</label>
        <textarea
          className="form-control"
          type="text"
          {...field.input}
        />
        {field.meta.touched ? field.meta.error: ''}
      </div>
    )
  }

  onSubmit(values) {
    const {initialValues} = this.props
    values['list_id'] = this.props.list_id

    if (!initialValues) {
      this.props.createTask(values)
    }else {
      this.props.editTask(initialValues.id, values);
    }

    this.props.handleClose();

  }

  render(){
    const {handleSubmit, error} = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {error && <strong>{error}</strong>}
        <Field
          name="title"
          component={this.renderField}
          label="Title"
        />
        <Field
          name="description"
          component={this.renderContentField}
          label="Description"
        />
        <Field
         name="deadline"
         component={DatePickerComponent}
         label="Due Date"
        />
        <Field
         name="user_ids"
         component={MultiselectComponent}
         label="Assigned Users"
         options={this.props.all_users}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>

      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Please enter a title!"
  }
  if (!values.user_ids) {
    errors.user_ids = "Please assign this task to a User"
  }

  return errors
}

function maptStateToProps(state) {
  return {
      all_users: state.users,
  }
}

export default reduxForm({
      validate,
      form: 'TaskCreateEditForm'
    })(
      connect(maptStateToProps, {createTask, editTask})(TaskCreateEditForm)
    );
