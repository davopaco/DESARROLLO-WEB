import { Papers } from "../model/types/ArticleInterface.js";
import searchingFunctionalitiesInterface from "../model/types/FunctionsInterface.js";

export default class IndexView {
  //Establece las variables de la clase por Div.
  private readonly sec: HTMLDivElement;
  private readonly articles: string[];
  private articlesDynamic: string[];
  private numberPages: number;

  constructor() {
    //Asigna a las variables de la clase los elementos del DOM.
    this.sec = document.querySelector("#sec") as HTMLDivElement;
    this.articles = [];
    this.articlesDynamic = [];
    this.numberPages = 0;
  }

  //Método para desplegar la vista.
  public async deploy(
    papers: Promise<Papers[]>,
    numberPapers: number,
    functionalities: searchingFunctionalitiesInterface,
    btn: HTMLInputElement,
    input: HTMLInputElement,
    filter: HTMLInputElement,
    radio: NodeListOf<HTMLInputElement>,
    currentPage: number = 1,
    articles: string[] = this.articles
  ): Promise<void> {
    //Llama a la función pushArticlesPage para hacer push de los strings de los artículos al array articles.
    await this.pushArticlesPage(papers);

    //Llama a la función deployPag para desplegar la paginación.
    await this.deployPag(articles, numberPapers);

    //Llama a la función deployArticlePag para desplegar los artículos en la página.
    this.deployArticlePag(currentPage, articles);

    //Llama a la función clickers para establecer los eventos de los botones para la página web.
    this.clickers(functionalities, numberPapers, btn, input, filter, radio);
  }

  //Método para desplegar los artículos en la página.
  deployArticlePag(actualPag: number, articles: string[]): void {
    //Se especifican el primero y el último artículo a desplegar.
    let firstNumber = actualPag * 10 - 10;
    let lastNumber = Math.min(actualPag * 10, articles.length);

    //Se despliegan los artículos en el innerHTML del Div padre.
    this.sec.innerHTML += articles.slice(firstNumber, lastNumber).join("");
  }

  //Método para destruir los artículos de la página.
  destroyArticlePag(): Promise<void> {
    //Se seleccionan todos los artículos y el contenedor de la paginación.
    const fullCard = document.querySelectorAll(".full-card");
    const pag0 = document.querySelector(".pag-0") as HTMLDivElement;

    //Se eliminan todos los elementos para los artículos.
    fullCard.forEach((card) => {
      card.remove();
    });

    //Se elimina el contenido de la paginación.
    pag0.innerHTML = "";
    return Promise.resolve();
  }

  //Método para hacer push de los strings de los artículos al array articles.
  pushArticlesPage = async (papers: Promise<Papers[]>) => {
    return await papers
      .then((papers) => {
        papers.forEach((paper) => {
          this.articles.push(this.getArticle(paper));
        });
        //Se establece el array de artículos dinámico como todos los artículos.
        this.setArticles(this.articles);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //Método para desplegar la paginación.
  deployPag(
    articles: string[],
    numberPapers: number,
    reset = false
  ): Promise<void> {
    //Se establece el número de páginas que va a tener con respecto a la cantidad de artículos sobre el número de artículos por página.
    let pag = Math.ceil(articles.length / numberPapers);
    const pag0 = document.querySelector(".pag-0") as HTMLDivElement;

    //Se establece el número de páginas en la variable de la clase numberPages.
    this.numberPages = pag;

    //Se elimina el contenido de la paginación.
    pag0.innerHTML = "";

    //Si el booleano reset es verdadero, se establece la página actual en 1.
    if (reset) {
      localStorage.setItem("currentPage", "1");
    }

    //Si el número de páginas es 0, no se despliega la paginación y se retorna una promesa resuelta.
    if (pag === 0) {
      return Promise.resolve();
    }

    //Se obtiene la página actual del local storage convertida a entero.
    const currentPage = parseInt(localStorage.getItem("currentPage") ?? "1");

    //Se establecen los números de página inicial y final.
    let firstNumber = 1;
    let lastNumber = 5;

    //Si la página actual es mayor a 5, se establecen los números de página inicial y final con respecto a la página actual.
    if ((currentPage - 1) % 5 === 0) {
      firstNumber = currentPage;
      lastNumber = currentPage + 4;
    } else {
      firstNumber = Math.floor((currentPage - 1) / 5) * 5 + 1;
      lastNumber = firstNumber + 4;
    }

    //Si el número de páginas es menor al último número, se establece el último número como el número de páginas.
    if (lastNumber > pag) lastNumber = pag;

    //Si la página actual no es 1, se despliega el botón de la izquierda.
    if (currentPage !== 1) {
      pag0.innerHTML += this.getPageDirection("left");
    }

    //Recorre el rango de números de página inicial y final y despliega los números de página correpsondientes.
    for (let i = firstNumber; i <= lastNumber; i++) {
      pag0.innerHTML += this.getPage(i);
    }

    //Si la página actual no es la última, se despliega el botón de la derecha.
    if (currentPage !== pag) {
      pag0.innerHTML += this.getPageDirection("right");
    }

    //Llama a la función setColor para establecer los estilos del div de la paginación.
    this.setColor();

    return Promise.resolve();
  }

  //Función para obtener el pedazo de documento HTML que representa a cada artículo.
  getArticle = (paper: Papers): string => {
    //Retorna el pedazo de documento HTML que representa a cada artículo.
    return `<div class="full-card"> <a
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
          <div class="card-footer-1"><span class="card-footer-full">${
            paper._pt.split("@")[1].charAt(0).toLocaleUpperCase() +
            paper._pt.split("@")[1].slice(1).toLocaleLowerCase()
          }</span></div>
          <div class="card-footer-2"><span class="card-footer-span"><span><svg
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
                </svg></span>&nbsp;<span class="searchh">${
                  paper._year
                }</span></span></div>
        </div>
      </div>
    </div>
  </a>
  </div>`;
  };

  //Función para obtener las palabras clave de un artículo.
  getKeywords = (paper: Papers): string => {
    //Obtiene un array de palabras clave a partir del string de palabras clave por artículo y las separa por coma.
    const keywords: string[] = paper._keywords.split(",");

    //Retorna un string con las palabras clave en formato de lista que luego es añadido al documento HTML por artículo.
    return `<ul>${keywords
      .map((keyword) => `<li class="keyword">${keyword}</li>`)
      .join("")}</ul>`;
  };

  //Función para obtener la parte del documento HTML que representa a cada número de página.
  getPage = (page: number): string => {
    return `<div class="pag anchor-pag">
      <a>
        <span>${page}</span>
      </a>
    </div>`;
  };

  //Función para obtener la parte del documento HTML que representa a cada botón de dirección de página.
  getPageDirection = (direction: string): string => {
    //Variable de la flecha dependiendo si la dirección es left o right.
    const arrow =
      direction === "left"
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                  </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                  </svg>`;

    return `<div class="pag anchor-pag" id="${direction}"><a href=""><span>${arrow}</span></a>
            </div>`;
  };

  //Función para establecer los eventos de los botones para la página web.
  clickers(
    functionalities: searchingFunctionalitiesInterface,
    numberPapers: number,
    btn: HTMLInputElement,
    input: HTMLInputElement,
    filter: HTMLInputElement,
    radio: NodeListOf<HTMLInputElement>
  ) {
    this.buttonClicked(btn, input, filter, radio, functionalities);
    this.anchorClicked(numberPapers);
  }

  //Función para establecer el evento de click en el botón de búsqueda.
  buttonClicked(
    btn: HTMLInputElement,
    input: HTMLInputElement,
    filter: HTMLInputElement,
    radio: NodeListOf<HTMLInputElement>,
    functionalities: searchingFunctionalitiesInterface
  ) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      //Llama a la función searchBar para realizar la búsqueda dependiendo de los parámetros e inputs.
      this.searchBar(
        "searchh",
        input,
        filter,
        "keyword",
        functionalities,
        radio
      );
    });
  }

  //Función para establecer el evento de click en los números de página y botones de dirección.
  anchorClicked(numberPapers: number) {
    //Selecciona todos los elementos de clase pag que son los contenedores para los números de la paginación.
    const pag = document.querySelectorAll(".pag") as NodeListOf<HTMLDivElement>;

    //Recorre todos los elementos de clase pag y establece el evento de click para cada uno.
    pag.forEach((pag) => {
      if (pag) {
        pag.addEventListener("click", (e) => {
          e.preventDefault();

          //Obtiene el texto del número de página.
          const pageText =
            pag.firstElementChild?.firstElementChild?.textContent ?? "";

          //Convierte el texto a número.
          let pageNumber = parseInt(pageText);

          //Si el número de página es igual al número de página actual, no hace nada.
          if (
            pageNumber === parseInt(localStorage.getItem("currentPage") ?? "")
          )
            return;

          //Si el texto no es un número, obtiene la dirección del botón.
          if (isNaN(pageNumber)) {
            //Obtiene la dirección del botón según el valor de su id.
            const direction = pag.getAttribute("id");

            //Convierte el número de página actual a número.
            const currentPage = parseInt(
              localStorage.getItem("currentPage") ?? "1"
            );

            //Si la dirección es left y la página actual es 1, no hace nada.
            if (direction === "left" && currentPage === 1) return;

            //Si la dirección es left, resta 1 al número de página actual, si no, suma 1.
            if (direction === "left") {
              pageNumber = currentPage - 1;
            } else {
              pageNumber = currentPage + 1;
            }

            //Si el número de página es menor a 1 o mayor al número de páginas, no hace nada.
            if (pageNumber > this.numberPages) return;
          }

          //Establece el número de página actual en el local storage.
          localStorage.setItem("currentPage", pageNumber.toString());

          //Llama a la función destroyArticlePag para destruir los artículos de la página.
          this.destroyArticlePag().then(async () => {
            //Una vez se destruyen, llama a las funciones para desplegar la paginación y los artículos de la página y agregar los event listeners de la paginación.
            await this.deployPag(this.articlesDynamic, numberPapers);
            this.deployArticlePag(
              parseInt(localStorage.getItem("currentPage") ?? ""),
              this.articlesDynamic
            );
            this.anchorClicked(numberPapers);
          });
        });
      }
    });
  }

  //Función para establecer los estilos del div de la paginación.
  setColor = () => {
    //Selecciona todos los elementos de clase pag.
    const pag = document.querySelectorAll(".pag") as NodeListOf<HTMLDivElement>;

    //Recorre todos los elementos de clase pag y establece el color y borde para el número de página actual.
    pag.forEach((pag) => {
      if (pag) {
        if (
          (pag.firstElementChild?.firstElementChild?.textContent ?? "") ===
          localStorage.getItem("currentPage")
        ) {
          pag.style.color = "#5e84f8";
          pag.style.border = "2px solid #5e84f8";
        }
      }
    });
  };

  //Función para realizar la búsqueda de artículos dependiendo de los parámetros e inputs.
  searchBar(
    parameter: string,
    input: HTMLInputElement,
    filter: HTMLInputElement,
    parameter2: string,
    functionalities: searchingFunctionalitiesInterface,
    radio: NodeListOf<HTMLInputElement>,
    numberPapers: number = 10
  ) {
    //Obtiene el valor del input de búsqueda principal.
    let articlesArray = functionalities.searchBar(
      parameter,
      input,
      this.articles
    );

    //Basado en los valores para el array que obtuvo en la búsqueda principal, filtra los artículos según las keywords.
    articlesArray = this.filterByKeyword(
      articlesArray,
      parameter2,
      filter,
      radio,
      functionalities
    );

    //Establece el array de artículos dinámico como el array de artículos filtrado.
    this.setArticles(articlesArray);

    //Establece el número de páginas con respecto al número de artículos por página y el array de artículos filtrado.
    this.numberPages = Math.ceil(articlesArray.length / numberPapers);

    //Llama a la función destroyArticlePag para destruir los artículos de la página.
    this.destroyArticlePag().then(async () => {
      /*Una vez se destruyen, llama a las funciones para desplegar la paginación y los artículos de la página y agregar los event listeners de la paginación.
        Aquí la paginación tiene puesto el reset en true.*/
      await this.deployPag(articlesArray, numberPapers, true);
      this.deployArticlePag(1, articlesArray);
      this.anchorClicked(10);
    });
  }

  //Función para filtrar los artículos según las keywords.
  filterByKeyword = (
    articles: string[],
    parameter: string,
    filter: HTMLInputElement,
    radio: NodeListOf<HTMLInputElement>,
    functionalities: searchingFunctionalitiesInterface
  ) => {
    //Llama a la función filterByKeyword para filtrar los artículos según las keywords.
    let articlesArray = functionalities.filterByKeyword(
      articles,
      parameter,
      filter,
      radio
    );

    //Retorna el array de artículos filtrado.
    return articlesArray;
  };

  //Función para establecer el array de artículos dinámico.
  setArticles = (articles: string[]) => {
    this.articlesDynamic = articles;
  };
}
