import * as d3 from 'd3'

export const drawAxises = (container, margin, domain, range) => {
	const size = {
		width: container.offsetWidth,
		height: container.offsetHeight
	}
	const svg = d3.select(container).append('svg')
		.classed('axises', true)
		.attr('width', size.width)
		.attr('height', size.height)

	const yScale = d3.scaleLinear().domain(domain.y).range(range.y)
	const xScale = d3.scaleLinear().domain(domain.x).range(range.x)

	const xTicks = 10
	const xAxisTicks = new Array(xTicks).fill(null).map((_, i) => i / xTicks * domain.x[1])

	const y_axis = d3.axisLeft().scale(yScale)
	const x_axis = d3.axisBottom().scale(xScale).tickValues(xAxisTicks)

	svg.append('g').call(y_axis).classed('y-axis', 1).attr('transform', `translate(${margin.left}, ${margin.top})`)
	svg.append('g').call(x_axis).classed('x-axis', 1).attr('transform', `translate(${margin.left}, ${size.height - margin.bottom})`)

	svg.selectAll('path.domain').attr('stroke', '#D1D9DE')
	svg.selectAll('line').attr('stroke', '#D1D9DE')
	svg.selectAll('text').style('font-size', '12px')
}

export const rescaleAxis = (container, containerSize, scaleIndex) => {
	const tickQty = 5
	const tickValues = new Array(tickQty + 1).fill(null).reduce((res, _, i) => {
		const step = i / tickQty * Math.pow(10, scaleIndex)
		res.push(step)
		res.push(-step)
		return res
	}, [])
	const scale = d3.scaleLinear()
		.domain([-Math.pow(10, scaleIndex) - Math.pow(10, scaleIndex) / 10, Math.pow(10, scaleIndex) + Math.pow(10, scaleIndex) / 10])
		.range([containerSize.height, 0])
	const y_axis = d3.axisLeft()
		.scale(scale)
		.tickValues(tickValues)
		.tickSize(-(containerSize.width))

	container.transition().duration(300).call(y_axis)
}