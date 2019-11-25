var width_fin = 200,
    height_fin = 200,
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

    // d3.csv(data1, function(data) {
    //         console.log(data[4])
    //
    //         if(data.Year==2015){
    //             console.log(data.Year)
    //             d.foreach(function(item){
    //                 var newitem = item;
    //                 dataset.college.push(newitem)
    //             })
    //         }
    // });



    // data1.foreach(function(d){
    //     if(d.Year==2015){
    //         d.foreach(function(item){
    //             var newitem = item;
    //             dataset.college.push(newitem)
    //         })
    //     }
    // })

    console.log(data1[50].Year)
    dataset.collegecost.push(data1[50].TFAll)
    dataset.collegecost.push(data1[50].RAll)
    dataset.collegecost.push(data1[50].BAll)

    dataset.finaid.push(data2[6].AnyAllTotal);

    console.log(dataset)

    function tweenPie(finish, k) {
        var j = parseInt(d3.select(this).attr("note"));
        var start = {
            startAngle: 0,
            endAngle: 0,
            innerRadius: 100 - cwidth_fin * j,
            outerRadius: 80 - cwidth_fin * j

        };
        console.log(j)
        var i = d3.interpolate(start, finish);
        return function(d, j) {
            return arc(i(d));
        };
    }
    var clr= function(d, i, j) {
        var arr = [
            ["red", "green", "blue"],
            ["blue", "white"]
        ];
        return arr[j][i];
    }

    var pie = d3.layout.pie()
        .sort(null);

    var arc = d3.svg.arc();

    var svg = d3.select(".volunteers_area").append("svg")
        .attr("width", width_fin)
        .attr("height", height_fin)
        .append("g")
        .attr("transform", "translate(" + width_fin / 2 + "," + height_fin / 2 + ")");

    var gs = svg.selectAll("g").data(d3.values(dataset)).enter().append("g");
    var path = gs.selectAll("path")
        .data(function(d) {
            return pie(d);
        })
        .enter().append("path").attr("note", function(d, i, j) {
            return j;
        }).attr("class", clr)
        .transition().duration(750)
        .attrTween("d", tweenPie)

    console.log("herenow?")

    // function changeData() {
    //
    //
    //     d3.select("#chart svg").selectAll('g').remove();
    //
    //     var svg = d3.select("#chart svg")
    //         .attr({
    //             width: width,
    //             height: height
    //         });
    //     var gs = svg.selectAll("g").data(d3.values(dataset)).enter().append("g").attr({
    //         'transform': 'translate(' + width / 2 + ', ' + height / 2 + ')'
    //     });
    //     var path = gs.selectAll("path")
    //         .data(function(d) {
    //             return pie(d);
    //         })
    //         .enter()
    //         .append("path")
    //         .attr("note", function(d, i, j) {
    //             return j;
    //         }).attr("class", clr)
    //         .transition()
    //         .duration(1000)
    //         .attrTween('d', tweenPie);
    // }



}


