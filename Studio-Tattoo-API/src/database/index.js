const Sequelize = require('sequelize')
const dbConfig = require('../config/database');

const Cliente = require('../models/Cliente')
const Sessao = require('../models/Sessao')
const Tattoo = require('../models/Tattoo')
const Tattoo_item = require('../models/Tattoo_item')

const connection = new Sequelize(dbConfig);

Cliente.init(connection);
Sessao.init(connection)
Tattoo.init(connection)
Tattoo_item.init(connection)

Cliente.associate(connection.models)
Sessao.associate(connection.models)
Tattoo.associate(connection.models)
Tattoo_item.associate(connection.models)

module.exports = connection;