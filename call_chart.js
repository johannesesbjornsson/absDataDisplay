import {GoogleCharts} from './node_modules/google-charts/googleCharts.js';



function drawChart(type,json){
  GoogleCharts.load(function(){
    if (type == 'pie'){
      drawPieChart(json)
    } else if (type == 'line'){
      drawLineChart(json)
    } else if (type == 'geo'){
      drawGeoChart(json)
    }
  });
}

window.GetChartData =function(chart_type){
  getChartData(chart_type)
};


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
function drawLineChart(json_obj) {
    const data = GoogleCharts.api.visualization.arrayToDataTable(json_obj)
    const line_chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('line_chart'));
    line_chart.draw(data);
}

function drawPieChart(json_obj) {
    const data = GoogleCharts.api.visualization.arrayToDataTable(json_obj)
    const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('pie_chart'));
    pie_1_chart.draw(data);
}

async function getChartData(chart_type){
  let url = new URL('http://localhost:3000/url');
  let params = {'chartType' : chart_type}
  url.search = new URLSearchParams(params)
  var result = await fetch(url)
    .then((res) => {
        return res.json();
      })
      .then((json) => {
         drawChart(chart_type,json)

         return json
      })
  .catch(err => { throw err });

  return result
}
