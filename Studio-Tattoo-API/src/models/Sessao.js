const { Model, DataTypes } = require('sequelize');

class Sessao extends Model {
  static init(sequelize) {
    super.init({
      status: DataTypes.STRING,
      total_acrescimo: DataTypes.DOUBLE,
      total_desconto: DataTypes.DOUBLE,
      total_liquido: DataTypes.DOUBLE,
    }, {
      sequelize
    })
  }
  static associate(models) {
    this.belongsTo(models.Cliente, {
      foreignKey: 'cliente_id',
      as: 'cliente'
    }),
      this.hasMany(models.Tattoo, {
        foreignKey: 'sessao_id',
        as: 'tattoos'
      })
  }
}

module.exports = Sessao;