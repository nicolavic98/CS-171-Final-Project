//console.log("main2js")
// SVG drawing area

var margin = {top: 40, right: 10, bottom: 90, left: 60};

var width = 485 - margin.left - margin.right,
    height = 510 - margin.top - margin.bottom;

//https://bl.ocks.org/d3noob/5987480
// help getting two graphs in one svg

var svg = d3.select("#barchart-area").append("svg")
     .attr("width", (2*width) + (4*margin.left) + margin.right)
     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + (margin.left) + "," + margin.top + ")");

// svg.on("mouseover",)

var chart1 = svg.append("g")
    .attr("transform", "translate(" + (margin.left) + "," + margin.top + ")");

var chart2 = svg.append("g")
    .attr("transform", "translate(" + ((4*margin.left) + width) +  "," + margin.top + ")");

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

    });
    // Store csv data in global variable
    data = csv;

    //console.log(data);

    // updateVisualization gets automatically called within the data = csv call;
    // basically(whenever the data is set to a value using = operator);
    // see the definition above: Object.defineProperty(window, 'data', { ...

// Render visualization

    var maxCol = d3.max(csv, function (d) {
        //console.log(d.y2017);
        return d.y2017;
    });

    // console.log(maxCol);

// console.log(maxCol);

    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.01);
    var y = d3.scaleLinear()
        .range([height, 0]);

    x.domain(data.map(function (d) {
        return d.Race;
    }));
    y.domain([0, 13000]);


    // var newdata = data[data.length-1];
    // newdata.forEach(function(d){
    //     console.log(d);
    // });

// console.log(csv[2].Malaria_cases);

    // var myData = data[data.length-1];
    //console.log(data);
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .style("font-size","10px")
        .offset([-10, 0])
        .html(function(d) {
            // console.log(d3.select('#select-key'));
            return Math.floor(d.y2017);
        });

    svg.call(tip);

    chart1.selectAll(".bar")
        .data(data)
        .enter().append("svg:image")
        .attr("xlink:href", "img/pencil-clipart-vertical-2.png")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.Race)+ 15;
        })
        .attr("width", x.bandwidth() / 2)
        .attr("y", function (d) {
            return y(d.y2017);
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .attr("height", function (d) {
            return height - y(d.y2017);
        })
        .attr("preserveAspectRatio", "none");
    // .attr("transform", "translate(" + (30) + "," + (-30) + ")");

    chart1.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-30)");

    // add the y Axis
    chart1.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    ///axis labels
    chart1.append("text")
        .attr("x", (160))
        .attr("y", 460)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Ethnicity");
    chart1.append("text")
        .attr("x", -150)
        .attr("y", -45)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("# of Enrolled Students");

    d3.select('#select-key').on('change', function(a) {
        var newkey = d3.select(this).property('value');
        console.log(newkey);
        updateVis(newkey);
    });


function updateVis(myKey){
    // console.log("changling");
    // svg.selectAll(".bar").remove();
   // y.domain([0, d3.max(data, function (d) {
      //  console.log(d[myKey]);
       // return d[myKey];
   // })]);
    console.log(d3.max(data, function (d) {
        return d[myKey];
    }));

    chart1.selectAll(".bar")
        .data(data)
        .transition()
        .duration(800)
        .attr("y", function (d) {
            return y(d[myKey]);
        })
        .attr("height", function (d) {
            console.log("doing this?")
            return height - y(d[myKey]);
        });

    chart1.selectAll(".y-axis")
        .transition()
        .duration(800)
        .call(d3.axisLeft(y));
}

// SECOND CHART
    //SECOND CHART
    //SECOND CHART
    var x2 = d3.scaleBand()
        .range([0, width])
        .padding(0.01);
    var y2 = d3.scaleLinear()
        .range([height, 0]);

    x2.domain(data.map(function (d) {
        return d.Race;
    }));
    y2.domain([0, 13000]);


    chart2.selectAll(".bar")
        .data(data)
        .enter().append("svg:image")
        .attr("xlink:href", "img/pencil-clipart-vertical-2.png")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x2(d.Race)+ 15;
        })
        .attr("width", x2.bandwidth() / 2)
        .attr("y", function (d) {
            return y2(d.y2017);
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .attr("height", function (d) {
            return height - y2(d.y2017);
        })
        .attr("preserveAspectRatio", "none");
    // .attr("transform", "translate(" + (30) + "," + (-30) + ")");

    chart2.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x2))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-30)");

    // add the y Axis
    chart2.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y2));

    chart2.append("text")
        .attr("x", (150))
        .attr("y", 0-(28))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Present Day");


    //axis labels
    chart2.append("text")
        .attr("x", (160))
        .attr("y", 460)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Ethnicity");
    chart2.append("text")
        .attr("x", -150)
        .attr("y", -45)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("# of Enrolled Students");

});