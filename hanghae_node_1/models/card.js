// const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const cardSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     desc: {
//         type: String,
//         required: true
//     },
//     submitTime:{
//         type:Number,
//         required: true
//     },
//     author:{
//         type:String,
//         required: true
//     },
//     pw:{
//         type:String,
//         required:true
//     },
//     date:{
//         type:String,
//         required:true
//     },
//     like:{
//         type:Number,
//         default:0,
//     }
// })

// module.exports = mongoose.model("cards", cardSchema);
const Sequelize = require('sequelize');
module.exports = class Card extends Sequelize.Model {
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
                title: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                desc: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                pw: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                like: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                date:{
                    type: Sequelize.STRING(30),
                    allowNull: false,
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'Card',
                tableName: 'cards',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }
    static associate(db) {
        db.Card.belongsTo(db.User,{foreignKey: 'author', targetKey:'userId'});
        db.Card.hasMany(db.Comment,{foreignKey: 'cardId', sourceKey: 'id'});
        db.Card.hasMany(db.Like,{foreignKey:'cardId', sourceKey: 'id'});
    }
};
