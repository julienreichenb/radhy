'use strict'

// const Reach = use('App/Models/Reach')
const DB = use('Database')

class ReachController {
  async byId({ params }) {
    const reach = await DB.raw(
      `SELECT json_build_object(
        'id', gr.id,
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(gr.geom)::json,
        'properties', json_build_object(
          'id', r.id,
          'runoff', runoff,
          'stored', stored,
          'time_id', time_id
        )
      )
      FROM reaches r INNER JOIN gis_reaches gr ON r.gis_reach_id = gr.id
      WHERE r.id = ?`,
      [params.id]
    )
    return reach.rows[0]
  }

  async byDate({ params }) {
    const reach = await DB.raw(
      `SELECT json_build_object(
        'id', gr.id,
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(gr.geom)::json,
        'properties', json_build_object(
          'id', r.id,
          'runoff', runoff,
          'stored', stored,
          'time_id', time_id
        )
      )
      FROM reaches r INNER JOIN gis_reaches gr ON r.gis_reach_id = gr.id
      WHERE time_id = ?`,
      [params.idTime]
    )
    return reach.rows[0]
  }

  async all() {
    const reaches = await DB.raw(
      `SELECT json_build_object(
        'id', 'gr.id',
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(gr.geom)::json,
        'properties', json_build_object(
          'id', r.id,
          'runoff', runoff,
          'stored', stored,
          'time_id', time_id
        )
      )
      FROM reaches r INNER JOIN gis_reaches gr ON r.gis_reach_id = gr.id`
    )
    return reaches.rows
  }
}

module.exports = ReachController
