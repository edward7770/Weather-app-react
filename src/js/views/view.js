/* 
Parent Class: Contains method and data which is common to all the views.

All these methods will extended by sub View Classes.
'this' refer to calling objects (sub classes)
*/

import heavyClouds from 'url:../../animated/cloudy.svg';
import lightClouds from 'url:../../animated/cloudy-day-3.svg';
import clear_day from 'url:../../animated/day.svg';
import clear_night from 'url:../../animated/night.svg';
import dust from 'url:../../animated/50d.svg';
import thunder from 'url:../../animated/thunder.svg';
import drizzle from 'url:../../animated/rainy-7.svg';
import lightRain from 'url:../../animated/rainy-2.svg';
import moderateRain from 'url:../../animated/rainy-1.svg';
import heavyRain from 'url:../../animated/rainy-3.svg';
import lightShowerRain from 'url:../../animated/rainy-5.svg';
import heavyShowerRain from 'url:../../animated/rainy-6.svg';
import snow from 'url:../../animated/snowy-6.svg';

import { isDay } from '../helper';

class View {
	data;

	/**
	 * Render given data to parent element
	 * @param {Object} data - Object of data from API which is needed to render
	 */

	render(data) {
		this.data = data;
		// _getMarkup is unique in each view (this -> sub class / obj)
		const markup = this._getMarkup();

		this.clear();
		this._parentEl.append(markup);
	}

	/**
	 * Render loading spinner on the Parent Element
	 */

	renderSpinner() {
		this.clear();
		this._parentEl.append(`
    <div class="center">
      <div class="spinner"></div>
    </div>`);
	}

	renderError() {
		this.clear();
		this._parentEl.append(`
    <div class="center">
      ${this._getErrorMarkup(
				'No location found for your query!<br />Please try again! 😔'
			)}
    </div>`);
	}

	/**
	 * Gets locale from browser
	 * @returns {String} Locale
	 */

	_getLocale() {
		return Navigator.language;
	}

	/**
	 * Returns error markup with given message
	 * @param {String} mssg - Message to be displayed
	 * @returns {String} Error Markup
	 */

	_getErrorMarkup(mssg) {
		return `
    <div class="error">
          <div class="ui-error">
            <svg
              viewBox="0 0 87 87"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g id="Group-2" transform="translate(2.000000, 2.000000)">
                  <circle
                    id="Oval-2"
                    stroke="rgba(252, 191, 191, .5)"
                    stroke-width="4"
                    cx="41.5"
                    cy="41.5"
                    r="41.5"
                  ></circle>
                  <circle
                    class="ui-error-circle"
                    stroke="#F74444"
                    stroke-width="4"
                    cx="41.5"
                    cy="41.5"
                    r="41.5"
                  ></circle>
                  <path
                    class="ui-error-line1"
                    d="M22.244224,22 L60.4279902,60.1837662"
                    id="Line"
                    stroke="#F74444"
                    stroke-width="3"
                    stroke-linecap="square"
                  ></path>
                  <path
                    class="ui-error-line2"
                    d="M60.755776,21 L23.244224,59.8443492"
                    id="Line"
                    stroke="#F74444"
                    stroke-width="3"
                    stroke-linecap="square"
                  ></path>
                </g>
              </g>
            </svg>
          </div>

          <p class="error__message">
            ${mssg}
          </p>
        </div>
    `;
	}

	/**
	 * Returns suitable weather icon according to weather ID
	 * @param {Number} id - Weather ID
	 * @returns {String} Path of Icon | Icon
	 */

	_getIcon(id) {
		//  CLOUDS
		if (id >= 802) return heavyClouds;
		if (id >= 801) return lightClouds;
		// CLEAR
		if (id >= 800) {
			if (isDay(new Date())) return clear_day;
			return clear_night;
		}
		// ATMOSPHERE
		if (id >= 701) return dust;
		// SNOW
		if (id >= 600) return snow;
		// RAIN
		if (id >= 522) return heavyShowerRain;
		if (id >= 520) return lightShowerRain;
		if (id >= 511) return snow;
		if (id >= 503) return heavyRain;
		if (id >= 501) return moderateRain;
		if (id >= 500) return lightRain;
		// DRIZZLE
		if (id >= 300) return drizzle;
		// THUNDER
		if (id >= 200) return thunder;
	}

	/**
	 * Clears the html of parent element
	 */

	clear() {
		this._parentEl.html('');
	}
}

export default View;
