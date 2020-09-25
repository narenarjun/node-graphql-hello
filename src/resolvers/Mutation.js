// import uuidv4 from 'uuid/v4';
import uuidv4 from 'uuid'

const Mutation = {
  createUser: (parent, args, { db }, info) => {
    const emailTaken = db.users.some(user => user.email === args.data.email);
    if (emailTaken) {
      throw new Error('Email taken!');
    }
    const newUser = {
      id: uuidv4(),
      ...args.data
    };
    db.users.push(newUser);
    return newUser;
  },
  deleteUser: (parent, args, { db }, info) => {
    const userIndex = db.users.findIndex(user => user.id === args.id);
    if (userIndex === -1) {
      throw new Error('User not Found!');
    }
    const deletedUsers = db.users.splice(userIndex, 1);
    posts = db.posts.filter(post => {
      const match = post.author === args.id;
      if (match) {
        comments = db.comments.filter(comment => comment.postID !== post.id);
      }
      return !match;
    });
    db.comments = db.comments.filter(comment => comment.author !== args.id);
    return deletedUsers[0];
  },
  updateUser: (parent, args, { db }, info) => {
    const { id, data } = args;
    const user = db.users.find(user => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === data.email);
      if (emailTaken) {
        throw new Error('Email taken');
      }
      user.email = data.email;
    }
    if (typeof data.name === 'string') {
      user.name = data.name;
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }
    return user;
  },
  createPost: (parent, args, { db, pubsub }, info) => {
    const userExists = db.users.some(user => user.id === args.data.author);
    if (!userExists) {
      throw new Error('User Not Found!');
    }
    const post = {
      id: uuidv4(),
      ...args.data
    };
    db.posts.push(post);

    if (args.data.published) {
      pubsub.publish('posts', {
        post: {
          mutation: 'CREATED',
          data: post
        }
      });
    }

    // this will return the created post
    return post;
  },
  deletePost: (parent, args, { db, pubsub }, info) => {
    const postIndex = db.posts.findIndex(post => post.id === args.id);

    if (postIndex === -1) {
      throw new Error('Unable to find the post');
    }

    const [post] = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter(comment => comment.postID !== args.id);

    if (post.published) {
      pubsub.publish('posts', {
        post: {
          mutation: 'DELETED',
          data: post
        }
      });
    }

    return post;
  },
  updatePost: (parent, args, { db, pubsub }, info) =>{
    const { id, data } = args;
    const post = db.posts.find(post => post.id === id);
    const originalPost = { ...post };

    if (!post) {
      throw new Error('Unable to find post');
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }
    if (typeof data.body === 'string') {
      post.body = data.body;
    }
    if (typeof data.published === 'boolean') {
      post.published = data.published;

      if (originalPost.published && !post.published) {
        pubsub.publish('posts', {
          post: {
            mutation: 'DELETED',
            data: originalPost
          }
        });
      } else if (!originalPost.published && post.published) {
        pubsub.publish('posts', {
          post: {
            mutation: 'CREATED',
            data: post
          }
        });
      }
    } else if (post.published) {
      // console.log('i am called');

      pubsub.publish('posts', {
        post: {
          mutation: 'UPDATED',
          data: post
        }
      });
    }

    return post;
  },
  createComment: (parent, args, { db, pubsub }, info) => {
    const userExists = db.users.some(user => user.id === args.data.author);
    const postExists = db.posts.some(
      post => post.id === args.data.postID && post.published
    );

    if (!userExists || !postExists) {
      throw new Error('Unable to find user and post');
    }

    const comment = {
      id: uuidv4(),
      ...args.data
    };

    db.comments.push(comment);
    pubsub.publish(`comment ${args.data.postID}`, {
      comment: {
        mutation: 'CREATED',
        data: comment
      }
    });
    return comment;
  },
  deleteComment: (parent, args, { db, pubsub }, info) => {
    const commentIndex = db.comments.findIndex(
      comment => comment.id === args.id
    );
    if (commentIndex === -1) {
      throw new Error('Unable to find comment');
    }
    const [deletedComment] = db.comments.splice(commentIndex, 1);
    pubsub.publish(`comment ${deletedComment.postID}`, {
      comment: {
        mutation: 'DELETED',
        data: deletedComment
      }
    });

    return deletedComment;
  },
  updateComment: (parent, args, { db, pubsub }, info) => {
    const { id, data } = args;

    const comment = db.comments.find(comment => comment.id === id);

    if (!comment) {
      throw new Error('No comment found');
    }

    if (typeof comment.text === 'string') {
      comment.text = data.text;
    }
    pubsub.publish(`comment ${comment.postID}`, {
      comment: {
        mutation: 'UPDATED',
        data: comment
      }
    });

    return comment;
  }
};

export { Mutation as default };
