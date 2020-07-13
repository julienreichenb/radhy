'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddReachHruCatColumnSchema extends Schema {
  up() {
    this.table('hrus', (table) => {
      // alter table
      table.integer('cat')
    })
    this.table('reaches', (table) => {
      // alter table
      table.integer('cat')
    })
  }

  down() {
    this.table('hrus', (table) => {
      // reverse alternations
      table.dropColumns('cat')
    })
    this.table('reaches', (table) => {
      // reverse alternations
      table.dropColumns('cat')
    })
  }
}

module.exports = AddReachHruCatColumnSchema
