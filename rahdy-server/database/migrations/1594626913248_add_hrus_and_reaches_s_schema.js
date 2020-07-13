'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddHrusAndReachesSSchema extends Schema {
  up() {
    this.create('hrus', (table) => {
      table.increments()
      table.float('rain').nullable()
      table.float('snow').nullable()
      table.float('stored').nullable()
    })

    this.create('reaches', (table) => {
      table.increments()
      table.float('runoff').nullable()
      table.float('stored').nullable()
    })
  }

  down() {
    this.drop('hrus')
    this.drop('reaches')
  }
}

module.exports = AddHrusAndReachesSSchema
