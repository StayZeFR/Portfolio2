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
        const projects = document.getElementById("projects");
        for (key in data) {
            const title = key;
            const description = data[key].description;
            const img = data[key].img;
            let html = "";
        }
    });
});