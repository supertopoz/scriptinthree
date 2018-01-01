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


/*// Reducer - takes the action types and reduces them into a new state condition.
const text = (state = {}, actions) =>{
  switch (actions.type) {
    case 'UPDATE_MENU': return Object.assign({}, state, {value: actions.value})
    default: return state
  }  
}

// Store to hold state of the app - only one store but many properties? 
const updateText = Redux.createStore(text);


//Use subscribe() to update the UI in response to state changes.
updateText.subscribe(() => {
  let text = updateText.getState().value
  localStorage.setItem("text",text)
  $('#display').text(text)
});


// The only way to mutate the internal state is to dispatch an action.
// Dispatch = "Please dispatch this change, please"
$('#square').on('keyup',(e) => updateText.dispatch({type:'UPDATE_TEXT','value':e.target.value}))

$(document).ready(()=>{
  console.log('working')
  let text = localStorage.getItem("text")
  updateText.dispatch({type:'UPDATE_TEXT','value':text})
})*/



$('document').ready(()=>{

  menu.forEach(item => {
	$('#menu-buttons').append(
    '<div class="menu-button">'+item+'</div>'
    )
    $('#menu-buttons-mini').append(
    '<div class="menu-button">'+item+'</div>'
    )
  }) 
})

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
        console.log(snapshot.val());
      }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
       });
})





   

