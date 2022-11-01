<template>
    <div>
        <canvas ref="CntChart" style="display: block; height: 210px; width: 750px;" />
    </div>
</template>
  
<script>
const Chart = require('chart.js');

export default {
    props: {
        cntdata: Object
    },

    data: () => ({
        type: 'line',
        myBorderColor: ['rgba(91, 204, 0, 1)', 'rgba(6, 134, 255, 1)', 'rgba(255, 56, 49, 1)'],
        myBackColor: ['rgba(91, 204, 0, 0.2)', 'rgba(6, 134, 255, 0.2)', 'rgba(255, 56, 49, 0.5)'],
    }),
    mounted() {
        this.createChart()
    },
    methods: {
        createChart: function() {
            var minutesCntDataset = [];
            var lableList = [];

            JSON.parse(this.cntdata).forEach((element, idx) => {
                var dataCntList = [];
                lableList = [];
                element.PerMinutes.forEach(el => {
                    dataCntList.push(el.APPROVAL_CNT);
                    lableList.push(el.GUBUN.split(' ')[1]); // 분단위
                });
                minutesCntDataset.push({
                    label: element.PerMinutes[0].GUBUN.split(' ')[0], //날짜 3개
                    data: dataCntList,
                    fill: false,
                    linetension: 0.1,
                    backgroundColor: this.myBackColor[idx],
                    borderColor: this.myBorderColor[idx],
                    bordercapstyle: 'butt',
                    borderjoinstyle: 'miter',
                    pointbordercolor: this.myBorderColor[idx],
                    borderWidth: 1
                });
            });

            var myOptions = ({
                responsive: false,
                maintainAspectRatio: false,
                hover: {
                    animationDuration: 0
                },
                animation: {
                    duration: 1,
                    onComplete: function() {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;

                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        var myBorderColor = ['rgba(91, 204, 0, 1)', 'rgba(6, 134, 255, 1)', 'rgba(255, 56, 49, 1)'];
                        this.data.datasets.forEach(function(dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            ctx.fillStyle = myBorderColor[i]; // 라인에 텍스트 컬러..
                            meta.data.forEach(function(bar, index) {
                                var commadata = String(dataset.data[index]).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                ctx.fillText(commadata, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                },
                tooltips: {
                    enabled: true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function(value) {
                                return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            }
                        }
                    }]
                },
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: false,
                    text: '',
                    position: 'top',
                    fontSize: 12,
                    fontStyle: 'bold'
                },
                spanGaps: true
            });
            var chartdata = {
                labels: lableList,
                datasets: minutesCntDataset
            };

            new Chart(this.$refs.CntChart, {
                type: this.type,
                data: chartdata,
                options: myOptions
            });

        }
    }
}
</script>