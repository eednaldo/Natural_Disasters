-- Average in minutes 5 most frequent events
-- bar_avg_often.js
WITH type AS 
(
  SELECT 
    event_type
    , COUNT(event_type) qtt
    , AVG(DATETIME_DIFF(event_end_time, event_begin_time, minute)) AS average_minutes
  FROM `u_of_u_sql_class`.severe_storms
  GROUP BY event_type
), 
r as 
(
  SELECT 
    *
    , rank() OVER(ORDER BY qtt DESC) AS rank 
  FROM type
)
SELECT 
  event_type
  , round(average_minutes, 2) AS average_minutes 
FROM r
WHERE rank <= 5 