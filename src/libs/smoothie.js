import { SmoothieChart, TimeSeries } from 'smoothie'

export const createChart = (context, chartOptions = null, lineOptions = null) => {
	const chart = new SmoothieChart(chartOptions)
	const timeSeries = new TimeSeries()
	chart.streamTo(context, 500)
	chart.addTimeSeries(timeSeries, lineOptions)

	return {
		chart,
		timeSeries
	}
}