import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  sass: {},
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
