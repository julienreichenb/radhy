'use strict'

const GisHru = use('App/Models/GisHru')

class GisHruController {
  async byId({ params }) {
    const gisHru = await GisHru.findOrFail(params.id)
    await gisHru.load('hrus')
    return gisHru.toJSON()
  }
}

module.exports = GisHruController
