import { GraphQLClient } from 'graphql-request';

const url = process.env.NEXT_PUBLIC_API_URL || '';
export const graphqlClient = new GraphQLClient(url);
