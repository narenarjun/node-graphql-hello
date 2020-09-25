const Query = {
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    } else {
      return db.posts.filter(post => {
        const isTitlematch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodymatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitlematch || isBodymatch;
      });
    }
  },
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    } else {
      return db.users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    }
  },
  comment(parent, args, { db }, info) {
    return db.comments;
  },
  post() {
    return {
      id: '12lkrfss4',
      title: 'Flutter for WEB',
      body:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum esse quidem accusamus minus earum est, nesciunt doloribus aliquam non quibusdam recusandae quos laudantium dolor',
      published: true
    };
  }
};

export { Query as default };
