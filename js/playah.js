var Playah = function(flash_obj_name) {
	var flash_obj = ($.browser.msie) ? window[flash_obj_name] : document[flash_obj_name];
	var sounds = [];
	
	return {
		flash_obj: function() {
			return flash_obj;
		},

		dbg: function(str) {
			flash_obj.dbg(str);
		},

		add: function(key, url) {
			flash_obj.add(key, url);
			if(sounds.indexOf(key) == -1) {
				sounds.push(key);				
			}
		},

		play: function(key) {
			flash_obj.play(key);
		},

		stop: function(key) {
			flash_obj.stop(key);
		},

		pause: function(key) {
			flash_obj.pause(key);
		},

		sounds: function() {
			// flash_obj.getSounds();
			return sounds;
		}
	}
}