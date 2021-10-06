// const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const userSchema = new Schema({
//     id: {
//         type: String,
//         required: true,
//     },
//     pw: {
//         type: String,
//         required: true
//     }
// })

// module.exports = mongoose.model("users", userSchema);

const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    unique:true,
                    type: Sequelize.INTEGER,
                },
                userId: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                    primaryKey:true,
                    unique: true,
                },
                pw: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'User',
                tableName: 'users',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }
    static associate(db) {
        //comment와 1대 N의 관계 중 1의 관계
        db.User.hasMany(db.Comment, {
            foreignKey: 'author',
            sourceKey: 'userId',
        });
        //card와 1대 M의 관계중 1의 관계
        db.User.hasMany(db.Card, { foreignKey: 'author', sourceKey: 'userId' });
        //like와 1대 N 중 1의 관계
        db.User.hasMany(db.Like, { foreignKey: 'userId', sourceKey: 'userId' });
    }
};
