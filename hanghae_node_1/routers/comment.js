const express = require('express');
const Comment = require('../models/comment');
const router = express.Router();
const loginAuth = require('../middlewares/loginAuth/loginAuth');
const { commentSchema } = require('./joi');

router
    .route('/')
    .post(loginAuth.authTokenForSend, async (req, res) => {
        const { comment, cardId, commentDepth } =
            await commentSchema.validateAsync(req.body);
        const author = req.userInfo.id;
        if (comment === '') {
            res.send({ result: 'Fail' });
        } else {
            const date = new Date();
            const now = date.toLocaleString();
            await Comment.create({
                comment,
                cardId,
                date: now,
                author,
                commentDepth,
            });
            res.send({ result: 'success' });
        }
    })
    .patch(loginAuth.authTokenForSend, async (req, res) => {
        const { comment, commentId } = await commentSchema.validateAsync(
            req.body
        );
        const date = new Date();
        const editedTime = date.toLocaleString();
        if (comment === '') {
            res.status(400).send({ result: 'Fail' });
        } else {
            const edited = true;
            await Comment.update(
                { comment, edited, editedTime },
                { where: { id: commentId } }
            );
            res.status(200).send({ result: 'success' });
        }
    })
    .delete(loginAuth.authTokenForSend, async (req, res, next) => {
        const { commentId } = req.body;
        const commentExist = await Comment.findOne({
            where: { id: commentId },
        });
        try {
            if (commentExist) {
                await Comment.destroy({ where: { id: commentId } });
                res.status(200).send({ result: 'success' });
            } else {
                res.status(400).send({ result: 'Fail' });
            }
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
