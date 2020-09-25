const Post = {
  author(parent, args, { db }, info) {
    return db.users.find(user => {
      return user.id === parent.author;
    });
  },
  comment(parent, args, { db }, info) {
    return db.comments.filter(comment => {
      return comment.postID === parent.id;
    });
  }
};

export { Post as default };
