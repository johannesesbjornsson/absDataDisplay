(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _googleCharts = require('./node_modules/google-charts/googleCharts.js');

function drawChart(type, json, div, title) {
  _googleCharts.GoogleCharts.load(function () {
    if (type == 'pie') {
      drawPieChart(json, div, title);
    } else if (type == 'line') {
      drawLineChart(json, title);
    } else if (type == 'geo', title) {
      drawGeoChart(json);
    }
  });
}

function drawGeoChart(json_obj, title) {

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
        width: 1000,
        height: 600,
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
          var region = data.getValue(selection[0].row, 2);
          getChartData('line', "Pooulation over time - " + region, region);
          getChartData('pie', "Men: Ages - " + region + " (2016)", region, 'Males', "pie_chart_1");
          getChartData('pie', "Women: Ages - " + region + " (2016)", region, 'Females', "pie_chart_2");
        }
      });
    });

    GeoChart.draw();
  });
}

function drawLineChart(json_obj, title) {
  var data = _googleCharts.GoogleCharts.api.visualization.arrayToDataTable(json_obj);
  var line_chart = new _googleCharts.GoogleCharts.api.visualization.LineChart(document.getElementById('line_chart'));
  var options = {
    width: 1400,
    height: 500,
    title: title
  };
  line_chart.draw(data, options);
}

function drawPieChart(json_obj, div, title) {
  var data = _googleCharts.GoogleCharts.api.visualization.arrayToDataTable(json_obj);
  var pie_1_chart = new _googleCharts.GoogleCharts.api.visualization.PieChart(document.getElementById(div));
  var options = {
    width: 400,
    height: 300,
    title: title
  };
  pie_1_chart.draw(data, options);
}

async function getChartData(chart_type) {
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "chart";
  var region = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "All";
  var sex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "all";
  var div = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "standard";

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
    drawChart(chart_type, json, div, title);

    return json;
  }).catch(function (err) {
    throw err;
  });

  return result;
}
getChartData('geo', "Population (2016)");

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
