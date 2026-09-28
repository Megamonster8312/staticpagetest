export default {
  async fetch(request, env, ctx) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We'll Be Right Back</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background-color: #f7f9fa;
      color: #1a202c;
      padding: 1.5rem;
      box-sizing: border-box;
      text-align: center;
    }
    .card {
      background: #ffffff;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      max-width: 480px;
      width: 100%;
    }
    h1 {
      font-size: 1.75rem;
      margin-top: 0;
      margin-bottom: 0.75rem;
      color: #111827;
    }
    p {
      font-size: 1rem;
      line-height: 1.5;
      color: #4b5563;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>We'll be right back.</h1>
    <p>We're just preparing things behind the scenes — thank you for your patience!</p>
  </div>
</body>
</html>`;

    return new Response(html, {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "Retry-After": "300"
      }
    });
  }
};
