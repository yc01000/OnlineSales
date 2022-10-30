<template>
    <div>
        <canvas ref="CntChart" />
    </div>
</template>
  
<script>
// import { Chart, registerables } from 'chart.js'
// Chart.register(...registerables)

const Chart = require('chart.js');

export default {
    data: () => ({
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            hover: {
                animationDuration: 0
            },
            animation: {
                duration: 1,
                onComplete: function () {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    // this.data.datasets.forEach(function (dataset, i) {
                    //     var meta = chartInstance.controller.getDatasetMeta(i);
                    //     ctx.fillStyle = myBorderColor[i]; // 라인에 텍스트 컬러..
                    //     meta.data.forEach(function (bar, index) {
                    //         if (document.getElementById("dataSeries1").checked) {
                    //             var data = addComma(dataset.data[index]);
                    //             ctx.fillText(data, bar._model.x, bar._model.y - 5);
                    //         }
                    //         else {
                    //             ctx.fillText("", bar._model.x, bar._model.y - 5);
                    //         }
                    //     });
                    // });
                }
            },
            tooltips: {
                enabled: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        // callback: function (value, index, values) {
                        //     return addComma(value);
                        // }
                    }
                }]
            },
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: '승인 건수 추이',
                position: 'top',
                fontSize: 12,
                fontStyle: 'bold'
            },
            spanGaps: true
        }
    }),
    mounted() {
        this.createChart()
    },
    methods: {
        createChart() {
            new Chart(this.$refs.CntChart, {
                type: 'line',
                data: this.data,
                options: this.options
            })

        }
    }
}
</script>