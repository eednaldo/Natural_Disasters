-- Creating `u_of_u_sql_class`.severe_storms
SELECT
   episode_id
   , event_id
   , state
   , event_type
   , event_begin_time
   , event_end_time
   , event_point
FROM `bigquery-public-data.noaa_historic_severe_storms.storms*` 
