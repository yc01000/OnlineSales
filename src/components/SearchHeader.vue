<template>
  <!-- <div class="hello">
    <div>
      <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
        <b-dropdown-item>First Action</b-dropdown-item>
        <b-dropdown-item>Second Action</b-dropdown-item>
        <b-dropdown-item>Third Action</b-dropdown-item>
      </b-dropdown>
    </div>
    <b-button @click='clickParams' variant="outline-primary">{{ msg }}</b-button>
  </div> -->
  <div>
        <b-navbar toggleable="lg" type="light" variant="secondary">
            <b-navbar-brand href="#" ><img src="@/assets/top_logo.gif" width="150" height="30" class="d-inline-block align-top" alt="Kitten">
              진마켓 판매실적
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <div class="row">
                      <div class="col">
                        <input type="text" class="form-control" placeholder="First name" aria-label="First name">
                      </div>
                      <div class="col">
                        <input type="text" class="form-control" placeholder="Last name" aria-label="Last name">
                      </div>
                    </div>
                    <b-nav-item-dropdown right>
                      <!-- Using 'button-content' slot -->
                      <template #button-content>
                          <em>User</em>
                      </template>
                      <b-dropdown-item href="#">Profile</b-dropdown-item>
                      <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button> -->
                    <b-button @click='clickParams' variant="danger" size="sm" class="my-2 my-sm-0">{{ msg }}</b-button>
                    </b-nav-form>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
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
    }
  },

  methods: {
    clickParams: async function () {
      var resdata;
      var per_resdata;
      await axios.get('server/get_chart_data2.jsp').then((response) => {
        resdata = response.data.split('%>')[1].substring(2);
      });

      await axios.get('server/get_chart_data.jsp').then((response) => {
        per_resdata = response.data.split('%>')[1].substring(2);
      });
      console.log('resdata: ' + resdata);
      console.log('per_resdata: ' + per_resdata);
      this.$router.push({
        // name: "ChartView",
        name: "DashBoard",
        params: {
          jsondata: resdata,
          per_jsondata: per_resdata
        },
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
