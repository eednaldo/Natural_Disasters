-- Creating u_of_u_sql_class.hurricanes_states
WITH states AS
(
  SELECT 
    state
    , state_name
    , state_geom 
  FROM `bigquery-public-data`.geo_us_boundaries.states 
),
hurricanes AS
(
  SELECT 
    sid
    , name
    , season
    , nature
    , CAST(FORMAT_DATE("%Y%m%d", DATE(iso_time)) AS INT64) AS iso_time
    , ST_GEOGPOINT(hurricanes.longitude, hurricanes.latitude) AS point
  FROM `bigquery-public-data.noaa_hurricanes`.hurricanes
)

SELECT
  sid
  , name
  , season
  , nature 
  , iso_time
  , point
  , state
  , state_name
  , ST_AsGeoJSON(ST_SIMPLIFY(states.state_geom, 100)) AS  state_geom
FROM states JOIN hurricanes ON ST_INTERSECTS(hurricanes.point, states.state_geom)	