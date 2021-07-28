'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addIndex('settings', ['email'], {
      name: 'settings_emails_index',
      unique: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('settings', ['settings_emails_index']);
  }
};
