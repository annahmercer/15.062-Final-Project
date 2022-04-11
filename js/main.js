let winner_titles;


// Import the data
d3.csv("data/15.062 Chopped Data.csv", (d)=> {return d}).then(
    function(data) {
        //console.log(data)
        //console.log(data =>data.)
        winner_titles = new BarChart("top_winner_titles", data, "contestant4_title", "Winner Job Titles")
        winner_locations = new BarChart("top_winner_locations", data, "contestant4_location", "Winner Locations")
        winner_genders = new BarChart("winner_genders", data, "contestant4_gender", "Winner Gender Breakdown")
    });

d3.csv("data/Seasons + Ingredients.csv", (d)=> {return d}).then(
    function(data) {
        season_ingredients = new BarChart2("seasonal_ingredients", data, "Ingredient Type", "seasonSelector","Seasonal Ingredients")
    });

d3.csv("data/Round Ingredient Types.csv", (d) => {return d}).then(
    function(data) {
        round_ingredients = new BarChart2("course_ingredients", data, "Ingredient Type", "courseSelector", "Round Ingredients")

    }
)
function updateAll(){
    season_ingredients.wrangleData()
    round_ingredients.wrangleData()
}