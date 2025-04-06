# Donatii Backend

Backend server for a donation system with Stripe integration.

## Description

Server-side application for processing payments through Stripe. Includes HTTPS/TLS support for secure payment processing.

## Frontend

The frontend part of the application is available at: [Donatii Frontend](https://github.com/Iurocl-git/Donatii_WEB)

## Technologies

- Node.js
- Express.js
- Stripe API
- HTTPS/TLS

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Iurocl-git/Donatii_WEB_Server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Fill in the required environment variables in the `.env` file

## SSL/TLS Certificate Generation

For local development, you can generate self-signed certificates:

```bash
openssl req -x509 -newkey rsa:4096 -keyout tls/server.key -out tls/server.cert -days 365 -nodes
```

### Certificate Structure

The `tls` directory should contain two files:

1. `server.cert` - SSL certificate file (PEM format)
   ```
   -----BEGIN CERTIFICATE-----
   [Base64 encoded certificate data]
   -----END CERTIFICATE-----
   ```

2. `server.key` - Private key file (PEM format)
   ```
   -----BEGIN PRIVATE KEY-----
   [Base64 encoded private key data]
   -----END PRIVATE KEY-----
   ```

## Running the Server

```bash
npm start
```

The server will be available at: `https://localhost:443`

## Security

- All sensitive data is stored in the `.env` file
- SSL/TLS certificates are stored in the `tls/` directory
- Both of these files/directories are excluded from Git via `.gitignore`

## API Endpoints

- `POST /handle_payment` - process payments through Stripe
- `GET /` - connection check

## License

MIT 
