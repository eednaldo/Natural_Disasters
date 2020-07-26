-- season.js Huricanes by season
SELECT
  h.season
  , COUNT(DISTINCT h.sid) AS qtt
FROM `u_of_u_sql_class`.hurricanes_states AS h
GROUP BY h.season
ORDER BY h.season