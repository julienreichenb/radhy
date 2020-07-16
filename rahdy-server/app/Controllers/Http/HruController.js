'use strict'

// const Hru = use('App/Models/Hru')
const DB = use('Database')

class HruController {
  async byId({ params }) {
    const hru = await DB.raw(
      `SELECT json_build_object(
        'id', gh.id,
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(gh.geom)::json,
        'properties', json_build_object(
          'id', h.id,
          'rain', rain,
          'snow', snow,
          'stored', stored,
          'time_id', time_id
        )
      )
      FROM hrus h INNER JOIN gis_hrus gh ON h.gis_hru_id = gh.id
      WHERE h.id = ?`,
      [params.id]
    )
    return hru.rows[0]
  }

  async byDate({ params }) {
    const hru = await DB.raw(
      `SELECT json_build_object(
        'id', gh.id,
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(gh.geom)::json,
        'properties', json_build_object(
          'id', h.id,
          'rain', rain,
          'snow', snow,
          'stored', stored,
          'time_id', time_id
        )
      )
      FROM hrus h INNER JOIN gis_hrus gh ON h.gis_hru_id = gh.id
      WHERE time_id = ?`,
      [params.idTime]
    )
    return hru.rows
  }

  async all() {
    const hrus = await DB.raw(
      `SELECT json_build_object(
        'id', gh.id,
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(gh.geom)::json,
        'properties', json_build_object(
          'id', h.id,
          'rain', rain,
          'snow', snow,
          'stored', stored,
          'time_id', time_id
        )
      )
      FROM hrus h INNER JOIN gis_hrus gh ON h.gis_hru_id = gh.id`
    )
    return hrus.rows
  }
}

module.exports = HruController
