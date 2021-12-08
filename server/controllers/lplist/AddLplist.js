require('dotenv').config();
const { lplist } = require('../../models');

module.exports = (req, res) => [
  // 동일한 정보가 등록되지 않도록 findAll로 DB애서 확인하고 LP 데이터 저장하기?
  // findOrCreate로 찾아서 있으면 넘어가고 없으면 등록하기?
  // user의 manager가 true인 사람만 등록이 가능함

];