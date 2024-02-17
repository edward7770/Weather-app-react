import { getDay } from '../helper';
import View from './view';

class DetailView extends View {
	_parentEl = $('.details__content');
	_dayIndex = 0;

	addDayHandler(handler) {
		this._parentEl.on('click', e => {
			const dayEl = e.target.closest('.day');
			if (dayEl) {
				handler(dayEl);
			}
		});
	}

	_timeFormatter(date) {
		return new Intl.DateTimeFormat(this._getLocale(), {
			hour: '2-digit',
			minute: '2-digit',
		}).format(date);
	}

	_getMarkup() {
		const { current, daily, units, currentDay } = this.data;
		this._dayIndex = currentDay;

		return `
    ${this.#getCurrentDayMarkup(current, units)}
    ${this.#getNextDaysMarkup(daily.slice(0, -2))}
    `;
	}

	#getCurrentDayMarkup(current, units) {
		const { humidity, pressure, sunrise, sunset, visibility, wind_speed } =
			current;

		return `
    <h2 class="heading-secondary u-mb-5">Weather Details</h2>

    <div class="current-day">
      ${this.#getWeatherDetailsMarkup(
				'wind',
				(wind_speed * 3.6).toFixed(2),
				units == 'metric' ? 'km/h' : 'mph'
			)}
      ${this.#getWeatherDetailsMarkup('humidity', humidity, '%')}
      ${this.#getWeatherDetailsMarkup(
				'sunrise',
				this._timeFormatter(new Date(sunrise))
			)}

      ${
				visibility
					? this.#getWeatherDetailsMarkup('visibility', visibility, 'm')
					: this.#getWeatherDetailsMarkup(
							'Feels Like',
							current.feels_like.day,
							'°'
					  )
			}
      ${this.#getWeatherDetailsMarkup('air pressure', pressure, 'hPa')}
      ${this.#getWeatherDetailsMarkup(
				'sunset',
				this._timeFormatter(new Date(sunset))
			)}
    </div>
      `;
	}

	#getWeatherDetailsMarkup(title, value, unit = '') {
		return `
    <div class="weather-details">
      <h3 class="weather-details__main">
        ${value}${unit == '%' ? unit : ' ' + unit}
      </h3>
      <p class="heading-tertiary weather-details__type">
        ${title}
      </p>
    </div>
    `;
	}

	#getNextDaysMarkup(days) {
		return `
  <div class="next-days u-mt-7">
    <h2 class="heading-secondary u-mb-5">Next Days</h2>

    <div class="next-days__details">
      ${days
				.map((day, i) => {
					return this.#getDayMarkup({
						day: getDay(new Date(new Date().setDate(new Date().getDate() + i))),
						min: day.temp.min,
						max: day.temp.max,
						icon: this._getIcon(day.weather[0].id),
						index: i,
					});
				})
				.join('')}
    </div>
  </div>
    `;
	}

	#getDayMarkup({ day, min, max, icon, index }) {
		return `
  <div class="day ${
		this._dayIndex == index ? 'active' : ''
	}" data-day="${index}">
    <h5 class="day--name">${day}</h5>
    <img
      src="${icon}"
      alt="Day Icon"
      class="day__icon"
    />
    <div class="day__temp">
      <div class="day__temp--max">${Math.round(max)}°</div>
      <div class="day__temp--min">${Math.round(min)}°</div>
    </div>
  </div>
    `;
	}
}

export default new DetailView();
