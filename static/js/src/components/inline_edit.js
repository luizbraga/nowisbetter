import React, {Component} from 'react';


export default class InlineInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        };

        this.elementClick = this.elementClick.bind(this);
        this.elementBlur = this.elementBlur.bind(this);
    }

    doValidations (value) {
        let isValid;
        if(this.props.validate) {
            isValid = this.props.validate(value);
        } else if (this.validate) {
            isValid = this.validate(value);
        } else return true
        this.setState({invalid: !isValid});
        return isValid;
    }

    elementClick (event) {
        this.setState({editing: !this.state.editing});
    }

    elementBlur (event) {
        this.setState({editing: false});

        const {value} = event.target

        this.props.change(
            this.props.element_id, {[event.target.name]: value}
        )
    }

    renderNormalComponent() {
      return(
      <span
        {...this.props.defaultProps}
        className=""
        onClick={this.elementClick}>
          {this.props.value}
      </span>);
    }

    renderEditingComponent() {
      return (
        <input
          defaultValue={this.props.value}
          className="form-control"
          type="text"
          name={this.props.propName}
          onBlur={this.elementBlur}
        />
      )
    }

    render () {
        if(this.state.editing) {
            return this.renderEditingComponent();
        } else {
            return this.renderNormalComponent();
        }
    };
}
