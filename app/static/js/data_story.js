$(document).ready(function () {
    //Global Highcharts Options
    Highcharts.setOptions({
      lang: {
        numericSymbols: [ "k" , "M" , "B" , "T" , "P" , "E"]
      }
    });

    //loan status plot
    $('#loan-status-plot').highcharts({
        chart: {
            type: 'pie',
            backgroundColor:'rgba(255, 255, 255, 0.1)'
        },
        plotOptions: {
            pie: {
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    style: {fontSize: '24px' }
                }
            }
        },
        title: {
            text: 'Loan Status Breakdown'
        },
        legend: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<b><p>{point.key}</p></b>',
            pointFormat: '<b><p>{point.y}%</p></b>'
        },
        series: [{
            //name: 'Days Since Loan Origination',
            color: 'blue',
            data: [['Paid on Time', 27], 
                   ['Prepaid', 57], 
                   ['Default', 16]]
        }]
    });

    //default histogram
    $('#default-hist').highcharts({
        chart: {
            type: 'column',
            backgroundColor:'rgba(255, 255, 255, 0.1)'
        },
        title: {
            text: 'Time to Default'
        },
        xAxis: {
            title: {
                text: 'Days Since Loan Origination',
                style: {
                    fontSize: '24px'
                }
            },
            labels : {
                style: {
                    fontSize: '20px'
                }
            }
        },
        yAxis: {
            title: {
                text: 'Number of Loans',
                style: {
                    fontSize: '24px'
                }
            },
            labels : {
                style: {
                    fontSize: '20px'
                }
            },
        },

        legend: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<b><p>{point.key} Days</p></b>',
            pointFormat: '<b><p>{point.y} Loans</p></b>'
        },
        series: [{
            //name: 'Days Since Loan Origination',
            color: 'blue',
            data: [[0, 3.00000000e+02],
                   [76, 8.19000000e+02],
                   [174, 1.00600000e+03],
                   [272, 1.52500000e+03],
                   [370, 1.00000000e+03],
                   [467, 9.55000000e+02],
                   [565, 8.18000000e+02],
                   [663, 6.88000000e+02],
                   [761, 4.05000000e+02],
                   [858, 2.45000000e+02],
                   [956, 1.47000000e+02],
                   [1054, 5.90000000e+01],
                   [1152, 7.00000000e+00],
                   [1249, 6.00000000e+00],
                   [1347, 5.00000000e+00],
                   [1445, 2.00000000e+00],
                   [1542, 3.00000000e+00],
                   [1640, 0.00000000e+00],
                   [1738, 0.00000000e+00],
                   [1836, 1.00000000e+00]]
        }]
    });

    //prepaid histogram
    $('#prepaid-hist').highcharts({
        chart: {
            type: 'column',
            backgroundColor:'rgba(255, 255, 255, 0.1)'
        },
        title: {
            text: 'Time to Prepay'
        },
        xAxis: {
            title: {
                text: 'Days Since Loan Origination',
                style: {
                    fontSize: '24px'
                }
            },
            labels : {
                style: {
                    fontSize: '20px'
                }
            }
        },
        yAxis: {
            title: {
                text: 'Number of Loans',
                style: {
                    fontSize: '24px'
                }
            },
            labels : {
                style: {
                    fontSize: '20px'
                }
            }
        },

        legend: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<b><p>{point.key} Days</p></b>',
            pointFormat: '<b><p>{point.y} Loans</p></b>'
        },
        series: [{
            //name: 'Days Since Loan Origination',
            color: 'blue',
            data: [  [25, 5.00000000e+00],  
                     [77, 4.28600000e+03],   
                     [128, 3.85000000e+03],
                     [179, 1.98700000e+03],
                     [231, 4.51400000e+03],
                     [282, 5.36000000e+03],
                     [333, 2.45200000e+03],
                     [385, 4.65100000e+03],
                     [436, 4.19600000e+03],
                     [488, 3.63800000e+03],
                     [539, 1.84800000e+03],
                     [590, 3.14000000e+03],
                     [642, 2.82700000e+03],
                     [693, 1.33400000e+03],
                     [744, 2.33300000e+03],
                     [796, 1.97200000e+03],
                     [847, 9.51000000e+02],
                     [898, 1.55500000e+03],
                     [950, 1.49000000e+03],
                     [1001, 6.38000000e+02]]
        }]
    });

    //Random Forest Convergence
    $('#random-forest-plot').highcharts({
        chart: {
            type: 'line',
            backgroundColor:'rgba(255, 255, 255, 0.1)'
        },
        title: {
            text: 'Convergence of Random Forest'
        },
        xAxis: {
            title: {
                text: 'Number of Trees in Forest',
                style: {
                    fontSize: '24px'
                }
            },
            labels : {
                style: {
                    fontSize: '20px'
                }
            },
            type: 'logarithmic'
        },
        yAxis: {
            title: {
                text: 'Coefficient of Determination',
                style: {
                    fontSize: '24px'
                }
            },
            labels : {
                style: {
                    fontSize: '20px'
                }
            }
        },

        legend: {
            enabled: true
        },
        tooltip: {
            shared: [true],
            crosshairs: [true],
            useHTML: true,
            headerFormat: '<b><p>{point.key} Trees</p></b>',
            pointFormat: '<b><p style="color: {series.color}">{series.name}: {point.y}%</p></b>'
        },
        series: [{
            name: 'Test Set',
            color: 'green',
            lineWidth: 5,
            marker: {
                radius: 6
            },
            data: [[10, 0.53], 
                   [20, 0.56], 
                   [30, 0.59], 
                   [40, 0.58], 
                   [50, 0.58], 
                   [60, 0.59], 
                   [70, 0.58], 
                   [80, 0.58], 
                   [90, 0.59], 
                   [100 ,0.59], 
                   [300, 0.59], 
                   [500, 0.59], 
                   [1000, 0.59]]
        }]
    });

    //case study plot
    $('#case-study-plot').highcharts({
        chart: {
            type: 'line',
            backgroundColor:'rgba(255, 255, 255, 0.1)'
        },
        title: {
            text: 'ROI for Various Investment Strategies'
        },
        xAxis : {
            labels : {
                style: {
                    fontSize: '20px'
                }
            }
        },
        yAxis: {
            title: {
                text: 'Actual ROI (%)',
                style: {
                    fontSize: '24px'
                },
            },
            labels : {
                style: {
                    fontSize: '20px'
                }
            },
            min: -2.7,
            max: 10
        },

        legend: {
            enabled: true
        },
        tooltip: {
            shared: [true],
            crosshairs: [true],
            useHTML: true,
            headerFormat: '<b><p>{point.key} Samples from each grade</p></b>',
            pointFormat: '<b><p style="color: {series.color}">{series.name}: {point.y}%</p></b>',
            
            // formatter: function() {
            //     var s = '<b><p>' + this.x + ' Samples from each grade</p></b>';
            //     var chart = this.points[0].series.chart;
            //     var index = 0;
            //     $.each(chart.series, function(i, series) { 
            //         if (series.name != "Random Error") {
            //             s += '<p style="color: ' + series.color + '"><b>'+ series.name +': ' +
            //                 series.data[index].y +'%' + '</b></p>';     //use index to get the y value
            //             }
            //     });           
            //     return s;
            // },
        },
        series: [{
            name: 'Random',
            lineWidth: 5,
            marker: {
                radius: 6
            },
            data: [[1, -0.2], 
                   [5, 2.5],
                   [10, 1.2],
                   [20, 1.9],
                   [30, 1.4],
                   [40, 1.8],
                   [50, 1.4],
                   [60, 1.5],
                   [70, 1.7],
                   [80, 1.6],
                   [90, 1.5],
                   [100, 1.5]]
            },
            {
            name: 'Random Error',
            showInLegend: false,
            type: 'errorbar',
            lineWidth: 1,
            data: [
                   [1, -18.2, 17.8],
                   [5, -3.6, 8.6],
                   [10, -3.9, 6.3],
                   [20, -1.5, 5.3],
                   [30, -1.3, 4.1],
                   [40, -0.9, 4.5],
                   [50, -0.6, 3.6],
                   [60, -0.5, 3.5],
                   [70, -0.1, 3.5],
                   [80, 0.2, 3.0],
                   [90, -0.1, 3.1],
                   [100, 0.2, 2.8]]
            },
            {
            name: 'Lowest DTI',
            lineWidth: 5,
            marker: {
                radius: 6
            },
            data: [[1, 15], 
                   [5, 10.6],
                   [10, 4.4],
                   [20, 7.2],
                   [30, -0.4],
                   [40, -2.6],
                   [50, -1.7],
                   [60, -0.1],
                   [70, -0.2],
                   [80, 0.2],
                   [90, 0.9],
                   [100, 1.7]]
            },
            {
            name: 'Highest Int Rate',
            lineWidth: 5,
            marker: {
                radius: 6
            },
            data: [[1, 15], 
                   [5, 0.4],
                   [10, 2.9],
                   [20, 2.6],
                   [30, 4.0],
                   [40, 1.6],
                   [50, 1.4],
                   [60, 0.0],
                   [70, -0.5],
                   [80, -0.3],
                   [90, -0.3],
                   [100, -2.0]]
            },
            {
            name: 'Lending Lounge',
            lineWidth: 5,
            marker: {
                radius: 6
            },
            data: [[1, 9.3], 
                   [5, 0.2],
                   [10, 3.7],
                   [20, 4.5],
                   [30, 5.7],
                   [40, 6.5],
                   [50, 6.7],
                   [60, 6.1],
                   [70, 6.5],
                   [80, 5.7],
                   [90, 5.5],
                   [100, 5.1]]
            }
        ]
    });
});