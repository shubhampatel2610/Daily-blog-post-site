const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Hi there, my name is Shubham Patel and I am a web developer. I am proud to say that I created this personal blog website using a variety of tools and technologies, including HTML, CSS, JavaScript, EJS, NodeJS, ExpressJS, and MongoDB. As a web developer, I am passionate about creating beautiful and functional websites that provide a great user experience. I love using my skills to create unique and innovative designs. One of the features of this site that you can upload blogs from the 'compose' section. This feature allows users to easily create and publish their own blog posts, sharing their thoughts and ideas with the world. When a user creates a new blog post, the content is saved in a MongoDB database. By using MongoDB to store the blogposts, this website is able to provide a fast and efficient way for users to search for and retrieve content.";

const aboutContent = "The leather jacked showed the scars of being his favorite for years. It wore those scars with pride, feeling that they enhanced his presence rather than diminishing it. The scars gave it character and had not overwhelmed to the point that it had become ratty. The jacket was in its prime and it knew it. The robot clicked disapprovingly, gurgled briefly inside its cubical interior and extruded a pony glass of brownish liquid. \"Sir, you will undoubtedly end up in a drunkards grave, dead of hepatic cirrhosis,\" it informed me virtuously as it returned my ID card. I glared as I pushed the glass across the table.";

const contactContent = "Your feedback is valuable to me. So, if you like what you see or have any suggestions for improvement, please don't hesitate to get in touch. Please fill out the contact form located in the Contact section of the website. The form is quick and easy to complete, and it allows me to collect all of the necessary information to respond to your message.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/blogDB');

const postSchema = {
  title: String,
  description: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}).then(function (posts) {
    res.render("home", {
      homeC: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    description: req.body.postDec
  });

  post.save()
    .then(function () {
      res.redirect("/");
    })
    .catch(function (error) {
      console.log(error);
    });

});

app.get("/posts/:postName", function (req, res) {

  const reqPostId = req.params.postName;

  Post.findOne({
    title: reqPostId
  }).then(function (post) {
    res.render("post", {
      title: post.title,
      description: post.description
    });
  }).catch(function (err) {
    console.log(err);
  });

});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contactC: contactContent,
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    aboutC: aboutContent,
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000...");
});