-- earthquakeMapData.js
WITH temp AS 
(
  SELECT 
    state
    , IFNULL(i.year, 0) AS year
    , IFNULL(i.lat, 0) AS lat
    , IFNULL(i.long, 0) AS long
    , IFNULL(i.eq_primary, 0) AS eq_primary
  FROM `u_of_u_sql_class`.earthquake ea
  LEFT OUTER JOIN UNNEST(info) AS i ORDER BY year DESC
), 
temp1 AS 
(
  SELECT 
    state
    , ARRAY_AGG(CONCAT( '"year: ', year, ', lat: ', lat, ', long:', long, ', eq_primary:', eq_primary, '"')) AS info 
  FROM temp
  GROUP BY state
), 
c AS 
(
  select 
    state
    , (SELECT concat(STRING_AGG( i, ', ' ORDER BY i)) FROM UNNEST(info) AS i) AS info
  FROM temp1
)
SELECT
  CONCAT(
      '{"type":"Feature","id":"', ROW_NUMBER() OVER (), 
      '","properties":{"name":" ', state_name,'","qtt":', qtt, ', "info": ', c.info , '},"geometry":', state_geom) 
FROM `u_of_u_sql_class`.earthquake e
LEFT OUTER JOIN c ON c.state = e.state