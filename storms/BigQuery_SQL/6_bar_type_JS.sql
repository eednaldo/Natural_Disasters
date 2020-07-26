-- bar_type.js 
-- Quantity by type
SELECT 
  event_type
  , COUNT(event_type) 
FROM `u_of_u_sql_class`.severe_storms
GROUP BY event_type
ORDER BY event_type