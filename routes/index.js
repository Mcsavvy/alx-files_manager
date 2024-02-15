import { Router } from 'express';
import { getStatus, getStats } from '../controllers/AppController';

const ROUTES = {
  '/status': {
    get: {
      controller: getStatus,
    },
  },
  '/stats': {
    get: {
      controller: getStats,
    },
  },
};

export default function routes() {
  const router = Router();

  for (const route of Reflect.ownKeys(ROUTES)) {
    const routeMethods = Reflect.ownKeys(ROUTES[route]);
    const url = route;
    for (const method of routeMethods) {
      const { controller } = ROUTES[url][method];
      router[method](url, controller);
    }
  }

  return router;
}