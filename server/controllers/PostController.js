import PostModel from "../models/Post.js";

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