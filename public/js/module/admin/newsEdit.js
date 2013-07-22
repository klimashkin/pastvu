/*global define:true*/

/**
 * Модель создания/редактирования новости
 */
define([
	'underscore', 'jquery', 'Browser', 'Utils', 'socket', 'Params', 'knockout', 'knockout.mapping', 'm/_moduleCliche', 'globalVM',
	'model/User', 'model/storage',
	'text!tpl/admin/newsEdit.jade', 'css!style/admin/newsEdit',
	'jquery-plugins/redactor/redactor', 'css!style/jquery/redactor/redactor',
	'bs/bootstrap-datetimepicker', 'css!style/bootstrap-datetimepicker'
], function (_, $, Browser, Utils, socket, P, ko, ko_mapping, Cliche, globalVM, User, storage, jade) {
	'use strict';

	return Cliche.extend({
		jade: jade,
		options: {
		},
		create: function () {
			this.destroy = _.wrap(this.destroy, this.localDestroy);
			this.auth = globalVM.repository['m/common/auth'];
			this.createMode = ko.observable(true);

			this.tDateExists = ko.observable(false);
			this.noticeExists = ko.observable(false);
			this.news = ko_mapping.fromJS({
				pdate: '',
				tdate: '',
				title: '',
				notice: '',
				txt: ''
			});

			this.$dom.find('textarea#newsPrimary').redactor();
			this.$dom.find('#newsPdate').datetimepicker();

			this.subscriptions.route = globalVM.router.routeChanged.subscribe(this.routeHandler, this);
			this.routeHandler();

			ko.applyBindings(globalVM, this.$dom[0]);
			this.show();
		},
		show: function () {
			globalVM.func.showContainer(this.$container);
			this.showing = true;
		},
		hide: function () {
			globalVM.func.hideContainer(this.$container);
			this.showing = false;
		},
		localDestroy: function (destroy) {
			this.$dom.find('textarea#newsPrimary').destroyEditor();
			this.$dom.find('#newsPdate').data('datetimepicker').disable();
			this.noticeOff();
			this.tDateOff();

			this.hide();
			destroy.call(this);
		},
		routeHandler: function () {
			var cid = Number(globalVM.router.params().cid);

			this.createMode(!cid);
			if (!this.createMode()) {
				this.getOneNews(cid, function () {
					this.fillData();
				}, this);
			} else {
				this.resetData();
			}
		},
		//TODO: проверить флоу с переходом на другие новости
		resetData: function () {
			var areaPrimary = this.$dom.find('textarea#newsPrimary'),
				pickerP = this.$dom.find('#newsPdate').data('datetimepicker');

			areaPrimary.setCode('<p></p>');
			pickerP.setLocalDate(new Date());
			this.noticeOff();
			this.tDateOff();

			this.noticeExists(false);
			this.tDateExists(false);
			ko_mapping.fromJS({
				pdate: '',
				tdate: '',
				title: '',
				notice: '',
				txt: ''
			}, this.news);
		},
		fillData: function () {
			var areaPrimary = this.$dom.find('textarea#newsPrimary'),
				pickerP = this.$dom.find('#newsPdate').data('datetimepicker');

			pickerP.setLocalDate(new Date(this.news.pdate() || Date.now()));
			areaPrimary.setCode(this.news.txt() || '<p></p>');
			if (!!this.news.notice()) {
				this.noticeOn();
			} else {
				this.noticeOff();
				this.news.notice('');
			}
			if (!!this.news.tdate()) {
				this.tDateOn();
			} else {
				this.tDateOff();
				this.news.tdate('');
			}
		},

		toggleNotice: function () {
			if (this.noticeExists()) {
				this.noticeOff();
			} else {
				this.noticeOn();
			}
		},
		noticeOn: function () {
			this.noticeExists(true);
			this.$dom.find('textarea#newsNotice').redactor().setCode(this.news.notice());
		},
		noticeOff: function () {
			if (this.noticeExists()) {
				var areaNotice = this.$dom.find('textarea#newsNotice');
				this.news.notice(areaNotice.getCode());
				areaNotice.destroyEditor();
				this.noticeExists(false);
			}
		},
		toggleTDate: function () {
			if (this.tDateExists()) {
				this.tDateOff();
			} else {
				this.tDateOn();
			}
		},
		tDateOn: function () {
			this.tDateExists(true);
			var pickerT = this.$dom.find('#newsTdate').datetimepicker().data('datetimepicker');
			pickerT.setLocalDate(new Date(this.news.tdate() || (Date.now() + (5 * 24 * 60 * 60 * 1000))));
		},
		tDateOff: function () {
			if (this.tDateExists()) {
				var pickerT = this.$dom.find('#newsTdate').data('datetimepicker');
				pickerT.disable();
				this.tDateExists(false);
			}
		},
		getOneNews: function (cid, cb, ctx) {
			socket.once('takeNews', function (data) {
				if (!data || data.error || !data.news) {
					window.noty({text: data && data.message || 'Error occurred', type: 'error', layout: 'center', timeout: 3000, force: true});
				} else {
					ko_mapping.fromJS(data.news, this.news);
				}

				if (Utils.isType('function', cb)) {
					cb.call(ctx, data);
				}
			}.bind(this));
			socket.emit('giveNews', {cid: cid});
		},
		save: function () {
			var saveData = ko_mapping.toJS(this.news);

			if (!this.tDateExists()) {
				delete saveData.tdate;
			} else {
				saveData.tdate = this.$dom.find('#newsTdate').data('datetimepicker').getLocalDate();
			}

			if (this.noticeExists()) {
				saveData.notice = this.$dom.find('textarea#newsNotice').getCode();
			} else {
				delete saveData.notice;
			}

			saveData.pdate = this.$dom.find('#newsPdate').data('datetimepicker').getLocalDate();
			saveData.txt = this.$dom.find('textarea#newsPrimary').getCode();

			socket.once('saveNewsResult', function (data) {
				if (!data || data.error || !data.news) {
					window.noty({text: data && data.message || 'Error occurred', type: 'error', layout: 'center', timeout: 3000, force: true});
				} else {
					window.noty({text: 'Сохранено', type: 'success', layout: 'center', timeout: 1800, force: true});
					if (this.createMode()) {
						globalVM.router.navigateToUrl('/admin/news/edit/' + data.news.cid);
					}
				}
			}.bind(this));
			socket.emit('saveNews', saveData);
		},
		submit: function (data, evt) {
			var $form = $(evt.target);
			$form.find(':focus').blur();

			this.save();
			return false;
		}
	});
});