const userResolvers = require('./user');
const snippetGroupResolvers = require('./snippet-group');
const snippetResolvers = require('./snippet');
module.exports = {
	Query: {
		...userResolvers.Query,
		...snippetGroupResolvers.Query,
		...snippetResolvers.Query
	},
	Mutation: {
		...userResolvers.Mutation,
		...snippetResolvers.Mutation
	},
	User: userResolvers.User,
	SnippetGroup: snippetGroupResolvers.SnippetGroup
};
