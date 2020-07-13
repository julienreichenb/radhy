'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hru extends Model {
  static boot() {
    super.boot()
    this.addTrait('NoTimestamp')
  }

  time() {
    return this.belongsTo('App/Models/Time')
  }

  gisHru() {
    return this.belongsTo('App/Models/GisHru')
  }
}

module.exports = Hru
