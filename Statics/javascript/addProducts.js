var categories = [
    "mens-shirts",
    "womens-dresses",
    "mens-shoes",
    "womens-shoes",
];
var headingTitle = [
    "Men T-shirts",
    "Women Dresses",
    "Men Shoes",
    "Women Shoes",
];

var pageIndecator = window.location.href.split("?q=")[1];
var extention;

function chooseWhatToShow() {
    if (categories.includes(pageIndecator)) {
        extention = "category/" + pageIndecator;
        let i = categories.indexOf(pageIndecator);
        getData(extention, i);
    } else if (!isNaN(parseInt(pageIndecator))) {
        extention = pageIndecator;
        getData(extention);
    } else {
        for (i in categories) {
            extention = "category/" + categories[i];
            getData(extention, i);
        }
    }
}

function getData(extention, i) {
    let fileRequested = new XMLHttpRequest();
    fileRequested.open("GET", "https://dummyjson.com/products/" + extention);
    fileRequested.send();

    fileRequested.onreadystatechange = function () {
        if (fileRequested.readyState == 4 && fileRequested.status == 200) {
            var data = fileRequested.response;
            data = JSON.parse(data);
            // show a specific user or show the options to choose
            if (data.products) {
                createSeparetor(i);
                createProductsCards(data.products);
            } else {
                addProduct(data);
            }
        }
    };
}

function createSeparetor(i) {
    var categoryTitle = document.createElement("div");
    categoryTitle.setAttribute("class", "hund");
    var article = document.createElement("article");
    var categoryTitleHeading = document.createElement("h2");
    categoryTitleHeading.innerHTML = headingTitle[i];
    var hr = document.createElement("HR");
    article.append(categoryTitleHeading, hr);
    categoryTitle.appendChild(article);

    document.getElementById("products").appendChild(categoryTitle);
}

function createProductsCards(data) {
    for (let product of data) {
        // -------------------------CARD CONTAINER------------------
        var divCard = document.createElement("div");
        divCard.setAttribute("id", product.id);
        divCard.classList.add("card");
        document.getElementById("products").append(divCard);
        // ---------------------------CARD LINK---------------
        var prodLink = document.createElement("a");
        prodLink.setAttribute("href", "./product.html?q=" + product.id);
        prodLink.classList.add("card", product.id);
        document.getElementById(product.id).appendChild(prodLink);
        // ----------------------------ADD TO CART BUTTON---------
        var button = document.createElement("button");
        var buttonNode = document.createTextNode("Add to Cart");
        button.appendChild(buttonNode);
        button.setAttribute("style", "position: absolute;margin-top: 405px;");
        button.setAttribute("onclick", "addToCart()");
        document.getElementById(product.id).append(button);
        //-----------------------------IMAGE------------------------
        var img = document.createElement("img");
        img.setAttribute("src", product.thumbnail);
        //-----------------------------TITLE------------------------
        var title = document.createElement("p");
        title.style.margin = "20px 0px";
        var titleContent = document.createTextNode("Title: " + product.title);
        title.appendChild(titleContent);
        //-----------------------------BRAND------------------------
        var brand = document.createElement("p");
        var brandContent = document.createTextNode("Brand: " + product.brand);
        brand.appendChild(brandContent);
        // ----------------------------PRICE-----------------------
        var heading = document.createElement("h4");
        var headingContent = document.createTextNode(
            "EGP " + product.price + "0"
        );
        heading.appendChild(headingContent);

        document
            .getElementsByClassName(product.id)[0]
            .append(img, brand, title, heading);
    }
}

function addToCart() {
    return;
}

function onNavLoad() {
    let arr = document.querySelectorAll("div.main div.catButton button");
    let index = categories.indexOf(pageIndecator);
    console.log(arr);
    arr[index].style.backgroundColor = "black";
    arr[index].style.color = "whitesmoke";
}

function addProduct(data) {
    var images = document.getElementsByClassName("gallery__img");
    document.getElementById("thumbnail").src = data.thumbnail;
    for (var i in images) {
        images[i].src = data.images[i];
    }

    document.getElementById("product__title").innerHTML = data.title;
    document.getElementById("product__brand").innerHTML =
        "Brand: " + data.brand;
    document.getElementById("product__description").innerHTML =
        data.description;
    document.getElementById("product__price").innerHTML =
        "EGP " + data.price + "0";
    document.getElementById("stock").innerHTML =
        "Left in the stock: " + data.stock;
}
