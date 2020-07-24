'use strict'

const GisReach = use('App/Models/GisReach')

class GisReachController {
  async byId({ params }) {
    const gisReach = await GisReach.findOrFail(params.id)
    await gisReach.load('reachs')
    return gisReach.toJSON()
  }

  async width() {
    const gisReach = await GisReach.query()
      .select(['id', 'r_width as width'])
      .fetch()
    return gisReach.toJSON()
  }

  async all() {
    const gisReach = await GisReach.query().with('reachs').fetch()
    return gisReach.toJSON()
  }
}

module.exports = GisReachController
