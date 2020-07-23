'use strict'

const Reach = use('App/Models/Reach')
const DB = use('Database')

class ReachController {
  async byId({ params }) {
    const reach = await DB.raw(
      `SELECT json_build_object(
        'id', gr.ogc_fid,
        'time_id', time_id,
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(gr.geom)::json,
        'properties', json_build_object(
          'id', r.id,
          'runoff', runoff,
          'stored', stored,
          'width', r_width
        )
      ) AS row
      FROM reaches r INNER JOIN gis_reaches gr ON r.gis_reach_id = gr.id
      WHERE r.id = ?`,
      [params.id]
    )
    return reach.rows[0]
  }

  async geoByDate({ params }) {
    const reach = await DB.raw(
      `SELECT json_build_object(
        'id', gr.ogc_fid,
        'time_id', time_id,
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(gr.geom)::json,
        'properties', json_build_object(
          'id', r.id,
          'runoff', runoff,
          'stored', stored,
          'width', r_width
        )
      ) AS row
      FROM reaches r INNER JOIN gis_reaches gr ON r.gis_reach_id = gr.id
      WHERE time_id = ?`,
      [params.idTime]
    )
    return reach.rows
  }

  async overall({ params }) {
    const reach = await DB.table('reaches')
      .select('time_id')
      .whereBetween('time_id', [params.start, params.end])
      .sum('runoff as snow')
      .sum('stored as stored')
      .groupBy('time_id')
      .orderBy('time_id')
    return reach
  }

  async all() {
    const reaches = await DB.raw(
      `SELECT json_build_object(
        'id', gr.ogc_fid,
        'time_id', time_id,
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(gr.geom)::json,
        'properties', json_build_object(
          'id', r.id,
          'runoff', runoff,
          'stored', stored,
          'width', r_width
        )
      ) AS row
      FROM reaches r INNER JOIN gis_reaches gr ON r.gis_reach_id = gr.id`
    )
    return reaches.rows
  }
}

module.exports = ReachController
