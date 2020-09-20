import { ScullyConfig } from '@scullyio/scully';
import './scully/plugins/postsPagesPlugin';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'jamstack-ng-spaceships',
  outDir: './dist/static',
  routes: {
    '/p/:postId': {
      type: 'postsPagesPlugin',
    },
  },
};
