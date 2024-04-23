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
});