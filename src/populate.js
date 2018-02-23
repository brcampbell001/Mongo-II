const fs = require('fs');
const mongoose = require('mongoose');
let savedPosts = null;

const Post = require('./post.js');

const readPosts = () => {
  // cache posts after reading them once
  if (!savedPosts) {
    const contents = fs.readFileSync('posts.json', 'utf8');
    savedPosts = JSON.parse(contents);
  }
  return savedPosts;
};

const populatePosts = () => {
  readPosts()
  mongoose  
    .connect('mongodb://localhost/so-posts')
    .then(db => {
      Post.create(savedPosts)
        .then(docs => {
          console.log('posts added');
          mongoose.disconnect();
        });
    })
    .catch(error => {
      mongoose.disconnect();
    })
    .catch(error => console.log('could not connect'));
};
populatePosts()
module.exports = { readPosts, populatePosts };




/* Trying to use promises no worky it does not */
 // const populatePosts = () => {

  //   // TODO: implement this
  //   allPosts = readPosts();
  //   const promises = allPosts.map(post =>
  //     newPost(post).save());
  //   return Promise.all(promises);
  // };