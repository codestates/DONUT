require("dotenv").config();
const { lpList, recentPrice } = require("../../models");

module.exports = async (req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  const { lpListId } = obj;
  //console.log(obj)

  const partLplist = await lpList.findOne({ where: { id: lpListId } });
  // const lpPrice = await recentPrice.findOne({where: {lpListId: lpListId}});

  const recentPrices = await recentPrice.findAll({
    where: { lpListId: lpListId },
  });
  // const recentPriceInfo = recentPrice.dataValues;

  // console.log(recentPrices, "가격 추가");
  let recentPriceArr = [];
  for (let prop of recentPrices) {
    let innerObj = {};
    innerObj.price = prop.dataValues.price;
    innerObj.date = prop.dataValues.date;

    recentPriceArr.push(innerObj);
  }
  console.log(recentPriceArr);

  if (!partLplist) {
    res.status(404).json({ data: null, message: "not found!" });
  } else {
    // 유저들이 등록하는 최근거래가, 좋아요, 태그 필요
    const lpInfo = {
      genre: partLplist.genre,
      artist: partLplist.artist,
      albumTitle: partLplist.albumTitle,
      sellingPrice: partLplist.sellingPrice,
      image: partLplist.image,
      // price: recentPriceInfo.price,
      // date: recentPriceInfo.date,
    };

    console.log(lpInfo);

    res
      .status(200)
      .json({
        data: lpInfo,
        recentPrice: recentPriceArr,
        message: "found success!",
      });
  }
};
