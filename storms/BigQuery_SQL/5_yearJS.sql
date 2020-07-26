-- year.js Events by year
SELECT 
  EXTRACT(YEAR FROM event_begin_time) AS year
  , COUNT(DISTINCT event_id) AS qtt
FROM `u_of_u_sql_class`.severe_storms
GROUP BY year
ORDER BY year