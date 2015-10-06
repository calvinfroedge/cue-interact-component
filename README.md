#cue-interact-component

A simple component for handling interactions on hover on / off. You can easily show edit / delete / move buttons:

```
	var div = $('<div>Hover over me to see interaction</div>');

	div.css({
		position: 'relative',
		display: 'inline-block',
		border: '2px solid #ccc',
		padding: '2em',
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
				}
			}]
		]
	});
```

CSS:

```
	.cue-interact-edit, .cue-interact-delete {
		align-self: flex-end;
	}

	.cue-interact-edit {
		margin-right: 1em;
	}

	.cue-interact-move {
		position: absolute;
		width: 100%;
		left: 0;
	}

	.cue-interact-options {
		position: absolute !important;
		text-align: center;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 1em;
	}
```

##Custom Animation Timing
Pass `opts.animationTime` to customize. Default is 500ms.

##Custom Opacity
Pass `opts.opacity` to customize. Default is 0.85.
