var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class IndexView {
    constructor() {
        //Función para obtener el pedazo de documento HTML que representa a cada artículo.
        this.getArticle = (paper) => {
            var _a, _b;
            //Retorna el pedazo de documento HTML que representa a cada artículo.
            return `<div class="full-card"> <a
    href="${paper._url}">
    <div class="card">
      <div class="card-logo">
        <img src="./img/${paper._pt.split("@")[1]}.png" alt="${paper._pt.split("@")[1]}">
      </div>
      <div class="card-content">
        <h3 class = "searchh">${paper._title}</h3>
        <h5 class = "searchh"><strong>${paper._author}</strong></h5>
        <h5>${(_a = paper._journal) !== null && _a !== void 0 ? _a : "No journal"}</h5>
        <p class = "searchh">
          ${paper._abstract}
        </p>
        <h4>Keywords</h4>
        ${this.getKeywords(paper)}
        <div class="card-footer">
          <div class="card-footer-1"><span class="card-footer-full">${paper._pt.split("@")[1].charAt(0).toLocaleUpperCase() +
                paper._pt.split("@")[1].slice(1).toLocaleLowerCase()}</span></div>
          <div class="card-footer-2"><span class="card-footer-span"><span><svg
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-building-fill" viewBox="0 0 16 16">
                  <path
                    d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
                </svg></span>&nbsp;${(_b = paper._publisher) !== null && _b !== void 0 ? _b : "No publisher"}&nbsp;&nbsp;&nbsp;<span><svg
                  xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
                  class="bi bi-clock" viewBox="0 0 16 16">
                  <path
                    d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg></span>&nbsp;<span class="searchh">${paper._year}</span></span></div>
        </div>
      </div>
    </div>
  </a>
  </div>`;
        };
        //Función para obtener las palabras clave de un artículo.
        this.getKeywords = (paper) => {
            //Obtiene un array de keywords dependiendo si el atributo _keywords es un array o un string.
            const keywords = Array.isArray(paper._keywords)
                ? paper._keywords
                : paper._keywords.split(",");
            //Retorna un string con las palabras clave en formato de lista que luego es añadido al documento HTML por artículo.
            return `<ul>${keywords
                .map((keyword) => `<li class="keyword">${keyword}</li>`)
                .join("")}</ul>`;
        };
        //Función para obtener la parte del documento HTML que representa a cada número de página.
        this.getPage = (page) => {
            return `<div class="pag anchor-pag">
      <a>
        <span>${page}</span>
      </a>
    </div>`;
        };
        //Función para obtener la parte del documento HTML que representa a cada botón de dirección de página.
        this.getPageDirection = (direction) => {
            //Variable de la flecha dependiendo si la dirección es left o right.
            const arrow = direction === "left"
                ? `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                  </svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                  </svg>`;
            return `<div class="pag anchor-pag" id="${direction}"><a href=""><span>${arrow}</span></a>
            </div>`;
        };
        //Función para obtener la parte del documento HTML que representa a cada radio button.
        this.getRadio = (keyword, id) => {
            return `<li>
                <input type="radio" name="radio" id="radio${id}">
                <label for="radio${id}">${keyword}</label>
              </li>`;
        };
        //Función para establecer los estilos del div de la paginación.
        this.setColor = () => {
            //Selecciona todos los elementos de clase pag.
            const pag = document.querySelectorAll(".pag");
            //Recorre todos los elementos de clase pag y establece el color y borde para el número de página actual.
            pag.forEach((pag) => {
                var _a, _b, _c;
                if (pag) {
                    if (((_c = (_b = (_a = pag.firstElementChild) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.textContent) !== null && _c !== void 0 ? _c : "") ===
                        localStorage.getItem("currentPage")) {
                        pag.style.color = "#5e84f8";
                        pag.style.border = "2px solid #5e84f8";
                    }
                }
            });
        };
        //Función para filtrar los artículos según las keywords.
        this.filterByKeyword = (articles, functionalities) => {
            //Crea un array de keywords.
            const keywords = [];
            //Selecciona todos los elementos de tipo radio.
            const radio = document.querySelectorAll("input[type=radio]");
            //Itera sobre los elementos de tipo radio y si el radio está seleccionado, añade la keyword al array de keywords.
            radio.forEach((radio) => {
                var _a, _b;
                if (radio.checked) {
                    radio.checked = false;
                    keywords.push((_b = (_a = radio.nextElementSibling) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : "");
                    return;
                }
            });
            //Si el input de la búsqueda no está vacío, añade las keywords al array de keywords.
            if (this.filter.value !== "") {
                this.filter.value.split(",").forEach((keyword) => {
                    keywords.push(keyword.trim());
                });
            }
            //Filtra los artículos según las keywords usando la funcionalidad filterByKeyword basada en searchingFunctionalitiesInterface.
            let articlesArray = functionalities.filterByKeyword(keywords, articles);
            //Retorna el array de artículos filtrado.
            return articlesArray;
        };
        //Asigna a las variables de la clase los elementos del DOM.
        this.sec = document.querySelector("#sec");
        this.input = document.querySelector("#search-bar");
        this.btn = document.querySelector("#search-btn");
        this.filter = document.querySelector("#inloc");
        this.radioSec = document.querySelector(".location");
        this.numberPages = 0;
    }
    //Método para desplegar la vista.
    deploy(articles, numberPapers, functionalities, keywords, currentPage = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            //Llama a la función deployPag para desplegar la paginación.
            yield this.deployPag(articles, numberPapers);
            //Llama a la función deployRadio para desplegar los radio buttons en la página.
            yield this.deployRadio(keywords);
            //Llama a la función deployArticlePag para desplegar los artículos en la página.
            this.deployArticlePag(currentPage, articles, numberPapers);
            //Llama a la función clickers para establecer los eventos de los botones para la página web.
            this.clickers(functionalities, numberPapers, articles);
        });
    }
    //Método para desplegar los artículos en la página.
    deployArticlePag(actualPag, articles, numberPapers) {
        //Se especifican el primero y el último artículo a desplegar.
        let firstNumber = actualPag * numberPapers - numberPapers;
        let lastNumber = Math.min(actualPag * numberPapers, articles.length);
        //Se despliegan los artículos en el innerHTML del Div padre.
        articles.forEach((article, index) => {
            if (index >= firstNumber && index < lastNumber) {
                this.sec.innerHTML += this.getArticle(article);
            }
        });
    }
    //Método para destruir los artículos de la página.
    destroyArticlePag() {
        //Se seleccionan todos los artículos y el contenedor de la paginación.
        const fullCard = document.querySelectorAll(".full-card");
        const pag0 = document.querySelector(".pag-0");
        //Se eliminan todos los elementos para los artículos.
        fullCard.forEach((card) => {
            card.remove();
        });
        //Se elimina el contenido de la paginación.
        pag0.innerHTML = "";
        return Promise.resolve();
    }
    //Método para desplegar la paginación.
    deployPag(articles, numberPapers, reset = false) {
        var _a;
        //Se establece el número de páginas que va a tener con respecto a la cantidad de artículos sobre el número de artículos por página.
        let pag = Math.ceil(articles.length / numberPapers);
        const pag0 = document.querySelector(".pag-0");
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
        const currentPage = parseInt((_a = localStorage.getItem("currentPage")) !== null && _a !== void 0 ? _a : "1");
        //Se establecen los números de página inicial y final.
        let firstNumber = 1;
        let lastNumber = 5;
        //Si la página actual es mayor al número de páginas estipulado, se establecen los números de página inicial y final con respecto a la página actual.
        if ((currentPage - 1) % 5 === 0) {
            firstNumber = currentPage;
            lastNumber = currentPage + 4;
        }
        else {
            firstNumber = Math.floor((currentPage - 1) / 5) * 5 + 1;
            lastNumber = firstNumber + 4;
        }
        //Si el número de páginas es menor al último número, se establece el último número como el número de páginas.
        if (lastNumber > pag)
            lastNumber = pag;
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
    //Método para desplegar los radio buttons en la página.
    deployRadio(keywords) {
        //Se elimina el contenido del contenedor de los radio buttons.
        this.radioSec.innerHTML = "";
        //Se itera sobre cada keyword y se despliega un radio button con su respectiva keyword.
        keywords.forEach((keyword, index) => {
            this.radioSec.innerHTML += this.getRadio(keyword.keyword, index + 1);
        });
        return Promise.resolve();
    }
    //Función para establecer los eventos de los botones para la página web.
    clickers(functionalities, numberPapers, articles) {
        return __awaiter(this, void 0, void 0, function* () {
            this.buttonClicked(functionalities, articles);
            this.anchorClicked(numberPapers, articles);
        });
    }
    //Función para establecer el evento de click en el botón de búsqueda.
    buttonClicked(functionalities, articles) {
        this.btn.addEventListener("click", (e) => {
            e.preventDefault();
            //Llama a la función searchBar para realizar la búsqueda dependiendo de los artículos y las funcionalidades.
            this.searchBar(articles, functionalities);
        });
    }
    //Función para establecer el evento de click en los números de página y botones de dirección.
    anchorClicked(numberPapers, articles) {
        //Selecciona todos los elementos de clase pag que son los contenedores para los números de la paginación.
        const pag = document.querySelectorAll(".pag");
        //Recorre todos los elementos de clase pag y establece el evento de click para cada uno.
        pag.forEach((pag) => {
            if (pag) {
                pag.addEventListener("click", (e) => {
                    var _a, _b, _c, _d, _e;
                    e.preventDefault();
                    //Obtiene el texto del número de página.
                    const pageText = (_c = (_b = (_a = pag.firstElementChild) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.textContent) !== null && _c !== void 0 ? _c : "";
                    //Convierte el texto a número.
                    let pageNumber = parseInt(pageText);
                    //Si el número de página es igual al número de página actual, no hace nada.
                    if (pageNumber === parseInt((_d = localStorage.getItem("currentPage")) !== null && _d !== void 0 ? _d : ""))
                        return;
                    //Si el texto no es un número, obtiene la dirección del botón.
                    if (isNaN(pageNumber)) {
                        //Obtiene la dirección del botón según el valor de su id.
                        const direction = pag.getAttribute("id");
                        //Convierte el número de página actual a número.
                        const currentPage = parseInt((_e = localStorage.getItem("currentPage")) !== null && _e !== void 0 ? _e : "1");
                        //Si la dirección es left y la página actual es 1, no hace nada.
                        if (direction === "left" && currentPage === 1)
                            return;
                        //Si la dirección es left, resta 1 al número de página actual, si no, suma 1.
                        if (direction === "left") {
                            pageNumber = currentPage - 1;
                        }
                        else {
                            pageNumber = currentPage + 1;
                        }
                        //Si el número de página es menor a 1 o mayor al número de páginas, no hace nada.
                        if (pageNumber > this.numberPages)
                            return;
                    }
                    //Establece el número de página actual en el local storage.
                    localStorage.setItem("currentPage", pageNumber.toString());
                    //Llama a la función destroyArticlePag para destruir los artículos de la página.
                    this.destroyArticlePag().then(() => __awaiter(this, void 0, void 0, function* () {
                        var _f;
                        //Una vez se destruyen, llama a las funciones para desplegar la paginación y los artículos de la página y agregar los event listeners de la paginación.
                        yield this.deployPag(articles, numberPapers);
                        this.deployArticlePag(parseInt((_f = localStorage.getItem("currentPage")) !== null && _f !== void 0 ? _f : ""), articles, numberPapers);
                        this.anchorClicked(numberPapers, articles);
                    }));
                });
            }
        });
    }
    //Función para realizar la búsqueda de artículos dependiendo de los parámetros e inputs.
    searchBar(articles, functionalities, numberPapers = 10) {
        /*Obtiene una copia del array de artículos dependiendo del valor del input de la búsqueda, haciendo uso de
          la funcionalidad searchBar basada en la de searchingFunctionalitiesInterface*/
        let articlesArray = functionalities
            .searchBar(this.input.value, articles)
            .slice();
        //Se crea una variable auxiliar para guardar la copia del array de artículos.
        let articlesArray2 = articlesArray.slice();
        //Se eliminan todos los elementos del array de artículos.
        articlesArray.length = 0;
        //Basado en los valores para el array que obtuvo en la búsqueda principal, filtra los artículos según las keywords.
        articlesArray.push(...this.filterByKeyword(articlesArray2, functionalities));
        //Establece el número de páginas con respecto al número de artículos por página y el array de artículos filtrado.
        this.numberPages = Math.ceil(articlesArray.length / numberPapers);
        //Llama a la función destroyArticlePag para destruir los artículos de la página.
        this.destroyArticlePag().then(() => __awaiter(this, void 0, void 0, function* () {
            /*Una vez se destruyen, llama a las funciones para desplegar la paginación y los artículos de la página y agregar los event listeners de la paginación.
              Aquí la paginación tiene puesto el reset en true.*/
            yield this.deployPag(articlesArray, numberPapers, true);
            this.deployArticlePag(1, articlesArray, numberPapers);
            this.anchorClicked(10, articlesArray);
        }));
    }
}
