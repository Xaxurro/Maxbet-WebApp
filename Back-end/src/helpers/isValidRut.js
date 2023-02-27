function isValidRut(rut) {
  var re = /^(\d{1,3}(?:\.\d{1,3}){2}-[\dK])$/;
  return re.test(String(rut).toUpperCase());
};
  
module.exports = isValidRut;