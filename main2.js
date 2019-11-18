
// SVG drawing area

var margin = {top: 40, right: 10, bottom: 60, left: 100};

var width = 2000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (margin.left) + "," + margin.top + ")");

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

    console.log(data);

    // updateVisualization gets automatically called within the data = csv call;
    // basically(whenever the data is set to a value using = operator);
    // see the definition above: Object.defineProperty(window, 'data', { ...

// Render visualization

    var maxCol = d3.max(csv, function (d) {
        console.log(d.y2017);
        return d.y2017;
    });

    console.log(maxCol);

// console.log(maxCol);

    var x = d3.scaleBand()
        .range([0, width/3])
        .padding(0.01);
    var y = d3.scaleLinear()
        .range([height, 0]);

    x.domain(data.map(function (d) {
        return d.Race;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.y2017;
    })]);


    // var newdata = data[data.length-1];
    // newdata.forEach(function(d){
    //     console.log(d);
    // });

// console.log(csv[2].Malaria_cases);

    // var myData = data[data.length-1];
    console.log(data);

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.Race)+ 25;
        })
        .attr("width", x.bandwidth() / 2)
        .attr("y", function (d) {
            return y(d.y2017);
        })
        .attr("height", function (d) {
            return height - y(d.y2017);
        });
    // .attr("transform", "translate(" + (30) + "," + (-30) + ")");

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    d3.select('#select-key').on('change', function(a) {
        var newkey = d3.select(this).property('value');
        console.log(newkey);
        updateVis(newkey);
    });

function updateVis(myKey){
    console.log(data[myKey]);
    console.log("changling");
    // svg.selectAll(".bar").remove();
    y.domain([0, d3.max(data, function (d) {
        console.log(d[myKey]);
        return d[myKey];
    })]);
    console.log(d3.max(data, function (d) {
        return d[myKey];
    }));

    svg.selectAll(".bar")
        .data(data)
        .transition()
        .duration(800)
        .attr("y", function (d) {
            return y(d[myKey]);
        })
        .attr("height", function (d) {
            return height - y(d[myKey]);
        });

    svg.selectAll(".y-axis")
        .transition()
        .duration(800)
        .call(d3.axisLeft(y));
}

});