/**
 * 当前交易
 */

"use strict";
require('./index.css');
var Base = require('../../../../../../app/base');
var tmpl = require('./index.ejs.html');

class TradeHistroy extends Base{
	constructor(config) {
		super(config);
		this._initAttrs();
		this._init();
	}

	_init() {
		this._getData();
	}

	_bind() {

	}

	_getData() {
		var data = {
			access_token: this.cookie.get('token'),
			expert_id: this.id
		}
		this.ajax({
			url: this._getUrl(),
			data: data
		}).then((data) => {
			data = data.data;
			data = data.reverse(); // 倒排一下
			this.render(tmpl, data, this.el);
		})
	}

	_getUrl() {
		var url = this.isMy ? '/v1/follow/follower/expert/'+ this.id +'/ticket/history/' : '/v1/follow/rank/expert/'+ this.id +'/ticket/history/';
		return url;
	}

	destroy() {

	}

	_initAttrs() {
	}
}

module.exports = TradeHistroy;