const http = require("node:http");
const { URL } = require("node:url");
const fs = require("node:fs/promises");
const path = require("node:path");

const PORT = Number(process.env.PORT || 3001);
const DB_PATH = path.join(__dirname, "db.json");

async function loadDb() {
  const raw = await fs.readFile(DB_PATH, "utf8");
  const db = JSON.parse(raw);
  return {
    nextId: Number(db.nextId || 1),
    todos: Array.isArray(db.todos) ? db.todos : [],
  };
}

async function saveDb(db) {
  const tmp = `${DB_PATH}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await fs.rename(tmp, DB_PATH);
}

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

let writeLock = Promise.resolve();
function withWriteLock(fn) {
  writeLock = writeLock.then(fn, fn);
  return writeLock;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const method = (req.method || "GET").toUpperCase();

  if (method === "OPTIONS") {
    return send(res, 204, {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": "86400",
    });
  }

  if (method === "GET" && url.pathname === "/health") {
    return sendJson(res, 200, { ok: true, time: new Date().toISOString() });
  }

  if (method === "GET" && url.pathname === "/api/todos") {
    const db = await loadDb();
    return sendJson(res, 200, { items: db.todos });
  }

  if (method === "POST" && url.pathname === "/api/todos") {
    try {
      const body = await readJson(req);
      const text = String(body?.text || "").trim();
      if (!text) return sendJson(res, 400, { error: "text is required" });

      const result = await withWriteLock(async () => {
        const db = await loadDb();
        const todo = { id: db.nextId++, text, done: false };
        db.todos = [todo, ...db.todos];
        await saveDb(db);
        return todo;
      });

      return sendJson(res, 201, { item: result });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  const todoIdMatch = url.pathname.match(/^\/api\/todos\/(\d+)$/);
  if (todoIdMatch && method === "PATCH") {
    const id = Number(todoIdMatch[1]);
    try {
      const body = await readJson(req);
      const done =
        typeof body?.done === "boolean" ? body.done : body?.done === "true" ? true : null;
      if (done === null) return sendJson(res, 400, { error: "done must be boolean" });

      const updated = await withWriteLock(async () => {
        const db = await loadDb();
        let found = false;
        db.todos = db.todos.map((t) => {
          if (t.id !== id) return t;
          found = true;
          return { ...t, done };
        });
        if (!found) return null;
        await saveDb(db);
        return true;
      });

      if (!updated) return sendJson(res, 404, { error: "not found" });
      return sendJson(res, 200, { ok: true });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  if (todoIdMatch && method === "DELETE") {
    const id = Number(todoIdMatch[1]);

    const deleted = await withWriteLock(async () => {
      const db = await loadDb();
      const before = db.todos.length;
      db.todos = db.todos.filter((t) => t.id !== id);
      if (db.todos.length === before) return false;
      await saveDb(db);
      return true;
    });

    if (!deleted) return sendJson(res, 404, { error: "not found" });
    return sendJson(res, 200, { ok: true });
  }

  return sendJson(res, 404, { error: "route not found", method, path: url.pathname });
});

server.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  console.log("Try GET /api/todos");
});

