//document.querySelector('.listOfDataShow').style.display='none';
let arrOfFavoriteWords = [];
counter = 0;
counter2 = 0;
lengthOfSavedData = 0;
let favWord = "";
let lastSearchedWords = [];
let arrOfSynonyms = [];
let checkIfClick = 0;

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
        if (checkIfClick === 1) renderHtmlListLastSavedWords();

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
      <li><b>Word</b>: <h3>${responseJson[0].word}</h3></li>
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
    <li><b>Phonetics:</b> ${checkIfLenght(responseJson[0].phonetics)} 
        <audio controls style='width:200px;height:30px'>
        <source src=${checkAudio(responseJson[0].phonetics)} //[0].audio     
     </li>
     <li><b>Source URL:</b><a href=${responseJson[0].sourceUrls[0]}> ${
        responseJson[0].sourceUrls[0]
      }</a></li>
    <br>
  
   `;
    });
}
function checkAudio(arr) {
  for (let key in arr) if (arr[key].audio) return arr[key].audio;
}

function goThroughArrayForDefinition(arr, areaSelector) {
  let htmlDescription = document.querySelector(areaSelector);
  console.log(arr);
  for (let key in arr) {
    htmlDescription += `${arr[key].definition}<br>`;
  }
  return htmlDescription;
}

function checkIfLenght(arr) {
  if (arr.length > 0) {
    for (let key in arr) if (arr[key].text) return arr[key].text;
    // console.log(arr);
    // return arr[1].text;
  } else return ` No phonetics found found`;
}

function checkIfSynonyms(arr) {
  if (arr.length > 0) {
    console.log(arr);
    return arr;
  } else return ` No synonyms found`;
}
//Here we deal with the list of favorite words
function loadFavoriteWords() {
  document
    .querySelector(".loadListOfFavorites")
    .addEventListener("click", () => {
      try {
        if (!localStorage.getItem(`favoriteWordsFromUser`))
          throw "No saved data to show";
        document.querySelector(
          ".listOfDataShow"
        ).innerHTML = `List of favorite words is:<br>
          ${localStorage.getItem(`favoriteWordsFromUser`)}`;
        document.querySelector(
          ".listOfDataShow"
        ).innerHTML += `<br><button type='button' id='delete'>Delete list</button>`;
        document.querySelector(
          ".listOfDataShow"
        ).innerHTML += `<br><button type='button' id='close' style='margin-top:30px'>Close list</button>`;

        document.getElementById("delete").addEventListener("click", () => {
          document.querySelector(".listOfDataShow").innerHTML = "";
          localStorage.clear();
          arrOfFavoriteWords = [];
        });
        document.getElementById("close").addEventListener("click", () => {
          document.querySelector(
            ".listOfDataShow"
          ).innerHTML = ` Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
              aliquam cum similique nam enim ipsam voluptas! Nihil pariatur eaque
              quis voluptas, facere repellat dolorum id nam doloremque quidem
              porro quaerat?`;
        });
      } catch (err) {
        alert("No saved data to show");
      }
    });
}
function loadLastSavedWords() {
  document.querySelector(".lastSearched").addEventListener("click", () => {
    try {
      if (lastSearchedWords.length === 0) throw "No prior search found";
      if (lastSearchedWords.length < 4) {
        checkIfClick = 1;
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
      document.querySelector(
        ".listOfDataShow"
      ).innerHTML += `<button type='button' id='close-lastsearch'>Close</button>`;

      document
        .getElementById("close-lastsearch")
        .addEventListener("click", () => {
          document.querySelector(
            ".listOfDataShow"
          ).innerHTML = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
                aliquam cum similique nam enim ipsam voluptas! Nihil pariatur eaque
                quis voluptas, facere repellat dolorum id nam doloremque quidem
                porro quaerat?`;
          checkIfClick = 0;
          console.log(checkIfClick);
        });
    } catch (err) {
      alert(err);
    }
  });
}
function renderHtmlListLastSavedWords() {
  if (lastSearchedWords.length === 0) throw "No prior search found";
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
  document.querySelector(
    ".listOfDataShow"
  ).innerHTML += `<button type='button' id='close-lastsearch'>Close</button>`;

  document.getElementById("close-lastsearch").addEventListener("click", () => {
    document.querySelector(
      ".listOfDataShow"
    ).innerHTML = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
            aliquam cum similique nam enim ipsam voluptas! Nihil pariatur eaque
            quis voluptas, facere repellat dolorum id nam doloremque quidem
            porro quaerat?`;
  });
}
//Stuff that runs automatically
getValueByEnter();

//Save to favorite list
document.querySelector(".saveTofavorite").addEventListener("click", () => {
  arrOfFavoriteWords[counter] = favWord;
  console.log(arrOfFavoriteWords);
  localStorage.setItem(`favoriteWordsFromUser`, arrOfFavoriteWords);
  counter++;
  console.log(arrOfFavoriteWords);
  alert("Word has been saved to favorites list");
});

document.querySelector(".saveTofavorite").style.display = "none";
loadFavoriteWords();
loadLastSavedWords();
