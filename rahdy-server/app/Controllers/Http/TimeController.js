'use strict'

// eslint-disable-next-line no-undef
const Time = use('App/Models/Time')

class TimeController {
  async byId({ params }) {
    const time = await Time.findOrFail(params.id)
    await time.load('reachs')
    await time.load('hrus')
    return time.toJSON()
  }

  async byDate({ params }) {
    const time = await Time.query()
      .where('year', params.year)
      .andWhere('month', params.month)
      .andWhere('day', params.day)
      .andWhere('hour', params.hour)
      .fetch()
    return time.toJSON()
  }

  async range({ params }) {
    const time = await Time.query()
      .whereBetween('id', [params.min, params.max])
      .andWhere('hour', 0)
      .fetch()
    return time.toJSON()
  }

  async all() {
    return await Time.all()
  }
}

module.exports = TimeController
