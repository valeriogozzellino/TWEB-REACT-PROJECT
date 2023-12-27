function init(){
    getFootballNews();
}

//@todo : implementing
async function getFootballNews() {
    try {
        const response = await axios.get("/get-news");

        if (response.data.totalArticles > 0) {
            const articles = response.data.articles;
            const containerNews = document.getElementById('containerBoxNews');
            const scrollContainer = document.getElementById('scroll-container');
            for (let i = 0; i < 10; i++) {
                const article = articles[i];
                const boxNews = document.createElement("div");
                const boxImage= document.createElement("div");
                const boxTitle= document.createElement("div");
                const titleNews = document.createElement("h1");
                const image = document.createElement("img");

                boxImage.className="boxImageNews";
                boxTitle.className="boxTitleNews";
                boxNews.className = "boxSingleNews";
                titleNews.innerText = article.title;
                titleNews.className= "titleNews"

                if (article.image) {
                    image.src = article.image;
                    image.alt = article.title;
                    image.className= "imageNews"
                    boxImage.appendChild(image);
                    boxNews.appendChild(boxImage);
                }
                boxTitle.appendChild(titleNews);
                boxNews.appendChild(boxTitle);
                if(i<6){
                    containerNews.appendChild(boxNews);
                }else{
                    scrollContainer.appendChild(boxNews);
                }
            }

        } else {
            console.error("Nessun articolo disponibile");
        }
    } catch (error) {
        console.error("Errore durante la richiesta all'API:", error);
    }
}

function toggleMenu() {
    const menu = document.getElementById("menu");
    // Inverti la visibilità del menu
    menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "block" : "none";
}

