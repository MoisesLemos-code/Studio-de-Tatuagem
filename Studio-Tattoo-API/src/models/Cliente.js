const { Model, DataTypes } = require('sequelize');

class Cliente extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      endereco: DataTypes.STRING,
      email: DataTypes.STRING,
    }, {
      sequelize
    })
  }
  static associate(models) {
    this.hasMany(models.Sessao, {
      foreignKey: 'cliente_id',
      as: 'sessaos'
    })
  }
}

module.exports = Cliente;