import View from './view';

class SidebarView extends View {
	_parentEl = $('.sidebar__main');

	/**
	 * Format date into date string
	 * @param {Object} date - Date object
	 * @returns {String} Formatted Date String
	 */

	addHandler(handler) {
		this._parentEl.on('click', e => {
			if (e.target && e.target.classList.contains('temp__types'))
				handler(e.target);
		});
	}

	/**
	 * Returns formatted date string by taking date object
	 * @param {Object} date - Date object
	 * @returns {String} Formatted Date String
	 */

	_dateFormatter(date) {
		return new Intl.DateTimeFormat(this._getLocale(), {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			weekday: 'long',
		}).format(date);
	}

	/**
	 * Update Date in side bar with new Date
	 * @param {Object} date - Date Object
	 */

	_updateDate(date) {
		$('.date').text(this._dateFormatter(date));
	}

	/**
	 * Update temperature value in next days
	 * @param {Number} temp - Temperature value
	 */

	_updateTemp(temp) {
		const tempEl = $('.temp__value');
		tempEl.text('');
		tempEl.text(Math.round(temp));
	}

	_getMarkup() {
		const { temp, location, weather_status, weather_id, dt } = this.data;

		return `
    <div class="temp">
      <h1 class="temp__value">${Math.round(temp?.day ?? temp)}</h1>
      <div class="temp__type">
        <p class="temp__type--c temp__types active">°C</p>
        <p class="temp__type--f temp__types">°F</p>
      </div>
    </div>

    <div class="weather">
      <img
        class="weather__img"
        src="${this._getIcon(weather_id)}"
        alt="weather"
      />
      <p class="weather-status heading-primary">${weather_status}</p>
    </div>

    <hr class="sidebar__break" />

    <div class="info">
      <p class="location heading-primary--sub">${location}</p>
      <p class="date heading-tertiary heading-tertiary--white">
        ${this._dateFormatter(
					new Date(new Date().setDate(new Date().getDate() + dt))
				)}
      </p>
    </div>
    `;
	}
}

export default new SidebarView();
