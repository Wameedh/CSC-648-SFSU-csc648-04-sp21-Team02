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
                     console.log(response);
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
                    console.log(response);
                    res.status(200).json(response);
                }
            }
        )
    }

})

module.exports = router