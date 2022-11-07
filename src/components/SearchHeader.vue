<template>
  <div>
<!--     
    <b-navbar type="light" variant="secondary">
      <b-navbar-brand href="/"><img src="@/assets/top_logo.gif" width="150" height="30" class="d-inline-block align-top"
          alt="Kitten">
        진마켓 판매실적
      </b-navbar-brand>
      <div class="picker1">
        <Datepicker v-model="date" multiDates :format="format" />
      </div>
      ~
      <div class="picker2">
        <Datepicker v-model="time" timePicker modeHeight="120" />
      </div>

      <b-nav-form>
        <b-button @click='clickParams' variant="danger" size="sm" class="my-2 my-sm-0">{{ msg }}</b-button>
      </b-nav-form>
    </b-navbar>
-->


    <b-container fluid="md" class="bv-example-row" variant="secondary">
      <b-row align-h="start" cols="6">
        <b-col>
          <img src="@/assets/top_logo.gif" width="150" height="30" class="d-inline-block align-top" alt="Kitten">
        </b-col>
        <b-col align-h="start">
          진마켓 판매실적
        </b-col>
        <b-col>
            <Datepicker class="picker1" v-model="date" multiDates :format="format" />
        </b-col>
        <b-col></b-col>
        <b-col>
          <Datepicker class="picker2" v-model="time" timePicker modeHeight="120" />
        </b-col>
        <b-col>
          <b-button @click='clickParams' variant="danger" size="sm" class="my-2 my-sm-0">{{ msg }}</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';

export default {
  props: {
    msg: String
  },
  components: { Datepicker },
  data: () => ({

  }),
  setup() {
    const date = ref();
    const time = ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    });
    const format = (date) => {
      var dataset = [];
      var strTime = '';
      date.forEach(el => {
        dataset.push(el.getFullYear() + '.'
          + (el.getMonth() + 1).toString().padStart(2, '0') + '.'
          + el.getDate().toString().padStart(2, '0'));
        strTime = el.getHours().toString().padStart(2, '0') + ':'
          + el.getMinutes().toString().padStart(2, '0');
      });
      return `${JSON.stringify(dataset)} ${strTime}`;
    };
    return {
      date,
      time,
      format,
    }

  },
  methods: {
    clickParams: async function () {
      var fromDate1, fromDate2, fromDate3, fromTime = '';
      var toDate1, toDate2, toDate3, toTime;
      fromDate1 = toDate1 = this.date[0].getFullYear()
        + (this.date[0].getMonth() + 1).toString().padStart(2, '0')
        + this.date[0].getDate().toString().padStart(2, '0');
      fromDate2 = toDate2 = this.date[1].getFullYear()
        + (this.date[1].getMonth() + 1).toString().padStart(2, '0')
        + this.date[1].getDate().toString().padStart(2, '0');
      fromDate3 = toDate3 = this.date[2].getFullYear()
        + (this.date[2].getMonth() + 1).toString().padStart(2, '0')
        + this.date[2].getDate().toString().padStart(2, '0');
      fromTime = this.date[0].getHours().toString().padStart(2, '0')
        + this.date[0].getMinutes().toString().padStart(2, '0');
      toTime = this.time.hours.toString().padStart(2, '0')
        + this.time.minutes.toString().padStart(2, '0');
      console.log("date>", `${fromDate1}, ${fromDate2}, ${fromDate3}, ${fromTime}, ${toTime}`);

      var resdata;
      var per_resdata;
      await axios.get('server/get_chart_data2.jsp').then((response) => {
        resdata = response.data.split('%>')[1].substring(2);
      });

      await axios.get('server/get_chart_data.jsp').then((response) => {
        per_resdata = response.data.split('%>')[1].substring(2);
      });
      // console.log('resdata: ' + resdata);
      // console.log('per_resdata: ' + per_resdata);
      this.$router.push({
        // name: "ChartView",
        name: "DashBoard",
        params: {
          jsondata: resdata,
          per_jsondata: per_resdata
        },
      });

    }
  },
  mounted() {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

<style>
/* .dp__input_wrap {
    width: 380px;
    height: 38px;
} */
.picker1 {
  width: 400px;
  height: 38px;
  margin-right: 20px;
}

.picker2 {
  width: 120px;
  height: 38px;
}
</style>