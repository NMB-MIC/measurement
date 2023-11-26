//Reference
const { Sequelize, DataTypes } = require("sequelize");

//SQL Connection
const icx_database = require("../instance/ms_instance");
const Mitutoyo_data = icx_database.define('mitutoyo_data', {
  // Model attributes are defined here

//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allownull: false,
//     primaryKey: true,
//   },
  Timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  PROCESS: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  value1: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }

}
);

(async () => {
await Mitutoyo_data.sync({ force: false });
})();

module.exports = Mitutoyo_data;