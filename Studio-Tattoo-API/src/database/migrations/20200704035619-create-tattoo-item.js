'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tattoo_itens', {
      sessao_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: 'sessaos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tattoo_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: 'tattoos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      desconto: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      acrescimo: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      total: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tattoo_itens');
  }
};
