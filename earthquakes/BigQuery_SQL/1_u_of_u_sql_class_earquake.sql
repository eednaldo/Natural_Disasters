-- Creating u_of_u_sql_class.earthquake 
WITH earthquake_states AS
(
  SELECT
    state
    , ARRAY_AGG(STRUCT (year AS year, eq_primary AS eq_primary, latitude AS lat, longitude AS long)) AS info
    , COUNT(state) AS qtt
  FROM `bigquery-public-data.noaa_significant_earthquakes`.earthquakes 
  WHERE country = 'USA' AND state IS NOT NULL
  GROUP BY state
)
SELECT
  s.state
  , s.state_name
  , e.info
  , ST_AsGeoJSON(ST_SIMPLIFY(s.state_geom, 100)) as  state_geom
  , CASE 
      WHEN qtt IS NULL THEN 0
      ELSE qtt
    END AS qtt
FROM `bigquery-public-data.geo_us_boundaries`.states s
LEFT OUTER JOIN earthquake_states e ON e.state = s.state
ORDER BY s.state