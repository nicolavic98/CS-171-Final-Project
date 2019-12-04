// --> CREATE SVG DRAWING AREA
var width_map = 1000,
    height_map = 600;

var choropleth = d3.select("#choropleth").append("svg")
    .attr("width", width)
    .attr("height", height);

//map initializing
var projection = d3.geoMercator()
    .translate([width / 2, height / 2])
    .scale([350])
    .center([-5, 0]);
var path = d3.geoPath()
    .projection(projection);

// // color scale for map
// var color2 = d3.scaleQuantize()
//     .range(["rgb(255,255,255)", "rgb(255,204,204)", "rgb(255,102,102)", "rgb(255,51,51)", "rgb(255,0,0)", "rgb(204,0,0)", "rgb(153,0,0)", "rgb(77,0,0)"]);
//
// //tooltip help from https://bl.ocks.org/tiffylou/88f58da4599c9b95232f5c89a6321992
// var tooltip = d3.select("body").append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);
//
//
var data1, data2;
// Use the Queue.js library to read two files
queue()
    .defer(d3.json, "data/usa.topo.json")
    .defer(d3.csv, "data/enrollmentbystate.csv")
    .await(function(error, mapTopJson, enrollmentCsv) {

        enrollmentCsv.forEach(function(d) {
            // d.1970 = +d.1970;
            // d.1980 = +d.1980;
            // d.1990 = +d.1990;
            // d.2000 = +d.2000;
            // d.2010 = +d.2010;
            // d.2012 = +d.2012;
            // d.2014 = +d.2014;
            // d.2015 = +d.2015;
            // d.2016 = +d.2016;
            // d.2017 = +d.2017;
        });


//         var rollup = d3.nest()
//             .key(function(d) {
//                 return d.Code;
//             })
//             .entries(malariaDataCsv);
//
//
        data1 = mapTopJson;
        data2 = enrollmentCsv;
//         newdata2 = rollup;
//         var africa = topojson.feature(data1, data1.objects.collection).features;
//
//
//         for (var i = 0; i < data2.length; i++) {
//             //Grab state name
//             var dataState = newdata2[i].values[0].Code;
//             //Grab data value, and convert from string to float
//             var dataValue = parseFloat(newdata2[i].values[0].UN_population);
//             var dataValue2 = parseFloat(newdata2[i].values[0].At_risk);
//             var dataValue3 = parseFloat(newdata2[i].values[0].At_high_risk);
//             var dataValue4 = parseFloat(newdata2[i].values[0].Suspected_malaria_cases);
//             var dataValue5 = parseFloat(newdata2[i].values[0].Malaria_cases);
//             for (var j = 0; j < africa.length; j++) {
//                 var jsonState = africa[j].properties.adm0_a3;
//                 if (dataState === jsonState) {
//                     africa[j].properties.UN_population = dataValue;
//                     africa[j].properties.At_risk = dataValue2;
//                     africa[j].properties.At_high_risk = dataValue3;
//                     africa[j].properties.Suspected_malaria_cases = dataValue4;
//                     africa[j].properties.Malaria_cases = dataValue5;
//                     break;
//                 }
//             }
//         }
//
//         updateChoropleth(error, mapTopJson, malariaDataCsv);
//     });
//
//
// function updateChoropleth() { //this serves as the "enter" part; update to follow
//
//     //conversion to geojson
//     var africa = topojson.feature(data1, data1.objects.collection).features;
//
//     color2.domain([
//         0,
//         d3.max(data2, function(d) {
//             return d.UN_population;
//         })
//     ]);
//
//
//     choropleth.selectAll("path")
//         .data(africa)
//         .enter()
//         .append("path")
//         .attr("class", "maps")
//         .attr("d", path)
//         .on("mouseover", function(d) {
//             tooltip.transition()
//                 .duration(200)
//                 .style("opacity", .9);
//             tooltip.html(d.properties.name + "<br>" + "Population: " + d.properties.UN_population + "<br>" + "At Risk: " + d.properties.At_risk + "%" + "<br>" + "At High Risk: " + d.properties.At_high_risk + "%" + "<br>" + "Suspected Malaria Cases: " + d.properties.Suspected_malaria_cases + "<br>" + "Diagnosed Malaria Cases: " + d.properties.Malaria_cases + "<br>")
//
//
//                 .style("left", (d3.event.pageX) + "px")
//                 .style("top", (d3.event.pageY - 5) + "px");
//         })
//         .on("mouseout", function(d) {
//             tooltip.transition()
//                 .duration(500)
//                 .style("opacity", 0);
//         })
//         .attr("stroke", "#4d0000")
//         .attr("stroke-width", .25)
//         .transition()
//         .duration(500)
//         .style("fill", function(d) {
//             if (!(d.properties.UN_population)) {
//                 return "#999393"
//             } else {
//                 return color2(d.properties.UN_population);
//             }
//         });
//
//     // legend, following example from https://www.d3-graph-gallery.com/graph/custom_legend.html
//     choropleth.append("text")
//         .attr("x", 180)
//         .attr("y", 100)
//         .text("Population")
//         .attr("class", "legend-title")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("circle")
//         .attr("cx", 180)
//         .attr("cy", 130)
//         .attr("r", 6)
//         .style("fill", "rgb(255,255,255");
//     choropleth.append("circle")
//         .attr("cx", 180)
//         .attr("cy", 160)
//         .attr("r", 6)
//         .style("fill", "rgb(255,204,204)");
//     choropleth.append("circle")
//         .attr("cx", 180)
//         .attr("cy", 190)
//         .attr("r", 6)
//         .style("fill", "rgb(255,102,102)");
//     choropleth.append("circle")
//         .attr("cx", 180)
//         .attr("cy", 220)
//         .attr("r", 6)
//         .style("fill", "rgb(255,51,51)");
//     choropleth.append("circle")
//         .attr("cx", 180)
//         .attr("cy", 250)
//         .attr("r", 6)
//         .style("fill", "rgb(255,0,0)");
//     choropleth.append("circle")
//         .attr("cx", 180)
//         .attr("cy", 280)
//         .attr("r", 6)
//         .style("fill", "rgb(204,0,0)");
//     choropleth.append("circle")
//         .attr("cx", 180)
//         .attr("cy", 310)
//         .attr("r", 6)
//         .style("fill", "rgb(153,0,0)");
//     choropleth.append("circle")
//         .attr("cx", 180)
//         .attr("cy", 340)
//         .attr("r", 6)
//         .style("fill", "rgb(77,0,0)");
//     choropleth.append("circle")
//         .attr("cx", 180)
//         .attr("cy", 370)
//         .attr("r", 6)
//         .style("fill", "#999393");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 130)
//         .text(0)
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 160)
//         .text(Math.floor((1 / 8) * (d3.max(data2, function(d) {
//             return d.UN_population;
//         }))))
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 190)
//         .text(Math.floor((2 / 8) * (d3.max(data2, function(d) {
//             return d.UN_population;
//         }))))
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 220)
//         .text(Math.floor((3 / 8) * (d3.max(data2, function(d) {
//             return d.UN_population;
//         }))))
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 250)
//         .text(Math.floor((4 / 8) * (d3.max(data2, function(d) {
//             return d.UN_population;
//         }))))
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 280)
//         .text(Math.floor((5 / 8) * (d3.max(data2, function(d) {
//             return d.UN_population;
//         }))))
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 310)
//         .text(Math.floor((6 / 8) * (d3.max(data2, function(d) {
//             return d.UN_population;
//         }))))
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 340)
//         .text(Math.floor((6 / 8) * (d3.max(data2, function(d) {
//             return d.UN_population;
//         }))) + " and up")
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 370)
//         .text("No data available")
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//
//     // choropleth.append("text")
//     //     .attr("x", 800)
//     //     .attr("y", 200)
//     //     .attr("class", "infoForMap")
//     //     .attr("alignment-baseline", "middle")
//     //     .text("Malaria cases <br> The number of malaria cases globally fell from an estimated 262 million in 2000 (range: 205– 316 million), to 214 million in 2015 (range: 149–303 million), a decline of 18%. Most cases in 2015 are estimated to have occurred in the WHO African Region (88%), followed by the WHO South-East Asia Region (10%) and the WHO Eastern Mediterranean Region (2%). Malaria deaths. The number of malaria deaths globally fell from an estimated 839 000 in 2000 (range: 653 000–1.1 million), to 438 000 in 2015 (range: 236 000–635 000), a decline of 48%. Most deaths in 2015 were in the WHO African Region (90%), followed by the WHO South-East Asia Region (7%) and the WHO Eastern Mediterranean Region (2%). The malaria mortality rate, which takes into account population growth, is estimated to have decreased by 60% globally between 2000 and 2015.");
// }
// var selection;
//
// // here comes the update
// d3.select("#selected").on("change", function(d) {
//     var africa = topojson.feature(data1, data1.objects.collection).features;
//     selection = d3.select(this).property("value");
//     // var selection = d3.select("#selected").property("value");
//     color2.domain([
//         0,
//         d3.max(africa, function(d) {
//             return d.properties[selection];
//         })
//     ]);
//     choropleth.selectAll(".maps")
//         .data(africa)
//         // .transition()
//         // .duration(500)
//         .style("fill", function(d) {
//             if (!(d.properties[selection])) {
//                 return "#999393"
//             } else {
//                 return color2(d.properties[selection]);
//             }
//         });
//     choropleth.selectAll(".legend-label").remove();
//     choropleth.selectAll(".legend-title").remove();
//
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 130)
//         .text(0)
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 160)
//         .text(Math.floor((1 / 8) * (d3.max(africa, function(d) {
//             return d.properties[selection];
//         }))))
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 190)
//         .text(Math.floor((2 / 8) * (d3.max(africa, function(d) {
//             return d.properties[selection];
//         }))))
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 220)
//         .text(Math.floor((3 / 8) * (d3.max(africa, function(d) {
//             return d.properties[selection];
//         }))))
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 250)
//         .text(Math.floor((4 / 8) * (d3.max(africa, function(d) {
//             return d.properties[selection];
//         }))))
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 280)
//         .text(Math.floor((5 / 8) * (d3.max(africa, function(d) {
//             return d.properties[selection];
//         }))))
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 310)
//         .text(Math.floor((6 / 8) * (d3.max(africa, function(d) {
//             return d.properties[selection];
//         }))))
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 340)
//         .text(Math.floor((6 / 8) * (d3.max(africa, function(d) {
//             return d.properties[selection];
//         }))) + " and up")
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 200)
//         .attr("y", 370)
//         .text("No data available")
//         .attr("class", "legend-label")
//         .attr("alignment-baseline", "middle");
//     choropleth.append("text")
//         .attr("x", 180)
//         .attr("y", 100)
//         .text(function(d) {
//             if (selection === "At_high_risk") {
//                 return "Percentage at High Risk"
//             } else if (selection === "UN_population") {
//                 return "Population"
//             } else if (selection === "At__risk") {
//                 return "Percentage at Risk"
//             }
//             if (selection === "Suspected_malaria_cases") {
//                 return "Number of Suspected Malaria Cases"
//             } else {
//                 return "Number of Diagnosed Malaria Cases"
//             }
//         })
//         .attr("class", "legend-title")
//         .attr("alignment-baseline", "middle");
});
