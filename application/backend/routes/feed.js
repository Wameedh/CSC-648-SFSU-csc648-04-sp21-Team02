const express = require('express');
const connection = require('../db');
const router = express.Router();

router.get("/api/get-feed-user",(req,res)=>{
    console.log("/api/get-feed-user");
    let response = {};

    if(req.session.role === 1){ //if user is a pet owner
        connection.query(
            `SELECT User.first_name, Profile.profile_pic_link
             FROM User
             LEFT JOIN Account on User.user_id = Account.user_id
             LEFT JOIN Credentials on Account.account_id = Credentials.acct_id
             LEFT JOIN Profile on Account.account_id = Profile.account_id
             WHERE Credentials.username = ?`, [req.session.username], 
             function(err, feedUser){
                 if(err){
                    console.log(err);
                 }
                 else{
                     response = {displayName: feedUser[0].first_name, profile_pic_link: feedUser[0].profile_pic_link }
                    //  console.log(response);
                     res.status(200).json(response);
                 }
             }
        )
    }
    else if(req.session.role === 2){
        connection.query(
            `SELECT Business.name, Profile.profile_pic_link
            FROM User
            LEFT JOIN Account on User.user_id = Account.user_id
            LEFT JOIN Credentials on Account.account_id = Credentials.acct_id
            LEFT JOIN Profile on Account.account_id = Profile.account_id
            LEFT JOIN RegisteredUser on User.user_id = RegisteredUser.user_id
            LEFT JOIN Business on RegisteredUser.reg_user_id = Business.reg_user_id
            WHERE Credentials.username = ?`, [req.session.username],
            function(err, feedUser){
                if(err){
                   console.log(err);
                }
                else{
                    response = {displayName: feedUser[0].name, profile_pic_link: feedUser[0].profile_pic_link }
                    // console.log(response);
                    res.status(200).json(response);
                }
            }
        )
    }

})

router.get("/api/get-feed-posts",(req,res)=>{
    console.log("/api/get-feed-posts");
    let username = req.session.username;
    connection.query(
        `SELECT Post.post_id, Post.timestamp, Post.like_count, Post.body, Profile.display_name, Profile.profile_pic_link, Photo.link
         FROM Post
         LEFT JOIN Photo ON Post.post_id = Photo.post_id
         LEFT JOIN RegisteredUser ON RegisteredUser.reg_user_id = Post.reg_user_id
         LEFT JOIN User ON RegisteredUser.user_id = User.user_id
         LEFT JOIN Account ON User.user_id = Account.user_id
         LEFT JOIN Profile ON Account.account_id = Profile.account_id
         WHERE Post.reg_user_id
         IN 
         (SELECT 
          Follow.reg_user_id
          FROM Follow
          WHERE Follow.follower_id = '${req.session.reg_user_id}'
          UNION
            SELECT RegisteredUser.reg_user_id
            FROM RegisteredUser
            WHERE RegisteredUser.reg_user_id = '${req.session.reg_user_id}'
          )
          ORDER BY Post.timestamp DESC
        `,
        function(err, posts){
            if(err)
                console.log(err);
            else{
                // console.log("Posts: ", posts);
                res.status(200).json(posts);
            }
        }
    )
})

module.exports = router