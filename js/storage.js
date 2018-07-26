var Storage = (function() {

	var data = {};

	return {
		create: function(name) {
			var key = Key(name);
			data[key] = {};
			return key;
		},
		get: function(key) {
			if(!key) {
				throw new TypeError();
			}
			return data[key];
		},
		remove: function(key) {
			if(!key) {
                throw new TypeError();
            }
			delete data[key];
			return true;
		},
		rename: function(oldKey) {
			if(!(oldKey && data[oldKey])) {
				throw new TypeError();
			}

			var newKey = Key(Key.getItem(oldKey));
			
			data[newKey] = data[oldKey];
			delete data[oldKey];
			return newKey;
		},
		// Only for dev
		getAll: function() {
			return data;
		}
	};
}());