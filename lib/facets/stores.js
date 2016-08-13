'use strict'

class StoresFacet {
	
	constructor(makeAPICall) {
		this.name = 'stores';
		this.makeAPICall = makeAPICall;
	}


	/**
	 * Create a new Shopify data store for a bot
	 *
	 * @param {Object=} opts
	 * 	- must include a "bot" param
	 * @return {promise}
	 */
	create(opts) {
		let args = {
			data: opts
		};
		return this.makeAPICall('POST', '/stores/shopify', args);
	}


	/**
	 * Make query to shopify data store
	 *
	 * Returns results dependent upon query passed along in opts.
	 * Must include a valid SQL query in the opts object.
	 * @param {Object=} opts
	 * @return {promise}
	 */
	query(opts) {
		let args = {
			data: opts
		};
		return this.makeAPICall('POST', '/stores/shopify/query', args);
	}

}


module.exports = StoresFacet;