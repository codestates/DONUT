require('dotenv').config();
const { lpList } = require('../../models');

module.exports = async (req, res) => {
  const wholeLplist = await lpList.findAll();

  res.status(200).json({data: wholeLplist, message: 'whole lplist!'});
};