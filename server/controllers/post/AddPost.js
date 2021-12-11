require('dotenv').config();
const { post, user } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = (req, res) => {
	// 내용 작성 후 share 버튼 누르면 내용 추가
  // body에 내용이 담겨 오겠지요?
  // picture, writing 으로 db에 되어있음
  //console.log(req)
  const authorization = isAuthorized(req);
  const {picture, writing} = req.body;
  console.log(picture)

  if(!authorization) {
    res.status(401).send({message: 'Invalid token!'});
  } else if(!picture) { // 포스트의 주된 기능은 사진업로드!
    res.status(422).send({message: 'Required items not included!'});
  } else {
    // ! 유저아이디 어떻게 채울지 확인요망 !
    // 토큰 + 이메일로 유정정보를 user테이블에서 확인하고 가져올 수 있다면
    // 유저의 해당 id(pk)를 전달?
    post.create({picture, writing}); // 포스트에 신규 등록인데 유저 아이디 어케 채움?으음?

    res.status(201).send({message: 'Post created!'});
  }
};