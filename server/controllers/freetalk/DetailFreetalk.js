require('dotenv').config();
const { freetalk } = require('../../models');

module.exports = async (req, res) => {
  const partFreetalk = await freetalk.findOne({where: {freetailId: req.body.id, title: req.body.title}});

  if(!partFreetalk) {
    res.status(404).json({data: null, message: 'not found!'});
  } else {
    // 임시
    const freetalkInfo = {title: partFreetalk.title, article: partFreetalk.article};
    
    res.status(200).json({data: freetalkInfo, message: 'found success!'});
  }
};