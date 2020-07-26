-- StormsMapData.js
WITH quantity AS 
(
  SELECT 
	 state, 
	 COUNT(DISTINCT event_id) AS qtt 
  FROM `u_of_u_sql_class`.severe_storms
  GROUP BY state
), 
geom AS 
(
  SELECT 
	 s.state_name
	 , q.qtt
	 , ST_AsGeoJSON(ST_SIMPLIFY(s.state_geom, 100)) AS  state_geom
  FROM `bigquery-public-data.geo_us_boundaries`.states s 
  LEFT OUTER JOIN quantity q ON LOWER(s.state_name) = LOWER(q.state)
)

SELECT
  CONCAT(
	 '{"type":"Feature","id":"', ROW_NUMBER() OVER (), 
	 '","properties":{"name":" ', state_name,'","qtt":', IFNULL(qtt, 0), '},"geometry":', state_geom) 
FROM geom
