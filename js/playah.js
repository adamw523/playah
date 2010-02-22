var Playah = function(flash_obj_name) {
	
	var flash_obj = ($.browser.msie) ? window[flash_obj_name] : document[flash_obj_name];
	var sounds = [];
	
	var instance = {
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

	// set up instance vars if this is first instance of Playah
	if ( typeof Playah.instances == 'undefined' ) {
		Playah.instances_index = 0;
		Playah.instances = [];
	}
	
	// Track each instance of Playah for callback purposes
	Playah.instances[Playah.instances_index++] = instance;

	return instance;
}