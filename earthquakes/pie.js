var data = [{
  values: [80, 102, 8, 8, 15, 8, 6, 6, 5, 27],
  labels: ['Alaska', 'California', 'Utah', 'Nevada', 'Hawaii', 'New York', 'Oklahoma', 'Washington', 'Montana', 'All other states combined'],
  type: 'pie'
}];

var layout = {
  height: 400,
  width: 500,
  title: 'Percentage of significant earthquakes in the United States.'
};

Plotly.newPlot('pie', data, layout);