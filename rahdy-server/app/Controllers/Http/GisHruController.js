'use strict'

const GisHru = use('App/Models/GisHru')
const DB = use('Database')

class GisHruController {
  async byId({ params }) {
    const gisHru = await GisHru.findOrFail(params.id)
    return gisHru.toJSON()
  }

  async soil() {
    return await DB.table('gis_hrus')
      .whereNotNull('ru')
      .sum('argile as argile')
      .sum('limon as limon')
      .sum('sable as sable')
  }

  async all() {
    const gisHrus = await GisHru.query().with('hrus').fetch()
    return gisHrus.toJSON()
  }
}

module.exports = GisHruController
