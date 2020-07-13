'use strict'

const Hru = use('App/Models/Hru')

class HruController {
  async byId({ params }) {
    const hru = await Hru.findOrFail(params.id)
    await hru.load('time')
    await hru.load('gisHru')
    return hru.toJSON()
  }

  async byCat({ params }) {
    const hru = await Hru.query()
      .where('cat', params.cat)
      .with('time')
      .with('gisHru')
      .fetch()
    return hru.toJSON()
  }

  async byDate({ params }) {
    const hru = await Hru.query()
      .where('time_id', params.idTime)
      .with('time')
      .with('gisHru')
      .fetch()
    return hru.toJSON()
  }

  async all() {
    const hrus = await Hru.query().with('time').with('gisHru').fetch()
    return hrus.toJSON()
  }
}

module.exports = HruController
