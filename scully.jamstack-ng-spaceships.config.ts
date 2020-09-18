import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'jamstack-ng-spaceships',
  outDir: './dist/static',
  routes: {},
  extraRoutes: ['/p/1', '/p/2'],
};
