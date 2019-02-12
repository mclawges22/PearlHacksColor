var login = function() {
  var googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleAuthProvider).then(function(result) {
    console.log("Current user's ID: " + result.user.uid);
    console.log("Current user's Display Name: " + result.user.displayName);
  }).catch(function(error) {
    console.log(error);
  });
}

var logout = function() {
  firebase.auth().signOut();
}

var loadColors = function() {
  /* Generate HTML to represent the color list:
     <div class="color-item">
       <div class="swatch"></div>
       <p>#0066FF</p>
     </div>     */
  firebase.database().ref("users").on("value", function(users){
    var colorNode, colorSwatch, label, colorValue;
    var colorListWrapper = document.getElementById('color-list-wrapper-children');
    colorListWrapper.innerHTML = "";

    for(var uid in users.val()) {
      const color = users.val()[uid]['favorite_color'];
      colorNode = document.createElement("DIV");
      colorNode.classList.add('color-item');
      colorNode.id = color;

      colorSwatch = document.createElement("DIV");
      colorSwatch.classList.add('swatch');
      colorSwatch.style.backgroundColor = "#" + color;

      label = document.createElement('P');
      colorValue = document.createTextNode("#" + color);
      label.appendChild(colorValue);

      colorNode.appendChild(colorSwatch);
      colorNode.appendChild(label);
      colorListWrapper.appendChild(colorNode);
    }
  });
};

var updateColor = function(el) {
  // Show the color on the page.
  document.getElementById('color-input-wrapper').style.backgroundColor = el.value;
  document.getElementById('button-wrapper').style.backgroundColor = el.value;
};

var findComplimentaryColor = function() {
  const hexColor = rgbToHex(document.getElementById('color-input-wrapper').style.backgroundColor);
  firebase.database().ref('/users/').once('value').then(function(users) {
    const allColors = Object.values(users.val()).map((user) => user.favorite_color);
    const colorOfCurrentUser = users.val()[firebase.auth().currentUser.uid].favorite_color;
    const myComplimentaryColor = getComplimentaryColor(colorOfCurrentUser, allColors);
    document.getElementById(myComplimentaryColor).classList.add('selected');
  });
};

/* When authentication state is changed (i.e. user logs in or out), toggle which HTML elements are displayed */
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Look up if user has a current color stored, if so update the UI
    firebase.database().ref('/users/' + user.uid + '/favorite_color').once('value').then(function(color) {
      if(color.val()) {
        // Show the color on the page.
        document.getElementById('color-input-wrapper').style.backgroundColor = color.val();
        document.getElementById('button-wrapper').style.backgroundColor = color.val();
      }
    });
    document.getElementById("login").classList.add("hidden");
    document.getElementById("logout").classList.remove("hidden");
    document.getElementById("username").classList.remove("hidden");
    document.getElementById("username").innerHTML = "You're logged in as: " + user.displayName + ", " + user.email;
  } else {
    document.getElementById("login").classList.remove("hidden");
    document.getElementById("logout").classList.add("hidden");
    document.getElementById("username").classList.add("hidden");
  }
});

/* Take user input of their favorite color and store in database along with the user's display name */
var saveColor = function() {
  if(!firebase.auth().currentUser) {
    alert("Please login to save!");
    return;
  }

  const rgbColor = document.getElementById('color-input-wrapper').style.backgroundColor;
  const hexColor = rgbToHex(rgbColor);

  firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/' + 'favorite_color').set(hexColor);
}
