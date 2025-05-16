const PLU_regex = new RegExp("PLU Number\n(?!PLU Description)(.*)");
const Name_regex = new RegExp("PLU Description\n(?!Store Number)([^,\n]*)");
const VA_regex = new RegExp("Vendor Article\n(?!MC Level 1)(.*)");
const Colour_regex = new RegExp("Color Value\n(?!Size Value)(.*)");
const Brand_regex = new RegExp("Brand(?!Brand Type)\n(.*)");
const MerchCat_regex = new RegExp("Merchandise Category(?!Vendor)\n(.*)");
const Category_regex = new RegExp("MC Level 1\n(.*)");
const EAN_regex = new RegExp("EAN(?!Listing)\n(.*)");

function getArticleInfo(s) {
    let PLU = Name = Colour = VA = Brand = MerchCat = EAN = Cat = "";
    var r;
    if (r = s.match(PLU_regex)) {PLU += r[1]}
    if (r = s.match(Name_regex)) {Name += r[1]}
    if (r = s.match(VA_regex)) {VA += r[1]}
    if (r = s.match(Colour_regex)) {Colour += r[1]}
    if (r = s.match(Brand_regex)) {Brand += r[1]}
    if (r = s.match(MerchCat_regex)) {MerchCat += r[1]}
    if (r = s.match(EAN_regex)) {EAN += r[1]}
    if (r = s.match(Category_regex)) {Cat += r[1]}

    Cat = Cat.replace(" ", "");
    EAN = EAN.replace(" ", "");
    Brand = Brand.replace(" ", "");
    Brand = Brand.replace("&", "");
    Brand = Brand.replace(".", "");
    
    let article = {"PLU": PLU, "Name": Name, "VenderArticle": VA, "Colour": Colour, "Brand": Brand, "EAN": EAN, Cat};
    
    if (PLU) {
      if (jsonData[PLU.substring(0,6)]) {
        article["Image"] = jsonData[PLU.substring(0,6)]["image"]; 
      }
      else {
        article["Image"] = "missingno.png";
      }
    }
  
    return article;
  }
  
  function generateFromSAP() {
    var articles = [];
    for (var i = 1; i < 5; i++) {
      txtInput = document.getElementById("Text" + i);
      let val = getArticleInfo(txtInput.value)
      if (val.PLU != "") {
        articles.push(val);
      }
      
    }
    localStorage.setItem("articles", JSON.stringify(articles));
    window.location.href = "largeLabel.html"
  }