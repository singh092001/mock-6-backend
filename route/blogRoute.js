const express = require('express');
const auth = require('../middleware/auth');
const BlogModel = require('../model/blogModel');

const blogRoute = express.Router()

// username : ,
//     title : ,
//     content : ,
//     category : ,
//     date : 
//     likes : 
//     comments : 
//     userId : 

blogRoute.post("/post",auth, async(req,res)=>{

    try {

        const {username, title,content,category,likes} = req.body

        const {userId,UserName} = req.userInfo

        let obj = {
            username:UserName,
            title:title,
            content:content,
            category:category,
            likes:likes,
            userId: userId
        }

        const post = BlogModel(obj)
        post.save()

        res.status(200).json({message:"Blog Posted Successfully", post:post})
        
    } catch (error) {
        res.json({error:error.message})
    }

})

blogRoute.get("/",auth, async(req,res)=>{

    try {

        const {title,category,sort,order} = req.query

        let filter = {}

        if(title){
            filter.title = { $regex : title, $options : "i" }
        }
        if(category){
            filter.category = category
        }

        let sortOption = {}
        if(order=="asc"){
            sortOption.date = -1
        }
        else if(order=="desc"){
            sortOption.date = 1
        }

        const post = await BlogModel.find(filter).sort(sortOption)

        res.json({posts:post})
        
    } catch (error) {
        res.json({error:error.message})
    }
})

blogRoute.get("/:id", auth, async(req,res)=>{

    try {

        const {id} = req.params

        const Post = await BlogModel.findById(id)

        res.status(200).json({message:Post})
        
    } catch (error) {
        res.json({error:error.message})
    }

})

blogRoute.patch("/:id",auth, async(req,res)=>{


    try {

        const {id} = req.params

        const {userId, UserName} = req.userInfo

        // await BlogModel.find({_id:id}).then(async(result)=>{
        //     if(result[0].userId==userId){
        //        let val = await BlogModel.findByIdAndUpdate(id, req.body)
        //         // console.log(val)
        //         res.status(200).json({message:"Blog Updated Successfully"})
        //     }
        //     else{
        //         res.status(400).json({error:"not allowed"})
        //     }
        // })

        await BlogModel.findByIdAndUpdate(id, req.body)
        res.status(200).json({message:"Blog Updated Successfully"})

        
    } catch (error) {
        res.json({error:error.message})
    }
})
blogRoute.delete("/:id",auth, async(req,res)=>{


    try {

        const {id} = req.params

        const {userId, UserName} = req.userInfo

        await BlogModel.find({_id:id}).then(async(result)=>{
            if(result[0].userId==userId){
               let val = await BlogModel.findByIdAndDelete(id)
                // console.log(val)
                res.status(200).json({message:"Blog Deleted Successfully"})
            }
            else{
                res.status(400).json({error:"not allowed"})
            }
        })

        
    } catch (error) {
        res.json({error:error.message})
    }
})

blogRoute.patch("/:id/like",auth, async(req,res)=>{

    try {

        const {id} = req.params

        await BlogModel.findByIdAndUpdate(req.body, id)

        res.status(200).json({message:"Blog Updated Successfully"})
        
    } catch (error) {
        res.json({error:error.message})
    }

})


blogRoute.patch("/:id/comments",auth, async(req,res)=>{

    try {

        const {id} = req.params

        let post = await BlogModel.find({_id:id}).then((res)=>{
            res[0].comments.push(req.body)
            console.log(res[0])
            res[0].save()
        })
        
        

        res.json({message:"Comment Added to Blog"})
        
    } catch (error) {
        res.json({error:error.message})
    }

})


module.exports = blogRoute