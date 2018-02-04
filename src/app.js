var player;

// Reducer - takes the action types and reduces them into a new state condition.
const text = (state = {}, actions) =>{
    let currentVideoList = state.currentVideoList;
    if(actions.mainPlayerId){
      currentVideoList.mainPlayerId = actions.mainPlayerId
    }


  switch (actions.type) {
    case 'UPDATE_MENU': return Object.assign({}, state, {menuItems: actions.menuItems});
    case 'UPDATE_MAIN_HEADING': return Object.assign({}, state, {currentVideoList: {'heading': actions.heading, 'listId': actions.listId}})
    case 'UPDATE_MAIN_PLAYER': return Object.assign({}, state, currentVideoList)

    default: return state
  }  
}

// Store to hold state of the app - only one store but many properties? 
const updateUi = Redux.createStore(text);


//Use subscribe() to update the UI in response to state changes.
updateUi.subscribe(() => {

  let data = updateUi.getState()
 // console.log(data)
  let list = data.currentVideoList
  if(list === undefined || list.heading === 'Welcome'){
    createHomePage(data.menuItems);
    updateMainView(data);
    createMenu(data.menuItems);

    return;
  } 
    updateMainView(data);
    createMenu(data.menuItems);

    if(data.currentVideoList){
    updateVideoList(data.menuItems, data.currentVideoList.listId);
    updateMainPlayer(data.currentVideoList.mainPlayerId );
  }
})


var updateMainView = (data) =>{
  $('.main-title').empty();
  try {
  if(data.currentVideoList){
    $('.main-title').text(" > " + data.currentVideoList.heading);
  }
  } catch(e){
  	console.log(e)
  }

}

var updateVideoList =(data, id) =>{
  $('#video-list').empty();

  var videoArr = data[id].videos.items;
  videoArr.forEach((video)=>{
  var title = video.snippet.title
  var thumbs = video.snippet.thumbnails;
  var vidId = video.snippet.resourceId.videoId;
    $('#video-list').append(
    '<div id=card-"'+vidId+'" class="card">'+
    '<div class="info-box">'+
    '<span class="title-text" id="title-'+vidId+'">'+title+'</span>' +
    '</div>'+
    '</div>'	
    )
   
  })
}

var createHomePage = (data) => {
  console.log(data)
  $('iframe').hide();
  player.stopVideo();
  $('#video-list').empty();
  $('#video-list').append(
    '<h1> Welcome to Script in Three</h1>' + 
    '<p>Here you can learn all about Javascript in short tutorials of around 3 minutes or less.</p>'+
    '<div id="menu-list"></div>'
    )
  for (var i in data) {
    $('#menu-list').append(
     `<div id="${i}" class="menu-list-item menu-button"> ${data[i].title}</div>`
      )
  }
}

const addPlaceHolder  =() => {
  $('iframe').hide();
  player.stopVideo();
}


var updateMainPlayer = (id) => {
  console.log(id)
  if(id) {
   id = id.replace(/"/g,'');
  $('iframe').show();
  }
  else if(id === undefined) addPlaceHolder()

  var data = {'videoId': id,
               'startSeconds': 0.1,
               'suggestedQuality': 'large'};

  player.loadVideoById(data) 
  
}


$(document).on('click','.card', (e) => {
  let id =  e.currentTarget.id.replace('card-','');
  updateUi.dispatch({type:'UPDATE_MAIN_PLAYER', 'mainPlayerId': id });
})


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
  $('#player').show();
  var heading = e.currentTarget.innerText;
  var listId = e.currentTarget.id
  $('#menu-buttons-mini').hide('slow');
  $('#menu-buttons-hamburger').show();
  updateUi.dispatch({type:'UPDATE_MAIN_HEADING','heading': heading, 'listId':listId});
})

$(document).on('click', '#home-key', () => {
  updateUi.dispatch({type:'UPDATE_MAIN_HEADING','heading': 'Welcome'});
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



  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', { videoId: '1f9PbGipAEg' });
   // console.log(player.a)
    $('#player').hide();
  }


