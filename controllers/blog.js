////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Blog = require("../models/blog")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

///////////////////////////////////////
// router middleware
///////////////////////////////////////
router.use((req, res, next) => {
    if (req.session.loggedIn){
        next()
    } else {
        res.redirect("/user/login")
    }
})

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
router.get("/blogs/seed", (req, res) => {

    // array of starter blogs
    const startBlogs = [
        { name: "About Me", text: "text", public: false },
        { name: "Travels", text: "text", public: false },
        { name: "Eats", text: "text", public: false },
        { name: "Candid", text: "text", public: false },
        { name: "Fun", text: "text", public: false },
      ]
  
    // Delete all blogs
    Blog.remove({}, (err, data) => {
      // Seed Starter Blogs
      Blog.create(startBlogs,(err, data) => {
          // send created blogs as response to confirm creation
          res.json(data);
        }
      );
    });
  });


// Index Route (Get => /blogs)
router.get("/", (req, res) => {
    Blog.find({username: req.session.username}, (err, blogs) => {
        res.render("blogs/index.ejs", {blogs})
    })
})

//New Route
router.get("/new", (req,res) => {
    res.render("blogs/new.ejs")
})

//Destroy Route
router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // delete the blog
    Blog.findByIdAndRemove(id, (err, blog) => {
        // redirect user back to index page
        res.redirect("/blogs")
    })
})

//Update Route
router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // check if the public property should be true or false
    req.body.public = req.body.public === "on" ? true : false
    // update the blog
    Blog.findByIdAndUpdate(id, req.body, {new: true}, (err, blog) => {
        // redirect user back to main page when blog 
        res.redirect("/blogs")
    })
})

//Create Route
router.post("/", (req, res) => {
    // convert ready to eat to true or false
    req.body.public = req.body.public === "on" ? true : false
    // add the username to req.body
    req.body.username = req.session.username
    // create the new blog
    Blog.create(req.body, (err, blog) => {
        //send the user back to index
        res.redirect("/blogs")
    })
})

//Edit Route
router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the blog from the database
    Blog.findById(id, (err, blog) => {
        // render template and send it blog
        res.render("blogs/edit.ejs", {blog})
    })
})


//Show Route
router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id

    // find the particular blog from the database
    Blog.findById(id, (err, blog) => {
        // render the template with the data from the database
        res.render("blogs/show.ejs", {blog})
    })
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router