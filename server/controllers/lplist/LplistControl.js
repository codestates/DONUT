require('dotenv').config();
const { lplist } = require('../../models');

module.exports = {
  allLplist: async (req, res) => {
    // LP리스트 전체 가져오기
    const wholeLplist = await lplist.findAll();

    res.status(200).json({data: wholeLplist, message: 'whole lplist!'})
  },
  detailLplist: async (req, res) => {
    const partLplist = await lplist.findOne({where: {artist: req.body.artist, albumTitle: req.body.albumTitle}});

    if(!partLplist) {
      res.status(404).json({data: null, message: 'not found!'});
    } else {
      // 유저들이 등록하는 최근거래가, 좋아요, 태그 필요
      const lpInfo = {genre: partLplist.genre, artist: partLplist.artist, albumTitle: partLplist.albumTitle, sellingPrice: partLplist.sellingPrice, image: partLplist.image};

      res.status(200).json({data: lpInfo, message: 'found success!'});
    }
  }
};