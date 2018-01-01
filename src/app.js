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
  

  updateMainView(data);
  createMenu(data.menuItems);
  updateVideoList(data.menuItems, data.currentVideoList.listId);
  updateMainPlayer(data.currentVideoList.mainPlayerId );
});


var updateMainView = (data) =>{
  $('.main-title').empty();
  try {
  $('.main-title').append(
    '<h1>'+ data.currentVideoList.heading +'</h1>'
  
  );
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
    '<picture>'+
    '<source media="(min-width: 700px)"'+
    'srcset="'+thumbs.medium.url+'" />'+
    '<source media="(min-width: 500px)"'+
    'srcset="'+thumbs.default.url+'" />'+
    '<img id="pic-'+vidId+'" src="'+thumbs.default.url+'" alt="Mini Script in 3 logo">'+
    '</picture>'+
    '<div class="info-box">'+
    '<span class="title-text" id="title-'+vidId+'">'+title+'</span>' +
    '</div>'+
    '</div>'	
    )
   
  })
}

var updateMainPlayer = (id) => {
  console.log(id.replace(/"/g,''))
  id = id.replace(/"/g,'');
  console.log(id)
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

  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: '1f9PbGipAEg',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }
  function stopVideo() {
    player.stopVideo();
  }





   

