let winner_titles;


// Import the data
d3.csv("data/15.062 Chopped Data.csv", (d)=> {return d}).then(
    function(data) {
        console.log(data)
        //winner_titles = new BarChart('winner_titles', data)
    });