const { Model, DataTypes } = require('sequelize');

class Tattoo_item extends Model {
  static init(sequelize) {
    super.init({
      desconto: DataTypes.DOUBLE,
      acrescimo: DataTypes.DOUBLE,
      quantidade: DataTypes.DOUBLE,
      valor: DataTypes.DOUBLE,
      total: DataTypes.DOUBLE,
    }, {
      sequelize,
      tableName: 'tattoo_itens'
    })
  }
  static associate(models) {
    this.belongsTo(models.Sessao, {
      foreignKey: 'sessao_id',
      as: 'sessao'
    }),
      this.belongsTo(models.Tattoo, {
        foreignKey: 'tattoo_id',
        as: 'tattoo'
      })
  }

}

module.exports = Tattoo_item;