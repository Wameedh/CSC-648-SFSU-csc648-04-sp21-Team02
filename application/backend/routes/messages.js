const express = require('express');
const connection = require('../db');
const router = express.Router();

router.post("/api/reply",(req,res)=>{
    connection.query(
        `INSERT INTO Message (subject, body, sender_id, recipient_id, timestamp, reply_id, read)
         VALUES ('${"RE: " + req.body.selectedMessage.subject}', '${req.body.replyBody}', '${req.session.reg_user_id}', '${req.body.selectedMessage.sender_id}', NOW(), '${req.body.selectedMessage.message_id}', false)`,
    function(err, result){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            console.log(result)
            res.status(200).json(result);
        }
    })    
})

router.get("/api/messages", (req,res) =>{
    //get message and profile pic, display_name or username?
    connection.query(
        `SELECT * 
         FROM Message
         JOIN RegisteredUser ON Message.sender_id = RegisteredUser.reg_user_id
         JOIN Account ON RegisteredUser.user_id = Account.user_id
         LEFT JOIN Profile ON Account.account_id = Profile.account_id
         WHERE recipient_id= '${req.session.reg_user_id}'
        `,
    function(err,messages){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            console.log(messages)
            res.status(200).json(messages);
        }
    })
})

router.post("/api/message", (req,res) =>{
    console.log(req.body);
    console.log("POST /api/message")
    connection.query(`INSERT INTO Message (subject, body, sender_id, recipient_id, timestamp) 
         VALUES ('${req.body.messageSubject}', '${req.body.messageBody}', '${req.session.reg_user_id}', 
         (SELECT RegisteredUser.reg_user_id
          FROM RegisteredUser
          JOIN User ON RegisteredUser.user_id = User.user_id
          JOIN Account ON User.user_id = Account.user_id
          WHERE Account.account_id = '${req.body.recipientAccountID}'), 
          NOW())`,
    function(err,result){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            console.log(result);
            res.status(200).json(result);
        }
    })
})

module.exports = router