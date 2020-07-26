var data = [
  {
    x: ['AK', 'AL', 'AR', 'CA', 'CO', 'CT', 'HI', 'ID', 'IL', 'KY', 'MA', 'MO', 'MT', 'NH', 'NV', 'NY', 'OK', 'OR', 'PA', 'SC', 'TX', 'UT', 'VA', 'WA', 'WY'],
    y: [80, 1, 2, 102, 2, 1, 15, 2, 1, 2, 2, 3, 5, 1, 8, 8, 6, 2, 3, 1, 1, 8, 1, 6, 2],
    type: 'bar',
	
  }
];

var layout = {
  title: {
    text:'US Significant Earthquakes'
  },
  xaxis: {
    title: {
      text: 'States with more than zero earthquakes',
    }
  },
  yaxis: {
    title: {
      text: 'Number of significant earthquakes',
    }
  }
};

Plotly.newPlot('bar', data, layout);