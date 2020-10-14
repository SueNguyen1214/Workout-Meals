'use strict';
const youtubeApiKey="AIzaSyDkYi5rExId9p1BkHm08Iav3Wz_aotGYsI";
const spoonApiKey="";
const youtubeURL="https://www.googleapis.com/youtube/v3/search";
//for key-value paif of type of esercise and calories burned
const MET=[
    { "name":"aerobics",
      "burnUnit": 7.3},
    { "name":"water aerobics",
      "burnUnit": 5.3},
    { "name":"badminton",
      "burnUnit": 5.5},
    { "name":"competitive_badminton",
      "burnUnit": 7.0},
    { "name":"ballet",
      "burnUnit": 5.0},
    { "name":"basketball",
      "burnUnit": 6.5},
    { "name":"competitive basketball",
      "burnUnit": 8.0},
    { "name":"boxing",
      "burnUnit": 12.8}, 
    { "name":"dancing",
      "burnUnit": 7.8}, 
    { "name":"goft",
      "burnUnit": 4.8},      
    { "name":"gymnastics",
      "burnUnit": 3.8},
    { "name":"hiking",
      "burnUnit": 7.8},
    { "name":"horseback_riding",
      "burnUnit": 5.5},
    { "name":"jogging",
      "burnUnit": 7.0},   
    { "name":"kickboxing",
      "burnUnit": 10.3}, 
    { "name":"pilates",
      "burnUnit":3.0}, 
    { "name":"racquetball",
      "burnUnit":7.0},
    { "name":"competitive racquetball",
      "burnUnit":10.0},
    { "name":"rope jumping",
      "burnUnit":11.8},
    { "name":"slow run",
      "burnUnit":6.0},
    { "name":"moderate run",
      "burnUnit":11.0},
    { "name":"fast run",
      "burnUnit":16.0},
    { "name":"squats",
      "burnUnit":5.0},
    { "name":"tai chi",
      "burnUnit":3.0},
    { "name":"tennis",
      "burnUnit":7.3},
    { "name":"swimming",
      "burnUnit":4.0},
    { "name":"walking fast",
      "burnUnit":9.5},
    { "name":"weight lifting",
      "burnUnit":6.0},
    { "name":"zumba",
      "burnUnit":6.5},
    { "name":"Xbox exercise video game",
      "burnUnit":6.3},
    { "name":"hatha yoga",
      "burnUnit":2.5},
    { "name":"power yoga",
      "burnUnit":4.0}
];

//this function is to format the Query params for Youtube
function formatYoutubeQueryParams(params){
    const queryItem = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItem.join("&");
};
//this function is to display the Youtube videos
function displayYoutube(responseJson, maxResults){
    $('.currentDisplay').html("");//to clear out the previous results
     $('.currentDisplay').append(`
     <h4>Here are your exercise video.</h4>`);
    for (let i = 0; i < maxResults; i++) {
        console.log(responseJson.items[i].id.videoId);
        const link = `https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}`;
        $('.currentDisplay').append(`
        <h4>Title: ${responseJson.items[i].snippet.title}</h4>
        <p>Description: ${responseJson.items[i].snippet.description}</p>
        <a href='${link}' target='_blank'>
            <img src = '${responseJson.items[i].snippet.thumbnails.default.url}'>
        </a> 

        `)        
    };  
};

//This function is to fetch the videos from Youtube
function getYoutubeVideo(chosenExercise,maxResults = 10){
    const params = {
        key:youtubeApiKey, 
        q:chosenExercise,
        part:'snippet',
        maxResults,
        type:'video'             
    };
    const paramQuery = formatYoutubeQueryParams(params);
    console.log(paramQuery);
    const url =  youtubeURL + "?" + paramQuery;
    console.log(url);
    fetch(url)
        .then (response => {
            if (response.ok) {
                return response.json();
            } throw new Error (response.statusText);
        })
        .then (responseJson => displayYoutube(responseJson,maxResults))
        .catch(err => {
            $('.currentDisplay').text(`Something went wrong. ${err.message}`);
        })

}
//This function is to display the calorie screen
function calorieScreen(){
    $('.currentDisplay').html(`
    <form id = "calorieCal">
        <label for = "exerciseDone">What type of exercise/activities have you done today?</label>
        <input id = "js-exerciseDone" type = "text" placeholder = "Hatha Yoga, Power Yoga, basketball,competitive basketball"><br>
        <label for = "duration">How many hours did you exercise (partial hours please enter in quarter ( 0.25) increments?</label>
        <input id ="js-duration" type = "number" value = "1.0" step = "0.25" min = "0" ><br>
        <label for = "weight">What is your current weight in pounds? </label>
        <input id = "js-weight" type = "number" value = "120.0" min = "5"><br>
        <button type = "submit" id = "submitCalorie">Calculate</button>
    </form>`)
    watchCalculate();
}
//This function is to watch for which option the users choose from the first screen
function watchOption(){
    $('#exerciseOnly').on('click',(event) =>{
        event.preventDefault();
        $('.currentDisplay').html(`
        <form id = 'excerciseChoice'>
            <label for = "exerciseType" >Alrighty. What kind of exercise do you have in mind ? </label>
            <input id = "js-exerciseType" type = "text" placeholder = "Yoga, kickboxing" name="exerciseType">
            <br>
            <label for = "maxResult"> How many results do you want to see? </label>
            <input id = "js-maxResult" type ="number" name = "maxResult" value = "7">
            <button type = "submit"> Search video</button>
        </form>`
        )
        watchSearchVideo();
    });
    $('#calorieOnly').on('click', (event) =>{
        event.preventDefault();
        calorieScreen();
    });
    $('#noWithRec').on('click', (event) =>{
        event.preventDefault();
        $('.currentDisplay').html(`
        <h4>Do you want to search for recipes based on your burned calories?</h4>
        <form>
            <input id = "yesCal" type = "radio" name = "calorieOption">
            <label for = "yesCal"> Yes, that would be nice </label> <br>
            <input id = "noWithIngredient" type = "radio" name = "calorieOption">
            <label for = "noWithIngredient">No, I rather choose recipes with certain ingredient.</label> <br>
            <input id ="noCal" type ="radio" name = "calorieOption">
            <label for = "noCal"> No, thanks</label> 
        </form>`)
    })
    $('#no').on('click', (event) => {
        event.preventDefault();
        getRecipe();
    })
    
}
//This fuction is to watch for the Search Video button
function watchSearchVideo(){
    $('form').submit(event => {
        event.preventDefault();
        const chosenExercise = $('#js-exerciseType').val();
        console.log(chosenExercise);
        const maxResults=$('#js-maxResult').val();
        console.log(maxResults);
        getYoutubeVideo(chosenExercise, maxResults);
    });
};
//This function is to watch for the Calculate button
function watchCalculate(){
    $('#calorieCal').submit(event => {
        event.preventDefault();
        const exerciseDoneType = $('#js-exerciseDone').val();
        const durationDone = $('#js-duration').val();
        const weightDone = $('#js-weight').val();
        caloriesCalculation(exerciseDoneType, durationDone, weightDone);
    });
    
};

//This function is for the calories counting part
function caloriesCalculation(exerciseDoneType, durationDone, weightDone){
    var result =0;
    var weightInKg=weightDone*0.45;
    
    for ( let j =0; j < MET.length; j++){
        if (exerciseDoneType === MET[j].name){
            result += weightInKg*durationDone*MET[j].burnUnit;
        };
    }
    if (result === 0){
        $('.currentDisplay').html(`
        <p>I'm sorry. We don't have info for this type of exercise</p>`)
    }else{
        $('.currentDisplay').html(`
        <p>Here is how much calories you have burned: ${result}</p>`)
    };

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

function renderApp(){
    watchOption();
}
$(renderApp);
