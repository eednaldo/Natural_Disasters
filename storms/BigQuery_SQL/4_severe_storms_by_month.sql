-- bar.js severe storms by month
SELECT 
  dim.month
  , dim.month_name
  , COUNT(DISTINCT s.event_id) AS qtt
FROM `u_of_u_sql_class`.severe_storms AS s
LEFT OUTER JOIN `u_of_u_sql_class`.dim_date AS dim
ON dim.datekey = CAST(FORMAT_DATE("%Y%m%d", EXTRACT(DATE FROM event_begin_time)) AS INT64) 
GROUP BY dim.month_name, dim.month
ORDER BY dim.month