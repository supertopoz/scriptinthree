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
    case 'UPDATE_MENU': return Object.assign({}, state, {menuItems: actions.menuItems});
    case 'UPDATE_MAIN_HEADING': return Object.assign({}, state, {currentVideoList: {'heading': actions.heading, 'listId': actions.listId}})
    default: return state
  }  
}

// Store to hold state of the app - only one store but many properties? 
const updateUi = Redux.createStore(text);


//Use subscribe() to update the UI in response to state changes.
updateUi.subscribe(() => {

  let data = updateUi.getState()
  updateMainView(data)
  createMenu(data.menuItems)
 
});


var updateMainView = (data) =>{
  $('.content').empty();
  try {
  $('.content').append(
    '<h1>'+ data.currentVideoList.heading +'</h1>'
  
  );
  } catch(e){
  	console.log(e)
  }

}



var createMenu = (data) => {
  $('#menu-buttons').empty()
   $('#menu-buttons-mini').empty()
  for (var i in data) {
  	var text = data[i].title;
  	var id = i
	$('#menu-buttons').append(
    '<div id="'+id+'" class="menu-button">'+text+'</div>'
    )
    $('#menu-buttons-mini').append(
    '<div id="'+id+'" class="menu-button">'+text+'</div>'
    )
  }
}

$('.menu-buttons-hamburger').on('click', () =>{
   $('#menu-buttons-mini').toggle("slow");
})

$(document).on('click','.menu-button',(e) =>{
   var heading = e.currentTarget.innerText;
   var listId = e.currentTarget.id
   $('#menu-buttons-mini').hide('slow');
   $('#menu-buttons-hamburger').show();
   updateUi.dispatch({type:'UPDATE_MAIN_HEADING','heading': heading, 'listId':listId});
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





   

