var data = [
  {
    x: ['HAIL FLOODING', 'Hail', 'THUNDERSTORM WIND/ TREE', 'THUNDERSTORM WIND/ TREES', 'THUNDERSTORM WINDS FUNNEL CLOU', 'THUNDERSTORM WINDS HEAVY RAIN', 'THUNDERSTORM WINDS LIGHTNING', 'THUNDERSTORM WINDS/ FLOOD', 'THUNDERSTORM WINDS/FLASH FLOOD', 'THUNDERSTORM WINDS/HEAVY RAIN', 'TORNADO/WATERSPOUT', 'Thunderstorm Wind', 'Tornado', 'astronomical low tide', 'avalanche', 'blizzard', 'coastal flood', 'cold/wind chill', 'debris flow', 'dense fog', 'dense smoke', 'drought', 'dust devil', 'dust storm', 'excessive heat', 'extreme cold/wind chill', 'flash flood', 'flood', 'freezing fog', 'frost/freeze', 'funnel cloud', 'hail', 'hail/icy roads', 'heat', 'heavy rain', 'heavy snow', 'heavy wind', 'high snow', 'high surf', 'high wind', 'hurricane', 'hurricane (typhoon)', 'ice storm', 'lake-effect snow', 'lakeshore flood', 'landslide', 'lightning', 'marine dense fog', 'marine hail', 'marine high wind', 'marine hurricane/typhoon', 'marine lightning', 'marine strong wind', 'marine thunderstorm wind', 'marine tropical depression', 'marine tropical storm', 'northern lights', 'other', 'rip current', 'seiche', 'sleet', 'sneakerwave', 'storm surge/tide', 'strong wind', 'thunderstorm wind', 'thunderstorm winds/flooding', 'tornado', 'tornadoes, tstm wind, hail', 'tropical depression', 'tropical storm', 'tsunami', 'volcanic ash', 'volcanic ashfall', 'waterspout', 'wildfire', 'winter storm', 'winter weather'],
    y: [1, 8370, 1, 3, 2, 1, 2, 2, 1, 1, 1, 10859, 1217, 549, 673, 14313, 3164, 14321, 1192, 13769, 84, 55912, 229, 1135, 8555, 12428, 85973, 56815, 414, 12279, 8650, 361727, 1, 21086, 25418, 63141, 4, 1, 9430, 71511, 178, 1749, 11201, 2372, 282, 372, 16711, 8, 718, 526, 50, 1, 143, 28520, 11, 170, 8, 1, 1344, 65, 733, 18, 1326, 22082, 442379, 1, 70195, 1, 409, 5145, 33, 70, 70, 5097, 7165, 75062, 62620],
    type: 'bar',
	
  }
];

var layout = {
  title: {
    text:'Quantity of Severe Storms by types'
  },
  xaxis: {
    title: {
      text: 'Event Type',
    }
  },
  yaxis: {
    title: {
      text: 'Quantity',
    }
  }
};

Plotly.newPlot('bar_type', data, layout);


