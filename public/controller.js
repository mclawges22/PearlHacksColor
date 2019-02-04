/* When app loads, read database and print favorite colors to screen */
var onLoad = function() {
	firebase.database().ref("users").on("value", function(snapshot){
		const users = snapshot.val();
	    const favoriteColorsDiv = document.getElementById("favoriteColors");
	   	// Clear current contents from favoriteColorsDiv
	    favoriteColorsDiv.innerHTML = "";
	    // Create an unordered list object to be populated with favorite colors
	    var ul = document.createElement('ul');
	    for(var uid in users) {
	    	// For each user, append to list a new item with the user's name and favorite color
		    user = users[uid];
		    var li = document.createElement('li');
		    li.style.backgroundColor = "#" + user.favorite_color;
		    ul.appendChild(li);
		    li.innerHTML= user.display_name + " " + user.favorite_color;
		}
		favoriteColorsDiv.appendChild(ul);
	});
}

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

/* When authentication state is changed (i.e. user logs in or out), toggle which HTML elements are displayed */
firebase.auth().onAuthStateChanged(function(user) {
 	if (user) {
		document.getElementById("login").classList.add("hidden");
		document.getElementById("logout").classList.remove("hidden");
		document.getElementById("saveColor").classList.remove("hidden");
		document.getElementById("username").classList.remove("hidden");
		document.getElementById("username").innerHTML = "You're logged in as: " + user.displayName + ", " + user.email;
 	} else {
 		document.getElementById("login").classList.remove("hidden");
		document.getElementById("logout").classList.add("hidden");
		document.getElementById("saveColor").classList.add("hidden");
		document.getElementById("username").classList.add("hidden");
 	}
});

/* Take user input of their favorite color and store in database along with the user's display name */
var saveColor = function() {
	var userId = firebase.auth().currentUser.uid;
	var displayName = firebase.auth().currentUser.displayName;
	var colorInput = prompt("What is your favorite color?");
	if (colorInput.length == 6) {
		firebase.database().ref('users/' + userId + '/' + 'favorite_color').set(colorInput);
		firebase.database().ref('users/' + userId + '/' + 'display_name').set(displayName);
	} else {
		alert("Please insert a hexadecimal number!");
	}
}