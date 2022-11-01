<template>
    <div>
        <canvas ref="barChart" style="display: block; height: 450px; width: 350px;"/>
    </div>
</template>
  
<script>
const Chart = require('chart.js');
export default {
    props: {
        sumdata: Object
    },
    data: function() {
        return {
        }
    },
    mounted() {
        this.$nextTick(()=>{
            this.createChart()
        });
        //this.createChart()
    },
    methods: {
        createChart : function() {
            //console.log("sumData > ", this.sumdata);
            var myDataset = [];
            var myBackColor = ['rgba(91, 204, 0, 0.2)', 'rgba(6, 134, 255, 0.2)', 'rgba(255, 56, 49, 0.5)'];
            var myBorderColor = ['rgba(91, 204, 0, 1)', 'rgba(6, 134, 255, 1)', 'rgba(255, 56, 49, 1)'];
            var idx = 0;
            JSON.parse(this.sumdata).forEach(element => {
                element.AMOUNT = (element.AMOUNT == null) ? "0" : Math.round(parseFloat(element.AMOUNT) / 1000000);
                myDataset.push({
                    label: element.GUBUN,
                    data: [element.AMOUNT, element.APPROVAL_CNT],
                    //data: [this.setComma(element.AMOUNT), this.setComma(element.APPROVAL_CNT)],
                    backgroundColor: myBackColor[idx],
                    borderColor: myBorderColor[idx],
                    borderWidth: 1
                }); 
                idx++;
            });
            console.log("myDataset > ", myDataset);
            var chartdata = {
                labels: ["판매금액(백만원)", "승인 건수"],
                datasets: myDataset
            };
            var myOptions = ({
                responsive: false,
                maintainAspectRatio: false,
                animation: {
                    duration: 1,
                    onComplete: function() {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;

                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function(dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function(bar, index) {
                                var commadata = String(dataset.data[index]).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                ctx.fillText(commadata, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                },
                legend: {
                    "display": true,
                    position: 'bottom'
                },
                tooltips: {
                    "enabled": false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function (value) {
                                return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            }
                        }

                    }]
                },
                title: {
                    display: true,
                    text: '',
                    position: 'top',
                    fontSize: 15,
                    fontStyle: 'bold'
                },
                spanGaps: true
            });

            new Chart(this.$refs.barChart, {
                type: 'bar',
                data: chartdata,
                options: myOptions
            })

        }
    }
}
</script>