const mongoose = require("mongoose");

// const connect = () => {
//   mongoose
//     .connect("mongodb://localhost:27017/admin", {
//       useNewUrlParser: true,
//       user: "test",
//       pass: "test"
//     })
const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/hwangBlog", {
      useNewUrlParser: true,
    })
    .catch(err => console.log(err));
};
mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});


module.exports = connect;