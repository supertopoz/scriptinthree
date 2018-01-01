let menu = [
  'Apps-script',
  'JQuery',
  'Firebase',
  'Redux',
  'more',
  'more',
  'Apps-script',
  'JQuery',
  'Firebase',
  'Redux',
  'more',
]


// Reducer - takes the action types and reduces them into a new state condition.
const text = (state = {}, actions) =>{
  switch (actions.type) {
    case 'UPDATE_MENU': return Object.assign({}, state, {menuItems: actions.menuItems})
    default: return state
  }  
}

// Store to hold state of the app - only one store but many properties? 
const updateUi = Redux.createStore(text);


//Use subscribe() to update the UI in response to state changes.
updateUi.subscribe(() => {
  let data = updateUi.getState().menuItems
  createMenu(data)
});




var createMenu = (data) => {
  
  for (var i in data) {
  	var text = data[i].title.toUpperCase();
	$('#menu-buttons').append(
    '<div class="menu-button">'+text+'</div>'
    )
    $('#menu-buttons-mini').append(
    '<div class="menu-button">'+text+'</div>'
    )
  }
}

$('.menu-buttons-hamburger').on('click', () =>{
   $('#menu-buttons-mini').toggle("slow");
})

$(document).on('click','.menu-button',() =>{
	console.log('mouse out working')
   $('#menu-buttons-mini').hide('slow');
   $('#menu-buttons-hamburger').show();
})

$(document).ready(()=>{

      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyD5ViEt8qotQaFmpdiRL6w0EaHjafgrKDM",
        authDomain: "scriptinthree.firebaseapp.com",
        databaseURL: "https://scriptinthree.firebaseio.com",
        projectId: "scriptinthree",
        storageBucket: "scriptinthree.appspot.com",
        messagingSenderId: "936194852612"
      };
      firebase.initializeApp(config);
      var db = firebase.database();
      var ref = db.ref("/");
      ref.on("value", function(snapshot) {
        var data = snapshot.val();
        updateUi.dispatch({type:'UPDATE_MENU','menuItems': data});
      }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
       });
})





   

