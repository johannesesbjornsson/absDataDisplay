import {GoogleCharts} from './node_modules/google-charts/googleCharts.js';



function drawChart(type,json,div,title ){
  GoogleCharts.load(function(){
    if (type == 'pie'){
      drawPieChart(json,div, title)
    } else if (type == 'line'){
      drawLineChart(json,title)
    } else if (type == 'geo',title){
      drawGeoChart(json)
    }
  });
}

function drawGeoChart(json_obj,title){

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
       width: 1000,
       height: 600,
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
        let region = data.getValue(selection[0].row, 2)
        getChartData('line', "Pooulation over time - "+region,region)
        getChartData('pie', "Men: Ages - "+region+" (2016)", region, 'Males',"pie_chart_1")
        getChartData('pie', "Women: Ages - "+region+" (2016)",region, 'Females',"pie_chart_2")
      }
    });
  });

  GeoChart.draw();
  });

}

function drawLineChart(json_obj,title) {
    const data = GoogleCharts.api.visualization.arrayToDataTable(json_obj)
    const line_chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('line_chart'));
    const options ={
       width: 1400,
       height: 500,
      title: title,
    }
    line_chart.draw(data,options);
}

function drawPieChart(json_obj,div, title){
    const data = GoogleCharts.api.visualization.arrayToDataTable(json_obj)
    const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById(div));
    const options ={
       width: 400,
       height: 300,
      title: title,
    }
    pie_1_chart.draw(data, options);
}

async function getChartData(chart_type,title="chart", region="All", sex="all", div="standard"){
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
         drawChart(chart_type,json,div,title)

         return json
      })
  .catch(err => { throw err });

  return result
}
getChartData('geo', "Population (2016)")

