const express = require('express');
const router = express.Router();
const Recepie = require('../models/Recepie')
const cookieParser = require('cookie-parser');


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
        ingredients: req.body.ingredients,
        preparation: req.body.preparation,
        selected: 0,
    });

    try{
    const savedPost = await post.save()
    res.json(savedPost)
}catch(err){
    res.json({message: err})
}
});

// Get one post
router.get('getone/:postId', async (req,res) => {
    try{
        const post = await Recepie.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.status(404).json({message: err})
    }
})

//Delet one Post
router.delete('/delete/:postId', async (req, res) => {
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

//Select a Recepie
router.get('/select/:recepieId', async (req, res) => {
    try{
        const resRecepie = await Recepie.findById(req.params.recepieId);
        const updatedPost = await Recepie.updateOne(
            { _id: req.params.recepieId }, 
            {$set: {selected: resRecepie.selected += 1}}
            )
        res.json(updatedPost);
    }catch(err){res.status(404).json({message: err})}
})

//Get Recomendations
router.get('/recomendations', async (req, res) => {
    try {
        let recomendations = await Recepie.find({}).sort({"selected": -1}).exec() 
        res.json(recomendations.slice(0, 3))
    }catch(err){res.status(400).json({message: err})}
})

//Deselect a Recepie
router.get('/deselect/:recepieId', async (req, res) => {
    try{
        const resRecepie = await Recepie.findById(req.params.recepieId);
        const updatedPost = await Recepie.updateOne(
            { _id: req.params.recepieId }, 
            {$set: {selected: resRecepie.selected -= 1}}
            )
        res.json(updatedPost);
    }catch(err){res.status(404).json({message: err})}
})

// Light/Dark Mode selector
router.get('/colormode/:type', async (req, res) => {
    if (req.params.type === 'get') {
        res.send(req.cookies);
    } else if (req.params.type === 'dark') {
        res.cookie('type', 'dark');
        res.send().status(200)
    } else if (req.params.type === 'light') {
        res.cookie('type', 'light');
        res.send().status(200)
    } else {
        res.status(400)
    }
})

module.exports = router;