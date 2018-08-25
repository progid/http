var XMLHttpRequestProvider = (function() {
	var storageKey = Storage.create('XMLHttpRequestProvider');
	var context = Storage.get(storageKey);

	function parseWhereStr(url) {
		if(!url) {
			throw new TypeError();
		}
		url = url.split(' ');
		var method = url.length > 1 ? url.shift().toUpperCase() : url[0].indexOf('?') !== -1 ? 'GET' : 'POST',
			path = url[0],
			search = path.slice(path.indexOf('?') + 1);
		return {
			method: method,
			path: path,
			search: search.length !== path.length ? search : null,
		};
	};

	var C = function(descr, o) {
		descr = descr || 'JustCopy';
		o = o || {};
		this.config = {
			logs: o.logs || true,
			isAsync: o.isAsync || true,
			saveRequests: o.saveRequests || true,
		};
		this.key = Key('XMLHttpRequestProvider' + descr);
		context[this.key] = {
			calls: [],
			bindsMap: {},
			requestsLog: [],
			logs: [],
			mocks: [],
		};
	};

	C.prototype.like = function(url, caption) {
		if(caption && getTypeOf(caption) === 'string') {
			this.bindsMap[caption] = url;
		}
		return !!caption;
	};

	C.prototype.chain = function() {
	    if(!arguments.length) {
            throw new TypeError();
        }
        var usePrevFuncResult = getTypeOf(arguments[arguments.length - 1]) === 'boolean' ?
        	arguments.pop() :
        	false;
		if(usePrevFuncResult) {
            for(var i = 0; i < arguments.length; i++) {
                arguments[i]();
            }
		}

	};

	// C.prototype.bind = function(key, request) {

	// };

	C.prototype.mock = function(where, headers, body) {
		var xhr = new XMLHttpRequest(),
			url = parseWhereStr(where);
		for(var i in headers) {
			xhr.setRequestHeader(i, headers[i]);
		}
		if(url.method === 'GET' && body) {
			var tempStr = encodeURIComponent(JSON.stringify(body)
				.replace(/\:/g, '=')
				.replace(/\,/g, '&')
				.replace(/\"/g, '')
				.slice(1,-1));
			var path = url.path + (url.search ? url.search : '?') + tempStr;
		}
		xhr.open(url.method, url.path + (url.search || body), this.config.async);
		xhr.addEventListener('readystatechange', function() {

		}, true);
		return {
			xhr: xhr,
			headers: headers,
			body: body,
			toRequest: function() { return xhr.send(body) }
		};
	}

	C.prototype.request = function(where, headers, body) {
		return this.mock(where, headers,body).toRequest();
    };

    C.prototype.

    // C.test = parseWhereStr;
    
	return C;

}());