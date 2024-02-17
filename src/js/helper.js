import { TIMEOUT_SEC } from './config';

/**
 * Returns a rejected Promise after given seconds
 * @async
 * @param {number} sec - How much time before rejecting promise
 * @returns {Promise} Settled (Rejected) Promise
 */

const timeout = async function (sec) {
	return new Promise((_, reject) => {
		setTimeout(() => {
			reject(new Error(`Request took too long! Timeout after ${sec} second`));
		}, sec * 1000);
	});
};

/**
 * Fetches data from given url
 * @async
 * @param {String} url
 * @returns {Promise} Data - Settled Promise
 */

// Async func always returns Promise (resolved or Rejected)
const FETCH = async function (url) {
	try {
		// Consuming Promise using Await | .then()
		const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

		if (!res.ok) throw new Error(`Error (${res.status}): ${data.message}`);

		const data = await res.json();
		// Returns Resolved value (Promise)
		return data;
	} catch (err) {
		throw err;
	}
};

/* If we handled error here. The fulfilled promise will be return even error occurred 

If we throw error from Async function: It'll mean Promise gets rejected instead of resolved */

/**
 * Checks if it's day time or not
 * @param {Object} date - Date Object
 * @description Day time is considered from 6am to 6pm
 * @returns {Boolean}
 */

const isDay = date => {
	const hours = date.getHours();
	return hours > 6 && hours < 18;
};

/**
 * Returns the day name in short
 * @param {Object} date - Date Object
 * @returns {String} Day name in short
 */

const getDay = date => {
	switch (date.getDay()) {
		case 0:
			return 'SUN';
		case 1:
			return 'MON';
		case 2:
			return 'TUE';
		case 3:
			return 'WED';
		case 4:
			return 'THU';
		case 5:
			return 'FRI';
		case 6:
			return 'SAT';
	}
};

export { FETCH, isDay, getDay };
