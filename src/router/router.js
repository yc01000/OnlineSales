import { createRouter, createWebHashHistory } from "vue-router"
import ChartView from '../components/ChartView'

export default createRouter({
	
	history: createWebHashHistory(),

	routes : [
		{
			path : '/components/:jsondata',
			name: 'ChartView',
			component : ChartView,
			props: true
		}
	],
})




