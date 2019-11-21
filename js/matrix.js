/*
 * Initialize visualization (static content; e.g. SVG area, axes)
 */
var newmarriages = [];
var newbusinesses = [];
Matrix = function(_parentElement, _data, _data2,_data3){
    this.parentElement = _parentElement;
    this.data = _data;
    this.data2 = _data2;
    this.data3 = _data3;
    this.displayData = [];
    this.initVis();
};



Matrix.prototype.initVis = function() {
    var vis = this;

    vis.margin = { top: 100, right: 70, bottom: 60, left: 70 };
    vis.width = 1000 - vis.margin.left - vis.margin.right,
        vis.height = 800 - vis.margin.top - vis.margin.bottom;

    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("class", "matrix-row")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


    vis.wrangleData();


};


/*
 * Data wrangling
 */


Matrix.prototype.wrangleData = function() {
    var vis = this;
    arrSum = function(arr){
        return arr.reduce(function(a,b){
            return a + b
        }, 0);
    };

    //https://codeburst.io/javascript-arrays-finding-the-minimum-maximum-sum-average-values-f02f1b0ce332
    vis.data2.forEach(function(d,i) {
        // console.log(vis.data.Family);
            var newobj = {};
            newobj["index"] = i;
            newobj["name"] = vis.data[i].Family;
            newobj["marriages"] = arrSum(d);
            newobj["marriageValues"] = d;
            newobj["numberPriorates"] = vis.data[i].Priorates;
            newobj["wealth"] = vis.data[i].Wealth;
            newobj["businessTies"] = arrSum(business[i]);
            newobj["allRelations"] = arrSum(d) + arrSum(business[i]);
            newobj["businessValues"] = business[i];
            vis.displayData.push(newobj);
            newmarriages[i] = d;
            newbusinesses[i] = business[i];
        });
        console.log(vis.displayData);
        console.log(newmarriages);
        console.log(newbusinesses);

    console.log(vis.displayData);
    vis.updateVis()
};

/*
 * The drawing function - should use the D3 update sequence (enter, update, exit)
 */

Matrix.prototype.updateVis = function() {
    var vis = this;

    vis.box = vis.svg.selectAll(".matrix-row")
        .data(newmarriages);

    // console.log(vis.displayData);
    vis.rowgroup = vis.box.enter().append("g")
        .attr("class", "matrix-row")
        .attr("transform", function (d, i) {
            return "translate(" + (0) + "," + (i * 40 + 20) + ")";
        });

    vis.rowgroup.append("text")
        .attr("class", "mytext")
        .text(function (d,i) {
            // console.log(d);
            // console.log(vis.data[i]);
            return vis.data[i].Family;
        })
        .attr("transform", function (d, i) {
            return "translate(" + (-55) + "," + (0) + ")";
        });

    var cellHeight = 20, cellWidth = 20, cellPadding = 10;

    var rows = vis.rowgroup.selectAll(".triangle-path")
        .data(function(d){
            return d;
        });

        rows.enter().append("path")
        .attr("class", "triangle-path")
        // .attr("x", function(d, i) { return (i * 40 +50)})
        // .attr("y", function(d, i) { return (10)})
        .attr("d", function(d, index) {
            // Shift the triangles on the x-axis (columns)
            var x = (cellWidth + cellPadding) * index;
            // All triangles of the same row have the same y-coordinates
            // Vertical shifting is already done by transforming the group elements
            var y = 0;

            return 'M ' + x +' '+ y + ' l ' + cellWidth + ' 0 l 0 ' + cellHeight + ' z';
        })
        .attr("transform", "translate(" + (20) + "," + (-15) + ")")
        .attr("fill", function(data){
                    if(data == 0){
                        return "black";
                    }
                    else{
                        return "red";
                    }
                })
        .style("stroke-width", 0);

    vis.box2 = vis.svg.selectAll(".matrix-row2")
        .data(newbusinesses);

    vis.rowgroup2 = vis.box2.enter().append("g")
        .attr("class", "matrix-row2")
        .attr("transform", function (d, i) {
            console.log("transformed?");
            return "translate(" + (0) + "," + (i * 40 + 20) + ")";
        });

    var triangle1 = vis.rowgroup2.selectAll(".triangle-path2")
        .data(function(d){ return d;});

        triangle1.enter().append("path")
        .attr("class", "triangle-path2")
        // .attr("x", function(d, i) { return (i * 40 +50)})
        // .attr("y", function(d, i) { return (10)})
        .attr("d", function(d, index) {
            // Shift the triangles on the x-axis (columns)
            var x = (cellWidth + cellPadding) * index;
            // All triangles of the same row have the same y-coordinates
            // Vertical shifting is already done by transforming the group elements
            var y = 0;

            return 'M ' + x +' '+ y + ' l 0 ' + cellWidth + ' l ' + cellHeight + ' 0 z';
        })
        .attr("transform", "translate(" + (20) + "," + (-15) + ")")
        .attr("fill", function(data){
            if(data == 0){
                return "black";
            }
            else{
                return "blue";
            }
        })
        .style("stroke-width", 0);


    vis.colgroup = vis.box.enter().append("g")
        .attr("class", "matrix-col")
        .attr("transform", function (d, i) {
            console.log("transformed?");
            return "translate(" + (i * 30 +20) + "," + (0) + ")";
        })
        .attr("transform", function(d, i) {
            return "translate(" + (i* 30 + 30) + ")rotate(-90)"; });

    vis.colgroup.append("text")
        .attr("class", "mytext")
        .text(function (d, i) {
            return vis.data[i].Family;
        });

    vis.svg.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("y", -90)
        .attr("x", 50)
        .attr("fill", "red");

    vis.svg.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("y", -90)
        .attr("x", 140)
        .attr("fill", "blue");

    vis.svg.append("text")
        .attr("class", "mytext")
        .attr("y", -75)
        .attr("x", 80)
        .text("Marriage");

    vis.svg.append("text")
        .attr("class", "mytext")
        .attr("y", -75)
        .attr("x", 170)
        .text("Business Tie");

    d3.select('#select-key').on('change', function(a) {
        var newkey = d3.select(this).property('value');
        if (newkey == "name"){
            vis.displayData.sort(function(a, b){
                var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0 //default return value (no sorting)
            })
        }
        else{
            vis.displayData.sort(function(a, b) { return a[newkey] - b[newkey]; });
        }

        vis.displayData.forEach(function(d,i){
            newmarriages[i] = d.marriageValues;
        });
        vis.displayData.forEach(function(d,i){
            newbusinesses[i] = d.businessValues;
        });

        console.log(vis.displayData);
        console.log(newmarriages);
        console.log(newbusinesses);

        vis.changeAttribute(newmarriages, newbusinesses);


    });
};

Matrix.prototype.changeAttribute = function(marData, bizData){
    console.log('updating?');

    var vis = this;
    vis.svg.selectAll("text").remove();

    vis.svg.selectAll(".matrix-row")
        .data(marData);


    vis.rowgroup.selectAll(".triangle-path")
        .data(function(d){
            return d;
        })
        .transition()
        .duration(800)
        .attr("fill", function(data){
            if(data == 0){
                return "black";
            }
            else{
                console.log(data);
                return "red";
            }
        });

    vis.rowgroup.append("text")
        .attr("class", "mytext")
        .text(function (d,i) {
            // console.log(d);
            // console.log(vis.data[i]);
            return vis.displayData[i].name;
        })
        .attr("transform", function (d, i) {
            return "translate(" + (-55) + "," + (0) + ")";
        });

    vis.svg.selectAll(".matrix-row2")
        .data(bizData);


    vis.rowgroup2.selectAll(".triangle-path2")
        .data(function(d){ return d;})
        .transition()
        .duration(800)
        .attr("fill", function(data){
            if(data == 0){
                return "black";
            }
            else{
                return "blue";
            }
        });


    vis.colgroup.append("text")
        .attr("class", "mytext")
        .text(function (d, i) {
            return vis.displayData[i].name;
        })
        ;

    vis.svg.append("text")
        .attr("class", "mytext")
        .attr("y", -75)
        .attr("x", 80)
        .text("Marriage");

    vis.svg.append("text")
        .attr("class", "mytext")
        .attr("y", -75)
        .attr("x", 170)
        .text("Business Tie");

};

