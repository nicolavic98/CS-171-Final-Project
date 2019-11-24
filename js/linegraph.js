// SVG Area


//refactored my code from midterm vis 2
var margin = {
    top: 30,
    right: 400,
    bottom: 100,
    left: 350
  },
  width = 1300 - margin.left - margin.right,
  height = 650 - margin.top - margin.bottom;

var myVis = d3.select("#line-graph").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//taken from previous hw (#5)
var formatDate = d3.timeFormat("%Y");
var parseDate = d3.timeParse("%Y");

// scales
var color = d3.scaleOrdinal(d3.schemeCategory10);
var x = d3.scaleTime()
  .range([0, width]);
var y = d3.scaleLinear()
  .range([height, 0]);


queue()
  .defer(d3.json, "data/africa.topo.json")
  .defer(d3.csv, "data/global-funding.csv")
  .await(dataHandler);

//initialize

function dataHandler(error, africaMapJson, fundingCsv) {
  //nest data by year - used hw 6 and some stack overflow for help
  // console.log(fundingCsv);
  var dataNest = d3.nest()
    .key(function(d) {
      return d.Source;
    })
    .entries(fundingCsv);
  dataNest.forEach(function(d) {
    d.values.forEach(function(e) {
      var storage = [];
      for (var key in e) {
        if (e[key] !== d.key) {
          // key = parseDate(key); e[key] = parseFloat(e[key]); this broke because converted before pushing
          storage.push({
            "year": parseDate(key),
            "value": parseFloat(e[key])
          });
        }
      }
      d.values = storage;
    });
  });
  console.log(dataNest);

  // data processing help came from this website god bless https://bl.ocks.org/jqadrad/a58719d82741b1642a2061c071ae2375
  x.domain([
    d3.min(dataNest, function(d) {
      return d3.min(d.values, function(e) {
        return e.year;
      });
    }),
    d3.max(dataNest, function(d) {
      return d3.max(d.values, function(e) {
        return e.year;
      });
    })
  ]);
  y.domain([
    0,
    d3.max(dataNest, function(d) {
      return d3.max(d.values, function(e) {
        return e.value;
      });
    })
  ]);

  // axes
  var xAxis = d3.axisBottom()
    .scale(x);
  var yAxis = d3.axisLeft()
    .scale(y);
  myVis.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  // Set the Y axis
  myVis.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  // line function
  var line = d3.line()
    .x(function(d) {
      // console.log(d.year);
      return x(d.year);
    })
    .y(function(d) {
      // console.log(d.value);
      return y(d.value);
    });

  // Draw the lines
  var drawnLine = myVis.selectAll(".line")
    .data(dataNest)
    .enter()
    .append("g")
    .attr("class", "lines");
  drawnLine.append("path")
    .attr("class", "line")
    .attr("d", d => line(d.values))
    .style("stroke", function(d) {
      return color(d.key)
    });

  // line label
  drawnLine.append("text")
    .attr("class", "label")
    .attr("x", function(d) {
      if (d.key === "All Other Sources") {
        return width + 80;
      } else {
        return width + 5;
      }
    })
    .attr("y", function(d) {
      return y(d.values[8].value);
    })
    .attr("dy", ".35em")
    .style("stroke", function(d) {
      return color(d.key)
    })
    .text(function(d) {
      return d.key;
    });


  myVis.append("text")
    .attr("class", "axislabel")
    .attr("x", (width / 2 + 10))
    .attr("y", height + 50)
    .attr("dy", ".1em")
    .style("text-anchor", "end")
    .text("Year");
  myVis.append("text")
    .attr("class", "axislabel")
    .attr("x", -180)
    .attr("y", -70)
    .attr("dy", ".1em")
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "end")
    .text("Funding in millions USD");

}
