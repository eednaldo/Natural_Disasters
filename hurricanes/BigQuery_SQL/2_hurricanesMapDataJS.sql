-- hurricanesMapData.js
WITH quantity AS 
(
  SELECT 
    state_name
    ,COUNT(DISTINCT sid) AS qtt 
  FROM `u_of_u_sql_class`.hurricanes_states
  GROUP BY state_name
), geom AS 
(
  SELECT
    s.state_name
    , q.qtt
    , ST_AsGeoJSON(ST_SIMPLIFY(s.state_geom, 100)) AS  state_geom
  FROM `bigquery-public-data.geo_us_boundaries`.states s 
  LEFT OUTER JOIN quantity q ON s.state_name = q.state_name
)

SELECT 
  CONCAT(
    '{"type":"Feature","id":"', ROW_NUMBER() OVER(), 
    '","properties":{"name":" ', state_name,'","qtt":', IFNULL(qtt, 0), '},"geometry":', state_geom) 
FROM geom