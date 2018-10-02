const json_data = require('./abs_files/annual_data.json')

function getGeoData(){
  const data = getGeoJson()
  return data;
}
function getGeoJson(){
  data = [['City', 'Population', 'Full Name' ]]
  const dataToSkip = ['Australia', 'Tasmania','New South Wales', 'Western Australia', 'Queensland', 'Western Australia', 'South Australia', 'Northern Territory','Australian Capital Territory', 'Victoria']

  for (var key in json_data['2016']) {
    if (dataToSkip.includes(key) || !key.match(/\(C\)/)){     //Only matches with regions with (C) and not inculding above array
      continue;
    }
    let region = key //.match(/^.+?[^\(]+/g)[0].trim()
    let town  = key.match(/^.+?[^\(]+/g)[0].trim()
    let population = json_data['2016'][key]['Persons']['All ages']
    data.push([town, population, region])
 
  // For Testing (faster load) //
 //   if (data.length > 20){
 //     return data
 //  }
  // End Testing
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
function getPieData(region,sex){
  const data = getPieJson(region,sex)
  return data;
}
function getPieJson(region, sex){
  let data = [['Chart thing', 'Chart amount']]
  const ages = json_data['2016'][region][sex]

  let i = 0;
  let last;
  for (var age in ages){
    if (age == "All ages"){
      continue;
    } else if ( (i+1) % 2  === 0 && i !==0){
      let young = last[0].match(/^.[^\-]/)[0];
      let old = age.match(/[^-]\d?$/)[0]
      let ageRange = young+' - '+ old
      if (age.match(/85 and over/)){ 
        ageRange = "80 and over"
      } 
      let sum = ages[age] + last[1]
      data.push([ageRange, sum])
    } else {
      last = [age, ages[age]]
    }
    i++;
  }
  return data;
  
}

module.exports = {
  getLineData,
  getGeoData,
  getPieData,
}

//getPieData("Central Coast (C) (NSW)", "Males")
