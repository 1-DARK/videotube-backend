class Apiresponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400
    }
}
export { Apiresponse }
// 🌟 Common HTTP Response Codes
// ✅ 1xx — Informational
// 100 Continue — Request received, continue sending.
// 101 Switching Protocols — Protocol upgrade requested (e.g., HTTP to WebSockets).
// 🟢 2xx — Success
// 200 OK — Request succeeded, content returned.
// 201 Created — Resource created (e.g., after a POST request).
// 204 No Content — Request succeeded, but no content to return.
// 🟡 3xx — Redirection
// 301 Moved Permanently — Resource has been moved permanently (update your bookmarks!).
// 302 Found (Temporary Redirect) — Resource temporarily at a different URL.
// 304 Not Modified — Use cached version (often for browser caching).
// 🔴 4xx — Client Error
// 400 Bad Request — Malformed request (e.g., missing parameters).
// 401 Unauthorized — Authentication required or failed.
// 403 Forbidden — You are not allowed to access this resource.
// 404 Not Found — Resource not found.
// 405 Method Not Allowed — HTTP method not supported (e.g., trying to POST to a GET endpoint).
// 409 Conflict — Request conflicts with current server state (e.g., duplicate resource).
// 🔥 5xx — Server Error
// 500 Internal Server Error — Something went wrong on the server.
// 502 Bad Gateway — Server received an invalid response from another server.
// 503 Service Unavailable — Server overloaded or down for maintenance.
// 504 Gateway Timeout — Upstream server didn’t respond in time.