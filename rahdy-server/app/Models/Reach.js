'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reach extends Model {
  static boot() {
    super.boot()
    this.addTrait('NoTimestamp')
  }

  time() {
    return this.belongsTo('App/Models/Time')
  }

  gisReach() {
    return this.belongsTo('App/Models/GisReach')
  }
}

module.exports = Reach
