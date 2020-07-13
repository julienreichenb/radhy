'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

/** Time Routes */
Route.group(() => {
  Route.get('time/id/:id', 'TimeController.byId')
  Route.get('time/date/:year/:month/:day/:hour', 'TimeController.byDate')
  Route.get('time/all', 'TimeController.all')
}).prefix('api')

/** Hru Routes */
Route.group(() => {
  Route.get('hru/id/:id', 'HruController.byId')
  Route.get('hru/cat/:cat', 'HruController.byCat')
  Route.get('hru/time/:idTime', 'HruController.byDate')
  Route.get('hru/all', 'HruController.all')
}).prefix('api')

/** Reach Routes */
Route.group(() => {
  Route.get('reach/id/:id', 'ReachController.byId')
  Route.get('reach/cat/:cat', 'ReachController.byCat')
  Route.get('reach/time/:idTime', 'ReachController.byDate')
  Route.get('reach/all', 'ReachController.all')
}).prefix('api')

/** GisHru Routes */
Route.group(() => {
  Route.get('gishru/id/:id', 'GisHruController.byId')
}).prefix('api')

/** GisReach Routes */
Route.group(() => {
  Route.get('gisreach/id/:id', 'GisReachController.byId')
}).prefix('api')
