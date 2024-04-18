import { Request, Response } from "express";
import ProductsModel from "../model/ProductsModel";
import { SaveInterface } from "../model/types/RequestInterface";

export default class ProductsView {
  constructor(private readonly productsModel: ProductsModel) {}

  index = async (_req: Request, res: Response): Promise<void> => {
    const query = _req.query.page as string;
    if (query === undefined) {
      return res.redirect("/?page=1");
    }
    const books = this.productsModel.findAll(Number(query));
    books.then((books) => {
      books.forEach((book) => {
        if (book.publishedDate !== undefined) {
          book.dateString = new Date(book.publishedDate?.$date).toDateString();
        }
      });
      if (books.length > 0) {
        res.render("ProductsTemplate", {
          books,
          numberPages: this.productsModel.getNumberPages(),
        });
      } else {
        //Si no, renderiza el ErrorTemplate con un mensaje
        res.render("ErrorTemplate", {
          message: "Books were not found. What a pity",
        });
      }
    });
  };

  save = async (req: Request, res: Response) => {
    const query = req.query.id as string;
    const body = req.body as SaveInterface;
    if (body === undefined || query === undefined) {
      res
        .status(500)
        .json({ error: "There was an error pushing the questions." });
    }
    const books = this.productsModel.save(body, query);
    res.status(200).json(books);
  };

  search = async (req: Request, res: Response): Promise<void> => {
    const input = req.query.input as string;
    if (input === "") {
      return res.redirect("/");
    }
    const books = this.productsModel.search(input);
    books
      .then((books) => {
        if (books.length > 0) {
          console.log(books);
          res.render("ProductsTemplate", { books: books });
        } else {
          res.render("ErrorTemplate", {
            message: "Books were not found",
          });
        }
      })
      .catch((_error) => {
        res.render("ErrorTemplate", {
          message: "There was a problem with getting movies for the search",
        });
      });
  };
}