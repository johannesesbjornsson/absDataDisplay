const json_data = require('./abs_files/annual_data.json')

function getGeoData(){
  const data = getGeoJson()
  return data;
}
function getGeoJson(){
  data = [['City', 'Population' ]]
  const dataToSkip = ['Australia', 'Tasmania','New South Wales', 'Western Australia', 'Queensland', 'Western Australia', 'South Australia', 'Northern Territory','Australian Capital Territory', 'Victoria']

  for (var key in json_data['2016']) {
    if (dataToSkip.includes(key) || !key.match(/\(C\)/)){     //Only matches with regions with (C) and not inculding above array
      continue;
    }
    let town = key //.match(/^.+?[^\(]+/g)[0].trim()
    let population = json_data['2016'][key]['Persons']['All ages']
    data.push([town, population])

    // For Testing //
    if (data.length > 10){
      break;
    }
    /////////////
  }
  return data
}
function getLineData(region){
  const data = getLineJson(region)
  return data;
}
function getLineJson(region){
  let data = [['Year', 'Men' ,'Women']]
  for (var key in json_data) {
    let females = json_data[key][region]['Females']['All ages']
    let males = json_data[key][region]['Males']['All ages']
    data.push([key,males,females])
  }
  return data
}
function getPieData(region){
  const data = getPieJson(region)
  let chart_data = [
    ['Chart thing', 'Chart amount'],
    ['Lorem ipsum', 60],
    ['Dolor sit', 222],
    ['Sit amet', 18]
  ];
  return chart_data;
}
function getPieJson(region, sex){
  console.log('test')
}

module.exports = {
  getLineData,
  getGeoData,
  getPieData,
}

getLineData("Central Coast (C) (NSW)")
