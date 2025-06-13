const express = require("express");
const { exchangeCode, refreshToken, getProjects } = require("./procore");
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

app.get("/auth/procore", (req, res) => {
  const redirect = `https://login.procore.com/oauth/authorize?client_id=${process.env.PROCORE_CLIENT_ID}&redirect_uri=${process.env.PROCORE_REDIRECT_URI}&response_type=code`;
  res.redirect(redirect);
});

app.get("/auth/procore/callback", async (req, res) => {
  const tokenData = await exchangeCode(req.query.code);
  res.json(tokenData);
});

app.get("/api/projects", async (req, res) => {
  let { access_token, refresh_token } = req.headers.authorization ? JSON.parse(req.headers.authorization) : {};
  if (!access_token && refresh_token) {
    const newTokens = await refreshToken(refresh_token);
    access_token = newTokens.access_token;
  }
  const data = await getProjects(access_token);
  res.json(data);
});

app.listen(port, () => console.log(`Server running on ${port}`));