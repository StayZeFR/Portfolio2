async function loadJson(filePath) {
    try {
        const response = await fetch(filePath);
        let data = null;
        if (response.ok) {
            data = await response.json();
        }
        return data;
    } catch (error) {
        console.error("Error :", error);
    }
}

function parseRssFeed(xml) {
    const articles = [];
    const items = xml.getElementsByTagName("item");
    for (let i = 0; i < items.length; i++) {
        const article = {
            titre: items[i].getElementsByTagName("title")[0].textContent,
            description: items[i].getElementsByTagName("description")[0].textContent,
            lien: items[i].getElementsByTagName("link")[0].textContent,
            date: new Date(items[i].getElementsByTagName("pubDate")[0].textContent)
        };
        articles.push(article);
    }
    return articles;
}

function getRssFeed(url) {
    $.ajax({
        url: "FeedRss.php",
        method: "POST",
        dataType: "json",
        data: {
            url: JSON.stringify(url)
        },
        async: true,
        success: function (result) {
            const rssContainer = document.getElementById("rss_container");
            result.forEach(element => {
                let html = "<h4 class='rss-cards-title'>" + element.title + "</h4>";
                const articles = element.items;
                for (let i = 0; i < articles.length; i++) {
                    const article = articles[i];
                    const date = convertDate(article.date.toString().substring(0, 24));
                    html += "<div class='rss-cards'>";
                    html += "<div class='rss-cards-title'>" + article.title + "</div>";
                    html += "<br>";
                    html += "<div class='rss-cards-description'>" + article.description + "</div>";
                    html += "<br>";
                    html += "<div class='rss-cards-date'>" + date["date"] + " " + date["hours"] + "</div>";
                    html += "<br>";
                    html += "<div class='rss-cards-link'>";
                    html += "<a href='" + article.link + "' target='_blank'>Lire l'article</a>";
                    html += "</div>";
                    html += "</div>";
                }
                rssContainer.innerHTML += html;
            });
        }
    });
}


function convertDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const ddMMYYYY = `${pad(day, 2)}/${pad(month, 2)}/${year}`;
    const mmHH = `${pad(minutes, 2)}:${pad(hours, 2)}`;

    return { date: ddMMYYYY, hours: mmHH };
}

function pad(number, length) {
    let str = number.toString();
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
}

document.addEventListener("DOMContentLoaded", function () {
    const filePath = "../projects.json";
    loadJson(filePath).then(data => {
        const projects = document.getElementById("projects_container");
        for (let key in data) {
            const title = key;
            const description = data[key].description;
            const img = data[key].img;
            const links = data[key].docs;
            let html = "<div class='projects-cards'>";
            html += "<div class='projects-cards-img'>";
            html += "<img src='" + img + "' alt='Project Image'>";
            html += "</div>";
            html += "<br>";
            html += "<div class='projects-cards-title'>" + title + "</div>";
            html += "<br>";
            html += "<div class='projects-cards-description'>" + description + "</div>";
            html += "<br>";
            html += "<div class='projects-cards-docs'>";
            for (let doc in links) {
                html += "<a href='" + links[doc] + "' target='_blank'>" + doc + "</a>";
            }
            html += "</div>";
            html += "</div>";
            projects.innerHTML += html;
        }
    });

    const rssFeed = [
        "https://phppot.com/feed/",
        "https://blog.jetbrains.com/phpstorm/feed/",
    ];

    getRssFeed(rssFeed);

});