const encoder = new TextEncoder()
const helloText = encoder.encode('hello world')

await Deno.writeFile('hello.txt', helloText)