// console.log("main2js")
// SVG drawing area

var margin_2 = {top: 40, right: 10, bottom: 60, left: 50};

var width_2 = 1000 - margin_2.left - margin_2.right,
    height_2 = 375 - margin_2.top - margin_2.bottom;


var svg_2 = d3.select("#chart-area-2").append("svg")
    .attr("width", width_2 + margin_2.left + margin_2.right)
    .attr("height", height_2 + margin_2.top + margin_2.bottom)
    .append("g")
    .attr("transform", "translate(" + (margin_2.left) + "," + margin_2.top + ")");

// Initialize data

d3.csv("data/data2.csv", function(error, csv) {


    csv.forEach(function (d) {
        d.y2017 = +d.y2017;
        d.y2016 = +d.y2016;
        d.y2015 = +d.y2015;
        d.y2014 = +d.y2014;
        d.y2013 = +d.y2013;
        d.y2012 = +d.y2012;
        d.y2010 = +d.y2010;
        d.y2000 = +d.y2000;
        d.y1990 = +d.y1990;
        d.y1980 = +d.y1980;
        d.y1976 = +d.y1976;
        // d.White = +d.White;
        // d.Black = +d.Black;
        // d.Hispanic = +d.Hispanic;
        // d.Asian = +d.Asian;
        // d.Native = +d.Native;
        // d.Two = +d.Two;
        // d.Alien = +d.Alien;
    });
    // Store csv data in global variable
    data = csv;

    // console.log(data);

    // updateVisualization gets automatically called within the data = csv call;
    // basically(whenever the data is set to a value using = operator);
    // see the definition above: Object.defineProperty(window, 'data', { ...

// Render visualization

    var maxCol = d3.max(csv, function (d) {
        // console.log(d.y2017);
        return d.y2017;
    });

    // console.log(maxCol);

// console.log(maxCol);

    var x = d3.scaleBand()
        .range([0, width_2/3])
        .padding(0.01);
    var y = d3.scaleLinear()
        .range([height_2, 0]);

    x.domain(data.map(function (d) {
        return d.Race;
    }));
    y.domain([0, 13000]);


    svg_2.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.Race)+ 15;
        })
        .attr("width", x.bandwidth() / 2)
        .attr("y", function (d) {
            return y(d.y2017);
        })
        .attr("height", function (d) {
            return height_2 - y(d.y2017);
        });
    // .attr("transform", "translate(" + (30) + "," + (-30) + ")");

    svg_2.append("g")
        .attr("transform", "translate(0," + height_2 + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-30)");

    // add the y Axis
    svg_2.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("x", (750))
        .attr("y", 0-(28))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Present Day");

});