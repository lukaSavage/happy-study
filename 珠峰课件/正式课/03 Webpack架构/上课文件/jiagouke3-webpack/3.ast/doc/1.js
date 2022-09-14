function a() {
  var _this = this;
  var b = () => {
    var c = () => {
      console.log(this);
    };
  };
}
