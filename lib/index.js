const request = require('request');
const facets = require('./facets/index');
const bind = require('lodash').bind;
const forEach = require('lodash').forEach;

const API_MAJOR_VERSION = 'v1';


class lightningAPI {

	constructor(token, opts) {
		this.accessToken = token;
		this.APIUrl = (opts && opts.url) ? `${opts.url}/${API_MAJOR_VERSION}` : `https://api.lightninginabot.com/${API_MAJOR_VERSION}`;
		this._createFacets();
	}


	_createFacets() {
		let self = this;
		let newFacet;
		let makeAPICall = bind(self.makeAPICall, self);
	  forEach(facets, function registerWebClientFacet(Facet) {
	    newFacet = new Facet(makeAPICall);
	    self[newFacet.name] = newFacet;
	  }, self);
	}


	makeAPICall(method, endpoint, args) {
		let opts = {
			method : method,
			url    : `${this.APIUrl}${endpoint}`,
			auth   : { bearer : this.accessToken },
			form   : args.data || {},
			qs     : args.params || {}
		};
		return new Promise ((resolve, reject) => {
			request(opts, (err, res, body) => {
				if (err) reject(err);
				else if (res.statusCode !== 200) reject({ status: res.statusCode, message: JSON.parse(body).message });
				else resolve(JSON.parse(body));
			});
		});
	}
}


module.exports = lightningAPI;