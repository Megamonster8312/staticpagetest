const http = require('http');

const PORT = 3000;

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WRNS Server Status</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #f8fafc;
      padding: 1.5rem;
    }

    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      max-width: 480px;
      width: 100%;
      padding: 2.5rem 2rem;
      text-align: center;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background-color: rgba(239, 68, 68, 0.15);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1.5rem;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background-color: #ef4444;
      border-radius: 50%;
      display: inline-block;
      box-shadow: 0 0 8px #ef4444;
    }

    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 0.75rem;
    }

    p {
      color: #94a3b8;
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .details {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 1rem;
      text-align: left;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.825rem;
      color: #cbd5e1;
    }

    .details-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.35rem;
    }

    .details-row:last-child {
      margin-bottom: 0;
    }

    .details-label {
      color: #64748b;
    }

    .btn-retry {
      display: inline-block;
      margin-top: 1.75rem;
      background-color: #3b82f6;
      color: #ffffff;
      text-decoration: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.95rem;
      transition: background-color 0.2s ease;
      cursor: pointer;
      border: none;
    }

    .btn-retry:hover {
      background-color: #2563eb;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="status-badge">
      <span class="status-dot"></span>
      Service Offline
    </div>
    <h1>WRNS Server is Down</h1>
    <p>We are unable to establish a connection to the WRNS server cluster. Systems are currently unreachable.</p>
    
    <div class="details">
      <div class="details-row">
        <span class="details-label">Target Host:</span>
        <span>wrns-primary.internal</span>
      </div>
      <div class="details-row">
        <span class="details-label">Error Code:</span>
        <span>503_SERVICE_UNAVAILABLE</span>
      </div>
      <div class="details-row">
        <span class="details-label">Timestamp:</span>
        <span id="timestamp"></span>
      </div>
    </div>

    <button class="btn-retry" onclick="window.location.reload()">Retry Connection</button>
  </div>

  <script>
    document.getElementById('timestamp').textContent = new Date().toISOString();
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(503, {
    'Content-Type': 'text/html; charset=utf-8',
    'Retry-After': '300'
  });
  res.end(htmlContent);
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
