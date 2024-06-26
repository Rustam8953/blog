import PostModel from "../models/Post.js";

export const getLastTag = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();
        const tags = posts.map(obj => obj.tags).flat().slice(0, 5);
        res.json(tags);
    } catch (error) {
        console.log(error);
        res.json({
            message: "Не удалось получить статьи"
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUtl: req.body.imageUrl,
            tags: req.body.tags,
            author: req.userId
        })
        const post = await doc.save();
        res.json(post)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Не удалось создать пост"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('author', "-passwordHash").exec();
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.json({
            message: "Не удалось получить статьи"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndUpdate(
            {
                _id: postId
            }, {
                $inc: {viewCount: 1}
            }, {
                new: true,
                returnDocument: 'after'
            }
        )
        .then(doc => {
            if(!doc) {
                return res.status(404).json({
                    message: "Статья не найдена"
                })
            }
            res.json(doc);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                message: "Не удалось получить данные о статье"
            })
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: "Не удалось получить статьи"
        })
    }
}

export const removePost = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndDelete({_id: postId})
        .then(doc => {
            if(!doc) {
                return res.status(404).json({
                    message: "Статья не найдена"
                })
            }
            res.json({
                success: true
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                message: "Не удалось удалить статью"
            })
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: "Не удалось получить статьи"
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.updateOne({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUtl: req.body.imageUrl,
            tags: req.body.tags,
            author: req.userId
        })
        res.json({
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось обновить статью"
        })
    }
}