module.exports = {
  printmyname: function () {
    console.log("This is my name printed");
    return "This is my name";
  },
  isset: function (var_to_check) {
    if (typeof var_to_check !== 'undefined' && var_to_check)
      return true;
    else
      return false;
  }
};
