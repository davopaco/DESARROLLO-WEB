import { Articles, Papers } from "./types/ArticleInterface.js";

// Define la clase del modelo.
export default class IndexModel {
  private readonly input: HTMLInputElement;
  private readonly btn: HTMLInputElement;
  private readonly paperNumber: number = 10;
  private readonly pag0: HTMLDivElement;
  private readonly radio: HTMLInputElement;

  constructor() {
    this.input = document.querySelector("#search-bar") as HTMLInputElement;
    this.btn = document.querySelector("#search-btn") as HTMLInputElement;
    this.pag0 = document.querySelector(".pag-0") as HTMLDivElement;
    this.radio = document.querySelector("#radio") as HTMLInputElement;
  }

  public async getPapers(): Promise<Papers[]> {
    return await new Promise((resolve, reject) => {
      const response = fetch("http://localhost:1802/ref/references/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response
        .then((data) => {
          data.json().then((data: Articles) => {
            resolve(data.papers);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getInput() {
    return this.input;
  }

  public getBtn() {
    return this.btn;
  }

  public getPaperNumber() {
    return this.paperNumber;
  }

  public getPag0() {
    return this.pag0;
  }

  public getRadio() {
    return this.radio;
  }
}
