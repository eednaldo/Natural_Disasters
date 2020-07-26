-- bar.js earthquekes by state / states more than 0 earthquakes
SELECT 
  state
  , COUNT(state) AS qtt
FROM `bigquery-public-data.noaa_significant_earthquakes`.earthquakes 
WHERE country = 'USA' AND state IS NOT NULL
GROUP BY state
HAVING qtt > 0
ORDER BY state;