'use strict';
const youtubeApiKey="AIzaSyDkYi5rExId9p1BkHm08Iav3Wz_aotGYsI";
const spoonApiKey="";
const youtubeURL="https://www.googleapis.com/youtube/v3/search";
//const STORE={} for key-value paif of type of esercise and calories burned

//this function is to format the Query params for Youtube
function formatYoutubeQueryParams(params){
    const queryItem = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItem.join("&");
};
//this function is to display the Youtube videos
function displayYoutube(responseJson, maxReturn){
    $('.currentDisplay').html("");//to clear out the previous results
    for (let i = 0; i < maxReturn; i++) {
        console.log(responseJson.items[i].id.videoId);
        const link = `https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}`;
        $('.currentDisplay').append(`
        <h3>Here are your exercise video</h3>
        <p>Would you like to know how many calories you migh be burning?</p>
        <form>
            <input id = "calYes" type = "radio" name = "yesToCal" value = "yes">
            <label for = "calYes"> Yes, show me </label> <br>
            <input id = "calNo" type = "radio" name = "noToCal" value = "no">
            <label for = "calNo"> No, I'm good </label>
        </form>
        <h4>Title: ${responseJson.items[i].snippet.title}</h4>
        <p>Description: ${responseJson.items[i].snippet.description}</p>
        <a href='${link}' target='_blank'>
            <img src = '${responseJson.items[i].snippet.thumbnails.default.url}'>
        </a> 

        `)        
    };  
};

//This function is to fetch the videos from Youtube
function getYoutubeVideo(chosenExercise,maxReturn){
    const params = {
        key:youtubeApiKey, 
        q:chosenExercise,
        part:'snippet',
        maxReturn,
        type:'video'             
    }
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
        .then (responseJson => displayYoutube(responseJson,maxReturn))
        .catch(err => {
            $('.currentDisplay').text(`Something went wrong. ${err.message}`);
        })

}
//This function is to display the calorie screen
function calorieScreen(){
    $('.currentDisplay').html(`
    <p>What type of exercise/activities have you done today?</p>
    <p>What is the duration of the activities?</p>
    <p>What is your current weight? </p>`)
}
//This function is to watch for the answer to the Exercise question
function watchExerciseOption(){
    $('#yes').on('click',(event) =>{
        event.preventDefault();
        $('.currentDisplay').html(`
        <form id = 'workoutType'>
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
    $('#noWithCal').on('click', (event) =>{
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
//This fuction is to watch for the Seacrh Video Button
function watchSearchVideo(){
    $('form').submit(event => {
        event.preventDefault();
        const chosenExercise = $('#js-exerciseType').val();
        console.log(chosenExercise);
        const maxReturn=$('#js-maxResult').val();
        console.log(maxReturn);
        getYoutubeVideo(chosenExercise, maxReturn);
    });
};


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

function renderApp(){
    watchExerciseOption();
}
$(renderApp);
