import React from "react";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillUnmount() {
    this.props.removeSessionErrors();
  }

  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit() {
    return e => {
      e.preventDefault();
      if (this.props.formType === "artistSignup") {
        this.setState({ artistname: this.state.username }, 
          () => {
            this.props.signup(this.state)}
        )
      } else {
        this.props.signup(this.state)
      }
    }
  }

  renderErrors() {
    return this.props.errors[0] ? (
      <ul className="signup-errors">
        {this.props.errors.map((error, idx) => {
          return (
            <li className="signup-error" key={idx}>
              {error}
            </li>
          );
        })}
      </ul>
    ) : null;
  }

  render() {
    const { formType, openModal } = this.props;

    const name = formType === "artistSignup" ? "Enter Artist/Band Name" : "Enter Username"

    const AltUserLink = formType === "userSignup" ? (
      <div
        onClick={() => openModal("artistSignup")}
        className="session-form-link"
        >
        Go to Artist Signup
      </div>
    ) : (
      <div
        onClick={() => openModal("userSignup")}
        className="session-form-link"
      >
        Go to User Signup
      </div>
    );

    const AltFormLink = formType === "userSignup" ? (
      <div
        onClick={() => openModal("userLogin")}
        className="session-form-link"
      >
        Already have an account? Log in
      </div>
    ) : (
      <div
        onClick={() => openModal("artistLogin")}
        className="session-form-link"
      >
        Already have an account? Log in
      </div>
    );

    const ErrorList = this.renderErrors();

    const formTitle = formType === "userSignup" ? "DistanSing User Signup" : "DistanSing Artist Signup"

    return (
      <div className="signup-form">
        <div className="form-title">{formTitle}</div>
        {ErrorList}
        <form onSubmit={this.handleSubmit()} className="signup-form-form"> 
          <input 
            type="text"
            placeholder={ name }
            value={this.state.username}
            onChange={this.handleChange("username")}
          />

          <input 
            type="text"
            value={this.state.email}
            placeholder="Enter Email"
            onChange={this.handleChange("email")}
          />
          
          <input 
            type="password"
            placeholder="Create Password"
            value={this.state.password}
            onChange={this.handleChange("password")}
          />
          <div className="session-form-button">
            <button className="session-form-filter">Sign Up</button>
          </div>
        </form>
        {AltFormLink}
        {AltUserLink}
      </div>
    );
  }
}

export default SignupForm;
