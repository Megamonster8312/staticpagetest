export default {
  async fetch(request, env, ctx) {
    const upstreamUrl = new URL(request.url);
    
    // Changing the target backend server configuration
    upstreamUrl.hostname = "alpha.aspecthosting.eu";
    upstreamUrl.port = "25750";
    upstreamUrl.protocol = "http:"; // Using HTTPS

    const newHeaders = new Headers(request.headers);
    newHeaders.set("Host", upstreamUrl.host);

    const proxyRequest = new Request(upstreamUrl.toString(), {
      method: request.method,
      headers: newHeaders,
      body: request.body,
      redirect: "manual" 
    });

    try {
      // we add cloudflare-specific fetch options to ignore invalid/self-signed cert errors
      let response = await fetch(proxyRequest, {
        cf: {
          tlsSni: "de1.kvxos.co.uk"
        }
      });

      const incomingUrl = new URL(request.url);

      // Handle response redirects to prevent /login loops
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        let location = response.headers.get("Location");
        if (location) {
          if (location.startsWith("/")) {
            location = `${incomingUrl.protocol}//${incomingUrl.host}${location}`;
          } else {
            const targetHostString = "de1.kvxos.co.uk:9021";
            if (location.includes(targetHostString)) {
              location = location.replace(targetHostString, incomingUrl.host);
            }
          }

          const modifiedHeaders = new Headers(response.headers);
          modifiedHeaders.set("Location", location);

          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: modifiedHeaders
          });
        }
      }

      return response;
    } catch (error) {
      return new Response(`Proxy Error: ${error.message}`, { status: 502 });
    }
  }
};
