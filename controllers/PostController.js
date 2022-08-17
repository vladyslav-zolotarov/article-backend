import { ReturnDocument } from "mongodb";
import PostModel from "../models/Post.js"

export const getAll = async (req, res) => {
    try{
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "failed to load articles",
        })
    }
}

export const getOne = async (req, res) => {
    try{
        const postId = req.params.id;
        
        PostModel.findOneAndUpdate({
            _id: postId,
        }, {
            $inc: { viewsCount: 1 }
        },
        {
            ReturnDocument: 'after',
        },
        (err, doc) => {
            if(err) {
                return res.status(500).json({
                    message: "failed to load articles",
                })
            }

            if(!doc) {
                res.status(404).json({
                    message: "failed to load articles",
                })
            }
            res.json(doc)
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "failed to load articles",
        })
    }
}

export const remove = async (req, res) => {
    try{
        const postId = req.params.id;
        
        PostModel.findOneAndDelete({
            _id: postId,
        },
        (err, doc) => {
            if(err) {
                return res.status(500).json({
                    message: "failed to delete articles",
                })
            }

            if(!doc) {
                res.status(404).json({
                    message: "failed to load articles",
                })
            }
            res.json({
                success: true,
            })
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "failed to load articles",
        })
    }
}

export const create = async (req, res) =>{
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save();

        res.json(post);
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "failed to create article",
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId,
        }, 
        {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        res.json({
            success: true,
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "failed to update article",
        })
    }
}