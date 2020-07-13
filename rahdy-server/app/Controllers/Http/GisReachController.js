'use strict'

const GisReach = use('App/Models/GisReach')

class GisReachController {
  async byId({ params }) {
    const gisReach = await GisReach.findOrFail(params.id)
    await gisReach.load('reachs')
    return gisReach.toJSON()
  }
}

module.exports = GisReachController
