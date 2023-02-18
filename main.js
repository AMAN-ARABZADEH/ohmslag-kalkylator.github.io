"use strict";
// Author: Aman Arabzadeh
// Date: 2023-02-16
// I built this calculator for my course in embedded systems at University.

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btn");
  const resetBtn = document.getElementById("reset");
  const result = document.getElementById("ohms");
  const kilo = document.getElementById("kilo");
  const mega = document.getElementById("mega");
  const resultsheading = document.getElementById("results");

  // Listen button
  btn.addEventListener("click", calculate);

  function calculate() {
    // Get the user inputs value
    const voltage = document.querySelector("#voltage").value;
    const current = document.querySelector("#current").value;
    const resistance = document.querySelector("#resistance").value;

    // Convert the input units to standard units
    const voltageUnits = document.querySelector("#voltage-units").value;
    const currentUnits = document.querySelector("#current-units").value;
    const resistanceUnits = document.querySelector("#resistance-units").value;

    // Take the input value unit check which option is true
    let voltageInV, voltValue;
    if (voltageUnits === "voltage") {
      voltValue = voltageUnits;
      voltageInV = parseFloat(voltage);
    } else if (voltageUnits === "kilovolts") {
      voltValue = voltageUnits;
      voltageInV = parseFloat(voltage) * 1000;
    } else if (voltageUnits === "megavolts") {
      voltValue = voltageUnits;
      voltageInV = parseFloat(voltage) * 1000000;
    }
    console.log(voltValue);
    let currentInA, currValue;

    if (currentUnits === "amps") {
      currentInA = parseFloat(current);
      currValue = currentUnits;
    } else if (currentUnits === "kiloamps") {
      currValue = currentUnits;
      currentInA = parseFloat(current) * 1000;
    } else if (currentUnits === "megaamps") {
      currValue = currentUnits;
      currentInA = parseFloat(current) * 1000000;
    }
    console.log(currValue);
    let resistanceInOhms, resistValue;
    if (resistanceUnits === "ohms") {
      resistValue = resistanceUnits;
      resistanceInOhms = parseFloat(resistance);
    } else if (resistanceUnits === "kiloohms") {
      resistValue = resistanceUnits;
      resistanceInOhms = parseFloat(resistance) * 1000;
      console.log(resistanceInOhms.value);
    } else if (resistanceUnits === "megaohms") {
      resistValue = resistanceUnits;
      resistanceInOhms = parseFloat(resistance) * 1000000;
    }
    console.log(resistValue);

    if (!isNaN(voltageInV) && !isNaN(currentInA) && isNaN(resistanceInOhms)) {
      if (!negativeValueChecker(voltageInV, currentInA, resistanceInOhms)) {
        result.innerHTML = "Inmatningsvärdena måste vara större än noll!";
        result.style.color = "red";
      } else {
        if (resistanceUnits === "ohms") {
          const ohmsres = voltageInV / currentInA;
          result.innerHTML = "Motstånd: " + ohmsres.toFixed(6) + " ( Ω )";
          const kiloohmsres = voltageInV / currentInA / 1000;
          kilo.innerHTML =
            "Motstånd: " + kiloohmsres.toFixed(10) + " Kiloohms ( kΩ )";
          const megOhmsRes = voltageInV / currentInA / 1000000;
          console.log(megOhmsRes);
          mega.innerHTML =
            "Motstånd: " + megOhmsRes.toFixed(10) + " megaohms ( MΩ )";
          styleResult();
        }
      }
    } else if (
      !isNaN(voltageInV) &&
      isNaN(currentInA) &&
      !isNaN(resistanceInOhms)
    ) {
      if (!negativeValueChecker(voltageInV, currentInA, resistanceInOhms)) {
        result.innerHTML = "Inmatningsvärdena måste vara större än noll!";
        result.style.color = "red";
      } else {
        const curr = voltageInV / resistanceInOhms;
        result.innerHTML = "ström: " + curr.toFixed(6) + " ( A ) ";
        ////////////////
        const kilocurr = voltageInV / resistanceInOhms / 1000;
        kilo.innerHTML = "ström: " + kilocurr.toFixed(10) + " kiloamps ( kA ) ";
        const megcurrs = voltageInV / resistanceInOhms / 1000000;
        console.log(kilocurr);
        mega.innerHTML = "ström: " + megcurrs.toFixed(10) + " megaamps ( MA ) ";
        styleResult();
      }
    } else if (
      isNaN(voltageInV) &&
      !isNaN(currentInA) &&
      !isNaN(resistanceInOhms)
    ) {
      if (!negativeValueChecker(voltageInV, currentInA, resistanceInOhms)) {
        result.innerHTML = "Inmatningsvärdena måste vara större än noll!";
        result.style.color = "red";
      } else {
        const volt = currentInA * resistanceInOhms;
        result.innerHTML = "Spänning: " + volt.toFixed(6) + "Volts ( V )";
        ////////////////
        const kilovolt = (currentInA * resistanceInOhms) / 1000;
        kilo.innerHTML =
          "Spänning: " + kilovolt.toFixed(10) + " kilovolts ( kV) ";
        const megvolt = (currentInA * resistanceInOhms) / 1000000;
        console.log(megvolt);
        mega.innerHTML =
          "Spänning: " + megvolt.toFixed(10) + " megavolts ( MV ) ";
        styleResult();
      }
    } else {
      result.innerHTML = "Vänligen ange två värden att beräkna.";
      result.style.color = "red";
    }
  }

  resetBtn.addEventListener("click", function () {
    document.getElementById("voltage").value = "";
    document.getElementById("current").value = "";
    document.getElementById("resistance").value = "";
    result.innerHTML = "";
    kilo.innerHTML = "";
    mega.innerHTML = "";
    resultsheading.innerHTML = "";
  });

  function styleResult() {
    result.style.width = "200px";
    resultsheading.innerHTML = "Resultat: ";
    result.style.color = "black";
  }

  // Check for negative inputs
  function negativeValueChecker(voltage, current, resistance) {
    if (voltage <= 0 || current <= 0 || resistance <= 0) {
      return false;
    }
    return true;
  }
});
