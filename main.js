/*
 * Component
 *
 * Options:
 * {
 * }
 */
(function (module) {
    if (typeof define === "function" && define.amd) {
        define([], function () { 
          return module.component(); 
        });
    } else {
        window.CueInteract = module.component();
    }
}({
  component: function(){
    /*
     * Creates component and adds to page
     */
    var CueInteract = function(target, opts){
			var opts = opts || {};

      opts.events = opts.events || {};     

      var els = {};

			var ANIMATION_TIME = opts.animationTime || 500;

			els.container = $('<div class="cue-interact">');
			
			var fixTopLeftCover = {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				zIndex: 1
			};
			
			els.container.css(fixTopLeftCover);

			els.container.hide();

			els.bg = $('<div class="cue-interact-bg">');

			var opacity = opts.opacity || '0.85';
			els.bg.css($.extend({background: 'rgba(0,0,0,'+opacity+')'}, fixTopLeftCover));

			els.options = $('<div class="cue-interact-options">');
			els.options.css({
				position: 'relative',
				zIndex: 2
			});

			/*
			 * Use this for setting confirmation dialog
			 */
			var tmp;

			/*
			 * Fade out the container, remove confirmation if present, reset defaults
			 */
			var hide = function(){
				els.container.fadeOut(ANIMATION_TIME, function(){
					if(tmp){
						tmp.remove();
						els.options.show();
					}
				});
			}

			/*
			 * Show confirmation dialog when user clicks confirmable action
			 */
			var confirmDialog = function(cue, finish){
				var c = cue['confirm'];
				console.log('confirm!');
				if(typeof c == 'boolean') c = {};

				if(!c.text) c.text = {};

				tmp = $('<div class="cue-interact-confirmation">');

				var msgText = c.text.message || 'Are you sure?';
				var msg = $('<h3>'+msgText+'</h3>')

				var subMsgText = c.text.submessage || 'This cannot be undone.';
				var subMsg = $('<p>'+subMsgText+'</p>');

				var yes = $('<a class="cue-interact-confirm" href="#">'+(c.text.yes || 'yes')+'</a>');
				var no = $('<a class="cue-interact-cancel" href="#">'+(c.text.no || 'no')+'</a>');

				tmp.append(msg, subMsg, yes, no);

				els.options.hide();
				els.container.append(tmp);

				yes.on('click', function(){
					finish(function(){
						hide();
					});
				});

				no.on('click', function(){
					tmp.remove();
					els.options.show();
				});
			}

			/*
			 * If cues are given, map a callback function to them
			 */
			if(opts.cues){
				opts.cues.map(function(item){
					var cue = item.pop();
					var key = item.pop();

					var class_ = ('cue-interact-' + (cue['class'] || key.replace(/\W+/g, '-'))).toLowerCase();
					var a = $('<a href="#">'+key+'</a>');

					if(cue.css){
						a.css(cue.css);
					}

					a.addClass(class_);

					var cb = (cue.callback) ? cue.callback : false;

					a.on('click', function(event){
						event.preventDefault();

						var finish = function(preCb){
							if(preCb) preCb();

							if(cb) cb();
							els.container.trigger('cue', [key]);
						}

						if('confirm' in cue){
							confirmDialog(cue, finish);
						} else {
							finish();
						}
					});
					els.options.append(a);
				});
			}

			/*
			 * Watch for target on hover
			 */
			var animating = false;

			var hideTimer;
			target.hover(function(){
				if(hideTimer) clearTimeout(hideTimer);

				if(!animating){
					animating = true;
					els.container.fadeIn(ANIMATION_TIME, function(){
						animating = false;
					});
				}
			}, function(){
				hideTimer = setTimeout(function(){
					hideTimer = null;
					hide();
				}, 300);
			});

			/*
			 * Append container to target and fire render event
			 */
			els.container.append(els.bg, els.options);
      
			target.append(els.container);

			if(opts.events.onRender){
				opts.events.onRender(els.container);
			}
      
      //Public API for the component
      return {
        els: els,
        remove: function(){ //Detach the component and all listeners
          if(opts.events.onRemove) opts.events.onRemove();
          els.container.remove();
        }          
      }
    };

    return CueInteract;
  }
}));
