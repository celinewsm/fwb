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
        models.friend.belongsTo(models.user, {as: 'fromUserDetails',foreignKey: 'fromUserId' })
        models.friend.belongsTo(models.user, {as: 'toUserDetails', foreignKey: 'toUserId' })
      }
    }
  });
  return friend;
};
