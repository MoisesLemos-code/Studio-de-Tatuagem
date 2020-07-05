const { Model, DataTypes } = require('sequelize');

class Tattoo extends Model {
  static init(sequelize) {
    super.init({
      descricao: DataTypes.STRING,
      tamanho: DataTypes.DOUBLE,
      valor: DataTypes.DOUBLE,
    }, {
      sequelize
    })
  }
  static associate(models) {
    this.belongsToMany(models.Sessao, {
      through: models.Tattoo_item,
      as: 'sessaos',
      foreignKey: 'tattoo_id',
    })
  }
}

module.exports = Tattoo;