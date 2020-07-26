-- Dimension table
select 
  MIN(iso_time) 
FROM `bigquery-public-data.noaa_hurricanes.hurricanes`;


SELECT 
  CAST(FORMAT_DATE("%Y%m%d", date) AS INT64) AS dateKey, 
  date,
  EXTRACT(YEAR FROM date) AS year,
  EXTRACT(MONTH FROM date) AS month,
  EXTRACT(QUARTER FROM date) AS quarter,
  EXTRACT(DAYOFWEEK FROM date) AS day_of_week,
  EXTRACT(ISOWEEK FROM date) AS iso_week,
  FORMAT_DATE("%A", date) AS day_name,
  FORMAT_DATE("%B", date) AS month_name,
  CASE 
    WHEN EXTRACT(DAYOFWEEK FROM date) = 7 THEN 1
    WHEN EXTRACT(DAYOFWEEK FROM date) = 1 THEN 1
    ELSE 0
  END AS isWeekend 
FROM UNNEST(GENERATE_DATE_ARRAY('1842-01-01', '2030-01-01')) AS date
ORDER BY date;