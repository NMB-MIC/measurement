import React, { Component } from "react";
import { httpClient } from "../../utils/HttpClient";
import { key, server, YES } from "../../constants/index";
import Swal from "sweetalert2";

import mqtt from "precompiled-mqtt";
import moment from "moment";
import { MQTT_PATH } from "../../constants";

class Pcmb_instrument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TIMESTAMP: moment().format("YYYY-MM-DD HH:mm:ss"),
      MACHINE: "",
      MODEL: "",
      TOTAL_LG: "",
      LG_STEP_OD: "",
      LG_STEP_ID_CP: "",

      ID_TOP: "",
      ID_BOTTOM: "",

      OD1: "",
      OD2: "",
      OD3: "",
    };
  }

  handleChange = () => {
    var get_MACHINE = "";
    var get_MODEL = "";

    var get_TOTAL_LG = "";
    var get_LG_STEP_OD = "";
    var get_LG_STEP_ID_CP = "";

    var get_ID_TOP = "";
    var get_ID_BOTTOM = "";

    var get_OD1 = "";
    var get_OD2 = "";
    var get_OD3 = "";

    var client = mqtt.connect(MQTT_PATH.ADDRESS_1885);

    client.on("connect", () => {
      console.log("connected");

      client.subscribe("Turning/MACHINE");
      client.subscribe("Turning/MODEL");

      client.subscribe("Heidanhain/TOTAL_LG");
      client.subscribe("Heidanhain/LG_STEP_OD");
      client.subscribe("Heidanhain/LG_STEP_ID_CP");

      client.subscribe("Air/ID_TOP");
      client.subscribe("Air/ID_BOTTOM");

      client.subscribe("TM/OD1");
      client.subscribe("TM/OD2");
      client.subscribe("TM/OD3");
    });

    client.on("message", (topic, message) => {
      if (topic === "Turning/MACHINE") {
        get_MACHINE = message.toString();
        this.setState({ MACHINE: get_MACHINE });
      } else if (topic === "Turning/MODEL") {
        get_MODEL = message.toString();
        this.setState({ MODEL: get_MODEL });
      } else if (topic === "Heidanhain/TOTAL_LG") {
        get_TOTAL_LG = message.toString();
        this.setState({ TOTAL_LG: get_TOTAL_LG });
      } else if (topic === "Heidanhain/LG_STEP_OD") {
        get_LG_STEP_OD = message.toString();
        this.setState({ LG_STEP_OD: get_LG_STEP_OD });
      } else if (topic === "Heidanhain/LG_STEP_ID_CP") {
        get_LG_STEP_ID_CP = message.toString();
        this.setState({ LG_STEP_ID_CP: get_LG_STEP_ID_CP });
      } else if (topic === "Air/ID_TOP") {
        get_ID_TOP = message.toString();
        this.setState({ ID_TOP: get_ID_TOP });
      } else if (topic === "Air/ID_BOTTOM") {
        get_ID_BOTTOM = message.toString();
        this.setState({ ID_BOTTOM: get_ID_BOTTOM });
      } else if (topic === "TM/OD1") {
        get_OD1 = message.toString();
        this.setState({ OD1: get_OD1 });
      } else if (topic === "TM/OD2") {
        get_OD2 = message.toString();
        this.setState({ OD2: get_OD2 });
      } else if (topic === "TM/OD3") {
        get_OD3 = message.toString();
        this.setState({ OD3: get_OD3 });
      }
    });
  };

  componentDidMount = async () => {
    await this.doconfirm();
    this.handleChange();
  };

  componentWillUnmount() {
    if (this.client) this.client.end();
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.doRecord();
    }
  };

  clearHeidan() {
    this.setState({
      TOTAL_LG: "",
      LG_STEP_OD: "",
      LG_STEP_ID_CP: "",
    });
  }

  clearAir() {
    this.setState({
      ID_TOP: "",
      ID_BOTTOM: "",
    });
  }

  clearTM() {
    this.setState({
      OD1: "",
      OD2: "",
      OD3: "",
    });
  }

  MACHINE_KeyPress = async () => {
    {
      this.machine.focus();
    }
  };

  MODEL_KeyPress = async () => {
    {
      this.model.focus();
    }
  };

  LG_TTL_KeyPress = async () => {
    {
      this.input_LG_TTL.focus();
    }
  };
  LG_OD_KeyPress = async () => {
    {
      this.input_LG_OD.focus();
    }
  };
  LG_ID_KeyPress = async () => {
    {
      this.input_LG_ID.focus();
    }
  };

  ID_TOP_KeyPress = async () => {
    {
      this.input_ID_TOP.focus();
    }
  };
  ID_BOTTOM_KeyPress = async () => {
    {
      this.input_ID_BOTTOM.focus();
    }
  };
  OD1_KeyPress = async () => {
    {
      this.input_OD1.focus();
    }
  };

  OD2_KeyPress = async () => {
    {
      this.input_OD2.focus();
    }
  };

  OD3_KeyPress = async () => {
    {
      this.input_OD3.focus();
    }
  };

  doSubmit = () => {
    this.input_submit.focus();
  };

  // clear_heidan_KeyPress = async () => {
  //   {
  //     this.TOTAL_LG.focus();
  //   }
  // };

  doconfirm = async () => {
    try {
      let submit_result_master = httpClient.get(
        server.TOL_MASTER_URL,
        this.state
      );
      console.log("Max", submit_result_master);
      // TOTAL_LG
      //   const TOTAL_LG_Max = submit_result_master.data.result_TOTAL_LG;
      // this.setState({
      //   master_TOTAL_LG_Max: submit_result_master.data.result_TOTAL_LG,
      // });
      // const TOTAL_LG_MIN = (await submit_result).data.result_TOTAL_LG.min;
      // this.setState({ master_TOTAL_LG_MIN: TOTAL_LG_MIN });
      // const TOTAL_LG = this.state.TOTAL_LG;

      //   LG_STEP_OD
      // const LG_STEP_OD_Max = (await submit_result).data.result_LG_STEP_OD.max;
      // this.setState({ master_LG_STEP_OD_Max: LG_STEP_OD_Max });

      // const LG_STEP_OD_MIN = (await submit_result).data.result_LG_STEP_OD.min;
      // this.setState({ master_LG_STEP_OD_MIN: LG_STEP_OD_MIN });
      // const LG_STEP_OD = this.state.LG_STEP_OD;

      //   LG_STEP_ID_CP
      // const LG_STEP_ID_CP_Max = (await submit_result).data.result_LG_STEP_ID_CP
      //   .max;
      // this.setState({ master_LG_STEP_ID_CP_Max: LG_STEP_ID_CP_Max });

      // const LG_STEP_ID_CP_MIN = (await submit_result).data.result_LG_STEP_ID_CP
      //   .min;

      // this.setState({ master_LG_STEP_ID_CP_MIN: LG_STEP_ID_CP_MIN });
      // const LG_STEP_ID_CP = this.state.LG_STEP_ID_CP;

      //   console.log("test1", TOTAL_LG_Max);
      //console.log(typeof TOTAL_LG);

      // if (TOTAL_LG < TOTAL_LG_Max && TOTAL_LG > TOTAL_LG_MIN) {
      //   return;
      // } else if (LG_STEP_OD < LG_STEP_OD_Max && LG_STEP_OD > LG_STEP_OD_MIN) {
      //   return;
      // } else if (
      //   LG_STEP_ID_CP < LG_STEP_ID_CP_Max &&
      //   LG_STEP_ID_CP > LG_STEP_ID_CP_MIN
      // ) {
      //   return;
      // } else {
      //   await Swal.fire({
      //     icon: "warning",
      //     title: "Data over Range",
      //     text: "ข้อมูลเกินค่าควบคุม !!!!",
      //     showConfirmButton: false,
      //     timer: 4000,
      //   });
      //   this.clearHeidan();
      // }
    } catch (error) {
      return {
        result: "Failed",
        message: error.message,
      };
    }
  };

  doRecord = async () => {
    try {
      let submit_result = await httpClient.post(server.LOGIN_URL, this.state);
      console.log(submit_result);
      if (submit_result.data.message !== "OK") {
        console.log(submit_result.data);
        Swal.fire({
          icon: "error",
          title: "Submit Fail",
          text: submit_result.data.error,
        });

        return;
      } else if (submit_result.data.result.levelUser === "Guest") {
        Swal.fire({
          icon: "warning",
          title: "Unauthorized User",
          text: "Please contact the administrator for permission.",
        });

        return;
      } else {
        if (
          this.state.MACHINE === "" ||
          this.state.MODEL === "" ||
          this.state.TOTAL_LG === "" ||
          this.state.LG_STEP_OD === "" ||
          this.state.LG_STEP_ID_CP === "" ||
          this.state.ID_TOP === "" ||
          this.state.ID_BOTTOM === "" ||
          this.state.OD1 === "" ||
          this.state.OD2 === "" ||
          this.state.OD3 === ""
        ) {
          await Swal.fire({
            icon: "error",
            title: "ข้อมูลไม่ครบ บันทึกไม่ได้",
            text: "Incomplete!!Can not record",
            showConfirmButton: false,
            timer: 2000,
          });
          window.location.replace("./pcmb_instrument");
        } else {
          let insert_result = await httpClient.post(
            server.INSERT_DATA_URL,
            this.state
          );
          if (insert_result.data.api_result === "OK") {
            await Swal.fire({
              icon: "success",
              title: "บันทึกเรียบร้อย",
              text: "Record OK !!!",
              showConfirmButton: false,
              timer: 1000,
            });
            window.location.replace("./pcmb_instrument");
          }
        }

        // localStorage.setItem(key.LOGIN_PASSED, YES);
        // localStorage.setItem(
        //   key.USER_EMP,
        //   submit_result.data.result.employee_id
        // );
        //  localStorage.setItem(key.TIME_LOGIN, moment());
        // localStorage.setItem(key.USER_LV, submit_result.data.result.levelUser);
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
    console.log(this.state.ID_TOP);
    console.log(this.state.ID_BOTTOM);
    console.log("test", this.state.submit_result_master);

    return (
      <div className="wrapper" style={{ height: 1050 }}>
        <section className="content-header"></section>
        <section className="content" style={{ marginLeft: 700 }}>
          <div className="container-fluid">
            <div className="row" style={{ height: 270 }}>
              <div
                className="card card-info"
                style={{ marginLeft: 10, width: 1380 }}
              >
                <div className="card-header">
                  <h1 className="card-title" style={{ fontSize: 30 }}>
                    Barcode scan Form
                  </h1>
                </div>
                <form className="form-horizontal">
                  <div className="card-body">
                    <div className="form-group row">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-4 col-form-label"
                        style={{ fontSize: 30 }}
                      >
                        Machine number
                      </label>
                      <div className="col-sm-7">
                        <input
                          autoFocus
                          ref={(input) => {
                            this.machine = input;
                          }}
                          style={{ height: 60, fontSize: 30 }}
                          value={this.state.MACHINE}
                          type="text"
                          className="form-control"
                          onChange={async (e) => {
                            this.setState(
                              {
                                MACHINE: e.target.value,
                              },

                              () => {
                                this.MODEL_KeyPress();
                              }
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-4 col-form-label"
                        style={{ fontSize: 30 }}
                      >
                        Model
                      </label>
                      <div className="col-sm-7">
                        <input
                          ref={(input) => {
                            this.model = input;
                          }}
                          style={{ height: 60, fontSize: 30 }}
                          value={this.state.MODEL}
                          type="text"
                          className="form-control"
                          onChange={async (e) => {
                            this.setState(
                              {
                                MODEL: e.target.value,
                              },

                              () => {
                                this.LG_TTL_KeyPress();
                              }
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row" style={{ width: 1400 }}>
              <div className="col-4">
                <div className="card" style={{ height: 350 }}>
                  <div className="card-body register-card-body">
                    <h2 style={{ textAlign: "center" }}>Heidanhain</h2>

                    <div className="input-group mb-3">
                      <script src="index.js"></script>
                      <input
                        ref={(input) => {
                          this.input_LG_TTL = input;
                        }}
                        value={this.state.TOTAL_LG}
                        type="text"
                        style={{ height: 60, fontSize: 30 }}
                        className="form-control"
                        placeholder="LG_TTL"
                        onChange={async (e) => {
                          this.setState(
                            {
                              TOTAL_LG: e.target.value,
                            },

                            () => {
                              this.LG_OD_KeyPress();
                            }
                          );
                        }}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text"></div>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        ref={(input) => {
                          this.input_LG_OD = input;
                        }}
                        value={this.state.LG_STEP_OD}
                        type="text"
                        style={{ height: 60, fontSize: 30 }}
                        className="form-control"
                        placeholder="LG_OD"
                        onChange={(e) => {
                          this.setState(
                            {
                              LG_STEP_OD: e.target.value,
                            },
                            () => {
                              this.LG_ID_KeyPress();
                            }
                          );
                        }}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text"></div>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        ref={(input) => {
                          this.input_LG_ID = input;
                        }}
                        value={this.state.LG_STEP_ID_CP}
                        type="text"
                        style={{ height: 60, fontSize: 30 }}
                        className="form-control"
                        placeholder="LG_ID"
                        onChange={(e) => {
                          this.setState(
                            {
                              LG_STEP_ID_CP: e.target.value,
                            },
                            () => {
                              this.ID_TOP_KeyPress();
                            }
                          );
                        }}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text"></div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <button
                          type="submit"
                          className="btn btn-danger btn-block"
                          onClick={(e) => {
                            e.preventDefault();
                            this.clearHeidan();
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card" style={{ height: 350 }}>
                  <div className="card-body register-card-body">
                    <h2 style={{ textAlign: "center" }}>Air gauge</h2>

                    <div className="input-group mb-3">
                      <input
                        ref={(input) => {
                          this.input_ID_TOP = input;
                        }}
                        value={this.state.ID_TOP}
                        style={{ height: 60, fontSize: 30 }}
                        type="text"
                        className="form-control"
                        placeholder="ID_TOP"
                        onChange={(e) => {
                          this.setState(
                            {
                              ID_TOP: e.target.value,
                            },
                            () => {
                              this.ID_BOTTOM_KeyPress();
                            }
                          );
                        }}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text"></div>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        ref={(input) => {
                          this.input_ID_BOTTOM = input;
                        }}
                        value={this.state.ID_BOTTOM}
                        type="text"
                        style={{ height: 60, fontSize: 30 }}
                        className="form-control"
                        placeholder="ID_BOTTOM"
                        onChange={(e) => {
                          this.setState(
                            {
                              ID_BOTTOM: e.target.value,
                            },
                            () => {
                              this.OD1_KeyPress();
                            }
                          );
                        }}
                        // ref={(input) => {
                        //   this.input_ID_BOTTOM = input;
                        // }}
                        // value={this.state.ID_BOTTOM}
                        // type="text"
                        // className="form-control"
                        // style={{ fontSize: 22 }}
                        // placeholder="ID_BOTTOM"
                        // onChange={(e) => {
                        //   this.setState(
                        //     {
                        //       ID_BOTTOM: e.target.value,
                        //     },
                        //     () => {
                        //       this.OD1_KeyPress();
                        //     }
                        //   );
                        // }}
                      />

                      <div className="input-group-append">
                        <div className="input-group-text"></div>
                      </div>
                    </div>
                    <div
                      className="input-group mb-3"
                      style={{ height: 60, fontSize: 30 }}
                    ></div>
                    <div className="row">
                      <div className="col-6">
                        <button
                          type="submit"
                          className="btn btn-danger btn-block"
                          onClick={(e) => {
                            e.preventDefault();
                            this.clearAir();
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card" style={{ height: 350 }}>
                  <div className="card-body register-card-body">
                    <h2 style={{ textAlign: "center" }}>TM-X5000</h2>

                    <div className="input-group mb-3">
                      <input
                        ref={(input) => {
                          this.input_OD1 = input;
                        }}
                        value={this.state.OD1}
                        type="text"
                        style={{ height: 60, fontSize: 30 }}
                        className="form-control"
                        placeholder="OD1"
                        onChange={(e) => {
                          this.setState(
                            {
                              OD1: e.target.value,
                            },
                            () => {
                              this.OD2_KeyPress();
                            }
                          );
                        }}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text"></div>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        ref={(input) => {
                          this.input_OD2 = input;
                        }}
                        onKeyPress={this.OD3_KeyPress} //Go next input
                        value={this.state.OD2}
                        type="text"
                        style={{ height: 60, fontSize: 30 }}
                        className="form-control"
                        placeholder="OD2"
                        onChange={(e) => {
                          this.setState(
                            {
                              OD2: e.target.value,
                            },
                            () => {
                              this.OD3_KeyPress();
                            }
                          );
                        }}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text"></div>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        ref={(input) => {
                          this.input_OD3 = input;
                        }}
                        value={this.state.OD3}
                        type="text"
                        style={{ height: 60, fontSize: 30 }}
                        className="form-control"
                        placeholder="OD3"
                        onChange={(e) => {
                          this.setState(
                            {
                              OD3: e.target.value,
                            },
                            () => {
                              this.doSubmit();
                            }
                          );
                        }}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text"></div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <button
                          type="submit"
                          className="btn btn-danger btn-block"
                          onClick={(e) => {
                            e.preventDefault();
                            this.clearTM();
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content" style={{ marginLeft: 700 }}>
          <div className="info-box" style={{ height: 150, width: 1390 }}>
            <span className="info-box-icon bg-warning">
              <i className="far fa-copy" />
            </span>
            <div className="info-box-content">
              <h4> Submit </h4>
              <div className="input-group mb-3">
                <input
                  style={{ height: 80, fontSize: 22 }}
                  ref={(input) => {
                    this.input_submit = input;
                  }}
                  value={this.state.password}
                  type="password"
                  className="form-control"
                  placeholder="User card"
                  onChange={async (e) => {
                    e.preventDefault();
                    this.setState({ password: e.target.value }, () => {
                      this.doRecord();
                    });
                  }}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Pcmb_instrument;

