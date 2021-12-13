require('dotenv').config();
const { lpList, recentPrice } = require('../../models');

module.exports = async (req, res) => {
  const partLplist = await lpList.findOne({where: {artist: req.body.artist, albumTitle: req.body.albumTitle}});
  const lpPrice = await recentPrice.findOne({where: {lpListId: partLplist.id}});

  if(!partLplist) {
    res.status(404).json({data: null, message: 'not found!'});
  } else {
    // 유저들이 등록하는 최근거래가, 좋아요, 태그 필요
    const lpInfo = {genre: partLplist.genre, artist: partLplist.artist, albumTitle: partLplist.albumTitle, sellingPrice: partLplist.sellingPrice, image: partLplist.image, lpPrice: lpPrice.price, date: lpPrice.date};

    res.status(200).json({data: lpInfo, message: 'found success!'});
  }
};