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

##Confirmable Interactions
Want to show a confirmation menu? Easy. This will delay calling the callback until after the 'yes' action has been selected:

JS:

```
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
```

CSS:

```
		.cue-interact-confirmation {
			color: #fff;
			position: absolute;
			z-index: 2;
			text-align: center;
			width: 100%;
			height: 100%;
		}

		.cue-interact-confirm, .cue-interact-cancel {
			position: absolute;
			bottom: 0.5em;
		}

		.cue-interact-confirm {
			right: 0.5em;
		}

		.cue-interact-cancel {
			left: 0.5em;
		}

		.cue-interact-confirmation a {
			color: #fff;
		}
```

##Custom Animation Timing
Pass `opts.animationTime` to customize. Default is 500ms.

##Custom Opacity
Pass `opts.opacity` to customize. Default is 0.85.
