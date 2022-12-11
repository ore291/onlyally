const webpack = require("webpack");

module.exports = {
  env: {
    PUSHER_APP_ID: process.env.PUSHER_APP_ID,
    PUSHER_APP_KEY: process.env.PUSHER_APP_KEY,
    PUSHER_APP_SECRET: process.env.PUSHER_APP_SECRET,
  },
  reactStrictMode: false,
  images: {
    domains: [
      "picsum.photos",
      "dummyimage.com",
      "localhost",
      "api.playjor.com",
      "stackdiary.com",
      "playjor.ams3.digitaloceanspaces.com",
    ],
    unoptimized: true,
  },
};
