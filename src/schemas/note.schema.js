const { DataTypes } = require('sequelize');
const db = require('../helpers/db.helper')


const Note = db.define('notes', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    
},
    {
        timestamps: true,
        paranoid: true,
        sequelize: db,
    }
)

module.exports = Note