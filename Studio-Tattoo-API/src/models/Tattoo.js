const { Model, DataTypes } = require('sequelize');

class Tattoo extends Model {
  static init(sequelize) {
    super.init({
      descricao: DataTypes.STRING,
      tamanho: DataTypes.DOUBLE,
      desconto: DataTypes.DOUBLE,
      acrescimo: DataTypes.DOUBLE,
      valor: DataTypes.DOUBLE,
    }, {
      sequelize
    })
  }
  static associate(models) {
    this.belongsTo(models.Sessao, {
      foreignKey: 'sessao_id',
      as: 'sessao'
    })
  }
}

module.exports = Tattoo;