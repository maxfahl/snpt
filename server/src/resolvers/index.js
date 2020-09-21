const userResolvers = require('./user');
const snippetGroupResolvers = require('./snippet-group');
module.exports = {
	Query: {
		...userResolvers.Query,
		...snippetGroupResolvers.Query
	},
	Mutation: {
		...userResolvers.Mutation
	},
	User: userResolvers.User,
	SnippetGroup: snippetGroupResolvers.SnippetGroup
};
