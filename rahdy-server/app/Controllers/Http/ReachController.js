'use strict'

const Reach = use('App/Models/Reach')

class ReachController {
  async byId({ params }) {
    const reach = await Reach.findOrFail(params.id)
    await reach.load('time')
    await reach.load('gisReach')
    return reach.toJSON()
  }

  async byCat({ params }) {
    const reach = await Reach.query()
      .where('cat', params.cat)
      .with('time')
      .with('gisReach')
      .fetch()
    await reach.load('time')
    return reach.toJSON()
  }

  async byDate({ params }) {
    const reach = await Reach.query()
      .where('time_id', params.idTime)
      .with('time')
      .with('gisReach')
      .fetch()
    return reach.toJson()
  }

  async all() {
    const reaches = await Reach.query().with('time').with('gisReach').fetch()
    return reaches.toJSON()
  }
}

module.exports = ReachController
