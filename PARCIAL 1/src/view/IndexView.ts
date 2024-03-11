import { Papers } from "../model/types/ArticleInterface.js";

export default class IndexView {
  //Establece las variables de la clase por Div y Body.
  private readonly sec: HTMLDivElement;

  constructor() {
    //Asigna a las variables de la clase los elementos del DOM.
    this.sec = document.querySelector("#sec") as HTMLDivElement;
  }
  //Función para desplegar las películas en el index.
  public async deploy(papers: Promise<Papers[]>): Promise<void> {
    //Espera a que se resuelva la promesa de las películas.
    return await papers
      .then((papers) => {
        //Recorre el array de películas y despliega cada una de ellas.
        papers.forEach((paper) => {
          //Añade al elemento sec, el artículo de cada película.
          this.sec.innerHTML += this.getArticle(paper);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //Función para obtener el pedazo de documento HTML que representa a cada película.
  getArticle = (paper: Papers): string => {
    //Retorna el pedazo de documento HTML que representa a cada película.
    return `<a
    href="${paper._url}">
    <div class="card">
      <div class="card-logo">
        <img src="./img/${paper._pt.split("@")[1]}.png" alt="${
      paper._pt.split("@")[1]
    }">
      </div>
      <div class="card-content">
        <h3 class = "searchh">${paper._title}</h3>
        <h5 class = "searchh"><strong>${paper._author}</strong></h5>
        <h5>${paper._journal ?? "No journal"}</h5>
        <p class = "searchh">
          ${paper._abstract}
        </p>
        <h4>Keywords</h4>
        ${this.getKeywords(paper)}
        <div class="card-footer">
          <div class="card-footer-1"><span class="card-footer-full">${paper._pt
            .split("@")[1]
            .toLocaleLowerCase()}</span></div>
          <div class="card-footer-2"><span class="card-footer-span searchh"><span><svg
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-building-fill" viewBox="0 0 16 16">
                  <path
                    d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
                </svg></span>&nbsp;${
                  paper._publisher ?? "No publisher"
                }&nbsp;&nbsp;&nbsp;<span><svg
                  xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
                  class="bi bi-clock" viewBox="0 0 16 16">
                  <path
                    d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg></span>&nbsp;${paper._year}</span></div>
        </div>
      </div>
    </div>
  </a>`;
  };

  getKeywords = (paper: Papers): string => {
    const keywords = paper._keywords.split(",");
    let liString: string = "<ul>";
    keywords.forEach((keyword) => {
      liString += `<li>${keyword}</li>`;
    });
    liString += "</ul>";
    return liString;
  };

  public searchBar(parameter: string, input: HTMLInputElement) {
    const cards = document.querySelectorAll(
      ".card"
    ) as unknown as HTMLDivElement[];
    cards.forEach((card) => {
      const h3 = card.getElementsByClassName(parameter);
      let foundMatch = false;
      for (const element of h3) {
        const txtValue =
          (element as HTMLElement).innerText ?? element.textContent;
        if (txtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
          foundMatch = true;
          break;
        }
      }
      if (foundMatch) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  public buttonClicked(btn: HTMLInputElement, input: HTMLInputElement) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      this.searchBar("searchh", input);
    });
  }
}