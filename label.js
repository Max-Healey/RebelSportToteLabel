const BRANDPREFIX = "https://www.rebelsport.com.au/on/demandware.static/-/Sites/default/dwc0074dc1/rebel-au/logos/logo-";
const PICPREFIX = "https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dwd0550bbf/images/";

var imageNumbers = [0,0,0,0];

function onLoad() {
  let articles = JSON.parse(localStorage.getItem("articles"));
  

  for (i = 0; i < 4; i++) {
    let brandImgbox = document.getElementsByName("brandImgbox")[i];
    let articlePLU = document.getElementsByName("articlePLU")[i];
    let venderArticle = document.getElementsByName("venderArticle")[i];
    let articleName = document.getElementsByName("articleName")[i];
    let articleColour = document.getElementsByName("articleColour")[i];
    let imgbox = document.getElementsByName("photoImgbox")[i];
    let articleCat = document.getElementsByName("category")[i];
    let barcode = document.getElementsByName("barcode")[i];
    let category = articles[i]["Cat"];

    articlePLU.contentEditable = articleName.contentEditable = venderArticle.contentEditable = 
    articleColour.contentEditable = articleColour.contentEditable = articleCat.contentEditable 
    = "plaintext-only";

    let PLU = articles[i]["PLU"];
    let cutPLU = PLU.slice(0, 6);

    articlePLU.innerText = cutPLU;
    articleName.innerText = articles[i]["Name"];
    articleColour.innerText = articles[i]["Colour"].toUpperCase();
    venderArticle.innerText = articles[i]["VenderArticle"];
    articleCat.innerText = category.replace(/[0-9]/g, '');
    
    updateImageWithArticle(imgbox, articles[i]);
    if (PLU) {
      brandImgbox.src = BRANDPREFIX + articles[i]["Brand"].toLowerCase() + "-black.svg";
      
      barcode.src = "https://barcodeapi.org/api/EAN13/" + articles[i]["EAN"];
      console.log(articles[i].EAN)
    }
    
    //Add an onerror to just write the brand-name
  }
}

function updateImageWithArticle(imgbox, article, number=0) {
  imageNumbers[i] = number;
  let PLU = article["PLU"];
  let cutPLU = PLU.slice(0, 6);
  let basePLU = cutPLU;
  let urlcolour = "";
  if (PLU.length > 6) { //clothing item
      let colour = article["Colour"].toLowerCase().replace('purp','purple');
      if (colour) {
        let colours = colour.split('/');
        urlcolour = "_" + colour;
        if (colours.length > 1) {
          urlcolour = "_" + colours[0] + colours[1];
        }
      }
      basePLU += "01";
  }
  

  let imageUrl = basePLU + urlcolour;
  if (number) {
    imageUrl = basePLU + "-0" + (number-1) + urlcolour;
  }
  imgbox.src = PICPREFIX + basePLU + "/Rebel_" + imageUrl + "_hi-res.jpg?&sw=150&sh=150&q=61";
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
    updateImageWithArticle(imgbox, article);
    
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

function nextImage(i) {
  let imgbox = document.getElementsByName("photoImgbox")[i];
  let article = JSON.parse(localStorage.getItem("articles"))[i];
  console.log(article);
  imageNumbers[i] = imageNumbers[i] + 1;
  updateImageWithArticle(imgbox, article, imageNumbers[i]);
}

function imageFetchError(i) {
  let imgbox = document.getElementsByName("photoImgbox")[i];
  if (imageNumbers[i] == 0) {
    console.log(i, imgbox.src);
    imgbox.src='images/missingno.png';
    imgbox.classList.add("invis");
    categorytxt = document.getElementsByName("category")[i];
    categorytxt.classList.add("invis");
  }
  else if (imageNumbers[i] == 1) {
    alert("Only one image");
  }
  if (imageNumbers[i] != 0) {
    imageNumbers[i]=-1;
    nextImage(i);
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  onLoad();
});