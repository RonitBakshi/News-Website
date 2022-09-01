
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
  
async function fetch_everything() {
    let response = await fetch("https://saurav.tech/NewsAPI/everything/cnn.json", requestOptions);
    result = await response.text();
    result_json = JSON.parse(result);
    render(result_json.articles);
}

function render(articles){
    card_grid = document.querySelector(".maingrid");
    content = document.querySelector(".content")
    content.insertAdjacentHTML("afterbegin", firstcard(articles[0]));
    card_grid.insertAdjacentHTML("beforeend", articles.slice(1,).map(newscard).join(''));
}

function newscard (article) {
    date_and_time = article.publishedAt.match(/([\d-]{10})T([\d:]{5})/);
    return `
        <div class="newscard">
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
        </div>
    `
}

function firstcard (article) {
    date_and_time = article.publishedAt.match(/([\d-]{10})T([\d:]{5})/);
    return `
    <div class="firstcard">
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
    </div>
    `
}

fetch_everything();