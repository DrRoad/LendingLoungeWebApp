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
    
    //ROC Curve
    $('#roc-plot').highcharts({
        chart: {
            type: 'line',
            backgroundColor:'rgba(255, 255, 255, 0.1)',
            events: {
                load: function(event) {
                    //AUC Label
                    var auc_label = this['renderer']['label']('AUC:')
                    .css({
                       'width': '150px',
                       'color' : 'grey',
                       'fontSize':'24px'
                    })
                    .attr({
                       'stroke': 'grey',
                       'stroke-width': 0,
                       'r': 5,
                       'padding': 3                      
                    })
                    .add();
                   
                    auc_label.align(Highcharts.extend(['label']['getBBox()'], {
                       'align': 'right',
                       'x': -100, // offset
                       'verticalAlign': 'bottom',
                       'y': -280 // offset
                    }), null, 'spacingBox');
                    // DEFAULT AUC
                    var default_auc = this['renderer']['label']('Default: 0.68')
                    .css({
                       'width': '150px',
                       'color' : 'grey',
                       'fontSize':'20px'
                    })
                    .attr({
                       'stroke': 'grey',
                       'stroke-width': 0,
                       'r': 5,
                       'padding': 3                      
                    })
                    .add();
                   
                    default_auc.align(Highcharts.extend(['label']['getBBox()'], {
                       'align': 'right',
                       'x': -150, // offset
                       'verticalAlign': 'bottom',
                       'y': -230 // offset
                    }), null, 'spacingBox');
                    //PAID AUC
                    var paid_auc = this['renderer']['label']('Fully Paid: 0.83')
                    .css({
                       'width': '150px',
                       'color' : 'grey',
                       'fontSize':'20px'
                    })
                    .attr({
                       'stroke': 'grey',
                       'stroke-width': 0,
                       'r': 5,
                       'padding': 3                      
                    })
                    .add();
                   
                    paid_auc.align(Highcharts.extend(['label']['getBBox()'], {
                       'align': 'right',
                       'x': -150, // offset
                       'verticalAlign': 'bottom',
                       'y': -180 // offset
                    }), null, 'spacingBox');
                    //PRPAID AUC
                    var prepaid_auc = this['renderer']['label']('Prepaid: 0.72')
                    .css({
                       'width': '150px',
                       'color' : 'grey',
                       'fontSize':'20px'
                    })
                    .attr({
                       'stroke': 'grey',
                       'stroke-width': 0,
                       'r': 5,
                       'padding': 3                      
                    })
                    .add();
                   
                    prepaid_auc.align(Highcharts.extend(['label']['getBBox()'], {
                       'align': 'right',
                       'x': -150, // offset
                       'verticalAlign': 'bottom',
                       'y': -130 // offset
                    }), null, 'spacingBox');
                }
            }        
        },
        title: {
            text: 'ROC Curve - 1 vs All'
        },
        xAxis: {
            title: {
                text: 'False Positive Rate',
                style: {
                    fontSize: '24px'
                }
            },
            labels : {
                style: {
                    fontSize: '20px'
                }
            },
            min: 0,
            max: 1
        },
        yAxis: {
            title: {
                text: 'True Positive Rate',
                style: {
                    fontSize: '24px'
                }
            },
            labels : {
                style: {
                    fontSize: '20px'
                }
            },
            min: 0,
            max: 1
        },

        legend: {
            enabled: true
        },
        tooltip: {
            enabled: false
        },
        series: [{
            name: 'Default',
            color: 'green',
            lineWidth: 5,
            marker: {
                radius: 0
            },
            data: [[0.00, 0.00],
                  [0.01, 0.04],
                  [0.02, 0.08],
                  [0.03, 0.11],
                  [0.04, 0.14],
                  [0.05, 0.18],
                  [0.06, 0.21],
                  [0.07, 0.23],
                  [0.08, 0.25],
                  [0.09, 0.27],
                  [0.10, 0.29],
                  [0.11, 0.30],
                  [0.13, 0.32],
                  [0.14, 0.33],
                  [0.15, 0.35],
                  [0.16, 0.37],
                  [0.18, 0.39],
                  [0.19, 0.40],
                  [0.20, 0.42],
                  [0.21, 0.43],
                  [0.23, 0.45],
                  [0.24, 0.47],
                  [0.25, 0.49],
                  [0.26, 0.50],
                  [0.28, 0.52],
                  [0.29, 0.53],
                  [0.30, 0.55],
                  [0.31, 0.57],
                  [0.33, 0.59],
                  [0.34, 0.60],
                  [0.35, 0.62],
                  [0.36, 0.63],
                  [0.38, 0.65],
                  [0.39, 0.66],
                  [0.40, 0.67],
                  [0.42, 0.68],
                  [0.43, 0.69],
                  [0.44, 0.71],
                  [0.46, 0.72],
                  [0.47, 0.74],
                  [0.48, 0.74],
                  [0.50, 0.76],
                  [0.51, 0.76],
                  [0.52, 0.78],
                  [0.54, 0.79],
                  [0.55, 0.80],
                  [0.56, 0.81],
                  [0.58, 0.82],
                  [0.59, 0.82],
                  [0.61, 0.83],
                  [0.62, 0.84],
                  [0.63, 0.86],
                  [0.65, 0.86],
                  [0.66, 0.88],
                  [0.67, 0.88],
                  [0.69, 0.88],
                  [0.70, 0.90],
                  [0.72, 0.90],
                  [0.73, 0.91],
                  [0.74, 0.92],
                  [0.76, 0.92],
                  [0.77, 0.93],
                  [0.79, 0.93],
                  [0.80, 0.94],
                  [0.82, 0.94],
                  [0.83, 0.95],
                  [0.84, 0.96],
                  [0.86, 0.96],
                  [0.87, 0.97],
                  [0.89, 0.98],
                  [0.90, 0.98],
                  [0.92, 0.99],
                  [0.93, 0.99],
                  [0.95, 0.99],
                  [0.96, 0.99],
                  [0.98, 1.00],
                  [0.99, 1.00]]
        },
        {
            name: 'Paid',
            color: 'blue',
            lineWidth: 5,
            marker: {
                radius: 0
            },
            data: [[0.00, 0.00],
                  [0.01, 0.04],
                  [0.02, 0.07],
                  [0.03, 0.11],
                  [0.03, 0.14],
                  [0.04, 0.18],
                  [0.05, 0.22],
                  [0.06, 0.26],
                  [0.06, 0.30],
                  [0.07, 0.33],
                  [0.08, 0.36],
                  [0.09, 0.39],
                  [0.10, 0.43],
                  [0.11, 0.45],
                  [0.12, 0.48],
                  [0.13, 0.52],
                  [0.14, 0.55],
                  [0.15, 0.58],
                  [0.16, 0.60],
                  [0.17, 0.62],
                  [0.18, 0.65],
                  [0.19, 0.68],
                  [0.20, 0.70],
                  [0.21, 0.72],
                  [0.22, 0.75],
                  [0.24, 0.77],
                  [0.25, 0.79],
                  [0.26, 0.82],
                  [0.27, 0.83],
                  [0.28, 0.85],
                  [0.30, 0.86],
                  [0.31, 0.87],
                  [0.32, 0.88],
                  [0.34, 0.89],
                  [0.35, 0.90],
                  [0.36, 0.91],
                  [0.38, 0.92],
                  [0.39, 0.93],
                  [0.41, 0.93],
                  [0.42, 0.94],
                  [0.44, 0.95],
                  [0.45, 0.95],
                  [0.46, 0.96],
                  [0.48, 0.96],
                  [0.50, 0.96],
                  [0.51, 0.96],
                  [0.53, 0.97],
                  [0.54, 0.97],
                  [0.56, 0.97],
                  [0.57, 0.98],
                  [0.59, 0.98],
                  [0.60, 0.98],
                  [0.62, 0.98],
                  [0.63, 0.98],
                  [0.65, 0.98],
                  [0.66, 0.99],
                  [0.68, 0.99],
                  [0.69, 0.99],
                  [0.71, 0.99],
                  [0.73, 0.99],
                  [0.74, 0.99],
                  [0.76, 0.99],
                  [0.77, 0.99],
                  [0.79, 1.00],
                  [0.80, 1.00],
                  [0.82, 1.00],
                  [0.83, 1.00],
                  [0.85, 1.00],
                  [0.87, 1.00],
                  [0.88, 1.00],
                  [0.90, 1.00],
                  [0.91, 1.00],
                  [0.93, 1.00],
                  [0.94, 1.00],
                  [0.96, 1.00],
                  [0.98, 1.00],
                  [0.99, 1.00]]
        },
        {
            name: 'Prepaid',
            color: 'red',
            lineWidth: 5,
            marker: {
                radius: 0
            },
            data: [[0.00, 0.00],
                  [0.00, 0.02],
                  [0.01, 0.04],
                  [0.01, 0.05],
                  [0.01, 0.07],
                  [0.02, 0.09],
                  [0.02, 0.11],
                  [0.03, 0.12],
                  [0.03, 0.14],
                  [0.03, 0.16],
                  [0.04, 0.18],
                  [0.04, 0.19],
                  [0.05, 0.21],
                  [0.05, 0.23],
                  [0.06, 0.24],
                  [0.07, 0.26],
                  [0.07, 0.28],
                  [0.08, 0.29],
                  [0.09, 0.31],
                  [0.10, 0.32],
                  [0.11, 0.34],
                  [0.11, 0.35],
                  [0.12, 0.37],
                  [0.13, 0.38],
                  [0.14, 0.40],
                  [0.15, 0.41],
                  [0.16, 0.43],
                  [0.17, 0.44],
                  [0.18, 0.46],
                  [0.19, 0.47],
                  [0.20, 0.49],
                  [0.21, 0.50],
                  [0.22, 0.52],
                  [0.23, 0.53],
                  [0.24, 0.54],
                  [0.25, 0.56],
                  [0.26, 0.57],
                  [0.28, 0.59],
                  [0.29, 0.60],
                  [0.30, 0.61],
                  [0.31, 0.63],
                  [0.32, 0.64],
                  [0.33, 0.65],
                  [0.35, 0.67],
                  [0.36, 0.68],
                  [0.38, 0.69],
                  [0.39, 0.70],
                  [0.40, 0.72],
                  [0.42, 0.73],
                  [0.43, 0.74],
                  [0.45, 0.75],
                  [0.46, 0.77],
                  [0.48, 0.78],
                  [0.49, 0.79],
                  [0.51, 0.80],
                  [0.52, 0.81],
                  [0.54, 0.83],
                  [0.56, 0.83],
                  [0.58, 0.84],
                  [0.60, 0.85],
                  [0.62, 0.87],
                  [0.64, 0.88],
                  [0.66, 0.88],
                  [0.68, 0.89],
                  [0.70, 0.90],
                  [0.72, 0.91],
                  [0.74, 0.92],
                  [0.76, 0.93],
                  [0.78, 0.94],
                  [0.81, 0.95],
                  [0.83, 0.96],
                  [0.86, 0.96],
                  [0.88, 0.97],
                  [0.90, 0.98],
                  [0.93, 0.99],
                  [0.96, 0.99],
                  [0.99, 1.00]]
        },
        {
            name: 'Chance',
            color: 'black',
            lineWidth: 5,
            marker: {
                radius: 0
            },
            tooltip: {
              enabled: false
            },
            data: [[0,0], [1,1]]
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
            title: {
                text: 'Number of Loans per Grade',
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
            enabled: true,
            itemStyle: {
                    fontSize: '18px'
            }
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