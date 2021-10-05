const express = require('express');
const comments = require('../models/comment');
const router = express.Router();
const loginAuth = require('../middlewares/loginAuth');
const jwt = require('jsonwebtoken');

router
    .route('/')
    .post(loginAuth.authTokenForSend, async (req, res) => {
        const { comment, cardId, commentDepth } = req.body;
        const author = req.userInfo.id;
        if (comment === '') {
            res.send({ result: 'Fail' });
        } else {
            const date = new Date();
            const now = date.toLocaleString();
            const submitTime = date.getTime();
            await comments.create({
                comment: comment,
                cardId: cardId,
                date: now,
                submitTime: submitTime,
                author: author,
                commentDepth: commentDepth,
            });
            res.send({ result: 'success' });
        }
    })
    .patch(loginAuth.authTokenForSend, async (req, res) => {
        const { comment, commentId } = req.body;
        const date = new Date();
        const editedTime = date.toLocaleString();
        if (comment === '') {
            res.send({ result: 'Fail' });
        } else {
            const edited = true;
            await comments.updateOne(
                { _id: commentId },
                { $set: { comment, edited, editedTime } }
            );
            res.send({ result: 'success' });
        }
    })
    .delete(loginAuth.authTokenForSend, async (req, res, next) => {
        const { commentId } = req.body;
        const commentExist = await comments.find({ _id: commentId });
        try {
            if (commentExist.length) {
                await comments.deleteOne({ _id: commentId });
                res.send({ result: 'success' });
            } else {
                res.send({ result: 'Fail' });
            }
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
