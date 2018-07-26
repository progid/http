var Key = (function() {

    var keys = {};

    var utils = {
        add: function(value) {
            const key = generateString(20);
            if(keys[key]) {
                this.add(value);
                return null;
            }
            keys[key] = value;
            return key;
        },
        get: function(key) {
            return keys[key] || null;
        },
        remove: function(key) {
            if(!keys[key]) {
                throw new Error("The key doesn't exists");
            }
            delete keys[key];
        },
        rename: function(key) {
            const newKey = generateString(20);
            keys[newKey] = keys[key];
            delete keys[newKey];
            return newKey;
        }
    };

    function KeyConstructor(value) {
        return utils.add(value);
    }

    KeyConstructor.rename = utils.rename;
    KeyConstructor.getItem = utils.get;
    KeyConstructor.rename = utils.rename;

    // Only for dev
    KeyConstructor.getAll = function() {
        return keys;
    };

    return KeyConstructor;
}());