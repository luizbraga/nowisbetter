import React, {Component} from 'react';
import Select from 'react-select';

import 'react-select/dist/react-select.css'


export default class MultiselectComponent extends Component {

  multiChangeHandler(func) {
    return function handleMultiHandler(values) {
      func(values.map(value => value.value));
    };
  }

  render() {
    const { input } = this.props;
    const {meta: {touched, error}} = this.props;
    const class_name = `form-group ${touched && error ? 'has-danger':''}`

    return (
			<div className={class_name}>
				<label>{this.props.label}</label>
				<Select
					multi
          { ...input}
          removeSelected={true}
          onBlur={() => input.onBlur(input.value)}
          onChange={this.multiChangeHandler(input.onChange)}
          options={this.props.options}
				/>
        <div className="text-help">
          {touched ? error: ''}
        </div>
      </div>
    );
  }

}
