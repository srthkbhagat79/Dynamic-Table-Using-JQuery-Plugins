/*
Name:Sarthak Bhagat
email: Sarthak_bhagat@student.uml.edu
Course name: GUI I
Assingment #6- Creating an Interactive Dynamic Table with Jquery Plugins
File type: .js file
  Sources used: https://www.npmjs.com/package/rules-js
  https://www.w3schools.com/js/js_validation.asp
*/
$.validator.addMethod("greaterThan", function(value, element, param) {
  var target = $(param);

  if (this.settings.onfocusout && target.not(".validate-greaterThan-blur").length) {
    target.addClass("validate-greaterThan-blur").on("blur.validate-greaterThan", function() {
      $(element).valid();
    });
  }
  return Number(value) >= Number(target.val());
});

/* The following functions checks if the user has input any decimals. If they did, spit out a message*/
$.validator.addMethod("noDecimal", function(value, element) {
  return !(value % 1);
}, "No decimals.Please enter an integer.");

/* These indicate all the rules for the values entered used as the input */
jQuery.validator.addClassRules("InsertValues", {
  required: true,
  number: true
});

$(function() {
  $("#insert").validate({
    rules: {
      /*This function creates rules*/
      /*Checks if there is decimal in the first input*/
      mic: {
        noDecimal: [mic, mic]
      },
        /*Checks if there is decimal in the third input*/
      mir: {
        noDecimal: [mir, mir]
      },
        /*Checks if there is decimal in the second input.Also checks for invalid characters and greater number*/
      mac: {
        noDecimal: [mac, mac],
        greaterThan: [mic, mic]
      },
          /*Checks if there is decimal in the fourth input.Also checks for invalid characters and greater number*/
      mar: {
        noDecimal: [mar, mar],
        greaterThan: [mir, mir]
      }
    },

    /*This is used to display an error message and uses jquery plugin as error message*/
    messages: {
      mic: {
        required: "Insert horizontal first value"
      },
      mir: {
        required: "  Insert vertical first value"
      },
      mac: {
        required: "  Insert horizontal second value",
        greaterThan: "Please enter a larger number than first value"
      },
      mar: {
        required: "Insert vertical second value",
        greaterThan: "Please enter a larger number than first value"
      }
    },

    // Generated the table if the rules are followed by the user on clicking the submit button
    submitHandler: function(form) {
      passIntoTable();
    }
  });
});

function passIntoTable() {
  /* Creates variable by taking input from index.html and converts them into an integer value*/
  var min_Col = Number(document.getElementById("mic").value);
  var max_Col = Number(document.getElementById("mac").value);
  var min_Row = Number(document.getElementById("mir").value);
  var max_Row = Number(document.getElementById("mar").value);

  var result = "<tr><th> </th>"; /* Empty value will have a  (0,0) axis. */

  /* Adds the values for the horizontal inputs. */
  for (var i = min_Col; i <= max_Col; i++) {
    result += "<th>" + i + "</th>";
  }
  result += "</tr>";

  /* Adds the values for the vertical inputs. */
  for (var j = min_Row; j <= max_Row; j++) {
    result += "<tr><th>" + j + "</th>";
    for (var k = min_Col; k <= max_Col; k++) {
      result += "<td>" + j * k + "</td>";
    }
    result += "</tr>";
  }

  /*prints the location of the file */
  document.getElementById("print_table").innerHTML = result;
}
