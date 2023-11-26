const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const constance = require("../constance/constance");

// import model
const masterSPC = require("../models/model_masterSPC");
const masterLine = require("../models/model_Data_matching");
const XbarData = require("../models/model_Data_matching");
const Pcmb_data = require("../models/model_pcmb_data");
const Pcmb_tolerance = require("../models/model_masterTolerance");

// get data from SQL query
router.get("/MasterModel", async (req, res) => {
  try {
    let resultdata = await masterSPC.sequelize.query(`SELECT distinct [Model]
  FROM [mms_demo].[dbo].[Master_specs]

      `);

    res.json({
      result: resultdata[0],
    });
  } catch (error) {
    res.json({
      error,
      api_result: constance.NOK,
    });
  }
});

router.get("/MasterLine", async (req, res) => {
  try {
    let resultdata = await masterLine.sequelize.query(`SELECT distinct [Line]   
FROM [mms_demo].[dbo].[Data_matchings]
      `);

    res.json({
      result: resultdata[0],
    });
  } catch (error) {
    res.json({
      error,
      api_result: constance.NOK,
    });
  }
});

router.get("/MasterPart", async (req, res) => {
  try {
    let resultdata = await masterSPC.sequelize.query(`SELECT distinct [Part]
  FROM [mms_demo].[dbo].[Master_specs]
      `);

    res.json({
      result: resultdata[0],
    });
  } catch (error) {
    res.json({
      error,
      api_result: constance.NOK,
    });
  }
});

router.get("/MasterPara/:myPart", async (req, res) => {
  try {
    const { myPart } = req.params;

    let stringPart = await myPart.replace("[", "");
    stringPart = await stringPart.replace("]", "");
    stringPart = await stringPart.replaceAll('"', "'");

    let resultdata = await masterSPC.sequelize
      .query(`with newpara (Parameter,Number) as (
SELECT distinct [Parameter], [id]
FROM [mms_demo].[dbo].[Master_specs]
where [mms_demo].[dbo].[Master_specs].[Part] = '${stringPart}'
)
select Parameter,Number from newpara 
      `);

    res.json({
      result: resultdata[0],
    });
  } catch (error) {
    res.json({
      error,
      api_result: constance.NOK,
    });
  }
});

router.get("/state1", async (req, res) => {
  try {
    let resultstate1 = await XbarData.sequelize.query(`
SELECT TOP (3) [id]
      ,[Model]
      ,[Barcode]
      ,[Axial_Play]
      ,[Oil_Top]
      ,[Oil_Bottom]
      ,[MC_Axial_Play]
      ,[MC_Oil_Top]
      ,[MC_Oil_Bottom]
     
  FROM [mms_demo].[dbo].[Data_shows]
          `);

    // console.log(resultstate1[0]);

    res.json({
      resultstate1: resultstate1[0],
    });
  } catch (error) {
    res.json({
      error,
      api_result: constance.NOK,
    });
  }
});

router.get("/state2", async (req, res) => {
  try {
    let resultstate2 = await XbarData.sequelize.query(`
SELECT TOP (3) 
      [MC_Axial_Play]
      ,[MC_Oil_Top]
      ,[MC_Oil_Bottom]
  FROM [mms_demo].[dbo].[Data_shows]
          `);

    // console.log(resultstate2[0]);

    res.json({
      resultstate2: resultstate2[0],
    });
  } catch (error) {
    res.json({
      error,
      api_result: constance.NOK,
    });
  }
});

router.get(
  "/get_xbar/:mystartdate/:myenddate/:myModel/:myLine/:myPart/:myPara",

  async (req, res) => {
    try {
      const { mystartdate, myenddate, myModel, myLine, myPart, myPara } =
        req.params;
      let jsonPara = await myPara;
      let Para1 = await JSON.parse(jsonPara);

      var listDataAll = [];
      var seriesData = [];
      var seriesTimeset = [];

      for (let index = 0; index < Para1.length; index++) {
        const arrayPara = Para1[index];

        let resultYaxis = await XbarData.sequelize
          .query(`SELECT format([mms_demo].[dbo].[Data_matchings].[Timestamp],'yyyy-MM-dd') as [mfg_date],[mms_demo].[dbo].[Data_matchings].[Model],[mms_demo].[dbo].[Data_matchings].[Line],[mms_demo].[dbo].[Data_matchings].[Part],[mms_demo].[dbo].[Data_matchings].[${arrayPara}], [mms_demo].[dbo].[Master_specs].[UCL],[mms_demo].[dbo].[Master_specs].[CL],[mms_demo].[dbo].[Master_specs].[LCL],
           cast(DATEPART(hour, [mms_demo].[dbo].[Data_matchings].[Timestamp]) as varchar) + ':00' as [Time]
    FROM [mms_demo].[dbo].[Data_matchings]
    LEFT JOIN [mms_demo].[dbo].[Master_specs] ON [mms_demo].[dbo].[Data_matchings].[Model] = [mms_demo].[dbo].[Master_specs].[Model] and [mms_demo].[dbo].[Master_specs].[Parameter] = '${arrayPara}'
    where format([mms_demo].[dbo].[Data_matchings].[Timestamp],'yyyy-MM-dd') between '${mystartdate}' and '${myenddate}'and  [mms_demo].[dbo].[Data_matchings].[Model]  ='${myModel}' and [mms_demo].[dbo].[Data_matchings].[Line] ='${myLine}' and [mms_demo].[dbo].[Data_matchings].[Part] ='${myPart}' and [mms_demo].[dbo].[Data_matchings].[${arrayPara}] > '0'
    ORDER BY [mms_demo].[dbo].[Data_matchings].[Timestamp] ;
          `);
        // console.log(resultYaxis);

        arrayData = resultYaxis[0];
        console.log(arrayData);
        console.log("para1", Para1[0]);
        console.log("para2", Para1[1]);

        // วน for เพื่อให้ได้ค่า average ตาม parameter
        let listData = [];
        for (let index = 0; index < arrayData.length; index++) {
          listData.push(arrayData[index][arrayPara]);
        }
        listDataAll.push(listData); // ดึงข้อมูลที่ได้ในแต่ชุดของ listData  ที่เกิดจากการเลือก para แต่ละตัว ใส่ที่ listDataAll
        console.log("listData", listData);
        let collectData = [];
        for (let index = 0; index < listDataAll.length; index++) {
          collectData = { name: Para1[index], data: listDataAll[index] };
        }

        let seriesUCL = [];
        let seriesLCL = [];
        let seriesCL = [];
        let seriesTime = [];

        for (let index = 0; index < arrayData.length; index++) {
          const item = arrayData[index];
          await seriesUCL.push(item.UCL);
          await seriesLCL.push(item.LCL);
          await seriesCL.push(item.CL);
          await seriesTime.push(item.Time);
        }
        console.log("item", arrayData[0].Time);
        let seriesUCL_new = { name: "UCL", data: seriesUCL, color: "#FF4560" };
        let seriesLCL_new = { name: "LCL", data: seriesLCL, color: "#FF4560" };
        let seriesCL_new = { name: "CL", data: seriesCL, color: "#C5D86D" };
        let seriesTime_new = { name: "Time", data: seriesTime };

        let seriesNew = [
          collectData,
          seriesUCL_new,
          seriesLCL_new,
          seriesCL_new,
        ];

        let seriesNewTime = [seriesTime_new];

        seriesData.push(seriesNew);
        seriesTimeset.push(seriesNewTime);

        console.log("series", seriesData);
      }

      res.json({
        seriesData,
        seriesTimeset,

        api_result: constance.OK,
      });
    } catch (error) {
      console.log(error);
      res.json({ error, api_result: constance.NOK });
    }
  }
);

router.post("/pcmb_measure_Hei_Air_TM", async (req, res) => {
  try {
    const {
      TIMESTAMP,
      MACHINE,
      MODEL,
      TOTAL_LG,
      LG_STEP_OD,
      LG_STEP_ID_CP,

      ID_TOP,
      ID_BOTTOM,

      OD1,
      OD2,
      OD3,
    } = req.body;

    console.log(req.body);

    const result = await Pcmb_data.create({
      Timestamp: TIMESTAMP,
      MACHINE: MACHINE,
      MODEL: MODEL,
      TOTAL_LG: TOTAL_LG,
      LG_STEP_OD: LG_STEP_OD,
      LG_STEP_ID_CP: LG_STEP_ID_CP,

      ID_TOP: ID_TOP,
      ID_BOTTOM: ID_BOTTOM,

      OD1: OD1,
      OD2: OD2,
      OD3: OD3,
    });
    res.json({
      api_result: "OK",
      message: JSON.stringify(result),
    });
  } catch (error) {
    return res.json({
      api_result: "Failed",
      message: error.message,
    });
  }
});

router.get("/pcmb_tolerance_master", async (req, res) => {
  try {
    let resultdata = await Pcmb_tolerance.sequelize.query(`SELECT [id]
    ,[registered_at]
    ,[process]
    ,[model]
    ,[specification]
    ,[min]
    ,[max]
FROM [mms_demo].[dbo].[pcmb_tolerance_master]
      `);
    console.log("test1",resultdata[0][0].max);
    console.log("test2",resultdata[0][0].min);
    res.json({
      //result: resultdata[0][0],
      result_TOTAL_LG_MAX: resultdata[0][0].max,
      result_TOTAL_LG_MIN: resultdata[0][0].min,
      result_LG_STEP_OD: resultdata[0][1],
      result_LG_STEP_ID_CP: resultdata[0][2],
    });
  } catch (error) {
    res.json({
      error,
      api_result: constance.NOK,
    });
  }
});

router.post("/mitutoyo_measure_value1", async (req, res) => {
  try {
    const {
      TIMESTAMP,
      PROCESS,
      model,
      value1,
      
    } = req.body;

    console.log(req.body);

    const result = await mitutoyo_data.create({
      Timestamp: TIMESTAMP,
      PROCESS: PROCESS,
      model: model,
      value1: value1,
   
    });
    res.json({
      api_result: "OK",
      message: JSON.stringify(result),
    });
  } catch (error) {
    return res.json({
      api_result: "Failed",
      message: error.message,
    });
  }
});

module.exports = router;
