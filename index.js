'use strict';
const youtubeApiKey="";
const spoonApiKey="";
//const STORE={} for key-value paif of type of esercise and calories burned

//this function is to format the Query params for Youtube
function formatYoutubeQueryParams(){

}
//this function is to display the Youtube videos
function displayYoutube(){

}

//This function is to fetch the videos from Youtube
function getYoutubeVideo(){

}

//This function is to watch for the Yes answer of the Exercise question
function watchSearchVideo(){
    $('#no').on('click', (event) => {
        event.preventDefault();
        $('.currentDisplay').html(`
            <p> Awesome. Would you like to know how many calories you have burned?</p>
            <form>
                <input id ="yesCal" type ="radio" name="calorieOption">
                    <label for =yesCal"> Yes, please </label> <br>
                <input id ="noCal" type ="radio" name="calorieOption">
                    <label for =noCal"> No, I already know </label>    
            </form>`
        )
    })
    $('#yes').on('click',(event) =>{
        event.preventDefault();
        getYoutubeVideo();
    })

}


//This function is for the calories counting part
function caloriesCalculation(){

}
//This function is to form the query params for Spponacular
function formatSpponQueryParams(){

}
//This function if to display the recipe result
function displayRecipe(){

}
//this function is to fetch info from Spoonacular
function getRecipe(){

} 
//This function is to watch for search recipe button
function watchSearchRecipe(){

}


$(watchSearchVideo);
$(watchSearchRecipe);