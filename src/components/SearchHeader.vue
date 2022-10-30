<template>
  <div class="hello">
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
        aria-expanded="false">
        Check Bootstrap
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>
    <div>
      <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
        <b-dropdown-item>First Action</b-dropdown-item>
        <b-dropdown-item>Second Action</b-dropdown-item>
        <b-dropdown-item>Third Action</b-dropdown-item>
      </b-dropdown>
    </div>
      
    <b-button @click='clickParams' variant="outline-primary">{{ msg }}</b-button>



    <!-- <button type="button" @click='clickParams'>{{ msg }}</button> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    msg: String
  },

  data: function () {
    return {
      server_data: Object
    }
  },

  methods: {
    clickParams: function () {
      axios.get('server/get_chart_data2.jsp').then((response) => {
        var resdata = response.data.split('%>')[1].substring(2);
        console.log('resdata: ' + resdata);
        this.server_data = JSON.parse(resdata);
        console.log('server_data: ' + this.server_data);
        this.$router.push({
          name: "ChartView",
          params: { jsondata: resdata },
        });
      });
    }
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
