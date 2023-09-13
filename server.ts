import {Application, Router, Status, Context} from "https://deno.land/x/oak/mod.ts";
import {generate} from "https://deno.land/std@0.201.0/uuid/v1.ts";

const app = new Application();

const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods())

function notFound(context: Context) {
    context.response.status = Status.NotFound;
    context.response.body =
        `<html><body><h1>404 - Not Found</h1><p>Path <code>${context.request.url}</code> not found.`;
}

interface Book {
    id: string | number[];
    title: string;
    author: string;
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

router.get('/', (ctx) => {
    ctx.response.body = 'hello world'
})
    .get('/books', (ctx) => {
        ctx.response.body = books
    })
    .post('/book', (ctx) => {
        const body = ctx.request.body()
        if (!context.request.hasBody) {
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

await app.listen({port: 8000});