const express = require('express');
const bodyParser = require('body-parser');
const { Counter, register } = require('prom-client');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Prometheus metrics
const requestCounter = new Counter({
  name: 'api_request_count',
  help: 'Number of requests received by the API',
  labelNames: ['method'],
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To parse form data

// Serve static HTML form page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle form POST requests
app.post('/api', (req, res) => {
  // Increment the Prometheus counter
  requestCounter.inc({ method: req.method });

  // Extract headers, method, and body
  const headers = req.headers;
  const method = req.method;
  const body = req.body;

  // Format headers into a more readable format
  const formattedHeaders = Object.entries(headers)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  // Respond with a user-friendly output
  res.send(`
    <h2>Welcome to our demo API!</h2>
    <p>Here are the details of your request:</p>

    <strong>Headers:</strong><br>
    <pre>${formattedHeaders}</pre>

    <strong>Method:</strong><br>
    <pre>${method}</pre>

    <strong>Body:</strong><br>
    <pre>${JSON.stringify(body, null, 2)}</pre>
  `);
});

// Route for Prometheus metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Error handling for invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ message: 'Invalid JSON payload' });
  }
  next();
});

app.listen(port, () => {
  console.log(`API service running on http://localhost:${port}`);
});
