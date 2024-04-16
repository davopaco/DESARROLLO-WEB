import {
  ProductsInterface,
  ToSearchInterface,
} from "./types/ProductsInterface";
import data from "../data.json";
import { SaveInterface } from "./types/RequestInterface";

export default class ProductsModel {
  private questions: SaveInterface[];

  constructor() {
    this.questions = [];
  }

  findAll = async (): Promise<ProductsInterface[]> => {
    return await new Promise((resolve, reject) => {
      if (data) {
        resolve(data);
      } else {
        reject(new Error("No data found"));
      }
    });
  };

  save = (content: SaveInterface, query: string): boolean => {
    try {
      content["id"] = query;
      this.questions.push(content);
      console.log(this.questions);
      return true;
    } catch (error) {
      return false;
    }
  };

  search = async (input: string): Promise<ProductsInterface[]> => {
    return await new Promise((resolve, reject) => {
      //Se crea un array de strings para guardar los artículos que cumplan con el criterio de búsqueda.
      if (data) {
        let booksArray: ProductsInterface[] = [];
        //Se itera sobre cada artículo.
        data.forEach((book) => {
          //Booleano para saber si se encontró una coincidencia.
          let foundMatch = false;
          //Objeto con los atributos del artículo que se van a buscar.
          const toSearch: ToSearchInterface = {
            shortDescription: book.shortDescription,
            longDescription: book.longDescription,
          };

          //Se itera sobre los atributos del objeto toSearch para buscar coincidencias.
          Object.keys(toSearch).forEach((key) => {
            if (typeof toSearch[key] === "string") {
              if (
                (toSearch[key] as string)
                  .toUpperCase()
                  .indexOf(input.toUpperCase()) > -1
              ) {
                foundMatch = true;
              }
            }
          });
          //Si se encontró una coincidencia, se agrega el artículo al array de artículos.
          if (foundMatch) {
            booksArray.push(book);
          }
        });
        resolve(booksArray);
      } else {
        reject(new Error("No data found"));
      }

      //Se retorna el array de artículos filtrado.
    });
  };
}
