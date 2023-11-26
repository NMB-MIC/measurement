import moment from "moment";
import React, { Component } from "react";
import Swal from "sweetalert2";

import { key, server, YES } from "../../constants/index";
import { httpClient } from "../../utils/HttpClient";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
    };
  }

  autoLogin = async (history) => {
    return () => {
      // alert('autoLogin say : '+localStorage.getItem(key.LOGIN_PASSED))
      if (localStorage.getItem(key.LOGIN_PASSED) === YES) {
        setTimeout(() => history.push("/home"), 100);
      }
    };
  };

  componentDidMount = async () => {
    //this.props.autoLogin(this.props.history);
    this.autoLogin();
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // this.props.login(this.props.history, this.state);
      this.doLogin();
    }
  };

  doLogin = async () => {
    try {
      let login_result = await httpClient.post(server.LOGIN_URL, this.state);
      console.log(login_result);
      if (login_result.data.message !== "OK") {
        console.log(login_result.data);
        Swal.fire({
          icon: "error",
          title: "Log in Fail",
          text: login_result.data.error,
        });

        return;
      } else if (login_result.data.result.levelUser === "GUEST") {
        // console.log(Login_result.data.result.levelUser);
        // return

        Swal.fire({
          icon: "warning",
          title: "Unauthorized User",
          text: "Please contact the administrator for permission.",
        });

        return;
      } else {
        Swal.fire({
          icon: "success",
          title: "Welcome to the web-site of",
          text: "PCMB division",
          showConfirmButton: false,
          //timer: 10000,
        });

        localStorage.setItem(key.LOGIN_PASSED, YES);
        localStorage.setItem(
          key.USER_EMP,
          login_result.data.result.employee_id
        );
        localStorage.setItem(key.TIME_LOGIN, moment());
        localStorage.setItem(key.USER_LV, login_result.data.result.levelUser);
        window.location.replace("/pcmb_instrument");
      }
    } catch (error) {
      return {
        result: "Failed",
        message: error.message,
      };
    }
  };

  render() {
    return (
      <div className="login-page" style={{ maxHeight: 850 }}>
        <div className="login-box" style={{ height: 400, width: 400 }}>
          <div className="login-logo"></div>
          {/* /.login-logo */}
          <div className="card" style={{ height: 300, width: 500 }}>
            <div className="card-body login-card-body">
              <h1 className="login-box-msg"> Measurement website</h1>
              <p className="login-box-msg"> </p>

              <div className="input-group mb-3">
                <input
                  autoFocus
                  style={{ height: 70, width: 80, fontSize: 25 }}
                  value={this.state.password}
                  type="password"
                  className="form-control"
                  placeholder="User card"
                  onChange={(e) => {
                    e.preventDefault();
                    this.setState({ password: e.target.value }, () => {
                      this.doLogin();
                    });
                  }}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              <div className="input-group mb-3" style={{ height: 100 }}>
                <div className="col-12">
                  <div class="social-auth-links text-center mb-3">
                    <a href="/register" class="btn btn-block btn-danger">
                      <i class="fab fa-google-plus mr-2"></i> Register a new
                      user
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
