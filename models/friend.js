'use strict';
module.exports = function(sequelize, DataTypes) {
  var friend = sequelize.define('friend', {
    fromUserId: DataTypes.INTEGER,
    toUserId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return friend;
};