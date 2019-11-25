var width_fin = 500,
    height_fin = 500,
    cwidth_fin = 30;

var color = function(i, j) {
    var arr = [
        ["#ff0000", "#00ff00", "#0000ff"],
        ["#0000ff", "#ffffff"]
    ];
    return arr[j][i];
};

queue()
    .defer(d3.csv, "data/costall.csv")
    .defer(d3.csv, "data/finaid.csv")
    .await(createVisualization);

console.log("Here?")

function createVisualization(error, data1, data2) {
    var dataset = {
        collegecost: [],
        finaid: []

    };
    console.log(data1);
    console.log(data2);
    console.log(data1[0].Year);

    data1.forEach(function (d) {
        d.B2 = +d.B2;
        d.B4 = +d.B4;
        d.BAll = +d.BAll;
        d.R2 = +d.R2;
        d.R4 = +d.R4;
        d.RAll = +d.RAll;
        d.TF2 = +d.TF2;
        d.TF4 = +d.TF4;
        d.TFAll = +d.TFAll;
        d.TFRB2 = +d.TFRB2;
        d.TFRB4 = +d.TFRB4;
        d.TFRBAll = +d.TFRBAll;
        d.Year = +d.Year;
    });


    data2.forEach(function (d) {
        d.AnyAllTotal = +d.AnyAllTotal;
        d.AnyPrivate4Total = +d.AnyPrivate4Total;
        d.AnyPrivateF2Total = +d.AnyPrivateF2Total;
        d.AnyPrivateFTotal = +d.AnyPrivateFTotal;
        d.AnyPrivateLessTotal = +d.AnyPrivateLessTotal;
        d.AnyPrivateOtherTotal = +d.AnyPrivateOtherTotal;
        d.AnyPrivateTotal = +d.AnyPrivateTotal;
        d.AnyPub2Total = +d.AnyPub2Total;
        d.AnyPub4Total = +d.AnyPub4Total;
        d.AnyPubLessTotal = +d.AnyPubLessTotal;
        d.AnyPubOtherTotal = +d.AnyPubOtherTotal;
        d.AnyPubTotal = +d.AnyPubTotal;
        d.Year = +d.Year;
    });

    console.log(data1);
    console.log(data2);

    console.log(dataset.collegecost);


    mydata1 = data1;
    mydata2 = data2;
    console.log(mydata1);


    console.log(data1[50].Year)
    dataset.collegecost.push(data1[50].TFAll)
    dataset.collegecost.push(data1[50].RAll)
    dataset.collegecost.push(data1[50].BAll)

    totaltuition = mydata1[50].TFRBAll;

    dataset.finaid.push((data2[6].AnyAllTotal) / (data1[50].TFRBAll));
    dataset.finaid.push(1 - (data2[6].AnyAllTotal) / (data1[50].TFRBAll));

    console.log(dataset);

    function tweenPie(finish, k) {
        var j = parseInt(d3.select(this).attr("note"));
        var start = {
            startAngle: 0,
            endAngle: 0,
            innerRadius: 200 - cwidth_fin * j,
            outerRadius: 180 - cwidth_fin * j

        };
        console.log(j)
        var i = d3.interpolate(start, finish);
        return function (d, j) {
            return arc(i(d));
        };
    }

    var clr = function (d, i, j) {
        var arr = [
            ["red", "green", "blue"],
            ["blue"]
        ];
        return arr[j][i];
    }

    var arr1 = ["lightblue", "lightgreen", "pink", "white"]

    var pie = d3.pie()
        .sort(null);

    var arc = d3.arc();

    var svg = d3.select("#volunteers_area").append("svg")
        .attr("width", width_fin)
        .attr("height", height_fin)
        .append("g")
        .attr("transform", "translate(" + width_fin / 2 + "," + height_fin / 2 + ")");

    var gs = svg.selectAll("g").data(d3.values(dataset)).enter().append("g");
    var path = gs.selectAll("path")
        .data(function (d) {
            return pie(d);
        })
        .enter().append("path").attr("note", function (d, i, j) {
            return j;
        }).attr("class", clr)
        .style("fill", function (d, index, index2) {
            var currentcolor = arr1[index]

            if (index == 0) {
                arr1[index] = "orange"
            }
            if (index == 1) {
                arr1[index] = "white"
            }
            return currentcolor

        })
        .transition().duration(750)
        .attrTween("d", tweenPie);
    console.log("herenow?")

    svg.append("text")
        .attr('x', -100)
        .attr('y', -40)
        .text("Tuition & Fees: $" + dataset.collegecost[0])

    svg.append("text")
        .attr('x', -70)
        .attr('y', -20)
        .text("Room: $" + dataset.collegecost[1])

    svg.append("text")
        .attr('x', -70)
        .attr('y', 0)
        .text("Board: $" + dataset.collegecost[2])

    svg.append("text")
        .attr('x', -80)
        .attr('y', 20)
        .text("Financial Aid: " + Math.floor((dataset.finaid[0]) * 100) + "%")

    svg.append("circle")
        .attr("cx", -110)
        .attr("cy", -44 )
        .attr("r", 8 )
        .style("fill","lightblue");

    svg.append("circle")
        .attr("cx", -80)
        .attr("cy", -24 )
        .attr("r", 8 )
        .style("fill","lightgreen");

    svg.append("circle")
        .attr("cx", -80)
        .attr("cy", -4 )
        .attr("r", 8 )
        .style("fill","pink");

    svg.append("circle")
        .attr("cx", -90)
        .attr("cy", 17 )
        .attr("r", 8 )
        .style("fill","orange");




    d3.select('#select-key-fin').on('change', function (a) {
        var newkey = d3.select(this).property('value');
        console.log(newkey);
        updateVis(newkey);
    });

    function updateVis(myKey) {

        d3.selectAll(".secondsvg").remove();
        d3.selectAll(".newtext").remove();

        var color = function (i, j) {
            var arr = [
                ["#ff0000", "#00ff00", "#0000ff"],
                ["#0000ff", "#ffffff"]
            ];
            return arr[j][i];
        };


        console.log(myKey)
        var dataset2 = {
            collegecost: [],
            finaid: []

        };

        var myindex = 0;

        mydata1.forEach(function (d, index) {
            if (d.Year == myKey) {
                dataset2.collegecost.push(d.TFAll / totaltuition)
                dataset2.collegecost.push(d.RAll / totaltuition)
                dataset2.collegecost.push(d.BAll / totaltuition)
                dataset2.collegecost.push(1 - d.BAll / totaltuition - d.RAll / totaltuition - d.TFAll / totaltuition)
                myindex = index
            }
        })


        console.log(dataset2)

        function tweenPie(finish, k) {
            var j = parseInt(d3.select(this).attr("note"));
            var start = {
                startAngle: 0,
                endAngle: 0,
                innerRadius: 200 - cwidth_fin * j,
                outerRadius: 180 - cwidth_fin * j

            };
            console.log(j)
            var i = d3.interpolate(start, finish);
            return function (d, j) {
                return arc(i(d));
            };
        }

        var clr = function (d, i, j) {
            var arr = [
                ["red", "green", "blue"],
                ["blue"]
            ];
            return arr[j][i];
        }

        var arr1 = ["lightblue", "lightgreen", "pink", "white"]

        var pie = d3.pie()
            .sort(null);

        var arc = d3.svg.arc();

        var svg2 = d3.select("#volunteers_area").append("svg")
            .attr("class", "secondsvg")
            .attr("width", width_fin)
            .attr("height", height_fin)
            .append("g")
            .attr("transform", "translate(" + width_fin / 2 + "," + height_fin / 2 + ")");

        var gs2 = svg2.selectAll("g").data(d3.values(dataset2)).enter().append("g");
        var path2 = gs2.selectAll("path")
            .data(function (d) {
                return pie(d);
            })
            .enter().append("path").attr("note", function (d, i, j) {
                return j;
            }).attr("class", clr)
            .style("fill", function (d, index, index2) {
                var currentcolor = arr1[index]
                if (index == 1) {
                    arr1[index] = "white"
                }
                return currentcolor;

            })
            .transition().duration(750)
            .attrTween("d", tweenPie);
        svg2.append("text")
            .attr("class", "newtext")
            .attr('x', -160)
            .attr('y', 15)
            .text("In " + myKey + ", the average cost of attending college")

        svg2.append("text")
            .attr("class", "newtext")
            .attr('x', -150)
            .attr('y', 35)
            .text("was only " + Math.floor((dataset2.collegecost[0] + dataset2.collegecost[1] + dataset2.collegecost[2]) * 100) + "% what it is in present-day.")


        // .text(;


    }

}

