var loadColors = function() {
  /* Generate HTML to represent the color list:
     <div class="color-item">
       <div class="swatch"></div>
       <p>#0066FF</p>
     </div>     */
  var colorListWrapper = document.getElementById('color-list-wrapper');
  var colorNode, colorSwatch, label, colorValue;
  for (color in fakeData) {
    colorNode = document.createElement("DIV");
    colorNode.classList.add('color-item');

    colorSwatch = document.createElement("DIV");
    colorSwatch.classList.add('swatch');
    colorSwatch.style.backgroundColor = '#' + fakeData[color];

    label = document.createElement('P');
    colorValue = document.createTextNode('#' + fakeData[color]);
    label.appendChild(colorValue);

    colorNode.appendChild(colorSwatch);
    colorNode.appendChild(label);
    colorListWrapper.appendChild(colorNode);
  }
};

var updateColor = function(el) {
  // Show the color on the page.
  document.getElementById('color-input-wrapper').style.backgroundColor = el.value;
  document.getElementById('button-wrapper').style.backgroundColor = el.value;
};

var saveColor = function() {
  // Replace with real write to database.
  console.log('send value to the database');
};

var findComplimentaryColor = function() {
  // Fake select one of the color swatches.
  var colorList = document.getElementsByClassName('color-item');
  colorList[4].classList.add('selected');
};

var fakeData = [
  "CABCE7",
  "EC1E3B",
  "6699FF",
  "234DA2",
  "14ECDD",
  "ECA9E4",
  "746FEC",
  "252A3A",
  "FBC02D",
  "71091B",
  "F8C07F",
  "746FEC",
  "FBC02D",
  "252A3A",
  "CABCE7",
  "6699FF",
  "2BA640",
  "F81594",
  "634A71",
  "5A7167",
];
