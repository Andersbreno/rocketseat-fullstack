import http from "node:http"

const products = [
    { id: 1, name: "Camiseta", price: 20.22},
    { id: 2, name: "Sapato", price: 299.22},
    { id: 3, name: "Bermuda", price: 200.22}
]

const app = http.createServer((request, response) => {
    if (request.method === "GET" && request.url === "/products") {
        response.setHeader("Content-Type", "application/json")
        response.end(JSON.stringify(products))
    }
})

export { app }