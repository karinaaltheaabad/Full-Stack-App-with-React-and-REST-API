'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a valid value for title"
        },
        notEmpty: {
          msg: "Please enter a value for title"
        }
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter a valid value for description"
        },
        notEmpty: {
          msg: "Please enter a value for description"
        }
      }
    },
    estimatedTime: {
      type: Sequelize.STRING, 
    }, 
    materialsNeeded: {
      type: Sequelize.STRING,
    }
  }, { sequelize });

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };

  return Course;
};