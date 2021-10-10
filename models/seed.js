////////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

const mongoose = require("./connection")
const Blog = require("./blog")

mongoose.connection.on("open", () => {
    // Run database queries in this function
  
    // create array of starter
    const startBlogs = [
        { name: "About Me", text: "text", public: false },
        { name: "Travels", text: "text", public: false },
        { name: "Eats", text: "text", public: false },
        { name: "Candid", text: "text", public: false },
        { name: "Fun", text: "text", public: false },
      ]
  
  // Delete all blogs
  Blog.deleteMany({}, (err, data) => {
    //seed starter blogs
    Blog.create(startBlogs, (err, data) => {
        console.log("-------BLOG CREATED---------")
        console.log(data)
        console.log("-------BLOG CREATED---------")
    })


})
});