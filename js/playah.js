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

		add_sound: function(key, url) {
			flash_obj.addSound(key, url);
			if(sounds.indexOf(key) == -1) {
				sounds.push(key);				
			}
		},

		play_sound: function(key) {
			flash_obj.playSound(key);
		},

		stop_all_for_sound: function(key) {
			flash_obj.stopAllForSound(key);
		},

		sounds: function() {
			// flash_obj.getSounds();
			return sounds;
		}
	}
}