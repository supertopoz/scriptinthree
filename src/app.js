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




   

