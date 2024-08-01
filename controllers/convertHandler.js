function ConvertHandler() {
  
  const pattern = /([0-9\/\.]*)\s*(gal|L|mi|km|lbs|kg)/;

  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  const units = {
    "gal": {
      "name": "gallons",
      "to": "L"
    },
    "l": {
      "name": "liters",
      "to": "gal"
    },
    "mi": {
      "name": "miles",
      "to": "km"
    },
    "km": {
      "name": "kilometers",
      "to": "mi"
    },
    "lbs": {
      "name": "pounds",
      "to": "kg"
    },
    "kg": {
      "name": "kilograms",
      "to": "lbs"
    }
  }

  this.getNum = function(input) {
    const index = input.indexOf(input.match(/[a-z]/i));

    let result = 1;
    if (index !== 0) {
      result = input.split("", index).join("");

      const patt = /[/]/g;
      if (patt.test(result) === true) {
        if (result.match(patt).length !== 1) {
          return "Invalid Number";
        }
      }

      result = eval(result);
    }

    return result;
  };
  
  this.getUnit = function(input) {
    const regex = /[a-z]/i;
    const index = input.indexOf(input.match(regex));

    let result = input.slice(index, input.length).toLowerCase();

    if (! Object.keys(units).includes(result)) {
      return "Invalid Unit";
    }

    return (result === "l") ? "L" : result;
  };
  
  this.getReturnUnit = function(unit) {
    const key = unit.toLowerCase();
    return (!units[key]) ? "Invalid unit" : units[key].to;
  };

  this.spellOutUnit = function(unit) {
    const key = unit.toLowerCase();
    return (!units[key]) ? "Invalid unit" : units[key].name;
  };
  
  this.convert = function(num, unit) {
    let res;
    switch (unit.toLowerCase()) {
      case "gal":
        res = num * galToL;
        break;
      case "lbs":
        res = num * lbsToKg;
        break;
      case "mi":
        res = num * miToKm;
        break;
      case "l":
        res = num / galToL;
        break;
      case "kg":
        res = num / lbsToKg;
        break;
      case "km":
        res = num / miToKm;
        break;
      default:
        return "Invalid unit";
    }

    return (res * 100000).toFixed(0) / 100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return
      initNum +
      " " +
      this.spellOutUnit(initUnit) +
      " converts to " +
      returnNum.toFixed(5) +
      " " +
      this.spellOutUnit(returnUnit);
  };
  
}

module.exports = ConvertHandler;
