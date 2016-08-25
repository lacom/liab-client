'use strict';

const request = require('request');
const facets = require('./facets/index');
const bind = require('lodash').bind;
const forEach = require('lodash').forEach;

const API_MAJOR_VERSION = 'v1';


class lightningAPI {

	constructor(accessToken, opts) {
		this.accessToken = accessToken;
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
		let token = this.accessToken;
		let opts = {
			method : method,
			url    : `${this.APIUrl}${endpoint}`,
			auth   : { bearer : token },
		};
		if(args.data){
			opts.form = args.data;
		}
		if(args.params){
			opts.qs = args.params;
		}
		if(args.json){
			opts.json = true;
			opts.body = args.json;
		}
		return new Promise ((resolve, reject) => {
			request(opts, (err, res, body) => {
				if (err) return reject(err);
				if (res.statusCode == 401) return resolve(body);
				/* 
				* Current hack to avoid double parse of body object
				* Request automatically parses res.body object if using json request payload.
				* Return statements parse body objects for other facets that use query string for form payloads
				* Using JSON.stringify reviver function appears and then json.parse in return statements renders
				* body 
				*/
				if(typeof body === 'object'){
					body = JSON.stringify(body)
				}
				
				// Parse body
				body = JSON.parse(body);

				if (res.statusCode !== 200) {
					let message = body.message ? body.message : body;
					return reject({ status: res.statusCode, message: message });
				} else {
					resolve(body);
				}
			});
		});
	}
}


module.exports = lightningAPI;
