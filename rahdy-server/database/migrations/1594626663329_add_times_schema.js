'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddTimesSchema extends Schema {
  up() {
    this.create('times', (table) => {
      table.increments()
      table.float('year').nullable()
      table.float('month').nullable()
      table.float('day').nullable()
      table.float('hour').nullable()
    })
  }

  down() {
    this.drop('times')
  }
}

module.exports = AddTimesSchema
