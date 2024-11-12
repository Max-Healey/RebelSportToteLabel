const BRANDPREFIX = "https://www.rebelsport.com.au/on/demandware.static/-/Sites/default/dwc0074dc1/rebel-au/logos/logo-";
const IMGPREFIX = "https://www.rebelsport.com.au/on/demandware.static/-/Sites-srg-internal-master-catalog/default/"
function onLoad() {
  console.log(localStorage.getItem("articles"));
  let articles = JSON.parse(localStorage.getItem("articles"));
  let current_index = JSON.parse(localStorage.getItem("current_index"))
  
  for (i = 0; i < 4; i++) {
    article = articles[i + current_index];
    if (!article) {
      continue;
    }
    let brandImgbox = document.getElementsByName("brandImgbox")[i];
    let articlePLU = document.getElementsByName("articlePLU")[i];
    let venderArticle = document.getElementsByName("venderArticle")[i];
    let articleName = document.getElementsByName("articleName")[i];
    let articleColour = document.getElementsByName("articleColour")[i];
    let imgbox = document.getElementsByName("photoImgbox")[i];
    let articleCat = document.getElementsByName("category")[i];
    let barcode = document.getElementsByName("barcode")[i];
    let brandText = document.getElementsByName("brandText")[i];
    
    //let category = articles[i]["Cat"];

    articlePLU.contentEditable = articleName.contentEditable = venderArticle.contentEditable = 
    articleColour.contentEditable = articleColour.contentEditable = articleCat.contentEditable 
    = "plaintext-only";

    let PLU = article["plu"];
    
    //articleColour.innerText = articles[i]["Colour"].toUpperCase();
    //venderArticle.innerText = articles[i]["VenderArticle"];
    
    console.log(article);
    if (PLU) {
      PLU = PLU.substring(0,6);
      articlePLU.innerText = PLU;
      articleName.innerText = article["name"].toUpperCase();
      imgbox.src = article["image"]
      brandImgbox.src = BRANDPREFIX + article["brand"].toLowerCase().replace("-", "") + "-black.svg";
      barcode.src = "https://barcodeapi.org/api/EAN13/" + article["barcode"];
      if (barcode.src == "https://barcodeapi.org/api/EAN13/" || barcode.src == "https://barcodeapi.org/api/EAN13/undefined") {
        barcode.classList.add("invis");
      }
      articleCat.innerText = article["category"];
      brandText.innerText = article["brand"].replace("-", " ").toUpperCase();
    }
    else {
      imgbox.classList.add("invis");
    }
    //Add an onerror to just write the brand-name
  }
}

function styleChanged(i) {
  let selector = document.getElementsByName("style-select")[i];
  let label = document.getElementsByClassName("label")[i];
  let imgbox = document.getElementsByName("typeImgbox")[i];
  let photo = document.getElementsByName("photoImgbox")[i];

  if (selector.value == '0') {
    let article = JSON.parse(localStorage.getItem("articles"))[i];
    let imgbox = document.getElementsByName("typeImgbox")[i];
    let photo = document.getElementsByName("photoImgbox")[i];
    imgbox.src = "images/0.png";
    imgbox.style.display = 'hide';
    imgbox.style.height = '0cm'
    photo.style.height = '8cm'
    photo.style.width = '8cm'
    return;
  }
  //imageNumbers[i] = -1;
  imgbox.src = "images/0.png";
  imgbox.style.display = '';
  imgbox.style.height = '5cm'
  photo.style.height = '3cm'
  photo.style.width = '3cm'
  imgbox.src = "images/" + selector.value + ".png";
}

function next() {
  let current_index = JSON.parse(localStorage.getItem("current_index"))
  localStorage.setItem("current_index", current_index + 4);
  window.location.href = "label new.html";
}

function back() {
  let current_index = JSON.parse(localStorage.getItem("current_index"))
  if (current_index != 0) {
    localStorage.setItem("current_index", current_index - 4);
    window.location.href = "label new.html";
  }
}

function typeBrand(i) {
  let imgbox = document.getElementsByName("brandImgbox")[i];
  imgbox.style.height = 0;
  imgbox.style.width = 0;
  let text = document.getElementsByName("brandText")[i];
  text.style.fontSize = 20;
}

window.addEventListener('DOMContentLoaded', (event) => {
  onLoad();
});
