'use strict';
require('dotenv').config();
const bcrypt = require('bcryptjs');
const crypto = require('../src/utils/crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const settingsId = await queryInterface.rawSelect('settings', { where: {}, limit: 1 }, ['id']);
    if (!settingsId) {
      return queryInterface.bulkInsert('settings', [{
        email: 'pejotabh@gmail.com',
        password: bcrypt.hashSync('mk!tri43#pj'),
        apiUrl: 'https://testnet.binance.vision/api/',
        accessKey: 'PVVZud5pokMNobgxmEpquLGtkaLJ7TpWPTcWXZ3P5hFATrk86d9FWUvGBcgUIxW9',
        secretKey: crypto.encrypt('1tDnYzPHS8JbsK1aS8Aoaqyq8NeIclnUuxwpCmCskHl3NpgquPEFcE6HdQ5nSAPd'),
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('settings', null, {});
  }
};
