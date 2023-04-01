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
    addUser: async (p, { body }) => {
      return await User.create(body);
    },
    login: async (p, { body }) => {
      const user = await User.findOne({
        $or: [{ username: body.username }, { email: body.email }],
      });

      if (!user) {
        throw new AuthenticationError('No user found');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (p, { newBook }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: newBook } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
