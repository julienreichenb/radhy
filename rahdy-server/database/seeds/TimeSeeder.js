'use strict'

/*
|--------------------------------------------------------------------------
| TimeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const moment = require('moment')
const Time = use('App/Models/Time')

/** @type {import('@adonisjs/lucid/src/Factory')} */
class TimeSeeder {
  async run() {
    const start = moment('01-01-2019', 'DD-MM-YYYY')
    const end = moment('31-12-2020', 'DD-MM-YYYY')
    for (let m = moment(start); m.isBefore(end); m.add(1, 'days')) {
      for (let i = 0; i < 24; i++) {
        const time = new Time()
        time.year = m.year()
        time.month = m.month() + 1
        time.day = m.date()
        time.hour = i
        await time.save()
      }
    }
  }
}

module.exports = TimeSeeder
