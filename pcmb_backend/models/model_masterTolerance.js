//Reference
const { Sequelize, DataTypes } = require("sequelize");

//SQL Connection
const icx_database = require("../instance/ms_instance");
const Pcmb_tolerance = icx_database.define("pcmb_tolerance_master", {
  // Model attributes are defined here

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allownull: false,
    primaryKey: true,
  },
  registered_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  process: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specification: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  min: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  max: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

(async () => {
  await Pcmb_tolerance.sync({ force: false });
})();

module.exports = Pcmb_tolerance;
