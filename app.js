const express = require('express');
const abs = require('./strucutre_data.js')
var url = require('url');
const port = 3000;
const app = express();

app.use(express.static('build'));


app.listen(port, function () {
  console.log("Server is running on "+ port +" port");
});

app.get('/', function (req, res) {
  const json_data = {'dates': '1234'}
  //const json_string = JSON.stringify(json_data)

  res.sendFile('./build/index.html',{'json_data': json_data })
})

app.get('/url', function (req, res) {
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  const chartType = query['chartType'];
  const region = query['region']
  
  console.log(chartType, region)
  if (query['chartType'] == undefined){
    res.json({'error' : 'Please include chartType'});
  } else if (query['chartType'] == 'pie'){
    const chart_data = abs.getPieData(region)
    res.json(chart_data)
  } else if (query['chartType'] == 'line'){
    const chart_data = abs.getLineData(region)
    res.json(chart_data)
  } else if (query['chartType'] == 'geo'){
    const chart_data = abs.getGeoData()
    res.json(chart_data)
  } else {
    res.json({'error' : 'Invalid chartType'});
  }
})
