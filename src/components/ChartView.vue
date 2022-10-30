<template>
  <!-- <h2>{{ jsondata }}</h2> -->
  <!-- 차트 html -->
  <div id="dvTrendView" class="dashboard_wrap">
    <table>
      <tr>
        <td rowspan="2" width="900px">
          <div class="area">
            <input type="submit" value="Excel1" class="btn" />
            <SumChart v-bind:sumdata="this.jsondata"></SumChart>
          </div>
        </td>
        <!-- <td rowspan="2" width="1px"></td> -->
        <td>
          <div class="area">
            <table>
              <tr>
                <td>
                  <input type="submit" value="Excel2" class="btn" />
                </td>
                <td>
                  <label style="font-size: 10px;">&nbsp;&nbsp;Value Visible </label>
                  <input type="checkbox" name="dataSeries1" id="dataSeries1" checked="checked">
                </td>
                <td>
                  <label style="font-size: 10px;">&nbsp;&nbsp;Bar Type </label>
                  <input type="checkbox" name="chartType" id="chartType">
                </td>
              </tr>
            </table>
            <AmountChart width="950" height="350"></AmountChart>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="area">
            <CountChart width="950" height="350"></CountChart>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
//import Chart from 'chart.js'
//import $ from "jquery"
import SumChart from '@/components/SumChart'
import AmountChart from '@/components/AmountChart'
import CountChart from '@/components/CountChart'

/* vue script  */
export default {
  name: "ChartView",
  props: {
    jsondata: Object
  },
  components: {
    SumChart,
    AmountChart,
    CountChart
  },
  created() {
    //console.log('create():' + this.$route.params.jsondata);
  },
  mounted() {

  }
};


</script>
