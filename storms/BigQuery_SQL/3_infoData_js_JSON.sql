-- infoData.js
WITH infoStorm AS 
(
  SELECT
    state
    , event_type
    , round(avg(DATETIME_DIFF(event_end_time, event_begin_time, minute)), 2) as average_minutes
    , EXTRACT(year from event_begin_time) as year
  FROM `u_of_u_sql_class`.severe_storms
  GROUP BY event_type, year, state
  ORDER BY year DESC
)

SELECT
  LOWER(state) AS state
  , ARRAY_AGG( STRUCT (event_type as event_type,  average_minutes as average_minutes, year as year)) AS info
FROM infoStorm
GROUP BY state