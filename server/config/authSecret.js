const crypto = require('crypto');

// If JWT_SECRET is set in the environment, admin sessions persist across server
// restarts using that fixed key — the right choice for most hosting platforms,
// which may restart or recycle the process far more often than you'd expect
// (cold starts, deploys, idle spin-down on free tiers), and would otherwise
// force a re-login every time that happens.
//
// If JWT_SECRET is left unset (the local-dev default), a fresh random key is
// generated in memory each time the process starts instead. Any token signed
// before a restart becomes invalid, so the admin panel only asks for login
// again when the server itself restarts — not on every page load while it
// keeps running.
module.exports = process.env.JWT_SECRET || crypto.randomBytes(48).toString('hex');
