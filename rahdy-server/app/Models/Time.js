'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Time extends Model {
  static boot() {
    super.boot()
    this.addTrait('NoTimestamp')
  }

  hrus() {
    return this.hasMany('App/Models/Hru')
  }

  reachs() {
    return this.hasMany('App/Models/Reach')
  }
}

module.exports = Time
