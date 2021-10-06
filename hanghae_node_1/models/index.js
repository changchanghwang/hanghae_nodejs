// const mongoose = require("mongoose");

// // const connect = () => {
// //   mongoose
// //     .connect("mongodb://localhost:27017/admin", {
// //       useNewUrlParser: true,
// //       user: "test",
// //       pass: "test"
// //     })
// const connect = () => {
//   mongoose
//     .connect("mongodb://localhost:27017/hwangBlog", {
//       useNewUrlParser: true,
//     })
//     .catch(err => console.log(err));
// };
// mongoose.connection.on("error", err => {
//   console.error("몽고디비 연결 에러", err);
// });

// module.exports = connect;

const Sequelize = require('sequelize');
const User = require('./user');
const Card = require('./card');
const Comment = require('./comment');
const Like = require('./like');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

//관계설정에 대해 취합하는 코드
// Object.keys(db).forEach((modelName) => {
//     if (db[modelName].associate) {
//       db[modelName].associate(db);
//     }
// });
db.sequelize = sequelize;
db.User = User;
db.Card = Card;
db.Like = Like;
db.Comment = Comment;

User.init(sequelize);
Card.init(sequelize);
Comment.init(sequelize);
Like.init(sequelize);

User.associate(db);
Card.associate(db);
Comment.associate(db);
Like.associate(db);

module.exports = db;
