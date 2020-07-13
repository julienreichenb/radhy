'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GisHru extends Model {
  static get table() {
    return 'gishrus'
  }

  static boot() {
    super.boot()
    this.addTrait('NoTimestamp')
  }

  hrus() {
    return this.hasMany('App/Models/Hru')
  }
}

module.exports = GisHru
