/*!zakmicrojs 1.0.0, Copyright 20120 Zakro Gogolidze, released under MIT license */
let _ = ( () => {

	'use strict';

	// Create the methods object
	let methods = {};
	// Avaible actions
	let actions = ["hide", "show", "classAdd", "classRemove", "classToggle", "styleAdd", 'attrSet', 'attrGet', 'next'];

	//
	// Methods
	//

	/**
	 * Get an element in the DOM
	 * @param  {String} selector The selector to match against
	 * @param  {Node} scope      An element to search within [optional]
	 * @return {Node}            The first matching element
	 */
	methods.find = (selector, action, element, scope) => {
		if (!selector) throw new Error('Please provide a selector.');
		selector =  scope ? scope.querySelector(selector) : document.querySelector(selector);
		if(action) doAction(selector, action, element);
		else return selector;
	};

	// Selector actions
	const doAction = (selector, action, element) => {
		if (!actions.includes(action)) throw new Error('Please provide a correct action. Avaible actions: ' + actions.join(', ') + '.');

		// Hide/Show Element
		const hide = () => {
			return selector.style.display = "none";
		}

		const show = () => {
			return selector.style.display = "block";
		}
		
		// Add Style
		const styleAdd = () => {
			return selector.style.cssText = element.toString();
		}

		// Add/Remove/Toggle Class
		const classAdd = () => {
			return element.forEach(el => {
				selector.classList.add(el);
			})
		}

		const classRemove = () => {
			return element.forEach(el => {
				selector.classList.remove(el);
			})
		}

		const classToggle = () => {
			return element.forEach(el => {
				selector.classList.toggle(el);
			})
		}

		// Set/Get HTML attr property
		const attrSet = () => {
			return selector.setAttribute(element[0], element[1]);
		};

		// const attrGet = () => {
		// 	selector.getAttribute(element);
		// };

		// Tegs
		// const next = () => {
		// 	return selector.nextElementSibling;
		// }
		// End tegs
		
		return eval(action + '();');
	}

	/**
	 * Get all matching elements in the DOM
	 * @param  {String} selector The selector to match against
	 * @param  {Node} scope      An element to search within [optional]
	 * @return {NodeList}        The matching elements
	 */
	methods.findAll = (selector, scope) => {
		if (!selector) throw new Error('Please provide a selector.');
		return scope ? scope.querySelectorAll(selector) : document.querySelectorAll(selector);
	};

	/**
	 * Setup an event listener
	 * @param  {Node}     elem        The element to attach the listener to
	 * @param  {String}   event       The event to listen for
	 * @param  {Function} callback    The callback to run on the event
	 * @param  {Boolean}  useCapture  If true, set useCapture to true [optional]
	 */
	methods.on = (elem, event, callback, useCapture) => {
		if (!elem) throw new Error('Please provide an element to attach the event to.');
		if (!event) throw new Error('Please provide an event to listen for.');
		if (!callback || typeof callback !== 'function') throw new Error('Please provide a valid callback function to run');
		elem.addEventListener(event, callback, useCapture || false);
	};

	/**
	 * Setup fetch
	 * @param  {String}   url
	 * @param  {Object}   option
	 * @param  {Object}   params
	 */
	methods.fetch = ( url = '', params = {}, option = {} ) => {
		// Default options are marked with *
		return fetch(url, {
			method: option.method ?? 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: option.mode ?? 'cors', // no-cors, *cors, same-origin
			cache: option.cache ?? 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: option.credentials ?? 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: option.redirect ?? 'follow', // manual, *follow, error
			referrerPolicy: option.referrerPolicy ?? 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			// body: JSON.stringify(params) // body data type must match "Content-Type" header
		})
		.then(response => response.json())
		// .then(result => {
		// 	console.log('Success:', result);
		// })
		.catch(error => {
			console.error('Error:', error);
		});
	}

	methods.ready = (callback) => {
		if (document.readyState != "loading") callback();
		else document.addEventListener("DOMContentLoaded", callback);
	}

	// Expose the public methods
	return methods;

})();