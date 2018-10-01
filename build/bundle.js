(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _googleCharts = require('./node_modules/google-charts/googleCharts.js');

function drawChart(type, json) {
  var div = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "standard";

  _googleCharts.GoogleCharts.load(function () {
    if (type == 'pie') {
      drawPieChart(json, div);
    } else if (type == 'line') {
      drawLineChart(json);
    } else if (type == 'geo') {
      drawGeoChart(json);
    }
  });
}

function drawGeoChart(json_obj) {

  google.charts.load('current', {
    packages: ['controls', 'geochart']
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
        colorAxis: { colors: ['green', 'blue'] }
      }
    });

    google.visualization.events.addListener(GeoChart, 'ready', function () {
      google.visualization.events.addListener(GeoChart.getChart(), 'select', function () {
        var selection = GeoChart.getChart().getSelection();
        if (selection.length > 0) {
          var region = data.getValue(selection[0].row, 0);
          getChartData('line', region);
          getChartData('pie', region, 'Males', "pie_chart_1");
          getChartData('pie', region, 'Females', "pie_chart_2");
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
  var data = _googleCharts.GoogleCharts.api.visualization.arrayToDataTable(json_obj);
  var line_chart = new _googleCharts.GoogleCharts.api.visualization.LineChart(document.getElementById('line_chart'));
  line_chart.draw(data);
}

function drawPieChart(json_obj, div) {
  var data = _googleCharts.GoogleCharts.api.visualization.arrayToDataTable(json_obj);
  //const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('pie_chart'));
  var pie_1_chart = new _googleCharts.GoogleCharts.api.visualization.PieChart(document.getElementById(div));
  var options = {
    width: 400,
    height: 400,
    title: 'My Daily Activities'
  };
  pie_1_chart.draw(data, options);
}

async function getChartData(chart_type) {
  var region = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "All";
  var sex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "all";
  var div = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "standard";

  var url = new URL('http://localhost:3000/url');
  var params = {
    'chartType': chart_type,
    'region': region,
    'sex': sex
  };
  url.search = new URLSearchParams(params);
  var result = await fetch(url).then(function (res) {
    return res.json();
  }).then(function (json) {
    drawChart(chart_type, json, div);

    return json;
  }).catch(function (err) {
    throw err;
  });

  return result;
}
getChartData('geo');

},{"./node_modules/google-charts/googleCharts.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var loadScript = Symbol('loadScript');

var googleCharts = function () {
    function googleCharts() {
        _classCallCheck(this, googleCharts);
    }

    _createClass(googleCharts, [{
        key: loadScript,
        value: function value() {
            if (!this.scriptPromise) {
                this.scriptPromise = new Promise(function (resolve) {
                    var body = document.getElementsByTagName('body')[0];
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.onload = function () {
                        GoogleCharts.api = window.google;
                        GoogleCharts.api.charts.load('current', { 'packages': ['corechart', 'table'] });
                        GoogleCharts.api.charts.setOnLoadCallback(function () {
                            resolve();
                        });
                    };
                    script.src = 'https://www.gstatic.com/charts/loader.js';
                    body.appendChild(script);
                });
            }
            return this.scriptPromise;
        }
    }, {
        key: 'load',
        value: function load(callback, type) {
            var _this = this;

            return this[loadScript]().then(function () {
                if (type) {
                    var config = {};
                    if (type instanceof Object) {
                        config = type;
                    } else if (Array.isArray(type)) {
                        config = { 'packages': type };
                    } else {
                        config = { 'packages': [type] };
                    }
                    _this.api.charts.load('current', config);
                    _this.api.charts.setOnLoadCallback(callback);
                } else {
                    callback();
                }
            });
        }
    }]);

    return googleCharts;
}();

var GoogleCharts = exports.GoogleCharts = new googleCharts();

if (typeof module !== 'undefined' && module.hot) {
    module.hot.accept();
}

},{}]},{},[1]);
