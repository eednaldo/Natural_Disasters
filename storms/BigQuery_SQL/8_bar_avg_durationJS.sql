-- 10 most lasting events 
-- bar_avg_duration.js
WITH av AS 
(
  SELECT
    event_type
    , ROUND(AVG(DATETIME_DIFF(event_end_time, event_begin_time, minute)), 2) AS average_minutes
  FROM `u_of_u_sql_class`.severe_storms
  GROUP BY event_type
), 
r as 
(
  select 
    *, 
    RANK() OVER(ORDER BY average_minutes DESC) AS rank 
  FROM av
)
SELECT
  event_type
  , average_minutes 
FROM r
WHERE rank <= 10 
