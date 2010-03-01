var Playah = function(flash_obj_name, options) {
	var flash_obj = ($.browser.msie) ? window[flash_obj_name] : document[flash_obj_name];
	var sounds = [];
	var callbacks = [];
	
	var instance = {
		add_callbacks: function(key, in_callbacks) {
			if ( typeof callbacks[key] == 'undefined' ) {
				callbacks[key] = [];
			}

			for (callback in in_callbacks) {
				if ( typeof callbacks[key][callback] == 'undefined' ) {
					callbacks[key][callback] = [];
				}
				callbacks[key][callback].push(in_callbacks[callback]);
			}
		},
		
		get_callbacks: function() {
			return callbacks;
		},
		
		update_sound: function(key, json) {
			sounds[key] = json;
		},
		
		flash_obj: function() {
			return flash_obj;
		},

		dbg: function(str) {
			flash_obj.dbg(str);
		},

		add: function(key, url, in_callbacks) {
			flash_obj.add(key, url);
			instance.add_callbacks(key, in_callbacks);
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

		stop_all: function() {
			flash_obj.stopAll();
		},

		pause_all: function() {
			flash_obj.pauseAll();
		},

		request_update_sound: function(key) {
			flash_obj.updateSound(key);
		},
		
		sounds: function() {
			return sounds;
		},
		
		flash_receiver: function(method, json) {
			// console.log('flash_receiver got method: ' + method + ', key: ' + json['key'] + ', json: ' + json);
			if(method == "update_sound") {
				instance.update_sound(json['key'], json['snd']);
			} else {
				// must be a callback
				for (callback in callbacks[json['key']][method]) {
					callbacks[json['key']][method][callback].call();
				}
			}
		}
	}

	// set up instance vars if this is first instance of Playah
	if ( typeof Playah.instances == 'undefined' ) {
		Playah.instances_index = 0;
		Playah.instances = [];
	}
	
	// Track each instance of Playah for callback purposes
	instance_id = Playah.instances_index++;
	Playah.instances[instance_id] = instance;
	Playah.ready_list = [];
	Playah.ready_list.push(function() { 
		flash_obj.setInstanceId(instance_id);
	});

	if(options && options['on_ready']) {
		if(Playah.flash_ready) {
			options['on_ready'].call();
		} else {
			Playah.ready_list.push(options['on_ready']); 	
		}
	}
	
	return instance;
}

// receiver / dispatcher for all calls from flash
Playah.flash_receiver_dispatcher = function(method, json_txt) {
	console.log('received from flash: method: ' + method + ', json_txt: ' + json_txt);
	json = JSON.parse(json_txt);
	instance = Playah.instances[json['instance_id']];
	instance.flash_receiver(method, json);
}

if ( typeof Playah.ready_list == 'undefined' ) {
	Playah.ready_list = [];
}

// false until flash is loaded
Playah.flash_ready = false;

Playah.on_flash_ready = function(fn) {
	if(Playah.flash_ready) {
		fn.call();
	} else {
		Playah.ready_list.push(fn);
	}
}

Playah.set_flash_ready = function() {
	Playah.flash_ready = true;
	// call all functions waiting for flash to be ready
	for(func in Playah.ready_list) {
		Playah.ready_list[func].call();
	}
}
