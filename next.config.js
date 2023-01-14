const path = require('path')
const Dotenv = require('dotenv-webpack')

const config = {
  webpack: (config) => {
    config.plugins.push(
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      })
    )
    return config
  },
}

module.exports = config
