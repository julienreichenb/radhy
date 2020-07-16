'use strict'

const GisHru = use('App/Models/GisHru')

class GisHruController {
  async byId({ params }) {
    const gisHru = await GisHru.findOrFail(params.id)
    return gisHru.toJSON()
  }

  async all() {
    const gisHrus = await GisHru.query().with('hrus').fetch()
    return gisHrus.toJSON()
  }
}

module.exports = GisHruController
