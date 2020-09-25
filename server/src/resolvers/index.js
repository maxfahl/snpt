const userResolvers = require('./user');
const snippetGroupResolvers = require('./snippet-group');
const snippetResolvers = require('./snippet');
const snippetVariableSetResolvers = require('./snippet-variable-set');
const snippetVariableResolvers = require('./snippet-variable');
module.exports = {
	Query: {
		...userResolvers.Query,
		...snippetGroupResolvers.Query,
		...snippetResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
		...snippetResolvers.Mutation,
		...snippetVariableResolvers.Mutation
	},
	User: userResolvers.User,
	Snippet: snippetResolvers.Snippet,
	SnippetGroup: snippetGroupResolvers.SnippetGroup
};
