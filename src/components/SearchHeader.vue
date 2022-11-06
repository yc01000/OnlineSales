<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="secondary">
      <b-navbar-brand href="#"><img src="@/assets/top_logo.gif" width="150" height="30" class="d-inline-block align-top"
          alt="Kitten">
        진마켓 판매실적
      </b-navbar-brand>
      <Datepicker v-model="date" multiDates :format="format" />
      <h3>~</h3>
      <Datepicker v-model="time" timePicker modeHeight="120">
        <!-- <template #dp-input="{ value, }">
          <input type="text" :value="value" />
        </template> -->
      </Datepicker>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-nav-form>
        <!-- <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input> -->
        <b-button @click='clickParams' variant="danger" size="sm" class="my-2 my-sm-0">{{ msg }}</b-button>
      </b-nav-form>
    </b-navbar>
  </div>
</template>

<script>
import axios from 'axios'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
// import { stringify } from 'querystring';

export default {
  props: {
    msg: String
  },
  components: { Datepicker },
  data: function () {
    return {

    }
  },
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
        dataset.push(el.getFullYear() + '.' + (el.getMonth() + 1) + '.' + el.getDate());
        strTime =  el.getHours() + ':' + el.getMinutes();
      });
      console.log('stringify', JSON.stringify(dataset));
      return `${JSON.stringify(dataset)} ${strTime}` ;
      // const day = date[1].getDate();
      // const month = date[1].getMonth() + 1;
      // const year = date[1].getFullYear();
      // console.log('1time: ' ,date[0].getHours(), date[0].getMinutes());

      // return `Selected ${year}.${month}.${day}`;
    };
    return {
      date,
      time,
      format,
    }

  },
  methods: {

    clickParams: async function () {
      console.log("this.date ", this.date);
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
      // var lstdate[] = this.date.
      console.log("date>", this.date)
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
.dp__input_wrap {
    width: 380px;
    height: 38px;
}
</style>