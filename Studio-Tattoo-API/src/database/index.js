const Sequelize = require('sequelize')
const dbConfig = require('../config/database');

const Cliente = require('../models/Cliente')
const Sessao = require('../models/Sessao')
const Tattoo = require('../models/Tattoo')


const connection = new Sequelize(dbConfig);

Cliente.init(connection);
Sessao.init(connection)
Tattoo.init(connection)

Cliente.associate(connection.models)
Sessao.associate(connection.models)
Tattoo.associate(connection.models)

module.exports = connection;