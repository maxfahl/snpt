const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../database/models");
const { getUser } = require("../components/user");

const JWT_SECRET = process.env.JWT_SECRET;

const {
    UserInputError, // Throw an error if empty fields.
    AuthenticationError,
    ValidationError,
} = require("apollo-server");

const getToken = ({ id, email }) => {
    return jwt.sign(
        {
            id,
            email,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
    );
};

const validateInput = (email, password) => {
    const emailValid = !!email ? !!email.trim() : false;
    const passwordValid = !!password ? !!password.trim() : false;
    const valid = emailValid && passwordValid;
    const out = {
        valid,
        errors: [],
    };
    if (!emailValid) out.errors.push("Email cannot be blank.");
    if (!passwordValid) out.errors.push("Password cannot be blank.");
    return out;
};

// noinspection JSUnusedGlobalSymbols
const resolvers = {
    Query: {
        users: async () => {
            return await models.User.findAll();
        },
        user: async (parent, { userId }, { auth }) => {
            // const user = await getUser(auth);
            // if (user && user.id === userId) {
                return await models.User.findByPk(userId);
            // } else {
            //     throw new AuthenticationError("Not authorized!");
            // }
        },
    },

    User: {
        snippets: async (parent, args, context) => {
            return await models.Snippet.findAll({
                where: { userId: parent.dataValues.id },
            });
        },
        snippetGroups: async (parent) => {
            return await models.SnippetGroup.findAll({
                where: { userId: parent.dataValues.id },
            });
        },
    },

    Mutation: {
        async loginUser(parent, { email, password }) {
            // validateLogin is a simple func that checks for empty fields
            // and return valid = false if any.
            const { errors, valid } = validateInput(email, password);
            if (!valid) throw new UserInputError("Error", { errors });

            // check if that user already exists.
            const user = await models.User.findOne({ where: { email } });
            if (!user) throw new AuthenticationError("this user is not found!");

            const match = await bcrypt.compare(password, user.password);
            if (!match) throw new AuthenticationError("wrong password!");

            const token = getToken(user);
            return {
                user: user.dataValues,
                token,
            };
        },

        async registerUser(parent, { email, password }) {
            const { errors, valid } = validateInput(email, password);
            if (!valid) throw new UserInputError("Error", { errors });

            const user = await models.User.findOne({ where: { email } });
            if (user)
                throw new ValidationError(
                    "A user with that email already exist!"
                );

            const now = new Date();
            password = await bcrypt.hash(password, 10); // hashing the password
            const newUser = models.User.build({
                email,
                password,
                createdAt: now,
                updatedAt: now,
            });
            const savedUser = await newUser.save();
            const token = getToken(savedUser);

            return {
                user: savedUser.dataValues,
                token,
            };
        },
    },
};

module.exports = resolvers;
