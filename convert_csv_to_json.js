
const fs = require('fs');
const inFile = './abs_files/annual_data.csv'
const outFile = './abs_files/annual_data.json'

const csv=require('csvtojson')


async function test(inFile,outFile){ 
  csv({
    'delimiter': '|',
    'includeColumns' : (/Time|Region|Age|Sex|Value/)
  })
  .fromFile(inFile)
  .then((jsonObjs)=>{
     writeJson(jsonObjs, outFile)
  })
}
function writeJson(jsonList,outFile){
  let jsonObj ={}
  for (let i = 0; i < jsonList.length; i++){
    let sex = jsonList[i]['Sex']
    let age =jsonList[i]['Age']
    let year =jsonList[i]['Time']
    let region =jsonList[i]['Region']
    let value =parseInt(jsonList[i]['Value'])

    if (!jsonObj[year]){
      jsonObj[year] = {}
      jsonObj[year][region] = {} 
      jsonObj[year][region][sex] = {} 
      jsonObj[year][region][sex][age] = value
    } else {
      if (!jsonObj[year][region]) {
        jsonObj[year][region] = {}
        jsonObj[year][region][sex] = {} 
        jsonObj[year][region][sex][age] = value
      } else {
        if (!jsonObj[year][region][sex]) {
          jsonObj[year][region][sex] = {} 
          jsonObj[year][region][sex][age] = value
        } else {
          jsonObj[year][region][sex][age] =  value
        }
      }
           
    }
  }
  var json = JSON.stringify(jsonObj);
  fs.writeFile(outFile, json, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  }); 

}

const jsonArray=test(inFile,outFile) //await csv().fromFile(inFile);

