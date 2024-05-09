const express = require('express');
const app = express();
const { rateLimit } = require('express-rate-limit');
const cros = require('cors');
const { json } = require('body-parser');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger');
const auth = require('./endpoints/authentication');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 10000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
});

app.use(cros());
app.use(helmet());
app.use(limiter);
app.use(json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1',auth)
/**
 * @openapi
 * /:
 *   get:
 *     description: Comunicate with server.
 *     responses:
 *       200:
 *         description: Welcome to the server.
 */
app.get('/',(req,res)=>{
	res.send(`Welcome to server ${process.env.PORT || '3000'}`);
})

module.exports = app;