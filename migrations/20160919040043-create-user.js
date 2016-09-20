'use strict'

var DataTypes = require('Sequelize').DataTypes

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.INTEGER
      },
      link: {
        type: Sequelize.TEXT
      },
      focus: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      skills: {
        type: Sequelize.ARRAY(DataTypes.STRING)
      },
      profileImg: {
        type: Sequelize.TEXT
      },
      imgs: {
        type: Sequelize.ARRAY(DataTypes.TEXT)
      },
      friends: {
        type: Sequelize.ARRAY(DataTypes.STRING)
      },
      reqsIn: {
        type: Sequelize.ARRAY(DataTypes.STRING)
      },
      reqsOut: {
        type: Sequelize.ARRAY(DataTypes.STRING)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
