requirejs.config({
  paths: {
		"jquery": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min"
  }
});

define(['jquery', 'main'], function($, CueInteract) {
	var div = $('<div>Hover over me to see interaction</div>');

	div.css({
		position: 'relative',
		display: 'inline-block',
		border: '2px solid #ccc',
		padding: '3em',
		textAlign: 'center'
	});

	$('#container').append(div);

	var css = {
		color: '#fff'
	}
	new CueInteract(div, {
		cues: [
			['Move', {
				css: css,
				callback: function(){
					alert('move clicked');
				}
			}],
			['Edit', {
				css: css,
				callback: function(){
					alert('edit clicked');
				}
			}],
			['Delete', {
				css: css,
				callback: function(){
					alert('delete clicked');
				},
				'confirm': {
					text: {
						message: 'Are you sure?',
						submessage: 'This cannot be undone',
						yes: 'Yes',
						no: 'No'
					}
				}
			}]
		]
	});
});
