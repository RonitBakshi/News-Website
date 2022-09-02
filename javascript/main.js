
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

document.querySelector(".start").addEventListener("click",
    function () {
        document.querySelector(".page").classList.add("page--active");
        this.classList.add("start--close");
    }
)

function header() {
    const header = document.querySelector("header");
    const heading = header.querySelector("h1");
    const btn_list = header.querySelectorAll("li");
    const btn = header.querySelector("button");
    const list = header.querySelector("ul");
    
    btn_list.forEach(
        (element) => {
            element.addEventListener("click",
                async function () {
                    btn_list.forEach(btn => btn.classList.remove("active"));
                    this.classList.add("active");
                    response = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${this.innerText}/in.json`,requestOptions);
                    article__array(response);
                }
            )
        }
    )

    heading.addEventListener("click",
        function () {
            btn_list.forEach(btn => btn.classList.remove("active"));
            fetch_everything();
        }
    )

    btn.addEventListener("click",
        function () {
            list.classList.toggle("header__list--close");
            if( this.innerText == "menu")
            {
                this.innerText = "close";
            }
            else {
                this.innerText = "menu";
            }
        }
    )
}

async function fetch_everything() {
    const response = await fetch("https://saurav.tech/NewsAPI/everything/cnn.json", requestOptions);
    article__array(response);
}
  
async function article__array(response) {
    const result = await response.text();
    const result_json = JSON.parse(result);
    render(result_json.articles);
}

function render(articles){
    card_grid = document.querySelector(".maingrid");
    content = document.querySelector(".content");
    card_container = document.querySelector(".cardcontainer");
    card_container.innerHTML = firstcard(articles[0]);
    card_grid.innerHTML = articles.slice(1,).map(newscard).join('');
}

function newscard (article) {
    const date_and_time = article.publishedAt.match(/([\d-]{10})T([\d:]{5})/);

    return `
        <a class="newscard" href="${article.url}" target="_blank">
            <div class="newscard__top" style="background-image: url(${article.urlToImage})" >
                <div class="newscard__backdrop">
                    <div class="newscard__datetime">
                        <p class="newscard__date">
                            ${date_and_time[1]}
                        </p>
                        <p class="newscard__time">
                            ${date_and_time[2]}
                        </p>
                    </div>
                    <h2 class="newscard__title"> 
                        ${article.title}
                    </h2> 
                </div>
            </div>
            <p class="newscard__description">
                ${article.description}
            </p>
        </a>
    `
}

function firstcard (article) {
    date_and_time = article.publishedAt.match(/([\d-]{10})T([\d:]{5})/);
    return `
    <a class="firstcard" href="${article.url}" target="_blank">
        <div class="firstcard__right" style="background-image: url(${article.urlToImage})">
            <div class="firstcard__backdrop">
                <div class="firstcard__datetime">
                    <p class="firstcard__date">
                        ${date_and_time[1]}
                    </p>
                    <p class="firstcard__time">
                        ${date_and_time[2]}
                    </p>
                </div>
            </div>
        </div>
        <div class="firstcard__left">
            <h2 class="firstcard__description"> 
                ${article.title}
            </h2>
            <p class="firstcard__content">
                ${article.description}
            </p>
        </div>
    </a>
    `
}

fetch_everything();
header();