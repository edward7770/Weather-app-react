/* 
CONTROLLER 
-> Application Logic (Events)
-> Interact with Model & Views
*/

import * as model from './model';
import backgroundView from './views/backgroundView';
import detailView from './views/detailView';
import searchView from './views/searchView';
import sidebarView from './views/sidebarView';

const { state } = model;

/**
 * Renders forecast in both side view and details view
 */

const renderForecast = function () {
	const current = state.forecast[0].current;
	sidebarView.render({
		temp: current.temp,
		weather_status: current.weather[0].main,
		weather_id: current.weather[0].id,
		dt: state.currentDay,
		location: state.location.name,
	});

	detailView.render({ ...state.forecast[0], currentDay: state.currentDay });
	backgroundView.setTheme(current.weather[0].id);
};

/**
 * It displays the forecast of given or user's current location
 * @param {String} [location=''] - Location which forecast should be displayed
 */

const controlForecast = async function (location = '') {
	try {
		sidebarView.renderSpinner();
		detailView.renderSpinner();
		searchView._clear();

		if (!location) {
			const { lat, lon } = await model.getCurrentLocation();
			await model.forecast(lat, lon);
		} else {
			const { lat, lon } = await model.initForecast(location);
			await model.forecast(lat, lon);
		}

		renderForecast();
	} catch (err) {
		console.error(err);
		detailView.clear();
		sidebarView.renderError();
	}
};

/**
 * Controls when user changes temp type
 * @param {Object | Node} clicked
 */

const controlTempTypes = function (clicked) {
	if (clicked.classList.contains('active')) return;

	$('.temp__types.active').removeClass('active');
	clicked.classList.add('active');

	if (clicked.classList.contains('temp__type--f')) {
		sidebarView._updateTemp(
			state.forecast[1].current.temp?.day ?? state.forecast[0].current.temp
		);

		detailView.render({ ...state.forecast[1], currentDay: state.currentDay });
	} else {
		sidebarView._updateTemp(
			state.forecast[0].current.temp?.day ?? state.forecast[0].current.temp
		);

		detailView.render({ ...state.forecast[0], currentDay: state.currentDay });
	}
};

/**
 * Controls when user search for a location
 */

const controlSearch = async function () {
	try {
		const query = searchView.getQuery();

		if (!query) return;

		controlForecast(query);
	} catch (err) {
		console.error(err);
	}
};

/**
 * Controls when user clicks day from next days
 * @param {Object | Node} dayEl Day element from next days
 */

const controlDay = function controlNextDays(dayEl) {
	// + to convert index to number
	const index = +$(dayEl).attr('data-day');
	state.currentDay = index;

	state.forecast[0].current = state.forecast[0].daily[index];
	state.forecast[1].current = state.forecast[1].daily[index];

	renderForecast();
};

// EVENTS - Subscribers

// Init
(function Init() {
	controlForecast();
	searchView.addHandler(controlSearch);
	searchView.addHandlerMyLocation(controlForecast);
	sidebarView.addHandler(controlTempTypes);
	detailView.addDayHandler(controlDay);
})();
