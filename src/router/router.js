import { createRouter, createWebHashHistory } from "vue-router"
// import ChartView from '../components/ChartView'
import DashBoard from "@/components/Dashboard.vue";

export default createRouter({
	
	history: createWebHashHistory(),

	routes : [
		// {
		// 	path : '/components/:jsondata',
		// 	name: 'ChartView',
		// 	component : ChartView,
		// 	props: true
		// },
		{
			path : '/components/:jsondata:per_jsondata',
			name: 'DashBoard',
			component : DashBoard,
			props: true
		}
	],
})




