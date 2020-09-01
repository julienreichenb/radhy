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
  Route.get('id/:id', 'TimeController.byId')
  Route.get('date/:year/:month/:day/:hour', 'TimeController.byDate')
  Route.get('all', 'TimeController.all')
  Route.get('daterange/:min/:max', 'TimeController.range')
}).prefix('api/time')

/** Hru Routes */
Route.group(() => {
  Route.get('id/:id', 'HruController.byGeoId')
  Route.get('hrutime/:idTime', 'HruController.hruByDate')
  Route.get('hruMax/:idTime', 'HruController.hruMaxByDate')
  Route.get('geotime/:idTime', 'HruController.geoByDate')
  Route.get('overall/:start/:end', 'HruController.overall')
  Route.get('all', 'HruController.all')
  Route.get('daterange', 'HruController.availableRange')
}).prefix('api/hru')

/** Reach Routes */
Route.group(() => {
  Route.get('id/:id', 'ReachController.byId')
  Route.get('reachtime/:idTime', 'ReachController.reachByDate')
  Route.get('reachMax/:idTime', 'ReachController.reachMaxByDate')
  Route.get('geotime/:idTime', 'ReachController.geoByDate')
  Route.get('overall/:start/:end', 'ReachController.overall')
  Route.get('all', 'ReachController.all')
}).prefix('api/reach')

/** GisHru Routes */
Route.group(() => {
  Route.get('id/:id', 'GisHruController.byId')
  Route.get('all', 'GisHruController.all')
  Route.get('soil', 'GisHruController.soil')
}).prefix('api/gishru')

/** GisReach Routes */
Route.group(() => {
  Route.get('id/:id', 'GisReachController.byId')
  Route.get('all', 'GisReachController.all')
  Route.get('width', 'GisReachController.width')
}).prefix('api/gisreach')
