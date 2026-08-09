const Portfolio = require('../models/Portfolio');

async function getPortfolioDoc() {
  let doc = await Portfolio.findOne({ singleton: 'main' });
  if (!doc) {
    doc = await Portfolio.create({ singleton: 'main' });
  }
  return doc;
}

async function getPortfolio(req, res) {
  const doc = await getPortfolioDoc();
  res.json(doc);
}

module.exports = { getPortfolio, getPortfolioDoc };
