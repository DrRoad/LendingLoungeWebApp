$(document).keydown(function(key) {
    switch(key.which) {
        //left
        case 37:
            move_slide_backward();
        break;
        //right
        case 39:
            move_slide_forward();
        break;
        //up
        case 38:
            move_slide_backward();
        break;
        //down
        case 40:
            move_slide_forward();
        break;
        default: return;
    }
    key.preventDefault();
});

function move_slide_forward() {
    console.log("key");
    //ugly logic but it's a short presentation so this works
    if($("#slide-1").hasClass("active")) {
        $("#slide-1").toggleClass("active", false);
        $("#slide-1").toggleClass("hidden", true);
        $("#slide-2").toggleClass("active", true);
        $("#slide-2").toggleClass("hidden", false);
    } else if($("#slide-2").hasClass("active")) {
        $("#slide-2").toggleClass("active", false);
        $("#slide-2").toggleClass("hidden", true);
        $("#slide-3").toggleClass("active", true);
        $("#slide-3").toggleClass("hidden", false);
    } else if($("#slide-3").hasClass("active")) {
        $("#slide-3").toggleClass("active", false);
        $("#slide-3").toggleClass("hidden", true);
        $("#slide-4").toggleClass("active", true);
        $("#slide-4").toggleClass("hidden", false);
    }else if($("#slide-4").hasClass("active")) {
        $("#slide-4").toggleClass("active", false);
        $("#slide-4").toggleClass("hidden", true);
        $("#slide-5").toggleClass("active", true);
        $("#slide-5").toggleClass("hidden", false);
    }
}

function move_slide_backward() {
    if($("#slide-5").hasClass("active")) {
        $("#slide-5").toggleClass("active", false);
        $("#slide-5").toggleClass("hidden", true);
        $("#slide-4").toggleClass("active", true);
        $("#slide-4").toggleClass("hidden", false);
    } else if($("#slide-4").hasClass("active")) {
        $("#slide-4").toggleClass("active", false);
        $("#slide-4").toggleClass("hidden", true);
        $("#slide-3").toggleClass("active", true);
        $("#slide-3").toggleClass("hidden", false);
    } else if($("#slide-3").hasClass("active")) {
        $("#slide-3").toggleClass("active", false);
        $("#slide-3").toggleClass("hidden", true);
        $("#slide-2").toggleClass("active", true);
        $("#slide-2").toggleClass("hidden", false);
    } if($("#slide-2").hasClass("active")) {
        $("#slide-2").toggleClass("active", false);
        $("#slide-2").toggleClass("hidden", true);
        $("#slide-1").toggleClass("active", true);
        $("#slide-1").toggleClass("hidden", false);
    }
}

$(document).ready(function () {
    //Global Highcharts Options
    Highcharts.setOptions({
      lang: {
        numericSymbols: [ "k" , "M" , "B" , "T" , "P" , "E"]
      }
    });

    //loan status plot
    $('#yearly-loan-issuance-plot').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Total Loan Issuance By Year'
        },
        xAxis: {
            categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014'],
            labels : {
                style: {
                    fontSize: '20px'
                }
            }
        },
        yAxis: {
            title: {
                text: 'Total Issued ($)',
                style: {
                    fontSize: '24px'
                }

            },
            labels : {
                style: {
                    fontSize: '20px'
                }
            },
            max: 6300000000
        },

        legend: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<b><p>{point.key}</p></b>',
            pointFormat: '<b><p>${point.y}</p></b>'
        },
        series: [{
            //name: 'Days Since Loan Origination',
            color: 'blue',
            data: [24766575, 
                   76581325, 
                   202932500, 
                   460296150, 
                   1178238775,
                   3242852550,
                   6205366548]
        }]
    });

    //case study plot
    $('#case-study-incomplete-plot').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'ROI for Various Investment Strategies'
        },
        xAxis : {
            title: {
                text: 'Number of Loans Per Grade',
                style: {
                    fontSize: '24px'
                },
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
            enabled: true
        },
        tooltip: {
            shared: [true],
            crosshairs: [true],
            useHTML: true,
            headerFormat: '<b><p>{point.key} Samples from each grade</p></b>',
            pointFormat: '<b><p style="color: {series.color}">{series.name}: {point.y}%</p></b>',
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
            }
        ]
    });

    //loan status plot
    $('#loan-status-plot').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Loan Status Breakdown'
        },
        xAxis: {
            categories: ['Paid On Time', 'Prepaid', 'Default'],
            labels : {
                style: {
                    fontSize: '20px'
                }
            }
        },
        yAxis: {
            title: {
                text: '% of Loans',
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
            headerFormat: '<b><p>{point.key}</p></b>',
            pointFormat: '<b><p>{point.y}%</p></b>'
        },
        series: [{
            //name: 'Days Since Loan Origination',
            color: 'blue',
            data: [27, 57, 16]
        }]
    });

    //default histogram
    $('#default-hist').highcharts({
        chart: {
            type: 'column'
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

//Random Forest Convergence
    $('#random-forest-plot').highcharts({
        chart: {
            type: 'line'
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
            type: 'line'
        },
        title: {
            text: 'ROI for Various Investment Strategies'
        },
        xAxis : {
            title: { 
              text: "# of Loans Per Grade",
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
            enabled: true
        },
        tooltip: {
            shared: [true],
            crosshairs: [true],
            useHTML: true,
            headerFormat: '<b><p>{point.key} Samples from each grade</p></b>',
            pointFormat: '<b><p style="color: {series.color}">{series.name}: {point.y}%</p></b>',
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


