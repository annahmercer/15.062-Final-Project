let winner_titles;


// Import the data
d3.csv("data/15.062 Chopped Data.csv", (d)=> {return d}).then(
    function(data) {
        console.log(data)
        //console.log(data =>data.)
        winner_titles = new BarChart("top_winner_titles", data, "contestant4_title")
        winner_locations = new BarChart("top_winner_locations", data, "contestant4_location")
        winner_genders = new BarChart("winner_genders", data, "contestant4_gender")
    });


