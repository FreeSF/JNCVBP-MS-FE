/*import {gql} from "apollo-boost";

export const typeDefs = gql`
    extend type Mutation {
        ChangeSomeData: String!
    }
`;

export const GET_SOME_DATA = gql`
    {
        someData @client
    }
`;

export const resolvers = {
    Mutation: {
        changeSomeData: (_root, _args, _context, _info) => {
            const data = _context.cache.readQuery(
                {
                    query: GET_SOME_DATA
                }
            );

            _context.cache.writeQuery(
                {
                    query: GET_SOME_DATA,
                    data: { someData: 'The data changed' }
                }
            );

            return data.someData;
        }
    }
};*/

export default ''
