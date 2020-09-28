## Server:

1. Add to server/src/typedefs/typedefs.js
2. Add resolver
3. Add resolver to serversrc/resolvers/index.js
4. Generate GraphQL Schema from intelliJ

## Client:

1. Add query/mutation to client/src/overmind/effects/queries.js|mutations.js
2. Run `yarn schema`
3. Fill in types in file from step one
4. Create action in client/src/overmind/actions/index.js
