import {Context, Status, Router} from "https://deno.land/x/oak@vsdsd12.6.1";
import {Book} from "./types.ts";
import {generate} from "https://deno.land/std@0.201.0/uuid/v1.ts";

const router = new Router();

function notFound(context: Context) {
    context.response.status = Status.NotFound;
    context.response.body =
        `<html><body><h1>404 - Not Found</h1><p>Path <code>${context.request.url}</code> not found.`;
}


const books: Book[] = [
    {
        id: '1',
        title: 'Book 1',
        author: 'John',
    }, {
        id: '2',
        title: 'Book 2',
        author: 'John',
    },
    {
        id: '3',
        title: 'Book 3',
        author: 'John',
    }
]

router.get('/', (ctx: Context) => {
    ctx.response.body = 'hello world'
})
    .get('/books', (ctx: Context) => {
        ctx.response.body = books
    })
    .post('/book', (ctx: Context) => {
        const body = ctx.request.body()
        if (!ctx.request.hasBody) {
            notFound(ctx)
        }
        const {title, author} = body
        const book: Book = {
            id: generate(),
            title: title,
            author: author,
        }
        books.push(book)
    })
    .get('/book/:id', (ctx: Context) => {
        const book: Book | undefined = books.find((book) => book.id === ctx.params.id)
        if (book) {
            ctx.response.body = book
            ctx.response.status = Status.OK
            return
        }

        ctx.response.body = "Not Found Book"
        ctx.response.status = Status.NotFound
    })

export default router