var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');

router.get('/', function(req, res) {

	var makeRequests = function(callback) {

		var result = {},
				done = 0,
				now = moment(),
				urlData = 'https://data.cityofchicago.org/resource/7as2-ds3y.json?',
				urlWhere = '&$where=',
				monthsago = [],
				monthsagoend = [],
				monthsagoname = [],
				urlCreatedMonthsAgo = [],
				urlCompletedMonthsAgo = [],
				urlOpenMonthsAgo = [];

		monthsago[0] = now.clone().startOf('month').toISOString().split('.')[0];
		monthsagoend[0] = now.clone().endOf('month').toISOString().split('.')[0];
		monthsagoname[0] = now.clone().startOf('month').format('YYYYMM');
		urlCreatedMonthsAgo[0] = urlData+'$select=count(*) AS created_'+monthsagoname[0]+urlWhere+'creation_date >=\''+monthsago[0]+'\' AND creation_date <= \''+monthsagoend[0]+'\'';
		urlCompletedMonthsAgo[0] = urlData+'$select=count(*) AS completed_'+monthsagoname[0]+urlWhere+'completion_date >= \''+monthsago[0]+'\' AND completion_date <= \''+monthsagoend[0]+'\'';
		urlOpenMonthsAgo[0] = urlData+'$select=count(*) AS open_'+monthsagoname[0]+urlWhere+'creation_date <= \''+monthsagoend[0]+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend[0]+'\')';

		for(var i=1; i<48; i++)
		{
			monthsago[i] = now.clone().startOf('month').subtract(i,'months').toISOString().split('.')[0];
			monthsagoend[i] = now.clone().endOf('month').subtract(i,'months').toISOString().split('.')[0];
			monthsagoname[i] = now.clone().startOf('month').subtract(i,'months').format('YYYYMM');
			urlCreatedMonthsAgo[i] = urlData+'$select=count(*) AS created_'+monthsagoname[i]+urlWhere+'creation_date >=\''+monthsago[i]+'\' AND creation_date < \''+monthsago[i-1]+'\'';
			urlCompletedMonthsAgo[i] = urlData+'$select=count(*) AS completed_'+monthsagoname[i]+urlWhere+'completion_date >=\''+monthsago[i]+'\' AND completion_date < \''+monthsago[i-1]+'\'';
			urlOpenMonthsAgo[i] = urlData+'$select=count(*) AS open_'+monthsagoname[i]+urlWhere+'creation_date <= \''+monthsagoend[i]+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend[i]+'\')';
		}

		request('http://www.google.com', function (error, response, body) {
			if (!error && response.statusCode == 200) {

				var searchFor = urlCreatedMonthsAgo.concat(urlCompletedMonthsAgo).concat(urlOpenMonthsAgo);

				for(var i=0; searchUrl = searchFor[i]; i++) {
					request(searchUrl, function (error, response, body) {
						if (!error && response.statusCode == 200) {
							var thisJson = JSON.parse(body);
							for(var name in thisJson[0])
							{
								var names = name.split('_');
								if(typeof(result[names[1]]) === 'undefined')
								{
									result[names[1]] = {};
								}
								result[names[1]][names[0]] = thisJson[0][name];
							}
							++done;
							if(done == searchFor.length) {
								callback(result);
							}
						}
					});
				}
			}
		});
	};

	makeRequests(function(result) {
		var googleChartArray = [];
		googleChartArray.push(['Month','Created','Completed','Still Open']);
		var sortableMonth = [];
		for(var name in result) {
			sortableMonth.push(name);
		}
		sortableMonth.sort();
		for(var item in sortableMonth)
		{
			for(var name in result) {
				if(name == sortableMonth[item])
				{
					googleChartArray.push([name,Number(result[name].created),Number(result[name].completed),Number(result[name].open)]);
					break;
				}
			}
		}
		res.render('index', { title: 'Express', googleChartArray: JSON.stringify(googleChartArray) });
	});
});

module.exports = router;
