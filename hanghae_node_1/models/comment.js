// const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const commentsSchema = new Schema({
//     comment:{
//         type:String,
//         required:true
//     },
//     cardId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'cards',
//         required:true
//     },
//     date:{
//         type:String,
//         required:true
//     },
//     author:{
//         type:String,
//         required:true,
//     },
//     submitTime:{
//         type:Number,
//         required:true
//     },
//     ParentComment:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref: 'comment',
//     },
//     commentDepth:{
//         type:Number,
//         default:0
//     },
//     commentNumber:{
//         type:Number,
//     },
//     edited:{
//         type:Boolean,
//         default:false,
//     },
//     editedTime:{
//         type:String,
//     },
// })

// module.exports = mongoose.model("comment", commentsSchema);

const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
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
                comment: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                commentDepth: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                    defaultValue: 0,
                },
                edited: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                },
                editedTime: {
                    type: Sequelize.STRING(30),
                    allowNull:true,
                },
                date:{
                    type: Sequelize.STRING(30),
                    allowNull:false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'Comment',
                tableName: 'comments',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }
    static associate(db) {
        // user와 1:n 중 n의 관계
        db.Comment.belongsTo(db.User, {
            foreignKey: 'author',
            targetKey: 'userId',
        });
        // card와 1:n 중 n의 관계
        db.Comment.belongsTo(db.Card, {
            foreignKey: 'cardId',
            targetKey: 'id',
        });
    }
};
