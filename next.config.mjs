/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['sweekarme.in', 'anantsoftcomputing.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sweekarme.in',
        pathname: '/:path*',
      },
      {
        protocol: 'https',
        hostname: 'anantsoftcomputing.com',
        pathname: '/:path*',
      },
      {
        protocol: 'https',
        hostname: 'www.sweekarme.in',
        pathname: '/:path*',
      },
    ],
  },
  async rewrites() {
    return [
      // Specific CRM login route - serve from oeccrm folder
      {
        source: '/oeccrm/login',
        destination: '/oeccrm/index.html',
      },
      // CRM static files - serve as-is (don't redirect to index.html)
      {
        source: '/oeccrm/static/:path*',
        destination: '/oeccrm/static/:path*',
      },
      // CRM manifest and other files
      {
        source: '/oeccrm/manifest.json',
        destination: '/oeccrm/manifest.json',
      },
      {
        source: '/oeccrm/favicon.ico',
        destination: '/oeccrm/favicon.ico',
      },
      // All other oeccrm routes for client-side routing (MUST be after static files)
      {
        source: '/oeccrm/:path*',
        destination: '/oeccrm/index.html',
      },
      // Direct access to CRM files (for assets) - also check crm folder as fallback
      {
        source: '/crm/static/:path*',
        destination: '/crm/static/:path*',
      },
      // Handle CRM client-side routing - serve index.html for all other CRM routes
      {
        source: '/crm/:path*',
        destination: '/crm/index.html',
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all CRM files
        source: '/crm/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http: data: blob:; style-src 'self' 'unsafe-inline' https: http: data:; img-src 'self' data: blob: https: http:; font-src 'self' data: https: http:; connect-src 'self' https: http: wss: ws: data:; media-src 'self' data: blob: https: http:; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; worker-src 'self' blob:; child-src 'self' blob:;"
          },
        ],
      },
      {
        // Completely permissive CSP for CRM launcher
        source: '/oeccrm',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src * 'unsafe-eval' 'unsafe-inline' data: blob:; default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; style-src * 'unsafe-inline' data:; img-src * data: blob:; font-src * data:; connect-src * data:; media-src * data: blob:; object-src *; base-uri *; frame-ancestors *; worker-src * blob:; child-src * blob:;"
          },
        ],
      },
      {
        // Also for trailing slash
        source: '/oeccrm/',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src * 'unsafe-eval' 'unsafe-inline' data: blob:; default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; style-src * 'unsafe-inline' data:; img-src * data: blob:; font-src * data:; connect-src * data:; media-src * data: blob:; object-src *; base-uri *; frame-ancestors *; worker-src * blob:; child-src * blob:;"
          },
        ],
      },
      {
        // CSP for all oeccrm subroutes
        source: '/oeccrm/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src * 'unsafe-eval' 'unsafe-inline' data: blob:; default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; style-src * 'unsafe-inline' data:; img-src * data: blob:; font-src * data:; connect-src * data:; media-src * data: blob:; object-src *; base-uri *; frame-ancestors *; worker-src * blob:; child-src * blob:;"
          },
        ],
      },
    ];
  },
};

export default nextConfig;
