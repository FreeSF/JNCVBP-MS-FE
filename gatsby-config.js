module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: 'https://jncvbp-ms.herokuapp.com/graphql'
      }
    }
  ]
};