//document.querySelector('.listOfDataShow').style.display='none';
let arrOfFavoriteWords = [];
counter = 0;
counter2 = 0;
lengthOfSavedData = 0;
let favWord = "";
let lastSearchedWords = [];

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
