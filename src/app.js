let menu = [
  'Apps-script',
  'JQuery',
  'Firebase',
  'Redux'

]

$('document').ready(()=>{
	console.log('working')
  menu.forEach(item => {
	$('#menu-buttons').append(
    '<div class="menu-button">'+item+'</div>'
    )
  }) 
})



   

