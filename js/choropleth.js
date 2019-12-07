// --> CREATE SVG DRAWING AREA
var width_map = 1000,
    height_map = 700;

var choropleth = d3.select("#choropleth").append("svg")
    .attr("width", width_map)
    .attr("height", height_map);

// //map initializing
// var projection = d3.geoMercator()
//     .translate([width / 2, height / 2]);
//     // .scale([20])
//     // .center([0, 0]);

// var projection = d3.geoIdentity();
//     // .translate([width_map / 2, height_map / 2]);
//     // .fitExtent([[50,50],[600-50,300-50]], featureCollection);
//     // .fitSize([width_map,height_map],usamap);
//
// var path = d3.geoPath()
//     .projection(projection);

// define map projection
// var projection = d3.geoAlbersUsa().scale(1300).translate([487.5, 305]);
    // .translate([width_map/2, height_map/2])
    // .scale([500]);

//Define default path generator
//map initializing
// var projection = d3.geoAlbersUsa()
//     .translate([width / 2, height / 2])
//     .scale([20]);
//     // .center([0, 0]);

// var path = d3.geoPath()
//     .projection(projection);

// // color scale for map
// var color2 = d3.scaleQuantize()
//     .range(["rgb(255,255,255)", "rgb(255,204,204)", "rgb(255,102,102)", "rgb(255,51,51)", "rgb(255,0,0)", "rgb(204,0,0)", "rgb(153,0,0)", "rgb(77,0,0)"]);
//
//tooltip help from https://bl.ocks.org/tiffylou/88f58da4599c9b95232f5c89a6321992
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
//
//
var data1, data2;
// Use the Queue.js library to read two files
queue()
    .defer(d3.json, "data/usa.topo.json")
    .defer(d3.csv, "data/enrollmentbystate.csv")
    .await(function(error, mapTopJson, enrollmentCsv) {

        enrollmentCsv.forEach(function(d) {
            d.yr1970 = +d.yr1970;
            d.yr1980 = +d.yr1980;
            d.yr1990 = +d.yr1990;
            d.yr2000 = +d.yr2000;
            d.yr2010 = +d.yr2010;
            d.yr2012 = +d.yr2012;
            d.yr2014 = +d.yr2014;
            d.yr2015 = +d.yr2015;
            d.yr2016 = +d.yr2016;
            d.yr2017 = +d.yr2017;
        });

        data1 = mapTopJson;
        data2 = enrollmentCsv;
        // console.log(data1);
        // console.log(data2);

        // Convert the TopoJson to GeoJSON (target object = 'states')
        var usamap = topojson.feature(data1, data1.objects.states).features;
        // console.log(data1);
        // console.log(usamap);

        var projection = d3.geoIdentity();
        // .translate([width_map / 2, height_map / 2]);
        // .fitExtent([[50,50],[600-50,300-50]], featureCollection);
        // .fitSize([width_map,height_map],usamap);

        var path = d3.geoPath()
            .projection(projection);

        for (var i = 0; i < data2.length; i++) {
            //Grab state name
            var dataState = data2[i].State;
            //Grab data value, and convert from string to float
            var dataValue = parseFloat(data2[i].yr1970);
            var dataValue2 = parseFloat(data2[i].yr1980);
            var dataValue3 = parseFloat(data2[i].yr1990);
            var dataValue4 = parseFloat(data2[i].yr2000);
            var dataValue5 = parseFloat(data2[i].yr2010);
            var dataValue6 = parseFloat(data2[i].yr2012);
            var dataValue7 = parseFloat(data2[i].yr2014);
            var dataValue8 = parseFloat(data2[i].yr2015);
            var dataValue9 = parseFloat(data2[i].yr2016);
            var dataValue10 = parseFloat(data2[i].yr2017);
            for (var j = 0; j < usamap.length; j++) {
                var jsonState = usamap[j].properties.name;
                if (dataState === jsonState) {
                    usamap[j].properties.yr1970 = dataValue;
                    usamap[j].properties.yr1980 = dataValue2;
                    usamap[j].properties.yr1990 = dataValue3;
                    usamap[j].properties.yr2000 = dataValue4;
                    usamap[j].properties.yr2010 = dataValue5;
                    usamap[j].properties.yr2012 = dataValue6;
                    usamap[j].properties.yr2014 = dataValue7;
                    usamap[j].properties.yr2015 = dataValue8;
                    usamap[j].properties.yr2016 = dataValue9;
                    usamap[j].properties.yr2017 = dataValue10;
                    break;
                }
            }
        }
        console.log(usamap);

        // Event Listener (select-box)
        var selectMapType = d3.select("#selected-map").on("change", updateChoropleth);

//
//         updateChoropleth(error, mapTopJson, enrollmentCsv);
        updateChoropleth();
    // });
//
//
function updateChoropleth() { //this serves as the "enter" part; update to follow
//

    var selectedMap = selectMapType.property("value");
    console.log(selectedMap);

    // //conversion to geojson
    // var usamap = topojson.feature(data1, data1.objects.state).features;
//
//     color2.domain([
//         0,
//         d3.max(data2, function(d) {
//             return d.UN_population;
//         })
//     ]);
//
//
    var color = d3.scaleQuantize()
        .range(["rgb(255,247,236)", "rgb(254,232,200)",
            "rgb(253,212,158)", "rgb(253,187,132)", "rgb(252,141,89)",
            "rgb(239,101,72)", "rgb(215,48,31)","rgb(179,0,0)", "rgb(127,0,0)"]);

    color.domain([
        d3.min(usamap, function(d) { return d[selectedMap]; }),
        d3.max(usamap, function(d) { return d[selectedMap]; })
    ]);
    console.log(usamap[3].properties[selectedMap]);

    choropleth.selectAll("path")
        .remove();

    choropleth.selectAll("path")
        .data(usamap)
        .enter()
        .append("path")
        .attr("class", "maps")
        .attr("d", path).style("fill", function (d) {
            var value = d.properties[selectedMap];
            console.log(d.properties);
            console.log(selectedMap);
            if(value) {
                return color(value);
            } else {
                return "#ccc";
            }
    });
        // .style("fill", "none")
        // .style("stroke", "black");
        .attr("d", path)
        .style("fill", "none")
        .style("stroke", "black")
        // .on("mouseover", function(d) {
        //     tooltip.transition()
        //         .duration(200)
        //         .style("opacity", .9);
        //     tooltip.html("Hi")
        // });

    // choropleth.append("path")
    //     .datum(topojson.mesh(data1, data1.objects.states))
    //     .attr("d", path)
    //     .attr("class", "maps");
//         .on("mouseover", function(d) {
//             tooltip.transition()
//                 .duration(200)
//                 .style("opacity", .9);
//             tooltip.html(d.properties.name + "<br>" + "Population: " + d.properties.UN_population )
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
}
// var selection;
//
// // here comes the update
// d3.select("#selected").on("change", function(d) {
//     var usamap = topojson.feature(data1, data1.objects.collection).features;
//     selection = d3.select(this).property("value");
//     // var selection = d3.select("#selected").property("value");
//     color2.domain([
//         0,
//         d3.max(usamap, function(d) {
//             return d.properties[selection];
//         })
//     ]);
//     choropleth.selectAll(".maps")
//         .data(usamap)
//         // .transition()
//         // .duration(500)
//         .style("fill", function(d) {
//             if (!(d.properties[selection])) {
//                 return "#999393"
//             } else {
//                 return color2(d.properties[selection]);
//             }
//         });
// });
    });