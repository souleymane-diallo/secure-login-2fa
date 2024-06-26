require('dotenv').config({ path: './.env.test' })
module.exports = {
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    transform: {
      "^.+\\.js$": "babel-jest"
    },
    "collectCoverageFrom": [
        "controllers/**/*.js",
        "models/**/*.js"
    ]
};
  