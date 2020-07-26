var data = [
  {
    x: ['thunderstorm wind', 'hail', 'flash flood', 'winter storm', 'high wind'],
    y: [2.59, 2.87, 216.93, 1310.83, 393.58],
    type: 'bar',
	
  }
];

var layout = {
  title: {
    text:'Average in minutes of the five most common Severe Storms events'
  },
  xaxis: {
    title: {
      text: 'Event Type',
    }
  },
  yaxis: {
    title: {
      text: 'Average in minutes',
    }
  }
};

Plotly.newPlot('bar_avg_often', data, layout);
