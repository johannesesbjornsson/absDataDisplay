import {GoogleCharts} from './node_modules/google-charts/googleCharts.js';



function drawChart(type,json,div="standard" ){
  GoogleCharts.load(function(){
    if (type == 'pie'){
      drawPieChart(json,div)
    } else if (type == 'line'){
      drawLineChart(json)
    } else if (type == 'geo'){
      drawGeoChart(json)
    }
  });
}

function drawGeoChart(json_obj){

  google.charts.load('current', {
  packages:['controls', 'geochart']
  }).then(function () {

  var data = google.visualization.arrayToDataTable(json_obj);

  var view = new google.visualization.DataView(data);
  view.setColumns([0, 1]);

  var GeoChart = new google.visualization.ChartWrapper({
    chartType: 'GeoChart',
    containerId: 'geo_chart',
    dataTable: view,
    options: {
       width: 1200,
       height: 800,
      region: 'AU',
      displayMode: 'markers',
      resolution: 'provinces',
      colorAxis: {colors: ['green', 'blue']}
    }
  });

  google.visualization.events.addListener(GeoChart, 'ready', function () {
    google.visualization.events.addListener(GeoChart.getChart(), 'select', function () {
      var selection = GeoChart.getChart().getSelection();
      if (selection.length > 0) {
        let region = data.getValue(selection[0].row, 0)
        getChartData('line', region)
        getChartData('pie', region, 'Males',"pie_chart_1")
        getChartData('pie', region, 'Females',"pie_chart_2")
      }
    });
  });

  GeoChart.draw();
  });

}
/*
function drawGeoChart(json_obj){
  const options = {
    region: 'AU',
    displayMode: 'markers',
    colorAxis: {colors: ['green', 'blue']}
  };
  const data = google.visualization.arrayToDataTable(json_obj)
  const chart = new google.visualization.GeoChart(document.getElementById('geo_chart'));
  chart.draw(data, options);
}
*/
function drawLineChart(json_obj) {
    const data = GoogleCharts.api.visualization.arrayToDataTable(json_obj)
    const line_chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('line_chart'));
    line_chart.draw(data);
}

function drawPieChart(json_obj,div) {
    const data = GoogleCharts.api.visualization.arrayToDataTable(json_obj)
    //const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('pie_chart'));
    const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById(div));
    const options ={
       width: 400,
       height: 400,
      title: 'My Daily Activities',
    }
    pie_1_chart.draw(data, options);
}

async function getChartData(chart_type, region="All", sex="all", div="standard"){
  let url = new URL('http://localhost:3000/url');
  let params = {
    'chartType' : chart_type,
    'region' : region,
    'sex' : sex
  }
  url.search = new URLSearchParams(params)
  var result = await fetch(url)
    .then((res) => {
        return res.json();
      })
      .then((json) => {
         drawChart(chart_type,json,div)

         return json
      })
  .catch(err => { throw err });

  return result
}
getChartData('geo')

