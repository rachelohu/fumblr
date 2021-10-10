////////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

const mongoose = require("./connection")
const Blog = require("./blog")

mongoose.connection.on("open", () => {
    // Run database queries in this function
  
    // create array of starter
    const startBlogs = [
        { name: "About Me", text: "Hi", public: false },
        { name: "Travels", text: "Asia", public: false },
        { name: "Eats", text: "Korean Food", public: false },
        { name: "Candid", text: "Smile", public: false },
        { name: "Fun", text: "Gaming", public: false },
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