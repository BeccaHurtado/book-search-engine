const { User, Book } = require('../models')

const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('thought')
                .populate('friends');
                
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        // // get all users
        // users: async () => {
        //     return User.find()
        //         .select('-__v -password')
        //         .populate('friends')
        //         .populate('thoughts')
        // },

        // // get a user by username
        // user: async (parent, { username }) => {
        //     return User.findOne({ username })
        //         .select('-__v -password')
        //         .populate('friends')
        //         .populate('thoughts')
        // },

        // // parent is a placeholder to access the username as a second parameter.
        // thoughts: async (parent, { username }) => {
        //     const params = username ? { username } : {};
        //     // returning the data in descending order.
        //     // passing object with or without data in it.
        //     return Thought.find(params).sort({ createdAt: -1 })
        // },

        // // get a thought by id
        // thought: async (parent, { _id }) => {
        //     return Thought.findOne({ _id })
        // }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user);
            return { token, user };
        },
        savedBooks: async (parent, { bookData }, context) => {
            if (context.user) {
                const newUserBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );

                return newUserBook;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const  removeUserBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { removeBook: bookId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be looged in!');
        }

    }
};

module.exports = resolvers;