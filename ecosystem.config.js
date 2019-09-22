module.exports = {
  apps : [
      {
        name: "nuxt",
        script: "./node_modules/nuxt/bin/nuxt-start",
        env: {
            "HOST": "116.203.230.90",
            "PORT": 3333,
            "NODE_ENV": "production",
        }
      }
  ]
}
