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

      var els = {}

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
						if(cb) cb();
						els.container.trigger('cue', [key]);
					});
					els.options.append(a);
				});
			}

			els.container.append(els.bg, els.options);
      
      var opts = opts || {};

      opts.events = opts.events || {};     
      
			target.append(els.container);

			if(opts.events.onRender){
				opts.events.onRender(els.container);
			}

			var animating = false;

			target.hover(function(){
				if(!animating){
					animating = true;
					els.container.fadeIn(ANIMATION_TIME, function(){
						animating = false;
					});
				}
			}, function(){
				els.container.fadeOut(ANIMATION_TIME, function(){});
			});
      
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
