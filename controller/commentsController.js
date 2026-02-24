import commentModel from "../models/Comments.js";


const allComments = async (req, res) => { 
    res.render('admin/comments', { role: req.role });
}


export {
    allComments
}