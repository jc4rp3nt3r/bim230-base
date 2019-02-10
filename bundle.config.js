module.exports = {
  bundle: {
    vendor: {
      scripts: [
        './node_modules/jquery/dist/jquery.slim.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/jquery-validation/dist/jquery.validate.min.js',
        './node_modules/jquery-serializejson/jquery.serializejson.min.js',
        './node_modules/sweetalert/dist/sweetalert.min.js',
      ],
      styles: [],
      options: {
        rev: false,
        maps: false
      }
    }
  }
};