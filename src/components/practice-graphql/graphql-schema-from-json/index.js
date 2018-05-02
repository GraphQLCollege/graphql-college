import { makeExecutableSchema } from 'graphql-tools';
import { printSchema } from 'graphql';
// TODO: Use https://github.com/marmelab/graphql-schema-from-json.
// Right now I don't use it because it does not work like it should.
// We are using https://github.com/marmelab/json-graphql-server/tree/master/src/introspection.
import getSchemaFromData from './introspection/getSchemaFromData';
import resolver from './resolver';

export default data =>
    makeExecutableSchema({
        typeDefs: printSchema(getSchemaFromData(data)),
        resolvers: resolver(data),
        logger: { log: e => console.log(e) }, // eslint-disable-line no-console
    });
