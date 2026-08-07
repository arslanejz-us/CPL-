/**
 * Local dev server — static files + mock form API for testing submissions.
 * Usage: node dev-server.js
 * Open: http://localhost:8080
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".php": "application/json; charset=utf-8",
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload));
}

function handleFormSubmit(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    let data = {};
    try {
      data = JSON.parse(body || "{}");
    } catch {
      sendJson(res, 400, { success: false, message: "Invalid request body" });
      return;
    }

    const email = (data.Email || data.email || "").trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      sendJson(res, 400, { success: false, message: "A valid email address is required" });
      return;
    }

    const logDir = path.join(ROOT, "storage", "form-submissions");
    fs.mkdirSync(logDir, { recursive: true });
    const entry = {
      id: Date.now(),
      formType: data.formType || "general",
      submittedAt: new Date().toISOString(),
      data,
    };
    fs.appendFileSync(
      path.join(logDir, `${new Date().toISOString().slice(0, 10)}.jsonl`),
      JSON.stringify(entry) + "\n"
    );

    sendJson(res, 200, {
      success: true,
      message: "Form submitted successfully! We'll get back to you soon.",
      data: { id: entry.id },
    });
  });
}

function serveStatic(req, res) {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS" && req.url.includes("form-submit")) {
    sendJson(res, 204, {});
    return;
  }

  if (req.method === "POST" && req.url.includes("api/form-submit")) {
    handleFormSubmit(req, res);
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
  console.log("Form API mock: POST /api/form-submit.php");
  console.log("Submissions log: storage/form-submissions/");
});
