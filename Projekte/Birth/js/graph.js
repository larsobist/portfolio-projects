// Wochentage 
chartWochentage();
async function chartWochentage() {
    const data = await getWochentageData();
    var week = {
        chart: {
            // width: "100%",
            height: "100%",
            type: "bar",
            // foreColor: '#6D6D6D',
            toolbar: {
                show: false,
            },
            // animations: {
            //     enabled: false,
            // }

        },
        dataLabels: {
            enabled: false
        },
        // colors: ['#F96958'],
        series: [{
            name: "Anzahl",
            data: data.ys
        }],
        // plotOptions: {
        //     bar: {
        //         // horizontal: false,
        //         borderRadius: 10,
        //         endingShape: 'rounded',
        //     }
        // },


        // tooltip: {
        //     theme: 'dark',
        // },
        yaxis: {
            show: false,
        },


        tooltip: {
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
                anzahl = series[seriesIndex][dataPointIndex]

                function numberWithCommas(anzahl) {
                    return anzahl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }

                return (
                    '<div class="tooltip">' +
                    "<span>" +
                    w.globals.labels[dataPointIndex] +
                    "s gab es <br> durchschnittlich <br>" +
                    numberWithCommas(anzahl) + " Geburten" +
                    "</span>" +
                    "</div>"
                );
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                type: "vertical",
                // opacityFrom: 0.7,
                // opacityTo: 0.9,
                colorStops: [{
                        offset: 10,
                        color: "#F96958",
                        opacity: 1
                    },
                    {
                        offset: 90,
                        color: "#FCD388",
                        opacity: 1
                    },
                ]
            }
        },
        grid: {
            show: false,
        },
        xaxis: {
            categories: data.xs
        }
    };

    var chart = new ApexCharts(document.querySelector("#chartWochentage"), week);
    chart.render();
}

async function getWochentageData() {
    const xs = [];
    const ys = [];
    const response = await fetch('./data/Wochentagdurchschnitt.csv');
    const wochentageData = await response.text();

    const table = wochentageData.split('\n');
    table.forEach(row => {
        const columns = row.split(';');
        const Wochentage = columns[0];
        xs.push(Wochentage);
        const Anzahl = columns[1];
        ys.push(Anzahl);
    });
    return { xs, ys };
}

// Monate 

chartMonate();
async function chartMonate() {
    const data = await getMonateData();

    var month = {
        chart: {
            // width: "100%",
            height: "100%",
            type: "bar",
            // foreColor: '#6D6D6D',
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false
        },
        // colors: ['#F96958'],
        series: [{
            name: "Anzahl",
            data: data.ys
        }],
        yaxis: {
            show: false,
        },
        tooltip: {
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
                anzahl = series[seriesIndex][dataPointIndex]

                function numberWithCommas(anzahl) {
                    return anzahl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }

                return (
                    '<div class="tooltip">' +
                    "<span>" +
                    "Im " + w.globals.labels[dataPointIndex] +
                    " gab es <br> durchschnittlich <br>" +
                    numberWithCommas(anzahl) + " Geburten" +
                    "</span>" +
                    "</div>"
                );
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                type: "vertical",
                opacityFrom: 0.7,
                opacityTo: 0.9,
                colorStops: [{
                        offset: 10,
                        color: "#F96958",
                        opacity: 1
                    },
                    {
                        offset: 90,
                        color: "#FCD388",
                        opacity: 1
                    },
                ]
            }
        },
        grid: {
            show: false,
        },
        xaxis: {
            categories: data.xs
        }
    };
    var chart = new ApexCharts(document.querySelector("#chartMonate"), month);
    chart.render();
}

async function getMonateData() {
    const xs = [];
    const ys = [];
    const response = await fetch('./data/Monatsdurchschnitt.csv');
    const MonateData = await response.text();

    const table = MonateData.split('\n');
    table.forEach(row => {
        const columns = row.split(';');
        const Monate = columns[0];
        xs.push(Monate);
        const Anzahl = columns[1];
        ys.push(Anzahl);
    });
    return { xs, ys };
}


// Jahre 

chartJahre();
async function chartJahre() {
    const data = await getJahreData();

    var year = {
        chart: {
            // width: "100%",
            height: "100%",
            type: "bar",
            // foreColor: '#6D6D6D',
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false
        },
        // colors: ['#F96958'],
        series: [{
            name: "Anzahl",
            data: data.ys
        }],
        yaxis: {
            show: false,
        },
        tooltip: {
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
                anzahl = series[seriesIndex][dataPointIndex]

                function numberWithCommas(anzahl) {
                    return anzahl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }

                return (
                    '<div class="tooltip">' +
                    "<span>" +
                    "Im Jahr " + w.globals.labels[dataPointIndex] +
                    " gab es <br> durchschnittlich <br>" +
                    numberWithCommas(anzahl) + " Geburten" +
                    "</span>" +
                    "</div>"
                );
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                type: "vertical",
                opacityFrom: 0.7,
                opacityTo: 0.9,
                colorStops: [{
                        offset: 10,
                        color: "#F96958",
                        opacity: 1
                    },
                    {
                        offset: 90,
                        color: "#FCD388",
                        opacity: 1
                    },
                ]
            }
        },
        grid: {
            show: false,
        },
        xaxis: {
            categories: data.xs
        }
    };
    var chart = new ApexCharts(document.querySelector("#chartJahre"), year);
    chart.render();

    // const ctx = document.getElementById('chartJahre').getContext('2d');
    // const myChart = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: data.xs,
    //         datasets: [{
    //             label: 'Geburten',
    //             data: data.ys,
    //             backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //             borderColor: 'rgba(255, 99, 132, 1)',
    //             borderWidth: 1,
    //             barThickness: '30',
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 display: true,
    //                 // display: false,
    //                 ticks: {
    //                     beginAtZero: true
    //                 }
    //             }]
    //         }
    //     }
    // });
}

async function getJahreData() {
    const xs = [];
    const ys = [];
    const response = await fetch('./data/Jahrestabelle.csv');
    const JahreData = await response.text();

    const table = JahreData.split('\n');
    table.forEach(row => {
        const columns = row.split(';');
        const Jahre = columns[0];
        xs.push(Jahre);
        const Anzahl = columns[1];
        ys.push(Anzahl);
    });
    return { xs, ys };
}