'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddHrusReachesFkTimesSchema extends Schema {
  up () {
    this.table('hrus', (table) => {
      // alter table
      table.integer('time_id')
    })
    this.table('reaches', (table) => {
      // alter table
      table.integer('time_id')
    })
  }

  down () {
    this.table('hrus', (table) => {
      // reverse alternations
      table.dropColumns('time_id')
    })
    this.table('reaches', (table) => {
      // reverse alternations
      table.dropColumns('time_id')
    })
  }
}

module.exports = AddHrusReachesFkTimesSchema
