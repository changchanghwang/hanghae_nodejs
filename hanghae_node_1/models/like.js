// const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const likeSchema = new Schema({
//     cardId: {
//         type: String,
//         required: true,
//     },
//     userId: {
//         type: String,
//         required: true
//     }
// })

// module.exports = mongoose.model("likes", likeSchema);

const Sequelize = require('sequelize');

module.exports = class Like extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'Like',
                tableName: 'likes',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }
    static associate(db) {
        //user와 1:n
        db.Like.belongsTo(db.User, {
            foreignKey: 'user',
            targetKey: 'userId',
        });
        //포스팅과 좋아요의 관계는 1:n
        db.Like.belongsTo(db.Card, { foreignKey: 'cardId', targetKey: 'id' });
    }
};
