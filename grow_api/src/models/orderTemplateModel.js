const Sequelize = require('sequelize');
const database = require('../db');

const orderTemplateModel = database.define('orderTemplate', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    symbol: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    side: {
        type: Sequelize.STRING,
        allowNull: false
    },
    limitPrice: Sequelize.STRING,
    limitPriceMultiplier: Sequelize.DECIMAL,
    stopPrice: Sequelize.STRING,
    stopPriceMultiplier: Sequelize.DECIMAL,
    quantity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantityMultiplier: Sequelize.DECIMAL,
    icebergQty: Sequelize.STRING,
    icebergQtyMultiplier: Sequelize.DECIMAL,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    indexes: [{
        fields: ['name', 'symbol'],
        unique: true
    }]
})

module.exports = orderTemplateModel;