import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // Identifier la requête de manière plus précise
    const identifier = req.ip || req.headers['x-forwarded-for'] || 'global';
    
    // Ajout de logging pour le debug
    console.log(`Rate limiting check for: ${identifier}`);
    
    const { success, pending, limit, reset, remaining } = await ratelimit.limit(identifier);

    // En-têtes de rate limiting pour le client
    res.set({
      'X-RateLimit-Limit': limit,
      'X-RateLimit-Remaining': remaining,
      'X-RateLimit-Reset': reset
    });

    if (!success) {
      console.warn(`Rate limit exceeded for: ${identifier}`);
      return res.status(429).json({
        message: "Too many requests, please try again later.",
        retryAfter: Math.ceil((reset - Date.now()) / 1000) + ' seconds'
      });
    }

    await pending; // Attendre que le compteur soit mis à jour
    next();

  } catch (error) {
    console.error("Rate Limiter Error:", error);
    // En production, on pourrait bypass le rate limiting en cas d'erreur
    if (process.env.NODE_ENV === 'production') {
      next();
    } else {
      next(error);
    }
  }
};

export default rateLimiter;