var data = [
  {
    x: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    y: [118865, 110943, 118908, 163913, 209908, 245819, 211051, 146399, 78357, 60617, 61044, 94247],
    type: 'bar',
	
  }
];

var layout = {
  title: {
    text:'Severe Storms by Month'
  },
  xaxis: {
    title: {
      text: 'Month',
    }
  },
  yaxis: {
    title: {
      text: 'Number of Severe Storms',
    }
  }
};

Plotly.newPlot('bar', data, layout);


