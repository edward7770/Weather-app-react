import View from './view';

class SearchView {
	_parentEl = $('.search-bar');
	_searchEl = $('.search-bar__input');
	_myLocationBtn = $('#btn-location');

	/**
	 * Returns query searched in search bar
	 * @returns {String} - Searched Query
	 */

	getQuery() {
		return this._searchEl.val();
	}

	/**
	 * Handler should run when user searches for anything in search bar
	 * @param {Function} handler - Function which should run when anything is searched on search bar
	 */

	addHandler(handler) {
		this._parentEl.on('submit', e => {
			e.preventDefault();
			handler();
		});
	}

	/**
	 * Handler should run when user clicks my location button
	 * @param {Function} handler - Function which should run when my location button is clicked
	 */

	addHandlerMyLocation(handler) {
		this._myLocationBtn.on('click', () => {
			handler();
		});
	}

	/**
	 * Clears the search string in search bar
	 */

	_clear() {
		$('.search-bar')[0].blur();
		this._searchEl[0].blur();
		this._searchEl.val('');
	}
}

export default new SearchView();
