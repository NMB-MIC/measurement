import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { Component } from "react";
import { key, YES } from "./constants";
import { APP_TITLE } from "./constants";

//import HookMqtt from './components/MQTT_Hook/'

// Components from Utils
import Header from "./components/header/header";
import SideMenu from "./components/sideMenu/sideMenu";
import Footer from "./components/footer/footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/register";
import Main from "./components/main/Main";
import Pcmb_instrument from "./components/instruments/pcmb_instrument";
import Instrument from "./components/instruments/instrument";
import XbarChart from "./components/xbarChart/xbarChart";
// import Mitutoyo from "./components/instruments/mitutoyo";

const isLoggedIn = () => {
  //return true if === YES
  return localStorage.getItem(key.LOGIN_PASSED) === YES;
};
const SecuredRoute = ({ children }) => {
  if (isLoggedIn()) {
    return children;
  }
  return <Navigate to="/login" />
};

// const SecuredRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     element={isLoggedIn() === true ? <Component /> : <Navigate to="/login" />}
//   />
// );

const SecuredAdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    element={
      isLoggedIn() === true ? (
        localStorage.getItem(key.USER_LV) === "admin" ? (
          <Component />
        ) : (
          <Navigate to="/main" />
        )
      ) : (
        <Navigate to="/login" />
      )
    }
  />
);

class App extends Component {
  componentDidMount() {}

  redirectToLogin = () => {
    return <Navigate to="/login" />;
  };
  render() {
    document.title = APP_TITLE;

    return (
      <BrowserRouter>
        <div className="App">
          {isLoggedIn() && <Header />}
          {isLoggedIn() && <SideMenu />}

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />

            <Route path="/main" element={<Main />} />

            <Route
              path="/pcmb_instrument"
              element={
                <SecuredRoute>
                  {" "}
                  <Pcmb_instrument />{" "}
                </SecuredRoute>
              }
            />
             {/* <Route path="/master_spec" element={
              <SecuredAdminRoute>
                <MasterSpec />
              </SecuredAdminRoute>
            } /> */}
            <Route path="/instrument" element={<Instrument />} />
            <Route path="/xbarChart" element={<XbarChart />} />
            {/* <Route path="/mitutoyo" element={<Mitutoyo />} /> */}

            <Route path="/" element={<this.redirectToLogin />} />
            <Route path="*" element={<this.redirectToLogin />} />
          </Routes>

          {<Footer />}
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
