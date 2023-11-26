// import React, { Component } from "react";
// import { httpClient } from "../../utils/HttpClient";
// import { key, server, YES } from "../../constants/index";
// import Swal from "sweetalert2";

// import mqtt from "precompiled-mqtt";
// import moment from "moment";
// import { MQTT_PATH } from "../../constants";

// class Mitutoyo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       TIMESTAMP: moment().format("YYYY-MM-DD HH:mm:ss"),
//       PROCESS: "PILOT",
//       model1: "",
//       value1: "",
//     };
//   }

//   handleChange = () => {
//     var get_value1 = "";

//     var client = mqtt.connect(MQTT_PATH.ADDRESS_1885);

//     client.on("connect", () => {
//       console.log("connected");
//       client.subscribe("simple_1");
//     });

//     client.on("message", (topic, message) => {
//       if (topic === "simple_1") {
//         get_value1 = message.toString();
//         this.setState({ value1: get_value1 });
//         this.doconfirm();
//       }
//     });
//   };

//   componentDidMount = () => {
//     this.handleChange();
//     this.doconfirm();
//   };

//   componentWillUnmount() {
//     if (this.client) this.client.end();
//   }

//   handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       this.doRecord();
//     }
//   };
//   clearMitutoyo() {
//     this.setState({
//       model1: "",
//       value1: "",
//     });
//   }

//   model1_KeyPress = () => {
//     this.Input_model1.focus();
//   };
//   value1_KeyPress = () => {
//     this.Input_value1.focus();
//   };

//   doconfirm = async () => {
//     try {
//       const submit_result = httpClient.get(server.TOL_MASTER_URL, this.state);

//       // // TOTAL_LG
//       // const TOTAL_LG_Max = (await submit_result).data.result_TOTAL_LG.max;
//       // this.setState({ master_TOTAL_LG_Max: TOTAL_LG_Max });
//       // const TOTAL_LG_MIN = (await submit_result).data.result_TOTAL_LG.min;
//       // this.setState({ master_TOTAL_LG_MIN: TOTAL_LG_MIN });
//       // const TOTAL_LG = this.state.TOTAL_LG;

//       // //   LG_STEP_OD
//       // const LG_STEP_OD_Max = (await submit_result).data.result_LG_STEP_OD.max;
//       // this.setState({ master_LG_STEP_OD_Max: LG_STEP_OD_Max });

//       // const LG_STEP_OD_MIN = (await submit_result).data.result_LG_STEP_OD.min;
//       // this.setState({ master_LG_STEP_OD_MIN: LG_STEP_OD_MIN });
//       // const LG_STEP_OD = this.state.LG_STEP_OD;

//       // //   LG_STEP_ID_CP
//       // const LG_STEP_ID_CP_Max = (await submit_result).data.result_LG_STEP_ID_CP
//       //   .max;
//       // this.setState({ master_LG_STEP_ID_CP_Max: LG_STEP_ID_CP_Max });

//       // const LG_STEP_ID_CP_MIN = (await submit_result).data.result_LG_STEP_ID_CP
//       //   .min;

//       // this.setState({ master_LG_STEP_ID_CP_MIN: LG_STEP_ID_CP_MIN });
//       // const LG_STEP_ID_CP = this.state.LG_STEP_ID_CP;

//       // console.log("test1", TOTAL_LG_Max);
//       // console.log(typeof TOTAL_LG);

//       // if (TOTAL_LG < TOTAL_LG_Max && TOTAL_LG > TOTAL_LG_MIN) {
//       //   return;
//       // } else if (LG_STEP_OD < LG_STEP_OD_Max && LG_STEP_OD > LG_STEP_OD_MIN) {
//       //   return;
//       // } else if (
//       //   LG_STEP_ID_CP < LG_STEP_ID_CP_Max &&
//       //   LG_STEP_ID_CP > LG_STEP_ID_CP_MIN
//       // ) {
//       //   return;
//       // } else {
//       //   await Swal.fire({
//       //     icon: "warning",
//       //     title: "Data over Range",
//       //     text: "ข้อมูลเกินค่าควบคุม !!!!",
//       //     showConfirmButton: false,
//       //     timer: 4000,
//       //   });
//       //   this.clearHeidan();
//       // }
//     } catch (error) {
//       return {
//         result: "Failed",
//         message: error.message,
//       };
//     }
//   };

//   doRecord = async () => {
//     try {
//       let submit_result = await httpClient.post(server.LOGIN_URL, this.state);
//       console.log(submit_result);
//       if (submit_result.data.message !== "OK") {
//         console.log(submit_result.data);
//         Swal.fire({
//           icon: "error",
//           title: "Submit Fail",
//           text: submit_result.data.error,
//         });

//         return;
//       } else if (submit_result.data.result.levelUser === "Guest") {
//         Swal.fire({
//           icon: "warning",
//           title: "Unauthorized User",
//           text: "Please contact the administrator for permission.",
//         });

//         return;
//       } else {
//         if (this.state.value1 === "") {
//           await Swal.fire({
//             icon: "error",
//             title: "ข้อมูลไม่ครบ บันทึกไม่ได้",
//             text: "Incomplete!!Can not record",
//             showConfirmButton: false,
//             timer: 2000,
//           });
//           window.location.replace("./mitutoyo");
//         } else {
//           let insert_result = await httpClient.post(
//             server.INSERT_DATA_MITUTOYO_URL,
//             this.state
//           );
//           if (insert_result.data.api_result === "OK") {
//             await Swal.fire({
//               icon: "success",
//               title: "บันทึกเรียบร้อย",
//               text: "Record OK !!!",
//               showConfirmButton: false,
//               timer: 1000,
//             });
//             window.location.replace("./mitutoyo");
//           }
//         }

//         // localStorage.setItem(key.LOGIN_PASSED, YES);
//         // localStorage.setItem(
//         //   key.USER_EMP,
//         //   submit_result.data.result.employee_id
//         // );
//         //  localStorage.setItem(key.TIME_LOGIN, moment());
//         // localStorage.setItem(key.USER_LV, submit_result.data.result.levelUser);
//         window.location.replace("/mitutoyo");
//       }
//     } catch (error) {
//       return {
//         result: "Failed",
//         message: error.message,
//       };
//     }
//   };

//   render() {
//     console.log(typeof this.state.value1);
//     console.log(this.state);

//     return (
//       <div className="register-page" style={{ maxHeight: 790 }}>
//         <section className="content">
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-4">
//                 <div className="card" style={{ height: 280, width: 300 }}>
//                   <div className="card-body register-card-body">
//                     <h2 style={{ textAlign: "center" }}>Mitutoyo</h2>

//                     <div
//                       className="input-group mb-3"
//                       style={{ height: 35, fontSize: 22 }}
//                     >
//                       <script src="index.js"></script>
//                       <input
//                         autoFocus
//                         ref={(input) => {
//                           this.model1 = input;
//                         }}
//                         maxLength={9}
//                         onKeyPress={this.value1_KeyPress} //Go next input
//                         value={this.state.model1}
//                         type="text"
//                         className="form-control"
//                         style={{ fontSize: 22 }}
//                         placeholder="Model"
//                         onChange={async (e) => {
//                           try {
//                             if (e.target.value.length === 9) {
//                               // if (e.target.value > this.state.master_TOTAL_LG_Max) {
//                               //   await Swal.fire({
//                               //     icon: "warning",
//                               //     title: "Data over Range",
//                               //     text: "ข้อมูลเกินค่าควบคุม !!!!",
//                               //     showConfirmButton: false,
//                               //     timer: 1500,
//                               //   });
//                               //   this.clearMitutoyo();
//                               // }
//                               this.setState(
//                                 {
//                                   model1: e.target.value,
//                                 },
//                                 () => {
//                                   this.value1_KeyPress();
//                                 }
                               
//                               );
//                             }
//                           } catch (error) {
//                             return {
//                               result: "Failed",
//                               message: error.message,
//                             };
//                           }
//                         }}

//                         // onChange={(e) => {
//                         //   if (e.target.value > this.state.master_TOTAL_LG_Max) {
//                         //     this.line_KeyPress();
//                         //   }
//                         //   this.setState({
//                         //     TOTAL_LG: e.target.value,
//                         //   });
//                         // }}
//                         //   onKeyUp(event) {
//                         //     if (event.charCode === 13) {
//                         //       this.setState({ inputValue: event.target.value });
//                         //     }
//                         // }
//                         // onChange={async (e) => {
//                         //   try {
//                         //     if (e.target.value !== null) {
//                         //       await this.doconfirm();
//                         //       this.LG_OD_KeyPress();
//                         //     }
//                         //   } catch (error) {
//                         //     return {
//                         //       result: "Failed",
//                         //       message: error.message,
//                         //     };
//                         //   }
//                         // }}
//                       />
//                       <div className="input-group-append">
//                         <div className="input-group-text"></div>
//                       </div>
//                     </div>

//                     <div
//                       className="input-group mb-3"
//                       style={{ height: 35, fontSize: 22 }}
//                     >
//                       <script src="index.js"></script>
//                       <input
                        
//                         ref={(input) => {
//                           this.Input_value1 = input;
//                         }}
//                         maxLength={5}
//                         value={this.state.value1}
//                         type="text"
//                         className="form-control"
//                         style={{ fontSize: 22 }}
//                         placeholder="Input"
//                         onChange={async (e) => {
//                           // if (e.target.value > this.state.master_TOTAL_LG_Max) {
//                           //   await Swal.fire({
//                           //     icon: "warning",
//                           //     title: "Data over Range",
//                           //     text: "ข้อมูลเกินค่าควบคุม !!!!",
//                           //     showConfirmButton: false,
//                           //     timer: 1500,
//                           //   });
//                           //   this.clearMitutoyo();
//                           // }
//                           this.setState({
//                             value1: e.target.value,
//                           });
//                         }}

//                         // onChange={(e) => {
//                         //   if (e.target.value > this.state.master_TOTAL_LG_Max) {
//                         //     this.line_KeyPress();
//                         //   }
//                         //   this.setState({
//                         //     TOTAL_LG: e.target.value,
//                         //   });
//                         // }}
//                         //   onKeyUp(event) {
//                         //     if (event.charCode === 13) {
//                         //       this.setState({ inputValue: event.target.value });
//                         //     }
//                         // }
//                         // onChange={async (e) => {
//                         //   try {
//                         //     if (e.target.value !== null) {
//                         //       await this.doconfirm();
//                         //       this.LG_OD_KeyPress();
//                         //     }
//                         //   } catch (error) {
//                         //     return {
//                         //       result: "Failed",
//                         //       message: error.message,
//                         //     };
//                         //   }
//                         // }}
//                       />
//                       <div className="input-group-append">
//                         <div className="input-group-text"></div>
//                       </div>
//                     </div>
//                     {/* <div
//                       className="input-group mb-3"
//                       style={{ height: 35, fontSize: 22 }}
//                     >
//                       <input
//                         ref={(input) => {
//                           this.input_LG_OD = input;
//                         }}
//                         onKeyPress={this.LG_ID_KeyPress} //Go next input
//                         value={this.state.LG_STEP_OD}
//                         type="text"
//                         className="form-control"
//                         style={{ fontSize: 22 }}
//                         placeholder="LG_OD"
//                         onChange={(e) => {
//                           if (e.target.value.length === 5) {
//                             this.LG_ID_KeyPress();
//                           }
//                           this.setState({
//                             LG_STEP_OD: e.target.value,
//                           });
//                         }}
//                       />
//                       <div className="input-group-append">
//                         <div className="input-group-text"></div>
//                       </div>
//                     </div> */}
//                     {/* <div
//                       className="input-group mb-3"
//                       style={{ height: 35, fontSize: 22 }}
//                     >
//                       <input
//                         ref={(input) => {
//                           this.input_LG_ID = input;
//                         }}
//                         value={this.state.LG_STEP_ID_CP}
//                         onKeyPress={this.ID_TOP_KeyPress} //Go next input
//                         type="text"
//                         className="form-control"
//                         style={{ fontSize: 22 }}
//                         placeholder="LG_ID"
//                         onChange={(e) => {
//                           if (e.target.value.length === 5) {
//                             this.ID_TOP_KeyPress();
//                           }
//                           this.setState({
//                             LG_STEP_ID_CP: e.target.value,
//                           });
//                         }}
//                       />
//                       <div className="input-group-append">
//                         <div className="input-group-text"></div>
//                       </div>
//                     </div> */}

//                     <div className="row">
//                       <div className="col-6">
//                         <button
//                           type="submit"
//                           className="btn btn-danger btn-block"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             this.clearMitutoyo();
//                           }}
//                         >
//                           Clear
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* <div className="col-4">
//                 <div className="card" style={{ height: 280 }}>
//                   <div className="card-body register-card-body">
//                     <h2 style={{ textAlign: "center" }}>Air gauge</h2>

//                     <div
//                       className="input-group mb-3"
//                       style={{ height: 35, fontSize: 22 }}
//                     >
//                       <input
//                         ref={(input) => {
//                           this.input_ID_TOP = input;
//                         }}
//                         onKeyPress={this.ID_BOTTOM_KeyPress} //Go next input
//                         value={this.state.ID_TOP}
//                         type="text"
//                         className="form-control"
//                         style={{ fontSize: 22 }}
//                         placeholder="ID_TOP"
//                         onChange={(e) => {
//                           if (e.target.value.length === 5) {
//                             this.ID_BOTTOM_KeyPress();
//                           }
//                           this.setState({
//                             ID_TOP: e.target.value,
//                           });
//                         }}
//                       />
//                       <div className="input-group-append">
//                         <div className="input-group-text"></div>
//                       </div>
//                     </div>
//                     <div
//                       className="input-group mb-3"
//                       style={{ height: 35, fontSize: 22 }}
//                     >
//                       <input
//                         ref={(input) => {
//                           this.input_ID_BOTTOM = input;
//                         }}
//                         onKeyPress={this.OD1_KeyPress} //Go next input
//                         value={this.state.ID_BOTTOM}
//                         type="text"
//                         className="form-control"
//                         style={{ fontSize: 22 }}
//                         placeholder="ID_BOTTOM"
//                         onChange={(e) => {
//                           if (e.target.value.length === 5) {
//                             this.OD1_KeyPress();
//                           }
//                           this.setState({
//                             ID_BOTTOM: e.target.value,
//                           });
//                         }}
//                       />

//                       <div className="input-group-append">
//                         <div className="input-group-text"></div>
//                       </div>
//                     </div>
//                     <div
//                       className="input-group mb-3"
//                       style={{ height: 35 }}
//                     ></div>
//                     <div className="row">
//                       <div className="col-6">
//                         <button
//                           type="submit"
//                           className="btn btn-danger btn-block"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             this.clearAir();
//                           }}
//                         >
//                           Clear
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div> */}
//               {/* <div className="col-4">
//                 <div className="card" style={{ height: 280 }}>
//                   <div className="card-body register-card-body">
//                     <h2 style={{ textAlign: "center" }}>TM-X5000</h2>

//                     <div
//                       className="input-group mb-3"
//                       style={{ height: 35, fontSize: 22 }}
//                     >
//                       <input
//                         ref={(input) => {
//                           this.input_OD1 = input;
//                         }}
//                         onKeyPress={this.OD2_KeyPress} //Go next input
//                         value={this.state.OD1}
//                         type="text"
//                         className="form-control"
//                         style={{ fontSize: 22 }}
//                         placeholder="OD1"
//                         onChange={(e) => {
//                           if (e.target.value.length === 5) {
//                             this.OD2_KeyPress();
//                           }
//                           this.setState({
//                             OD1: e.target.value,
//                           });
//                         }}
//                       />
//                       <div className="input-group-append">
//                         <div className="input-group-text"></div>
//                       </div>
//                     </div>
//                     <div
//                       className="input-group mb-3"
//                       style={{ height: 35, fontSize: 22 }}
//                     >
//                       <input
//                         ref={(input) => {
//                           this.input_OD2 = input;
//                         }}
//                         onKeyPress={this.OD3_KeyPress} //Go next input
//                         value={this.state.OD2}
//                         type="text"
//                         className="form-control"
//                         style={{ fontSize: 22 }}
//                         placeholder="OD2"
//                         onChange={(e) => {
//                           if (e.target.value.length === 5) {
//                             this.OD3_KeyPress();
//                           }
//                           this.setState({
//                             OD2: e.target.value,
//                           });
//                         }}
//                       />
//                       <div className="input-group-append">
//                         <div className="input-group-text"></div>
//                       </div>
//                     </div>
//                     <div
//                       className="input-group mb-3"
//                       style={{ height: 35, fontSize: 22 }}
//                     >
//                       <input
//                         ref={(input) => {
//                           this.input_OD3 = input;
//                         }}
//                         value={this.state.OD3}
//                         type="text"
//                         className="form-control"
//                         style={{ fontSize: 22 }}
//                         placeholder="OD3"
//                         onChange={(e) => {
//                           this.setState(
//                             {
//                               OD3: e.target.value,
//                             },

//                             () => {
//                               this.doSubmit();
//                             }
//                           );
//                         }}
//                       />
//                       <div className="input-group-append">
//                         <div className="input-group-text"></div>
//                       </div>
//                     </div>

//                     <div className="row">
//                       <div className="col-6">
//                         <button
//                           // ref={(input) => {
//                           //   this.input_submit = input;
//                           // }}
//                           type="submit"
//                           className="btn btn-danger btn-block"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             this.clearTM();
//                           }}
//                         >
//                           Clear
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         </section>

//         <section className="content" style={{ width: 840 }}>
//           <div className="info-box">
//             <span className="info-box-icon bg-warning">
//               <i className="far fa-copy" />
//             </span>
//             <div className="info-box-content">
//               <h4> Submit </h4>
//               <div className="input-group mb-3">
//                 <input
//                   ref={(input) => {
//                     this.input_submit = input;
//                   }}
//                   value={this.state.password}
//                   type="password"
//                   className="form-control"
//                   placeholder="User card"
//                   onChange={async (e) => {
//                     e.preventDefault();
//                     this.setState({ password: e.target.value }, () => {
//                       this.doRecord();
//                     });
//                   }}
//                 />
//                 <div className="input-group-append">
//                   <div className="input-group-text">
//                     <span className="fas fa-lock" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     );
//   }
// }

// export default Mitutoyo;
