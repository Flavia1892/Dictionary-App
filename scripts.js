//document.querySelector('.listOfDataShow').style.display='none';
let arrOfFavoriteWords = [];
counter = 0;
counter2 = 0;
lengthOfSavedData = 0;
let favWord = "";
let lastSearchedWords = [];
let arrOfSynonyms = [];

function getValueByEnter() {
  let value = "";

  document
    .querySelector(".form-control")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        value = this.value;
        console.log(value);
        favWord = value;
        this.value = "";
        document.querySelector(".saveTofavorite").style.display = "block";
        saveLastSearchedWords(value);
        let word = toString(value);
        fetchData(value);
      }
    });
}

function saveLastSearchedWords(dataFromUser) {
  if (lastSearchedWords.length < 4 && dataFromUser) {
    lastSearchedWords.unshift(dataFromUser);
  } else {
    if (lastSearchedWords.length === 4 && dataFromUser) {
      lastSearchedWords.pop();
      lastSearchedWords.unshift(dataFromUser);
    }
  }

  if (!dataFromUser) alert("No data input and to save");
}

function fetchData(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      document.querySelector(".writeWord").innerHTML = `
      <ul style="border:2px solid black">
      <li><b>Word</b>: ${responseJson[0].word}</li>
      <li><b>URL:</b> ${responseJson[0].license.url} <b> Name:</b> ${
        responseJson[0].license.name
      }</li>
      <li id="definition"><b>Definitions:</b> ${goThroughArrayForDefinition(
        responseJson[0].meanings[0].definitions,
        "#definition"
      )}
    <li id="synonymeZone"> <b> Synonyms:</b> ${checkIfSynonyms(
      responseJson[0].meanings[0].synonyms
    )}
    </li>
    <li >Phonetics:<buton  type="button" style='border:3px solid blue' class='soundWord'> ${
      responseJson[0].phonetics[1].text
    }</button>${getSound(responseJson[0].phonetics[0].audio, "soundWord")}
     
    <br>
  
   `;
    });
}

function goThroughArrayForDefinition(arr, areaSelector) {
  let htmlDescription = document.querySelector(areaSelector);

  console.log(arr);
  for (let key in arr) {
    htmlDescription += `${arr[key].definition}<br>`;
  }
  return htmlDescription;
}

function getSound(soundMP3, classLocation) {
  console.log(soundMP3);

  document.querySelector(`.${classLocation}`).addEventListener("click", () => {
    let beat = new Audio(
      "https://api.dictionaryapi.dev/media/pronunciations/en/cat-uk.mp3"
    );
    beat.play();
  });
}

function checkIfSynonyms(arr) {
  if (arr.length > 0) {
    console.log(arr);
    return arr;
  } else return ` No synonyms found`;
}

//Stuff that runs automatically
getValueByEnter();
document.querySelector(".saveTofavorite").addEventListener("click", () => {
  arrOfFavoriteWords[counter] = favWord;
  counter++;
  console.log(arrOfFavoriteWords);
});

document.querySelector(".saveTofavorite").style.display = "none";

document.querySelector(".loadListOfFavorites").addEventListener("click", () => {
  let text = "";
  for (let i = 0; i < arrOfFavoriteWords.length; i++)
    text += arrOfFavoriteWords[i] + "<br>";

  document.querySelector(".listOfDataShow").innerHTML = text;
});

document.querySelector(".lastSearched").addEventListener("click", () => {
  if (lastSearchedWords.length < 4) {
    let copy = lastSearchedWords.reverse();
    lastSearchedWords = copy;
    copy = [];
    localStorage.setItem(`wordsDataFromUser`, lastSearchedWords);
  } else localStorage.setItem(`wordsDataFromUser`, lastSearchedWords);
  console.log(localStorage.getItem(`wordsDataFromUser`));
  document.querySelector(
    ".listOfDataShow"
  ).innerHTML = `<ul>Last searched words are: <li>${localStorage.getItem(
    "wordsDataFromUser"
  )}</li></ul>`;
});
