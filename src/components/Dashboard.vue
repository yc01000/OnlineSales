<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">

        <div class="row">
          <div class="col-lg-4">
            <div class="card z-index-1">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Summary Table</h6>
                </div>
              </div>
              <div class="card-body bg-light">
                <SumChart v-bind:sumdata="this.jsondata"/>
              </div>
            </div>
          </div>
          <div class="col-lg-8 mb-lg">
            <!-- line chart -->
            <div class="row">
              <div class="card z-index-2">
                <AmountChart v-bind:amtdata="this.per_jsondata" />
              </div>
            </div>
            <div class="row mt-4">
              <div class="card z-index-2">
                <CountChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SumChart from '@/components/SumChart.vue'
import AmountChart from '@/components/AmountChart.vue'
import CountChart from '@/components/CountChart.vue'

export default {
  name: "DashBoard",
  props: {
    jsondata: Object,
    per_jsondata: Object
  },
  data() {
    return {

    };
  },
  components: {
    SumChart,
    AmountChart,
    CountChart
  },
};
</script>
