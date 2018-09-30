
function getGeoData(){
  let chart_data = [
    ['City',      "Population",    "Density"],
    ['Sydney',      2761477,    1285.31],
    ['Melbourne',     1324110,    181.76],
    ['Perth',     14110,    181.76]
  ];
  return chart_data;
}

function getLineData(){
  let chart_data = [
    ['Year', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ];
  return chart_data;
}

function getPieData(){
  let chart_data = [
    ['Chart thing', 'Chart amount'],
    ['Lorem ipsum', 60],
    ['Dolor sit', 222],
    ['Sit amet', 18]
  ];
  return chart_data;

}


module.exports = {
  getLineData,
  getGeoData,
  getPieData,
}
