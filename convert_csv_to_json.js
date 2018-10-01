
const fs = require('fs');
const inFile = './abs_files/annual_data.csv'
const outFile = './abs_files/annual_data.json'

const csv=require('csvtojson')


async function test(file){ 
  csv({
    'delimiter': '|',
    'includeColumns' : (/Time|Region|Age|Sex|Value/)
  })
  .fromFile(file)
  .then((jsonObjs)=>{
     writeJson(jsonObjs)
  })
}
function writeJson(jsonList){
  let jsonObj ={}
  for (let i = 0; i < jsonList.length; i++){
    let sex = jsonList[i]['Sex']
    let age =jsonList[i]['Age']
    let year =jsonList[i]['Time']
    let region =jsonList[i]['Region']
    let value =parseInt(jsonList[i]['Value'])
    if (!jsonObj[year]){
      jsonObj[year] = {region : {} } 
    } else {
      if (!jsonObj[year][region]) {
      jsonObj[year][region] = {}
      }
           
    }
  }
  console.log(jsonObj)
}

const jsonArray=test(inFile) //await csv().fromFile(inFile);


