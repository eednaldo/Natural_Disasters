-- bar.js
-- hurricanes by month
SELECT
  dim.month
  , dim.month_name
  , COUNT(DISTINCT h.sid) AS qtt
FROM `u_of_u_sql_class`.hurricanes_states AS h
LEFT OUTER JOIN  `u_of_u_sql_class`.dim_date AS dim
ON dim.datekey = h.iso_time
GROUP BY dim.month_name, dim.month
ORDER BY dim.month