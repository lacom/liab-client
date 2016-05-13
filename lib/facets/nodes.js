'use strict';

class NodesFacet {

	constructor(makeAPICall) {
		this.name = 'nodes';
		this.makeAPICall = makeAPICall;
	}

	/**
	 * List Nodes
	 *
	 * Returns a list of all node objects in a user's account
	 * @param {Object=} opts
	 * @return {promise}
	 */
	 list(opts) {
		let args = {
			params : opts
		};
		return this.makeAPICall('GET', '/nodes', args);
	}

	/**
	 * Update Node
	 *
	 * Updates the node per the given nodeID
	 * @param {Object=} opts
	 * @return {promise}
	 */
	update(nodeID,opts){
		let args = {
			params : opts
		};
		return this.makeAPICall('POST',`nodes/${nodeID}`,args);
	}
}


module.exports = NodesFacet;