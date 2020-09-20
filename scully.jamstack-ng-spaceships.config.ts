import {
  ApolloClient,
  ApolloLink,
  concat,
  gql,
  HttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import fetch from 'node-fetch';
import { HandledRoute, registerPlugin, ScullyConfig } from '@scullyio/scully';

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MDA0MDU0NTAsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NrZjZ5aHZtNjAza2YwMXhoaDk5cTAzazYvbWFzdGVyIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNGI3NmI3N2UtMjhhNS00MDJjLWI3NjMtMzY3MDgxYWIyNGZlIiwianRpIjoiY2tmN3MzMHZ0MDRkNjAxemM4dG5vM2I4MyJ9.n0eL_21w46X71rsZPNOZJQJF2db5R8JCe_4gH9t-SATTiHSNGio2tnjpvN_Tk70KRMPGOfGxj8GHyXbdP0_IGX8fwpHYmpw9LD6u43pAD2lAVOe7fqp5FXPwEpRHvME_OSBoee1lILOrbEUQyy3UX09CssVHMvx9D9-cC9ThYJGGGb8aD0ZiGfeFvhGcpR8eMzU98OSuK2_L6FhcL09rcU9kX77LJoqY6Z-owBv0W83qbHoTMeHvtIDf84RZnyAiOwDNoPGi1WA9Rzcf3aaIlr_oUZWQZagS_VRyaVZppi2NnOCb9CwfrsEPCYcTIvBQPkhaVO7XYc_VH8IxHsD1OP5kDvsjhc_Gp2wN3hO9dhAKqPnR2E4MKJstJRc2xCERHuhi9z6s4N1Lab_RwgnLUyUOzZpxP5e_5nudQfW5CJUHATu4YxikWs92w4GPBXMo6GKIzecvTdtzcP2mZ1ZbjjsFy9rimCf_aD99iotOXUJhdyQ8UsycintnGVuwtNeRgxShqBr4vM4YbH-J7bJ8XH3fQADIGCoaOh4YAGquIPziHEYEzRoc01v1yqpTSxQ3jAxJHcTnXR7X6ifh_2FZXVVal2znnXBt7JJa1Uw3CobDjpCczzaiQMKqw-k2ycvohbon28IRIMScrfGa26O-WdD7OthmZ0exTOpgJjyTsNk`,
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(
    authMiddleware,
    new HttpLink({
      uri:
        'https://api-eu-central-1.graphcms.com/v2/ckf6yhvm603kf01xhh99q03k6/master',
      fetch,
    })
  ),
  cache: new InMemoryCache(),
});

registerPlugin(
  'router',
  'postsPlugin',
  async (route: string, config = {}): Promise<HandledRoute[]> => {
    const {
      data: { blogSamples },
    } = await client.query({
      query: gql`
        query BlogSamplesQuery {
          blogSamples {
            id
            title
          }
        }
      `,
    });
    console.log('result', blogSamples);
    return Promise.resolve(
      blogSamples.map((blog) => ({ route: `/p/${blog.id}` }))
    );
  }
);

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'jamstack-ng-spaceships',
  outDir: './dist/static',
  routes: {
    '/p/:postId': {
      type: 'postsPlugin',
    },
  },
};