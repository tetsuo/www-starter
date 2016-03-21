import Router from 'routes'
import React from 'react';
import Home from './home'
import About from './about'

export default function () {
  const router = new Router
  router.addRoute('/', React.createFactory(Home))
  router.addRoute('/about', React.createFactory(About))
  return router
}
