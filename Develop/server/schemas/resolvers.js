const { User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    oneUser: async (p, args) => {
      return await User.findById(args.id);
    },
  },
  Mutation: {
    addUser: async () => {
      return await User.create(body);
    },
  },
};

module.exports = resolvers;
