import {Router} from 'express';
import Blog from '../../DB/models/blog.model.js';
import {Blogs,createBlog,deleteBlog,deleteAllBlogs,EditBlog} from './blog.service.js';

// blog Routes
const router = Router();

router.get("/",Blogs);
router.post("/create",createBlog);
router.delete("/delete/:id",deleteBlog);
router.delete("/deleteBlogs/:authorID",deleteAllBlogs);
router.put("/edit/:id",EditBlog);


export default router;



