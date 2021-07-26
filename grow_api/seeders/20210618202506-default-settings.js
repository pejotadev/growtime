'use strict';
require('dotenv').config();
const bcrypt = require('bcryptjs');
const crypto = require('../src/utils/crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('settings', [{
      email: 'pejotabh@gmail.com',
      password: bcrypt.hashSync('123456'),
      apiUrl: 'https://testnet.binance.vision/api/',
      accessKey: '2k2sngpo0EKQ8OGaMi2udlhzaT3UG3gMY2wo1cNWqn8Yrgh31UdZJk7M7QgcRc82',
      secretKey: crypto.encrypt('x6EolFAMDykkLuC9XW3sbzLi90OuqPY747oPNOyBglUxasSLfdsFxduFNSQyTGyw'),
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('settings', null, {})
  }
};
