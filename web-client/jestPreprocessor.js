'use strict';
import babelJest from "babel-jest";

var includeStylesSvg = new RegExp(/require\(\s*\'.*\.(css|svg)\'\);/gm);
var storeStylesSvg = new RegExp(/= require\(\s*\'.*\.(css|svg)\'\);/gm);

module.exports = {
  process: function (src, filename) {
    return babelJest
	    .process(src, filename)
	    .replace(storeStylesSvg, '= \'\';')
	    .replace(includeStylesSvg, '');
  }
};
