const BRANDPREFIX = "https://www.rebelsport.com.au/on/demandware.static/-/Sites/default/dwc0074dc1/rebel-au/logos/logo-";
const PICPREFIX = "https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dwd0550bbf/images/";

var imageNumbers = [0,0,0,0];


function onLoad() {
  const articles = JSON.parse(localStorage.getItem("articles"));
  const numLabels = articles.length;
  let labelTemplate = document.getElementById("label-template");
  var table;
  var label;

  for (let i = 0; i < numLabels; i++) {
    if (i % 2 == 0) {
        let spacer = document.createElement("div");
        spacer.className = "spacer";
        table = document.createElement("table");
        table.className = "label-table";
        document.body.appendChild(spacer.cloneNode(1));
        document.body.appendChild(table);
        document.body.appendChild(spacer.cloneNode(1));
    }
    console.log(labelTemplate);
    label = labelTemplate.content.querySelector("div").cloneNode(1);
    

    let brandImgbox = label.getElementsByClassName("brandImgBox")[0];
    let photoImgBox = label.getElementsByClassName("photoImgBox")[0];
    let articlePluTxtBox = label.getElementsByClassName("articlePluTxtBox")[0];
    let venderArticleTxtBox = label.getElementsByClassName("venderArticleTxtBox")[0];
    let articleNameTxtBox = label.getElementsByClassName("articleNameTxtBox")[0];
    let articleColourTxtBox = label.getElementsByClassName("articleColourTxtBox")[0];
    let articleCategoryTxtBox = label.getElementsByClassName("articleCategoryTxtBox")[0];
    let styleSelect = label.getElementsByClassName("style-select")[0]

    brandImgbox.addEventListener("error", () => typeBrand(i), false);
    photoImgBox.addEventListener("error", () => imageFetchError(i), false);
    photoImgBox.addEventListener("click", () => nextImage(i), false);
    styleSelect.addEventListener("change", () => styleChanged(i), false);
    
    brandImgbox.onerror = styleChanged;

    articlePluTxtBox.contentEditable = "plaintext-only";
    articleNameTxtBox.contentEditable = "plaintext-only";
    venderArticleTxtBox.contentEditable = "plaintext-only";
    articleColourTxtBox.contentEditable = "plaintext-only";
    articleColourTxtBox.contentEditable = "plaintext-only";
    articleCategoryTxtBox.contentEditable = "plaintext-only";
    
    let PLU = articles[i]["PLU"];
    if (PLU) {
      let cutPLU = PLU.slice(0, 6);

      articlePluTxtBox.innerText = cutPLU;
      articleNameTxtBox.innerText = articles[i]["Name"];
      articleColourTxtBox.innerText = articles[i]["Colour"].toUpperCase();
      venderArticleTxtBox.innerText = articles[i]["VenderArticle"];
      articleCategoryTxtBox.innerText = articles[i]["Cat"].replace(/[0-9]/g, '');

      photoImgBox.src = articles[i]["Image"];
      brandImgbox.src = BRANDPREFIX + articles[i]["Brand"].toLowerCase().replace(" ", "") + "-black.svg";
    }
    
    else {
      photoImgBox.src = "";
    }
    table.insertRow(-1).insertCell().appendChild(label); 
  }
}

function updateImageWithArticle(imgbox, article, number=0) {
  imageNumbers[i] = number;
  let PLU = article["PLU"];
  if (PLU) {
    let cutPLU = PLU.slice(0, 6);
    if (number == 0) {
      imgbox.src = article["image"];
      return;
    }
    let urlcolour = "";
    if (PLU.length > 6) {
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
}

function styleChanged(i) {
  console.log("i", i);
  let selector = document.getElementsByClassName("style-select")[i];
  let label = document.getElementsByClassName("label")[i];
  let imgbox = document.getElementsByClassName("typeImgbox")[i];
  let photo = document.getElementsByClassName("photoImgbox")[i];

  if (selector.value == '0') {
    let article = JSON.parse(localStorage.getItem("articles"))[i];
    let imgbox = document.getElementsByClassName("typeImgbox")[i];
    let photo = document.getElementsByClassName("photoImgbox")[i];
    imgbox.src = "images/0.png";
    if (article.PLU) {
      "images/Missingno.png";
    }
    imgbox.style.display = 'hide';
    imgbox.style.height = '0cm'
    photo.style.height = '7cm'
    photo.style.width = '7cm'
    
    updateImageWithArticle(imgbox, article);
    
    return;
  }

  imgbox.src = "images/0.png";
  imgbox.style.display = '';
  imgbox.style.height = '15cm'
  photo.style.height = '3cm'
  photo.style.width = '3cm'
  imgbox.src = "images/" + selector.value + ".png";
}

function nextImage(i) {
  let imgbox = document.getElementsByName("photoImgbox")[i];
  let article = JSON.parse(localStorage.getItem("articles"))[i];
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