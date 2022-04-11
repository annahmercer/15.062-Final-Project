

/*
 * BarChart - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the bar charts
 * @param _data						-- the dataset 'household characteristics'
 * @param _config					-- variable from the dataset (e.g. 'electricity') and title for each bar chart
 */


class BarChart {

	constructor(parentElement, data, selection, title) {
		this.parentElement = parentElement;
		this.data = data;
		this.selection = selection;
		this.displayData = data;
		this.title = title;
		//console.log(this.displayData);

		this.initVis();
	}




	/*
	 * Initialize visualization (static content; e.g. SVG area, axes)
	 */

	initVis() {
		let vis = this;


		// * TO-DO *

		vis.margin = {top:40, right: 50, bottom:150, left: 100};

		vis.width = 350
		vis.height = 300
		//vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
		//vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

		//SVG
		vis.svg = d3.select("#" + vis.parentElement).append("svg")
			.attr("width", vis.width + vis.margin.left + vis.margin.right)
			.attr("height", vis.height + vis.margin.top + vis.margin.bottom)
			.append("g")
			.attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

		//scales and axes
		vis.xScale = d3.scaleBand()
			.rangeRound([0, vis.width])
			.paddingInner(0.1)

		vis.yScale = d3.scaleLinear()
			.range([vis.height, 0])

		vis.xAxis = d3.axisBottom()
			.scale(vis.xScale)

		vis.yAxis = d3.axisLeft()
			.scale(vis.yScale)
			.tickSizeOuter(0); //removes extra ticks on ends

		vis.svg.append("g")
			.attr("class", "x-axis axis")
			.attr("transform", "translate(0," + vis.height + ")");

		vis.svg.append("g")
			.attr("class", "y-axis axis");

		vis.wrangleData();
	}




	/*
	 * Data wrangling
	 */

	wrangleData() {
		let vis = this;

		// * TO-DO *
		let dataByTitle =d3.rollup(vis.displayData, leaves=>leaves.length, d=>d[vis.selection])
		vis.displayData = Array.from(dataByTitle, ([key,value]) => ({key, value}))
		vis.displayData = vis.displayData.filter(x => x.key != '') // Remove the nulls
		vis.displayData.sort((a,b) =>b.value - a.value)
		vis.filteredData = vis.displayData.slice(0,10)

		//console.log(vis.filteredData)
		// Update the visualization
		vis.updateVis();
	}



	/*
	 * The drawing function - should use the D3 update sequence (enter, update, exit)
	 */

	updateVis() {
		let vis = this;

		// (1) Update domains
		// (2) Draw rectangles
		// (3) Draw labels


		// * TO-DO *
		//update domains
		let categories = vis.filteredData.map(d=>d.key)
		vis.xScale.domain(categories)
		vis.yScale.domain([0, d3.max(vis.filteredData, d=>d.value)])

		//add the title
		vis.svg.append('text')
			.attr('class', 'title')
			.attr('x', 100)
			//.attr('x', -vis.margin.left)
			.attr('y', -15)
			.text(vis.title)
			.attr('fill', 'black')

		//draw the bars
		var bar = vis.svg.selectAll('.bar')
			.data(vis.filteredData)


		bar.enter()
			.append('rect')
			.attr('class', 'bar')

			.merge(bar)
			.attr("x", d=>vis.xScale(d.key))
			.attr("y", d=>vis.yScale(d.value))
			.attr("width", vis.xScale.bandwidth())
			.attr("height", d=>vis.height - vis.yScale(d.value))
			.attr('fill', 'cadetblue')



		bar.exit().remove()
		//add bar labs
		/*var barlabels = vis.svg.selectAll('text.bar-labels')
			.data(vis.displayData)

		barlabels.enter()
			.append('text')
			.attr('class', 'bar-labels')
			.merge(barlabels)
			.attr('x', d=>vis.xScale(d.value) + 7)
			.attr('y', d=>vis.yScale(d.key)+15)
			.text((d) => d.value)
			.attr('fill', 'black')

		barlabels.exit().remove()*/
		// Update the axes
		vis.svg.select(".x-axis")
			.transition()
			.call(vis.xAxis)
			.selectAll("text")
			.attr("transform", "translate(-10,55) rotate(-75)");
		vis.svg.select(".y-axis")
			.transition()
			.call(vis.yAxis);
	}}
