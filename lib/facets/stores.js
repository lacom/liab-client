'use strict'

class StoresFacet {
	
	constructor(makeAPICall) {
		this.name = 'stores';
		this.makeAPICall = makeAPICall;
	}

	/**
	 * Make query to shopify data store
	 *
	 * Returns results dependent upon query passed along in opts.
	 * Must include a valid SQL query in the opts object.
	 * @param {Object=} opts
	 * @return {promise}
	 */
	query(botToken, opts){
		let args = {
			data: opts
		};
		return this.makeAPICall('POST', '/stores/shopify/query', args, botToken);
	}


}