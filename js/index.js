var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var initialized = {
  decimal: false,
  display: "0",
  zeroAllow: false };


//Stateless functional component for display
var Display = function Display(props) {return React.createElement("div", { id: "display" }, props.display);};

//Stateless functional component for controls
var Controls = function Controls(props) {return (
    React.createElement("button", { "class": "button", id: props.id, onClick: props.handleClick },
      props.display));};



//Stateful class component to manage state
var App = function (_React$Component) {_inherits(App, _React$Component);
  function App(props) {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));
    _this.state = initialized;
    _this.handleNumber = _this.handleNumber.bind(_this);
    _this.handleDecimal = _this.handleDecimal.bind(_this);
    _this.handleOperator = _this.handleOperator.bind(_this);
    _this.handleClear = _this.handleClear.bind(_this);
    _this.handleEval = _this.handleEval.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);return _this;
  }_createClass(App, [{ key: "handleClear", value: function handleClear()

    {
      this.setState(initialized);
    } }, { key: "handleNumber", value: function handleNumber(

    x) {
      var currDisplay = this.state.display;
      var last = currDisplay.slice(-1); //last character on display
      var most = currDisplay.slice(0, currDisplay.length - 1); //everything but the last character
      var reg = /[\+\-\/\*]/;

      if (!this.state.zeroAllow) {
        if (last === "0") {
          this.setState({ display: most + x });
        } else {
          this.setState({ zeroAllow: true });
          this.setState({ display: currDisplay + x });
        }
      } else {
        this.setState({ display: currDisplay + x });
      }
    } }, { key: "handleDecimal", value: function handleDecimal(

    x) {
      if (!this.state.decimal) {
        this.setState({ display: this.state.display + x });
        this.setState({ decimal: true });
        this.setState({ zeroAllow: true });
      }
    } }, { key: "handleOperator", value: function handleOperator(

    x) {
      var currDisplay = this.state.display;
      var last = currDisplay.slice(-1); //last character on display
      var most = currDisplay.slice(0, currDisplay.length - 1); //everything but the last character
      var reg = /[\+\-\/\*]/;
      this.setState({ decimal: false });
      this.setState({ zeroAllow: false });
      if (reg.test(last)) {
        this.setState({ display: most + x });
      } else {
        this.setState({ display: currDisplay + x });
      }
    } }, { key: "handleEval", value: function handleEval()

    {
      if (this.state.display === "4815162342") {
        this.setState({ display: "accepted" });
        setTimeout(this.handleClear, 2000);
      } else {
        this.setState({ display: (Math.round(eval(this.state.display) * 1000000) / 1000000).toString() });
      }
    } }, { key: "componentDidMount", value: function componentDidMount()

    {
      document.addEventListener("keydown", this.handleKeyPress);
    } }, { key: "componentWillUnmount", value: function componentWillUnmount()

    {
      document.removeEventListener("keydown", this.handleKeyPress);
    }

    //foundation for adding keyboard functionality
  }, { key: "handleKeyPress", value: function handleKeyPress(event) {
      if (event.keyCode > 47 && event.keyCode < 58 && !event.shiftKey) {
        this.handleNumber((event.keyCode - 48).toString());
      } else if (event.shiftKey) {
        switch (event.keyCode) {
          case 187:
            this.handleOperator("+");
            break;
          case 56:
            this.handleOperator("*");
            break;}

      } else {
        switch (event.keyCode) {
          case 189:
            this.handleOperator("-");
            break;
          case 191:
            this.handleOperator("/");
            break;
          case 88:
            this.handleOperator("*");
            break;
          case 187:
            this.handleEval();
            break;
          case 13:
            event.preventDefault();
            this.handleEval();
            break;
          case 190:
            this.handleDecimal(".");
            break;
          case 8:
            this.handleClear();
            break;}

      }
    } }, { key: "render", value: function render()

    {var _this2 = this;
      return (
        React.createElement("div", { id: "calculator" },
          React.createElement("h1", { id: "title" }, "JavaScript Calculator"),
          React.createElement(Display, { display: this.state.display }),
          React.createElement("div", { id: "controls" },
            React.createElement("div", { "class": "button-row" },
              React.createElement(Controls, { id: "clear", display: "Clear",
                handleClick: this.handleClear }),
              React.createElement(Controls, { id: "add", display: "+",
                handleClick: function handleClick() {return _this2.handleOperator("+");} })),

            React.createElement("div", { "class": "button-row" },
              React.createElement(Controls, { id: "one", display: "1",
                handleClick: function handleClick() {return _this2.handleNumber("1");} }),
              React.createElement(Controls, { id: "two", display: "2",
                handleClick: function handleClick() {return _this2.handleNumber("2");} }),
              React.createElement(Controls, { id: "three", display: "3",
                handleClick: function handleClick() {return _this2.handleNumber("3");} }),
              React.createElement(Controls, { id: "subtract", display: "-",
                handleClick: function handleClick() {return _this2.handleOperator("-");} })),

            React.createElement("div", { "class": "button-row" },
              React.createElement(Controls, { id: "four", display: "4",
                handleClick: function handleClick() {return _this2.handleNumber("4");} }),
              React.createElement(Controls, { id: "five", display: "5",
                handleClick: function handleClick() {return _this2.handleNumber("5");} }),
              React.createElement(Controls, { id: "six", display: "6",
                handleClick: function handleClick() {return _this2.handleNumber("6");} }),
              React.createElement(Controls, { id: "multiply", display: "x",
                handleClick: function handleClick() {return _this2.handleOperator("*");} })),

            React.createElement("div", { "class": "button-row" },
              React.createElement(Controls, { id: "seven", display: "7",
                handleClick: function handleClick() {return _this2.handleNumber("7");} }),
              React.createElement(Controls, { id: "eight", display: "8",
                handleClick: function handleClick() {return _this2.handleNumber("8");} }),
              React.createElement(Controls, { id: "nine", display: "9",
                handleClick: function handleClick() {return _this2.handleNumber("9");} }),
              React.createElement(Controls, { id: "divide", display: "/",
                handleClick: function handleClick() {return _this2.handleOperator("/");} })),

            React.createElement("div", { "class": "button-row" },
              React.createElement(Controls, { id: "placeholder", display: "FCC" }),
              React.createElement(Controls, { id: "zero", display: "0",
                handleClick: function handleClick() {return _this2.handleNumber("0");} }),
              React.createElement(Controls, { id: "decimal", display: ".",
                handleClick: function handleClick() {return _this2.handleDecimal(".");} }),
              React.createElement(Controls, { id: "equals", display: "=",
                handleClick: this.handleEval })))));




    } }]);return App;}(React.Component);
;

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));