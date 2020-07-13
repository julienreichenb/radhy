'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GisReach extends Model {
  static get table() {
    return 'gisreaches'
  }

  static boot() {
    super.boot()
    this.addTrait('NoTimestamp')
  }

  reachs() {
    return this.hasMany('App/Models/Reach')
  }
}

module.exports = GisReach
