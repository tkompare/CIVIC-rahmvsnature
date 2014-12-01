var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res) {

	var makeRequests = function(callback) {

		var result = {},
				done = 0,
				now = moment(),
				urlData = 'https://data.cityofchicago.org/resource/7as2-ds3y.json?',
				urlWhere = '&$where=',
				monthsEndOfThis = now.clone().endOf('month').toISOString().split('.')[0],

				monthsago0 = now.clone().startOf('month').toISOString().split('.')[0],
				monthsagoname0 = now.clone().startOf('month').format('YYYYMM'),
				urlCountCreatedMonthsAgo0 = '$select=count(*) AS created_'+monthsagoname0,
				urlCountCompletedMonthsAgo0 = '$select=count(*) AS completed_'+monthsagoname0,
				urlCountOpenMonthsAgo0 = '$select=count(*) AS open_'+monthsagoname0,
				urlCreatedMonthsAgo0 = urlData+urlCountCreatedMonthsAgo0+urlWhere+'creation_date >=\''+monthsago0+'\' AND creation_date <= \''+monthsEndOfThis+'\'',
				urlCompletedMonthsAgo0 = urlData+urlCountCompletedMonthsAgo0+urlWhere+'completion_date >= \''+monthsago0+'\' AND completion_date <= \''+monthsEndOfThis+'\'',
				urlOpenMonthsAgo0 = urlData+urlCountOpenMonthsAgo0+urlWhere+'creation_date <= \''+monthsEndOfThis+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsEndOfThis+'\')',

				monthsago1 = now.clone().startOf('month').subtract(1,'months').toISOString().split('.')[0],
				monthsagoend1 = now.clone().endOf('month').subtract(1,'months').toISOString().split('.')[0],
				monthsagoname1 = now.clone().startOf('month').subtract(1,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo1 = '$select=count(*) AS created_'+monthsagoname1,
				urlCountCompletedMonthsAgo1 = '$select=count(*) AS completed_'+monthsagoname1,
				urlCountOpenMonthsAgo1 = '$select=count(*) AS open_'+monthsagoname1,
				urlCreatedMonthsAgo1 = urlData+urlCountCreatedMonthsAgo1+urlWhere+'creation_date >=\''+monthsago1+'\' AND creation_date < \''+monthsago0+'\'',
				urlCompletedMonthsAgo1 = urlData+urlCountCompletedMonthsAgo1+urlWhere+'completion_date >=\''+monthsago1+'\' AND completion_date < \''+monthsago0+'\'',
				urlOpenMonthsAgo1 = urlData+urlCountOpenMonthsAgo1+urlWhere+'creation_date <= \''+monthsagoend1+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend1+'\')',

				monthsago2 = now.clone().startOf('month').subtract(2,'months').toISOString().split('.')[0],
				monthsagoend2 = now.clone().endOf('month').subtract(2,'months').toISOString().split('.')[0],
				monthsagoname2 = now.clone().startOf('month').subtract(2,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo2 = '$select=count(*) AS created_'+monthsagoname2,
				urlCountCompletedMonthsAgo2 = '$select=count(*) AS completed_'+monthsagoname2,
				urlCountOpenMonthsAgo2 = '$select=count(*) AS open_'+monthsagoname2,
				urlCreatedMonthsAgo2 = urlData+urlCountCreatedMonthsAgo2+urlWhere+'creation_date >=\''+monthsago2+'\' AND creation_date < \''+monthsago1+'\'',
				urlCompletedMonthsAgo2 = urlData+urlCountCompletedMonthsAgo2+urlWhere+'completion_date >=\''+monthsago2+'\' AND completion_date < \''+monthsago1+'\'',
				urlOpenMonthsAgo2 = urlData+urlCountOpenMonthsAgo2+urlWhere+'creation_date <= \''+monthsagoend2+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend2+'\')',

				monthsago3 = now.clone().startOf('month').subtract(3,'months').toISOString().split('.')[0],
				monthsagoend3 = now.clone().endOf('month').subtract(3,'months').toISOString().split('.')[0],
				monthsagoname3 = now.clone().startOf('month').subtract(3,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo3 = '$select=count(*) AS created_'+monthsagoname3,
				urlCountCompletedMonthsAgo3 = '$select=count(*) AS completed_'+monthsagoname3,
				urlCountOpenMonthsAgo3 = '$select=count(*) AS open_'+monthsagoname3,
				urlCreatedMonthsAgo3 = urlData+urlCountCreatedMonthsAgo3+urlWhere+'creation_date >=\''+monthsago3+'\' AND creation_date < \''+monthsago2+'\'',
				urlCompletedMonthsAgo3 = urlData+urlCountCompletedMonthsAgo3+urlWhere+'completion_date >=\''+monthsago3+'\' AND completion_date < \''+monthsago2+'\'',
				urlOpenMonthsAgo3 = urlData+urlCountOpenMonthsAgo3+urlWhere+'creation_date <= \''+monthsagoend3+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend3+'\')',

				monthsago4 = now.clone().startOf('month').subtract(4,'months').toISOString().split('.')[0],
				monthsagoend4 = now.clone().endOf('month').subtract(4,'months').toISOString().split('.')[0],
				monthsagoname4 = now.clone().startOf('month').subtract(4,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo4 = '$select=count(*) AS created_'+monthsagoname4,
				urlCountCompletedMonthsAgo4 = '$select=count(*) AS completed_'+monthsagoname4,
				urlCountOpenMonthsAgo4 = '$select=count(*) AS open_'+monthsagoname4,
				urlCreatedMonthsAgo4 = urlData+urlCountCreatedMonthsAgo4+urlWhere+'creation_date >=\''+monthsago4+'\' AND creation_date < \''+monthsago3+'\'',
				urlCompletedMonthsAgo4 = urlData+urlCountCompletedMonthsAgo4+urlWhere+'completion_date >=\''+monthsago4+'\' AND completion_date < \''+monthsago3+'\'',
				urlOpenMonthsAgo4 = urlData+urlCountOpenMonthsAgo4+urlWhere+'creation_date <= \''+monthsagoend4+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend4+'\')',

				monthsago5 = now.clone().startOf('month').subtract(5,'months').toISOString().split('.')[0],
				monthsagoend5 = now.clone().endOf('month').subtract(5,'months').toISOString().split('.')[0],
				monthsagoname5 = now.clone().startOf('month').subtract(5,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo5 = '$select=count(*) AS created_'+monthsagoname5,
				urlCountCompletedMonthsAgo5 = '$select=count(*) AS completed_'+monthsagoname5,
				urlCountOpenMonthsAgo5 = '$select=count(*) AS open_'+monthsagoname5,
				urlCreatedMonthsAgo5 = urlData+urlCountCreatedMonthsAgo5+urlWhere+'creation_date >=\''+monthsago5+'\' AND creation_date < \''+monthsago4+'\'',
				urlCompletedMonthsAgo5 = urlData+urlCountCompletedMonthsAgo5+urlWhere+'completion_date >=\''+monthsago5+'\' AND completion_date < \''+monthsago4+'\'',
				urlOpenMonthsAgo5 = urlData+urlCountOpenMonthsAgo5+urlWhere+'creation_date <= \''+monthsagoend5+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend5+'\')',

				monthsago6 = now.clone().startOf('month').subtract(6,'months').toISOString().split('.')[0],
				monthsagoend6 = now.clone().endOf('month').subtract(6,'months').toISOString().split('.')[0],
				monthsagoname6 = now.clone().startOf('month').subtract(6,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo6 = '$select=count(*) AS created_'+monthsagoname6,
				urlCountCompletedMonthsAgo6 = '$select=count(*) AS completed_'+monthsagoname6,
				urlCountOpenMonthsAgo6 = '$select=count(*) AS open_'+monthsagoname6,
				urlCreatedMonthsAgo6 = urlData+urlCountCreatedMonthsAgo6+urlWhere+'creation_date >=\''+monthsago6+'\' AND creation_date < \''+monthsago5+'\'',
				urlCompletedMonthsAgo6 = urlData+urlCountCompletedMonthsAgo6+urlWhere+'completion_date >=\''+monthsago6+'\' AND completion_date < \''+monthsago5+'\'',
				urlOpenMonthsAgo6 = urlData+urlCountOpenMonthsAgo6+urlWhere+'creation_date <= \''+monthsagoend6+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend6+'\')',

				monthsago7 = now.clone().startOf('month').subtract(7,'months').toISOString().split('.')[0],
				monthsagoend7 = now.clone().endOf('month').subtract(7,'months').toISOString().split('.')[0],
				monthsagoname7 = now.clone().startOf('month').subtract(7,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo7 = '$select=count(*) AS created_'+monthsagoname7,
				urlCountCompletedMonthsAgo7 = '$select=count(*) AS completed_'+monthsagoname7,
				urlCountOpenMonthsAgo7 = '$select=count(*) AS open_'+monthsagoname7,
				urlCreatedMonthsAgo7 = urlData+urlCountCreatedMonthsAgo7+urlWhere+'creation_date >=\''+monthsago7+'\' AND creation_date < \''+monthsago6+'\'',
				urlCompletedMonthsAgo7 = urlData+urlCountCompletedMonthsAgo7+urlWhere+'completion_date >=\''+monthsago7+'\' AND completion_date < \''+monthsago6+'\'',
				urlOpenMonthsAgo7 = urlData+urlCountOpenMonthsAgo7+urlWhere+'creation_date <= \''+monthsagoend7+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend7+'\')',

				monthsago8 = now.clone().startOf('month').subtract(8,'months').toISOString().split('.')[0],
				monthsagoend8 = now.clone().endOf('month').subtract(8,'months').toISOString().split('.')[0],
				monthsagoname8 = now.clone().startOf('month').subtract(8,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo8 = '$select=count(*) AS created_'+monthsagoname8,
				urlCountCompletedMonthsAgo8 = '$select=count(*) AS completed_'+monthsagoname8,
				urlCountOpenMonthsAgo8 = '$select=count(*) AS open_'+monthsagoname8,
				urlCreatedMonthsAgo8 = urlData+urlCountCreatedMonthsAgo8+urlWhere+'creation_date >=\''+monthsago8+'\' AND creation_date < \''+monthsago7+'\'',
				urlCompletedMonthsAgo8 = urlData+urlCountCompletedMonthsAgo8+urlWhere+'completion_date >=\''+monthsago8+'\' AND completion_date < \''+monthsago7+'\'',
				urlOpenMonthsAgo8 = urlData+urlCountOpenMonthsAgo8+urlWhere+'creation_date <= \''+monthsagoend8+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend8+'\')',

				monthsago9 = now.clone().startOf('month').subtract(9,'months').toISOString().split('.')[0],
				monthsagoend9 = now.clone().endOf('month').subtract(9,'months').toISOString().split('.')[0],
				monthsagoname9 = now.clone().startOf('month').subtract(9,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo9 = '$select=count(*) AS created_'+monthsagoname9,
				urlCountCompletedMonthsAgo9 = '$select=count(*) AS completed_'+monthsagoname9,
				urlCountOpenMonthsAgo9 = '$select=count(*) AS open_'+monthsagoname9,
				urlCreatedMonthsAgo9 = urlData+urlCountCreatedMonthsAgo9+urlWhere+'creation_date >=\''+monthsago9+'\' AND creation_date < \''+monthsago8+'\'',
				urlCompletedMonthsAgo9 = urlData+urlCountCompletedMonthsAgo9+urlWhere+'completion_date >=\''+monthsago9+'\' AND completion_date < \''+monthsago8+'\'',
				urlOpenMonthsAgo9 = urlData+urlCountOpenMonthsAgo9+urlWhere+'creation_date <= \''+monthsagoend9+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend9+'\')',

				monthsago10 = now.clone().startOf('month').subtract(10,'months').toISOString().split('.')[0],
				monthsagoend10 = now.clone().endOf('month').subtract(10,'months').toISOString().split('.')[0],
				monthsagoname10 = now.clone().startOf('month').subtract(10,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo10 = '$select=count(*) AS created_'+monthsagoname10,
				urlCountCompletedMonthsAgo10 = '$select=count(*) AS completed_'+monthsagoname10,
				urlCountOpenMonthsAgo10 = '$select=count(*) AS open_'+monthsagoname10,
				urlCreatedMonthsAgo10 = urlData+urlCountCreatedMonthsAgo10+urlWhere+'creation_date >=\''+monthsago10+'\' AND creation_date < \''+monthsago9+'\'',
				urlCompletedMonthsAgo10 = urlData+urlCountCompletedMonthsAgo10+urlWhere+'completion_date >=\''+monthsago10+'\' AND completion_date < \''+monthsago9+'\'',
				urlOpenMonthsAgo10 = urlData+urlCountOpenMonthsAgo10+urlWhere+'creation_date <= \''+monthsagoend10+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend10+'\')',

				monthsago11 = now.clone().startOf('month').subtract(11,'months').toISOString().split('.')[0],
				monthsagoend11 = now.clone().endOf('month').subtract(11,'months').toISOString().split('.')[0],
				monthsagoname11 = now.clone().startOf('month').subtract(11,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo11 = '$select=count(*) AS created_'+monthsagoname11,
				urlCountCompletedMonthsAgo11 = '$select=count(*) AS completed_'+monthsagoname11,
				urlCountOpenMonthsAgo11 = '$select=count(*) AS open_'+monthsagoname11,
				urlCreatedMonthsAgo11 = urlData+urlCountCreatedMonthsAgo11+urlWhere+'creation_date >=\''+monthsago11+'\' AND creation_date < \''+monthsago10+'\'',
				urlCompletedMonthsAgo11 = urlData+urlCountCompletedMonthsAgo11+urlWhere+'completion_date >=\''+monthsago11+'\' AND completion_date < \''+monthsago10+'\'',
				urlOpenMonthsAgo11 = urlData+urlCountOpenMonthsAgo11+urlWhere+'creation_date <= \''+monthsagoend11+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend11+'\')',

				monthsago12 = now.clone().startOf('month').subtract(12,'months').toISOString().split('.')[0],
				monthsagoend12 = now.clone().endOf('month').subtract(12,'months').toISOString().split('.')[0],
				monthsagoname12 = now.clone().startOf('month').subtract(12,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo12 = '$select=count(*) AS created_'+monthsagoname12,
				urlCountCompletedMonthsAgo12 = '$select=count(*) AS completed_'+monthsagoname12,
				urlCountOpenMonthsAgo12 = '$select=count(*) AS open_'+monthsagoname12,
				urlCreatedMonthsAgo12 = urlData+urlCountCreatedMonthsAgo12+urlWhere+'creation_date >=\''+monthsago12+'\' AND creation_date < \''+monthsago11+'\'',
				urlCompletedMonthsAgo12 = urlData+urlCountCompletedMonthsAgo12+urlWhere+'completion_date >=\''+monthsago12+'\' AND completion_date < \''+monthsago11+'\'',
				urlOpenMonthsAgo12 = urlData+urlCountOpenMonthsAgo12+urlWhere+'creation_date <= \''+monthsagoend12+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend12+'\')',

				monthsago13 = now.clone().startOf('month').subtract(13,'months').toISOString().split('.')[0],
				monthsagoend13 = now.clone().endOf('month').subtract(13,'months').toISOString().split('.')[0],
				monthsagoname13 = now.clone().startOf('month').subtract(13,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo13 = '$select=count(*) AS created_'+monthsagoname13,
				urlCountCompletedMonthsAgo13 = '$select=count(*) AS completed_'+monthsagoname13,
				urlCountOpenMonthsAgo13 = '$select=count(*) AS open_'+monthsagoname13,
				urlCreatedMonthsAgo13 = urlData+urlCountCreatedMonthsAgo13+urlWhere+'creation_date >=\''+monthsago13+'\' AND creation_date < \''+monthsago12+'\'',
				urlCompletedMonthsAgo13 = urlData+urlCountCompletedMonthsAgo13+urlWhere+'completion_date >=\''+monthsago13+'\' AND completion_date < \''+monthsago12+'\'',
				urlOpenMonthsAgo13 = urlData+urlCountOpenMonthsAgo13+urlWhere+'creation_date <= \''+monthsagoend13+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend13+'\')',

				monthsago14 = now.clone().startOf('month').subtract(14,'months').toISOString().split('.')[0],
				monthsagoend14 = now.clone().endOf('month').subtract(14,'months').toISOString().split('.')[0],
				monthsagoname14 = now.clone().startOf('month').subtract(14,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo14 = '$select=count(*) AS created_'+monthsagoname14,
				urlCountCompletedMonthsAgo14 = '$select=count(*) AS completed_'+monthsagoname14,
				urlCountOpenMonthsAgo14 = '$select=count(*) AS open_'+monthsagoname14,
				urlCreatedMonthsAgo14 = urlData+urlCountCreatedMonthsAgo14+urlWhere+'creation_date >=\''+monthsago14+'\' AND creation_date < \''+monthsago13+'\'',
				urlCompletedMonthsAgo14 = urlData+urlCountCompletedMonthsAgo14+urlWhere+'completion_date >=\''+monthsago14+'\' AND completion_date < \''+monthsago13+'\'',
				urlOpenMonthsAgo14 = urlData+urlCountOpenMonthsAgo14+urlWhere+'creation_date <= \''+monthsagoend14+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend14+'\')',

				monthsago15 = now.clone().startOf('month').subtract(15,'months').toISOString().split('.')[0],
				monthsagoend15 = now.clone().endOf('month').subtract(15,'months').toISOString().split('.')[0],
				monthsagoname15 = now.clone().startOf('month').subtract(15,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo15 = '$select=count(*) AS created_'+monthsagoname15,
				urlCountCompletedMonthsAgo15 = '$select=count(*) AS completed_'+monthsagoname15,
				urlCountOpenMonthsAgo15 = '$select=count(*) AS open_'+monthsagoname15,
				urlCreatedMonthsAgo15 = urlData+urlCountCreatedMonthsAgo15+urlWhere+'creation_date >=\''+monthsago15+'\' AND creation_date < \''+monthsago14+'\'',
				urlCompletedMonthsAgo15 = urlData+urlCountCompletedMonthsAgo15+urlWhere+'completion_date >=\''+monthsago15+'\' AND completion_date < \''+monthsago14+'\'',
				urlOpenMonthsAgo15 = urlData+urlCountOpenMonthsAgo15+urlWhere+'creation_date <= \''+monthsagoend15+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend15+'\')',

				monthsago16 = now.clone().startOf('month').subtract(16,'months').toISOString().split('.')[0],
				monthsagoend16 = now.clone().endOf('month').subtract(16,'months').toISOString().split('.')[0],
				monthsagoname16 = now.clone().startOf('month').subtract(16,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo16 = '$select=count(*) AS created_'+monthsagoname16,
				urlCountCompletedMonthsAgo16 = '$select=count(*) AS completed_'+monthsagoname16,
				urlCountOpenMonthsAgo16 = '$select=count(*) AS open_'+monthsagoname16,
				urlCreatedMonthsAgo16 = urlData+urlCountCreatedMonthsAgo16+urlWhere+'creation_date >=\''+monthsago16+'\' AND creation_date < \''+monthsago15+'\'',
				urlCompletedMonthsAgo16 = urlData+urlCountCompletedMonthsAgo16+urlWhere+'completion_date >=\''+monthsago16+'\' AND completion_date < \''+monthsago15+'\'',
				urlOpenMonthsAgo16 = urlData+urlCountOpenMonthsAgo16+urlWhere+'creation_date <= \''+monthsagoend16+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend16+'\')',

				monthsago17 = now.clone().startOf('month').subtract(17,'months').toISOString().split('.')[0],
				monthsagoend17 = now.clone().endOf('month').subtract(17,'months').toISOString().split('.')[0],
				monthsagoname17 = now.clone().startOf('month').subtract(17,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo17 = '$select=count(*) AS created_'+monthsagoname17,
				urlCountCompletedMonthsAgo17 = '$select=count(*) AS completed_'+monthsagoname17,
				urlCountOpenMonthsAgo17 = '$select=count(*) AS open_'+monthsagoname17,
				urlCreatedMonthsAgo17 = urlData+urlCountCreatedMonthsAgo17+urlWhere+'creation_date >=\''+monthsago17+'\' AND creation_date < \''+monthsago16+'\'',
				urlCompletedMonthsAgo17 = urlData+urlCountCompletedMonthsAgo17+urlWhere+'completion_date >=\''+monthsago17+'\' AND completion_date < \''+monthsago16+'\'',
				urlOpenMonthsAgo17 = urlData+urlCountOpenMonthsAgo17+urlWhere+'creation_date <= \''+monthsagoend17+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend17+'\')',

				monthsago18 = now.clone().startOf('month').subtract(18,'months').toISOString().split('.')[0],
				monthsagoend18 = now.clone().endOf('month').subtract(18,'months').toISOString().split('.')[0],
				monthsagoname18 = now.clone().startOf('month').subtract(18,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo18 = '$select=count(*) AS created_'+monthsagoname18,
				urlCountCompletedMonthsAgo18 = '$select=count(*) AS completed_'+monthsagoname18,
				urlCountOpenMonthsAgo18 = '$select=count(*) AS open_'+monthsagoname18,
				urlCreatedMonthsAgo18 = urlData+urlCountCreatedMonthsAgo18+urlWhere+'creation_date >=\''+monthsago18+'\' AND creation_date < \''+monthsago17+'\'',
				urlCompletedMonthsAgo18 = urlData+urlCountCompletedMonthsAgo18+urlWhere+'completion_date >=\''+monthsago18+'\' AND completion_date < \''+monthsago17+'\'',
				urlOpenMonthsAgo18 = urlData+urlCountOpenMonthsAgo18+urlWhere+'creation_date <= \''+monthsagoend18+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend18+'\')',

				monthsago19 = now.clone().startOf('month').subtract(19,'months').toISOString().split('.')[0],
				monthsagoend19 = now.clone().endOf('month').subtract(19,'months').toISOString().split('.')[0],
				monthsagoname19 = now.clone().startOf('month').subtract(19,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo19 = '$select=count(*) AS created_'+monthsagoname19,
				urlCountCompletedMonthsAgo19 = '$select=count(*) AS completed_'+monthsagoname19,
				urlCountOpenMonthsAgo19 = '$select=count(*) AS open_'+monthsagoname19,
				urlCreatedMonthsAgo19 = urlData+urlCountCreatedMonthsAgo19+urlWhere+'creation_date >=\''+monthsago19+'\' AND creation_date < \''+monthsago18+'\'',
				urlCompletedMonthsAgo19 = urlData+urlCountCompletedMonthsAgo19+urlWhere+'completion_date >=\''+monthsago19+'\' AND completion_date < \''+monthsago18+'\'',
				urlOpenMonthsAgo19 = urlData+urlCountOpenMonthsAgo19+urlWhere+'creation_date <= \''+monthsagoend19+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend19+'\')',

				monthsago20 = now.clone().startOf('month').subtract(20,'months').toISOString().split('.')[0],
				monthsagoend20 = now.clone().endOf('month').subtract(20,'months').toISOString().split('.')[0],
				monthsagoname20 = now.clone().startOf('month').subtract(20,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo20 = '$select=count(*) AS created_'+monthsagoname20,
				urlCountCompletedMonthsAgo20 = '$select=count(*) AS completed_'+monthsagoname20,
				urlCountOpenMonthsAgo20 = '$select=count(*) AS open_'+monthsagoname20,
				urlCreatedMonthsAgo20 = urlData+urlCountCreatedMonthsAgo20+urlWhere+'creation_date >=\''+monthsago20+'\' AND creation_date < \''+monthsago19+'\'',
				urlCompletedMonthsAgo20 = urlData+urlCountCompletedMonthsAgo20+urlWhere+'completion_date >=\''+monthsago20+'\' AND completion_date < \''+monthsago19+'\'',
				urlOpenMonthsAgo20 = urlData+urlCountOpenMonthsAgo20+urlWhere+'creation_date <= \''+monthsagoend20+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend20+'\')',

				monthsago21 = now.clone().startOf('month').subtract(21,'months').toISOString().split('.')[0],
				monthsagoend21 = now.clone().endOf('month').subtract(21,'months').toISOString().split('.')[0],
				monthsagoname21 = now.clone().startOf('month').subtract(21,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo21 = '$select=count(*) AS created_'+monthsagoname21,
				urlCountCompletedMonthsAgo21 = '$select=count(*) AS completed_'+monthsagoname21,
				urlCountOpenMonthsAgo21 = '$select=count(*) AS open_'+monthsagoname21,
				urlCreatedMonthsAgo21 = urlData+urlCountCreatedMonthsAgo21+urlWhere+'creation_date >=\''+monthsago21+'\' AND creation_date < \''+monthsago20+'\'',
				urlCompletedMonthsAgo21 = urlData+urlCountCompletedMonthsAgo21+urlWhere+'completion_date >=\''+monthsago21+'\' AND completion_date < \''+monthsago20+'\'',
				urlOpenMonthsAgo21 = urlData+urlCountOpenMonthsAgo21+urlWhere+'creation_date <= \''+monthsagoend21+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend21+'\')',

				monthsago22 = now.clone().startOf('month').subtract(22,'months').toISOString().split('.')[0],
				monthsagoend22 = now.clone().endOf('month').subtract(22,'months').toISOString().split('.')[0],
				monthsagoname22 = now.clone().startOf('month').subtract(22,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo22 = '$select=count(*) AS created_'+monthsagoname22,
				urlCountCompletedMonthsAgo22 = '$select=count(*) AS completed_'+monthsagoname22,
				urlCountOpenMonthsAgo22 = '$select=count(*) AS open_'+monthsagoname22,
				urlCreatedMonthsAgo22 = urlData+urlCountCreatedMonthsAgo22+urlWhere+'creation_date >=\''+monthsago22+'\' AND creation_date < \''+monthsago21+'\'',
				urlCompletedMonthsAgo22 = urlData+urlCountCompletedMonthsAgo22+urlWhere+'completion_date >=\''+monthsago22+'\' AND completion_date < \''+monthsago21+'\'',
				urlOpenMonthsAgo22 = urlData+urlCountOpenMonthsAgo22+urlWhere+'creation_date <= \''+monthsagoend22+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend22+'\')',

				monthsago23 = now.clone().startOf('month').subtract(23,'months').toISOString().split('.')[0],
				monthsagoend23 = now.clone().endOf('month').subtract(23,'months').toISOString().split('.')[0],
				monthsagoname23 = now.clone().startOf('month').subtract(23,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo23 = '$select=count(*) AS created_'+monthsagoname23,
				urlCountCompletedMonthsAgo23 = '$select=count(*) AS completed_'+monthsagoname23,
				urlCountOpenMonthsAgo23 = '$select=count(*) AS open_'+monthsagoname23,
				urlCreatedMonthsAgo23 = urlData+urlCountCreatedMonthsAgo23+urlWhere+'creation_date >=\''+monthsago23+'\' AND creation_date < \''+monthsago22+'\'',
				urlCompletedMonthsAgo23 = urlData+urlCountCompletedMonthsAgo23+urlWhere+'completion_date >=\''+monthsago23+'\' AND completion_date < \''+monthsago22+'\'',
				urlOpenMonthsAgo23 = urlData+urlCountOpenMonthsAgo23+urlWhere+'creation_date <= \''+monthsagoend23+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend23+'\')',

				monthsago24 = now.clone().startOf('month').subtract(24,'months').toISOString().split('.')[0],
				monthsagoend24 = now.clone().endOf('month').subtract(24,'months').toISOString().split('.')[0],
				monthsagoname24 = now.clone().startOf('month').subtract(24,'months').format('YYYYMM'),
				urlCountCreatedMonthsAgo24 = '$select=count(*) AS created_'+monthsagoname24,
				urlCountCompletedMonthsAgo24 = '$select=count(*) AS completed_'+monthsagoname24,
				urlCountOpenMonthsAgo24 = '$select=count(*) AS open_'+monthsagoname24,
				urlCreatedMonthsAgo24 = urlData+urlCountCreatedMonthsAgo24+urlWhere+'creation_date >=\''+monthsago24+'\' AND creation_date < \''+monthsago23+'\'',
				urlCompletedMonthsAgo24 = urlData+urlCountCompletedMonthsAgo24+urlWhere+'completion_date >=\''+monthsago24+'\' AND completion_date < \''+monthsago23+'\'',
				urlOpenMonthsAgo24 = urlData+urlCountOpenMonthsAgo24+urlWhere+'creation_date <= \''+monthsagoend24+'\' AND (completion_date IS NULL OR completion_date >= \''+monthsagoend24+'\')'
				;

		request('http://www.google.com', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				// read the body here
				var searchFor = [
					urlCreatedMonthsAgo0,
					urlCompletedMonthsAgo0,
					urlOpenMonthsAgo0,
					urlCreatedMonthsAgo1,
					urlCompletedMonthsAgo1,
					urlOpenMonthsAgo1,
					urlCreatedMonthsAgo2,
					urlCompletedMonthsAgo2,
					urlOpenMonthsAgo2,
					urlCreatedMonthsAgo3,
					urlCompletedMonthsAgo3,
					urlOpenMonthsAgo3,
					urlCreatedMonthsAgo4,
					urlCompletedMonthsAgo4,
					urlOpenMonthsAgo4,
					urlCreatedMonthsAgo5,
					urlCompletedMonthsAgo5,
					urlOpenMonthsAgo5,
					urlCreatedMonthsAgo6,
					urlCompletedMonthsAgo6,
					urlOpenMonthsAgo6,
					urlCreatedMonthsAgo7,
					urlCompletedMonthsAgo7,
					urlOpenMonthsAgo7,
					urlCreatedMonthsAgo8,
					urlCompletedMonthsAgo8,
					urlOpenMonthsAgo8,
					urlCreatedMonthsAgo9,
					urlCompletedMonthsAgo9,
					urlOpenMonthsAgo9,
					urlCreatedMonthsAgo10,
					urlCompletedMonthsAgo10,
					urlOpenMonthsAgo10,
					urlCreatedMonthsAgo11,
					urlCompletedMonthsAgo11,
					urlOpenMonthsAgo11,
					urlCreatedMonthsAgo12,
					urlCompletedMonthsAgo12,
					urlOpenMonthsAgo12,
					urlCreatedMonthsAgo13,
					urlCompletedMonthsAgo13,
					urlOpenMonthsAgo13,
					urlCreatedMonthsAgo14,
					urlCompletedMonthsAgo14,
					urlOpenMonthsAgo14,
					urlCreatedMonthsAgo15,
					urlCompletedMonthsAgo15,
					urlOpenMonthsAgo15,
					urlCreatedMonthsAgo16,
					urlCompletedMonthsAgo16,
					urlOpenMonthsAgo16,
					urlCreatedMonthsAgo17,
					urlCompletedMonthsAgo17,
					urlOpenMonthsAgo17,
					urlCreatedMonthsAgo18,
					urlCompletedMonthsAgo18,
					urlOpenMonthsAgo18,
					urlCreatedMonthsAgo19,
					urlCompletedMonthsAgo19,
					urlOpenMonthsAgo19,
					urlCreatedMonthsAgo20,
					urlCompletedMonthsAgo20,
					urlOpenMonthsAgo20,
					urlCreatedMonthsAgo21,
					urlCompletedMonthsAgo21,
					urlOpenMonthsAgo21,
					urlCreatedMonthsAgo22,
					urlCompletedMonthsAgo22,
					urlOpenMonthsAgo22,
					urlCreatedMonthsAgo23,
					urlCompletedMonthsAgo23,
					urlOpenMonthsAgo23,
					urlCreatedMonthsAgo24,
					urlCompletedMonthsAgo24,
					urlOpenMonthsAgo24
				];
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
							//result.push(thisJson[0]);
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
			//console.log(name);
			sortableMonth.push(name);
		}
		//console.log(sortableMonth);
		sortableMonth.sort();
		for(var item in sortableMonth)
		{
			//console.log(sortableMonth[item]);
			for(var name in result) {
				if(name == sortableMonth[item])
				{
					googleChartArray.push([name,Number(result[name].created),Number(result[name].completed),Number(result[name].open)]);
					break;
				}
			}
		}
		//console.log(googleChartArray);
		res.render('index', { title: 'Express', googleChartArray: JSON.stringify(googleChartArray) });
	});
});

module.exports = router;
