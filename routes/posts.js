const express = require('express')
const router = express.Router();
const Recepie = require('../models/Recepie')


//Get all posts
router.get('/', async (req, res) => {
    try{
        const posts = await Recepie.find();
        res.json(posts);
    }catch(err){
    res.json({Error: err});
    }
});

//Add Post
router.post('/', async (req,res) => {
    const post = new Recepie({
        title: req.body.title,
        ingredeants: req.body.ingredeants,
        preparation: req.body.preparation,
        type: req.body.type
    });

    try{
    const savedPost = await post.save()
    res.json(savedPost)
}catch(err){
    res.json({message: err})
}
});

// Get one post
router.get('/:postId', async (req,res) => {
    try{
        const post = await Recepie.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.status(404).json({message: err})
    }
})

//Delet one Post
router.delete('/:postId', async (req, res) => {
    try{
        const removedPost = await Recepie.remove({ _id: req.params.postId })
    }catch(err){
        res.status(404).json({message: err})
    }
})

//Update the title of a post 
router.patch('/title/:postId', async (req,res) => {
    try{
        const updatedPost = await Recepie.updateOne(
            { _id: req.params.postId }, 
            {$set: {title: req.body.title}}
            )
        res.json(updatedPost);
    }catch(err){res.status(404).json({message: err})}
})

//Update the description of a post 
router.patch('/description/:postId', async (req,res) => {
    try{
        const updatedPost = await Recepie.updateOne(
            { _id: req.params.postId }, 
            {$set: {description: req.body.description}}
            )
        res.json(updatedPost);
    }catch(err){res.status(404).json({message: err})}
})

module.exports = router;