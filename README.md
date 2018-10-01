npm version 6.4.1

node version v10.11.0 


run app by cloning dir
run $ npm install
run node app.js

then open http://localhost:3000/ 

geo map is automatically loaded, and area specifc data is shown if you click on a  city.
this functionality will however only be available until the map has loaded.
If you have a large enough screen it looks pretty nice




The reason I'm not showing data about more towns is because it takes too long to load. So I decided to shall all the towns with the (C) symbol

The code is very much dependent on the order of the json data, which isn't ideal. I know this is an easy fix, but I figured it would make the code more convoluted and would reduce it's readability.

Some towns does not display even remotly close to where they are supposed to be on the geomap (Regardless if I left the (C) out or not)
