import { isDay } from '../helper';

class BackgroundView {
	_parentEl = $('body');

	/**
	 * Set relevant background image according to weather
	 * @param {Number} id - Weather ID
	 */

	setTheme(id) {
		this._clear();

		// Clouds
		if (id >= 803) this._parentEl.addClass('theme-1h');
		else if (id >= 801) this._parentEl.addClass('theme-1');
		// Clear
		else if (id >= 800) {
			if (isDay(new Date())) this._parentEl.addClass('theme-2');
			else this._parentEl.addClass('theme-2n');
		}
		// Dust
		else if (id >= 751 || id == 731) this._parentEl.addClass('theme-3');
		// Fog | Mist | Haze
		else if (id >= 701) this._parentEl.addClass('theme-4');
		// Snow
		else if (id >= 600) this._parentEl.addClass('theme-5');
		// Rain
		else if (id >= 500) this._parentEl.addClass('theme-6');
		// Thunder
		else if (id >= 200) this._parentEl.addClass('theme-7');
	}

	/**
	 * Remove any theme (Background Image) from body
	 */

	_clear() {
		this._parentEl.removeClass();
	}
}

export default new BackgroundView();
