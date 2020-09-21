'use strict'

const Hru = use('App/Models/Hru')
const DB = use('Database')

class HruController {
  async availableRange() {
    const max = await Hru.getMax('time_id')
    const min = await Hru.getMin('time_id')
    return [min, max]
  }

  async byGeoId({ params }) {
    const hru = await DB.raw(
      `SELECT json_build_object(
        'id', gh.id,
        'time_id', time_id,
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(gh.geom)::json,
        'properties', json_build_object(
          'id', h.id,
          'rain', rain,
          'snow', snow,
          'stored', stored,
          'elevation', elevation,
          'argile', argile,
          'limon', limon,
          'sable', sable
        )
      ) AS row
      FROM hrus h INNER JOIN gis_hrus gh ON h.gis_hru_id = gh.id
      WHERE h.id = ?`,
      [params.id]
    )
    return hru.rows[0]
  }

  async hruByDate({ params }) {
    const hru = await DB.raw(
      `SELECT json_agg (
        json_build_object(
          'id', gh.id,
          'time_id', time_id,
          'type', 'Feature',
          'geometry', ST_AsGeoJSON(gh.geom)::json,
          'properties', json_build_object(
            'id', h.id,
            'rain', rain,
            'snow', snow,
            'stored', stored,
            'elevation', elevation,
            'argile', argile,
            'limon', limon,
            'sable', sable
          ),
          'option', json_build_object(
            'weight',  rain * 50 /
              NULLIF((SELECT MAX(rain) FROM hrus WHERE time_id = ?), 0),
            'fillcolor',
              CASE WHEN ROUND(stored * 1000 /
                (SELECT MAX(stored) FROM hrus WHERE time_id = ?)) > 9 THEN 9
              ELSE ROUND(stored * 1000 /
                (SELECT MAX(stored) FROM hrus WHERE time_id = ?))
              END
          )
        )
      ) as data
      FROM hrus h INNER JOIN gis_hrus gh ON h.gis_hru_id = gh.id
      WHERE time_id = ?`,
      [params.idTime, params.idTime, params.idTime, params.idTime]
    )
    return hru.rows
  }

  async hruMaxByDate({ params }) {
    const hru = await DB.raw(
      `SELECT
        MAX(rain) as rain,
        MAX(snow) as snow,
        MAX(stored) as stored
      FROM hrus
      WHERE time_id = ?`,
      [params.idTime]
    )
    return hru.rows
  }

  async geoByDate({ params }) {
    const hru = await DB.raw(
      `SELECT json_build_object(
        'id', gh.id,
        'time_id', time_id,
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(gh.geom)::json,
        'properties', json_build_object(
          'id', h.id,
          'rain', rain,
          'snow', snow,
          'stored', stored,
          'elevation', elevation,
          'argile', argile,
          'limon', limon,
          'sable', sable
        )
      ) AS row
      FROM hrus h INNER JOIN gis_hrus gh ON h.gis_hru_id = gh.id
      WHERE time_id = ?`,
      [params.idTime]
    )
    return hru.rows
  }

  async overall({ params }) {
    return await DB.table('hrus')
      .select('time_id')
      .whereBetween('time_id', [params.start, params.end])
      .sum('rain as rain')
      .sum('snow as snow')
      .sum('stored as stored')
      .groupBy('time_id')
      .orderBy('time_id')
  }

  async all() {
    const hrus = await DB.raw(
      `SELECT json_build_object(
        'id', gh.id,
        'time_id', time_id,
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(gh.geom)::json,
        'properties', json_build_object(
          'id', h.id,
          'rain', rain,
          'snow', snow,
          'stored', stored,
          'elevation', elevation,
          'argile', argile,
          'limon', limon,
          'sable', sable
        )
      ) AS row
      FROM hrus h INNER JOIN gis_hrus gh ON h.gis_hru_id = gh.id`
    )
    return hrus.rows
  }
}

module.exports = HruController
