//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "The trees, therefore, must be such old and primitive techniques that they thought nothing of them, deeming them so inconsequential that even savages like us would know of them and not be suspicious. At that, they probably didn't have too much time after they detected us orbiting and intending to land. And if that were true, there could be only one place where their civilization was hidden.It's always good to bring a slower friend with you on a hike. If you happen to come across bears, the whole group doesn't have to worry. Only the slowest in the group do. That was the lesson they were about to learn that day.";

const aboutContent = "The leather jacked showed the scars of being his favorite for years. It wore those scars with pride, feeling that they enhanced his presence rather than diminishing it. The scars gave it character and had not overwhelmed to the point that it had become ratty. The jacket was in its prime and it knew it. The robot clicked disapprovingly, gurgled briefly inside its cubical interior and extruded a pony glass of brownish liquid. \"Sir, you will undoubtedly end up in a drunkards grave, dead of hepatic cirrhosis,\" it informed me virtuously as it returned my ID card. I glared as I pushed the glass across the table.";

const contactContent = "It was difficult to explain to them how the diagnosis of certain death had actually given him life. While everyone around him was in tears and upset, he actually felt more at ease. The doctor said it would be less than a year. That gave him a year to live, something he'd failed to do with his daily drudgery of a routine that had passed as life until then. She had been told time and time again that the most important steps were the first and the last. It was something that she carried within her in everything she did, but then he showed up and disrupted everything. He told her that she had it wrong. The first step wasn't the most important. The last step wasn't the most important. It was the next step that was the most important.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

let posts = [];



app.get("/", function (req, res) {
  res.render("home", {
    homeC: homeStartingContent,
    posts: posts
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

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    description: req.body.postDec
  }

  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {

  posts.forEach(function (post) {
    if (_.lowerCase(req.params.postName) === _.lowerCase(post.title)) {
      res.render("post", {
        title: post.title,
        description: post.description,
      });
    }
  });
});



app.listen(3000, function () {
  console.log("Server is running on port 3000...");
});