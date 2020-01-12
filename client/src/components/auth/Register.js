import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      companyName: "",
      phoneNumber: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      companyName: this.state.companyName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(JSON.stringify(newUser));
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 form-group text-white mx-auto">
            <Link to="/" className="">Back to home</Link>
            <div className="">
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("form-control", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="text-danger">{errors.email}</span>
              </div>
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("form-control", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="text-danger">{errors.password}</span>
              </div>
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("form-control", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              {/* First name */}
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.firstName}
                  error={errors.firstName}
                  id="firstName"
                  type="text"
                  className={classnames("form-control", {
                    invalid: errors.firstName
                  })}
                />
                <label htmlFor="name">First Name</label>
                <span className="text-danger">{errors.firstName}</span>
              </div>
              {/* Last name */}
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.lastName}
                  error={errors.lastName}
                  id="lastName"
                  type="text"
                  className={classnames("form-control", {
                    invalid: errors.lastName
                  })}
                />
                <label htmlFor="name">Last Name</label>
                <span className="text-danger">{errors.lastName}</span>
              </div>
              {/* Company name */}
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.companyName}
                  error={errors.companyName}
                  id="companyName"
                  type="text"
                  className={classnames("form-control", {
                    invalid: errors.companyName
                  })}
                />
                <label htmlFor="name">Company Name</label>
                <span className="text-danger">{errors.companyName}</span>
              </div>
              {/* Phone Number */}
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.phoneNumber}
                  error={errors.phoneNumber}
                  id="phoneNumber"
                  type="text"
                  className={classnames("form-control", {
                    invalid: errors.phoneNumber
                  })}
                />
                <label htmlFor="name">Phone Number</label>
                <span className="red-text">{errors.phoneNumber}</span>
              </div>

              <div className="">
                <button
                  type="submit"
                  className="btn bg-light"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
