describe('component', function(){
  var Component = window.CueInteract;
  var el = $('body');

  describe('Attach to element', function(){
    it('should do it', function(){
			var div = $('<div>Hover over me to see interaction</div>');
			$('body').append(div);
      var cp = new CueInteract(div);
			expect($('body').find('.cue-interact').length).toBeGreaterThan(0);
			div.remove();
    })
  })

});
