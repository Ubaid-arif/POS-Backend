const { rateLimit } = require("express-rate-limit");

export const limiter = rateLimit({
	windowMs: 0.5 * 60 * 1000, // 30 seconds
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})