(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _googleCharts = require('./node_modules/google-charts/googleCharts.js');

//Load the charts library with a callback
_googleCharts.GoogleCharts.load(drawChart);

function drawChart() {

  // Standard google charts functionality is available as GoogleCharts.api after load
  var data = _googleCharts.GoogleCharts.api.visualization.arrayToDataTable([['Chart thing', 'Chart amount'], ['Lorem ipsum', 60], ['Dolor sit', 22], ['Sit amet', 18]]);
  var pie_1_chart = new _googleCharts.GoogleCharts.api.visualization.PieChart(document.getElementById('chart'));
  pie_1_chart.draw(data);
}

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
