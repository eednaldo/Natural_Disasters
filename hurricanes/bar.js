var data = [
  {
    x: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    y: [3, 2, 3, 3, 15, 88, 104, 177, 281, 158, 28, 5],
    type: 'bar',
	
  }
];

var layout = {
  title: {
    text:'Hurricanes by Month'
  },
  xaxis: {
    title: {
      text: 'Months',
    }
  },
  yaxis: {
    title: {
      text: 'Number of hurricanes',
    }
  }
};

Plotly.newPlot('bar', data, layout);


