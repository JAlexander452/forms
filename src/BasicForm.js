import React from 'react';
import ReactDOM from 'react-dom/client';
class BasicForm extends React.Component {
  static displayName = "basic-input";
  state = {
    names: [],
    email: '',
    phone: '',
    formErrors: { email: '', phone: '' },
    emailValid: false,
    phoneValid: false,
    formValid: false
  };

  onFormSubmit = (evt) => {
    const name = this.refs.name.value;
    const email = this.state.email;
    const phone = this.state.phone;
    const names = [...this.state.names, { name, email, phone }];
    this.setState({ names: names });
    this.refs.name.value = '';
    this.setState({ email: '', phone: '', formErrors: { email: '', phone: '' } });
    evt.preventDefault();
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'phone':
        phoneValid = value.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
        fieldValidationErrors.phone = phoneValid ? '' : ' is invalid';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      phoneValid: phoneValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.phoneValid });
  }

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            ref='name'
          />
          <input
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}
          />
          <span style={{ color: "red" }}>{this.state.formErrors.email}</span>
          <input
            name="phone"
            placeholder="Phone Number"
            value={this.state.phone}
            onChange={this.handleUserInput}
          />
          <span style={{ color: "red" }}>{this.state.formErrors.phone}</span>
          <input type='submit' disabled={!this.state.formValid} />
        </form>
        <div>
          <h3>Names</h3>
          <ul>
            {this.state.names.map((person, i) => (
              <li key={i}>
                {person.name} - {person.email} - {person.phone}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default BasicForm;