const nextTranslate = require('next-translate')

module.exports = {
  reactStrictMode: true,
  ...nextTranslate(),
  images: {
    domains: [
      'img.icons8.com', 
      '127.0.0.1', 
      'abaygroup.pythonanywhere.com',
      'abaystreet-filestorage.s3.amazonaws.com'
    ],
  },
}