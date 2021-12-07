require('dotenv').config();
const { post } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

// 새포스트 등록, 등록된 포스트 수정, 등록된 포스트 삭제, 전체 포스트 보여주기, 클릭한 포스트만 보여주기
module.exports = {
  allPost: async (req, res) => {
    // 클라이언트에서 get 요청 => 비회원도 이용할 수 있기 때문에 토큰 확인은 필요없음(단순 열람)
    // findAll?
    const wholePost = await post.findAll();
    res.status(200).json({data: wholePost, message: 'whole post list!'})
  },
  detailPost: async (req, res) => {
    const partPost = await post.findOne({where: {userId: req.body.userId, picture: req.body.picture}});

    if(!partPost) {
      res.status(404).json({data: null, message: 'not found!'});
    } else {
      // 임시! 작성자 닉네임 프로필 사진도 불러올것 (sequelize 손 보고!)
      const postInfo = {picture: partPost.picture, writing: partPost.writing};

      res.status(200).json({data: postInfo, message: 'found success!'});
    }
  },
  checkCookie: (req, res) => { // 작성하기 누른 시점에서 로그인 여부를 확인 => 작성하기를 누른 시점에서 토큰 확인
    const authorization = isAuthorized(req);

    if(!authorization) {
      res.status(401).json({data: null, message: 'not authorized!'});
    } else {
      res.status(200).json({data: null, message: 'write post!'});
    }
  },
  // 새로운 포스트 작성시 클라이언트가 보내는 것 => 바디에는 새로운 포스트 내용
  addNewPost: (req, res) => {
    // 내용 작성 후 share 버튼 누르면 내용 추가
    // body에 내용이 담겨 오겠지요?
    // picture, writing 으로 db에 되어있음
    const authorization = isAuthorized(req);
    const {picture, writing} = req.body;

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
  },
  postModify: (res, req) => { // 수정은 어떻게 해야할까~ 모르게따아ㅏㅏㅏ
    // 포스트 수정은 patch 메소드를 씀
    const authorization = isAuthorized(req);
    // res.body

    if(!authorization) {
      res.status(401).send({message: 'Invalid token!'});
    }
  },
  deletePost: (req, res) => {
    const authorization = isAuthorized(req);
    //const {postId: post_id} = req.params; // ! 클라이언트와 통신하면서 체크 필요

    if(!authorization) {
      res.status(401).send({message: 'Invalid token!'});
    } else {
      //await post.destroy({where: post_id}); // ! 클라이언트와 통신하면서 체크 필요
    }
  }
};