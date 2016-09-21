'use strict';
module.exports = function(sequelize, DataTypes) {
  var specialization = sequelize.define('specialization', {
    term: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.specialization.hasMany(models.user);
      }
    }
  });
  return specialization;
};
