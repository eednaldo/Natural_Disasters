var data = [
  {
    x: ['drought', 'lakeshore flood', 'dense smoke', 'wildfire', 'heat', 'flood', 'excessive heat', 'high snow', 'cold/wind chill', 'high surf'],
    y: [657.31, 147.62, 141.27, 124.78, 100.0, 83.55, 83.12, 63.0, 58.4, 57.9],
    type: 'bar',
	
  }
];

var layout = {
  title: {
    text:'Ten most lasting events on averagein (hours)'
  },
  xaxis: {
    title: {
      text: 'Event Type',
    }
  },
  yaxis: {
    title: {
      text: 'Average in hours',
    }
  }
};

Plotly.newPlot('bar_avg_duration', data, layout);
