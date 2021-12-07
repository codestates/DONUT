require('dotenv').config();
const { lplist } = require('../../models');

module.exports = async (req, res) => {
  const wholeLplist = await lplist.findAll();

  res.status(200).json({data: wholeLplist, message: 'whole lplist!'});
};