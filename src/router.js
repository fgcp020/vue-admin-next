import Router from '@/base/router';
import {
  AuthInterceptor,
  URIInterceptor,
  PageTitle,
  Progress
} from '@/common/router';
import store from './store';
import { AppModules } from './modules';

const isProdMode = process.env.NODE_ENV === 'production';
const routes = AppModules.reduce((pre, cur) => {
  return pre.concat(cur.routes);
}, []);

const beforeEachHooks = [AuthInterceptor(store), URIInterceptor(store)];
const afterEachHooks = [PageTitle(store)];

const router = new Router({
  config: {
    mode: 'history',
    base: isProdMode ? '/vue-admin-next/' : '/',
    routes: routes
  },
  hooks: {
    beforeEach: [Progress.StartHook(), ...beforeEachHooks],
    afterEach: [...afterEachHooks, Progress.EndHook()]
  }
}).eject();

export default router;
