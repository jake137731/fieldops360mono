const axios = require("axios");
const CLIENT_ID = process.env.PROCORE_CLIENT_ID;
const CLIENT_SECRET = process.env.PROCORE_CLIENT_SECRET;
const REDIRECT_URI = process.env.PROCORE_REDIRECT_URI;

async function exchangeCode(code) {
  const res = await axios.post("https://login.procore.com/oauth/token", {
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    code
  });
  return res.data;
}

async function refreshToken(refreshToken) {
  const res = await axios.post("https://login.procore.com/oauth/token", {
    grant_type: "refresh_token",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: refreshToken
  });
  return res.data;
}

async function getProjects(accessToken) {
  const res = await axios.get("https://api.procore.com/rest/v1.0/projects", {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return res.data;
}

module.exports = { exchangeCode, refreshToken, getProjects };