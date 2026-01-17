const http = require("node:http");
const { URL } = require("node:url");

const PORT = Number(process.env.PORT || 3000);

let nextId = 1;
let todos = [
  { id: nextId++, text: "Learn HTTP methods", done: false },
  { id: nextId++, text: "Return JSON", done: true },
];

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

function sendJson(res, status, data) {
  send(
    res,
    status,
    {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
    },
    JSON.stringify(data, null, 2),
  );
}

function sendText(res, status, text) {
  send(
    res,
    status,
    {
      "content-type": "text/plain; charset=utf-8",
      "access-control-allow-origin": "*",
    },
    text,
  );
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body) return resolve(null);
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const method = (req.method || "GET").toUpperCase();

  // Preflight CORS
  if (method === "OPTIONS") {
    return send(res, 204, {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": "86400",
    });
  }

  if (method === "GET" && url.pathname === "/") {
    return sendText(
      res,
      200,
      [
        "Node HTTP API is running.",
        "",
        "Try:",
        "  GET  /health",
        "  GET  /api/todos",
        "  POST /api/todos   {\"text\":\"...\"}",
        "  PATCH /api/todos/:id  {\"done\":true}",
        "  DELETE /api/todos/:id",
        "",
      ].join("\n"),
    );
  }

  if (method === "GET" && url.pathname === "/health") {
    return sendJson(res, 200, { ok: true, time: new Date().toISOString() });
  }

  if (method === "GET" && url.pathname === "/api/todos") {
    return sendJson(res, 200, { items: todos });
  }

  if (method === "POST" && url.pathname === "/api/todos") {
    try {
      const body = await readJson(req);
      const text = String(body?.text || "").trim();
      if (!text) return sendJson(res, 400, { error: "text is required" });

      const todo = { id: nextId++, text, done: false };
      todos = [todo, ...todos];
      return sendJson(res, 201, { item: todo });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  const todoIdMatch = url.pathname.match(/^\/api\/todos\/(\d+)$/);
  if (todoIdMatch) {
    const id = Number(todoIdMatch[1]);

    if (method === "PATCH") {
      try {
        const body = await readJson(req);
        const done =
          typeof body?.done === "boolean" ? body.done : body?.done === "true" ? true : null;
        if (done === null) return sendJson(res, 400, { error: "done must be boolean" });

        let found = false;
        todos = todos.map((t) => {
          if (t.id !== id) return t;
          found = true;
          return { ...t, done };
        });
        if (!found) return sendJson(res, 404, { error: "not found" });
        return sendJson(res, 200, { ok: true });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    if (method === "DELETE") {
      const before = todos.length;
      todos = todos.filter((t) => t.id !== id);
      if (todos.length === before) return sendJson(res, 404, { error: "not found" });
      return sendJson(res, 200, { ok: true });
    }
  }

  return sendJson(res, 404, { error: "route not found", method, path: url.pathname });
});

server.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

