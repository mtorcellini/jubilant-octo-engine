const {DataTypes} = require('sequelize');

const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

User.addHook('beforeCreate', async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
  return user;
});

// function to compare attempted login password with actual password THIS IS NOT WORKING HERE
// User.checkPassword = async function (attemptPW) {
//   console.log('valid is ', valid);
//   const valid = await bcrypt.compare(attemptPW, this.password);
//   return valid;
// }
module.exports = User;