const { DataTypes } = require('sequelize');
const db = require('../helpers/db.helper');
const Note = require('./note.schema');


const User = db.define('users', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
},
    {
        timestamps: true,
        paranoid: true,
        sequelize: db,
    }
)

Note.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(Note, { foreignKey: 'user_id' })

module.exports = User