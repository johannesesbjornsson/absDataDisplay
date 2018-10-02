npm version 6.4.1

node version v10.11.0 

run $ npm install
run node app.js

then open http://localhost:3000/ 

The data is pulled from json files in abs_files/ which in turn have been generated from the convert_csv_to_json.js file

geo map is automatically loaded, and area specifc data is shown if you click on a  city.
this functionality will however only be available until the map has loaded.
If you have a large enough screen it looks pretty nice.


There were two main issues with finding data:
1. I stuggled finding data on abs stat that spanned over time
2. And when I did find interesting data I got 500 errors when trying to download the csv files. The only large files I managed to download were the ones that you could download a zip file. I tried to get the income of 2016 by LGA, but I could never fully download the file. I went in to manually disable every row without (C) in the table  customisation option, then got a 500 error when trying to load the table. So All my data is coming from a single table, Population by Age and Sex (LGA)

The reason I'm not showing data about more towns is because it takes too long to load. So I decided to only show the city municipalities. This is not very efficient as there are plenty of municipalities in the greater Syndey and Melbourne area and it would have been smarter to combine the the data for those areas for performance. However, I couldn't find any free resource online to do this automatically, and since it would be quite time consuming to it manually I decided to leave it as is. 


The code is very much dependent on the order of the json data, which isn't ideal. I know this is an easy fix, but I figured it would make the code more convoluted and would reduce it's readability.


