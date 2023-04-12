module.exports = {
  secret:
    process.env.NODE_ENV === "production"
      ? process.env.SECRET
      : "AKG8949121082GI",
  api:
    process.env.NODE_ENV === "prodution"
      ? "https://xxxx.com"
      : "http://localhost:3000",
  loja:
    process.env.NODE_ENV === "prodution"
      ? "https://xxx.com"
      : "http://localhost:8000",
};
