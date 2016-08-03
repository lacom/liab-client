'use strict';

class BotsFacet {

	constructor(makeAPICall) {
		this.name = 'bots';
		this.makeAPICall = makeAPICall;
	}


	/**
	 * List bots
	 *
	 * Returns a list of all bot objects in a user's account
	 * @param {Object=} opts
	 * @return {promise}
	 */
	list(opts) {
		let args = {
			params : opts
		};
		return this.makeAPICall('GET', '/bots', args);
	}


	/**
	 * Get one bot
	 *
	 * Returns a bot object by Id
	 * @param {Object=} opts
	 * @return {promise}
	 */
	getOne(botId, opts) {
		let args = {
			params : opts
		};
		return this.makeAPICall('GET', `/bots/${botId}`, args);
	}


	/**
	 * Send a request to create a bot
	 * @param {Object=} opts
	 *
	 */
	create(opts) {
		let args = {
			data : opts
		};
		return this.makeAPICall('POST', '/bots', args);
	}


	/**
	 * Send a request to update the user's bot
	 * @param {String} botId Id of the bot to update
	 * @param {Object=} opts
	 *
	 */
	update(botId, opts) {
		let args = {
			data : opts
		};
		return this.makeAPICall('POST', `/bots/${botId}`, args);
	}


	/**
	 * Send a message to a client from a bot
	 *
	 * @param {String} botId required Id of the bot to send a message from
	 * @param {Object=} opts
	 *
	 */
	sendOutgoingMessage(botId, opts) {
		let args = {
			data : opts
		};
		return this.makeAPICall('POST', `/bots/${botId}/outgoing-messages`, args);
	}

	/**
	 * Send a file to a client from a bot
	 *
	 * @param {String} botId required Id of the bot to send a file from
	 * @param {Object=} opts (must be valid option format for client and file)
	 *
	 */
	sendOutgoingFile(botId, opts) {
		let args = {
			json : opts
		};
		return this.makeAPICall('POST', `/bots/${botId}/outgoing-file`, args);
	}

	/**
	* Add node to bot according to botID with node according to nodeID in opts.
	*/
	addNode(botId,opts){
		let args = {
			data : opts
		};
		return this.makeAPICall('POST', `/bots/${botID}/nodes`, opts);
	}

	/**
	 * Send a request to add a client to a bot
	 * @param {String} botId Id of the bot to add a client to
	 * @param {Object=} opts
	 *
	 */
	addClient(botId, opts) {
		let args = {
			data : opts
		};
		return this.makeAPICall('POST', `/bots/${botId}/clients`, args);
	}
}


module.exports = BotsFacet;