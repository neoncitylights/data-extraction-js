/**
 * Extracts data from a description list (<dl>) and outputs
 * a dictionary with the keys as the term text (<dt>), and the
 * values as the description text (<dd>).
 * The parser is an HTML5-compliant parser, and therefore
 * can handle the following children elements:
 * - 1 or more <dt> elements in a row
 * - `<div>` child element grouping `<dt>` and `<dd>` within
 * 
 * @license MIT
 */
class DescriptionListExtracter {
	/**
	 * @param {HTMLDListElement|HTMLDivElement} element Can parse a `<dl>` element, or a `<div>` element containing `<dt>` and `<dd>`
	 * @param {Object} config Object to pass in configuration settings
	 * @param {CallableFunction(String)} config.dtCallback Callback to run on the textual content of a `<dt>` element
	 * @param {CallableFunction(String)} config.ddCallback Callback to run on the textual content of a `<dd>` element
	 * @return {Object<String|Array>|undefined} Can possibly be one of the following
	 * - a dictionary that maps the terms (`<dt>`) as keys, and the details (`<dd>`) as values,
	 * 	which can either be a string or array. If the element passed is neither
	 * - an empty object, if the element passed has no children elements
	 * - undefined, if the element passed is neither a `<dt>` or `<div>`
	 */
	extract(element, config) {
		if (
			!(element instanceof HTMLDListElement) &&
			!(element instanceof HTMLDivElement)
		) {
			return undefined;
		}

		var children = Array.from(element.children);
		if (children.length === 0) {
			return {};
		}

		var self = this;
		var object = {};
		var terms = [];
		var details = [];

		children.forEach(function (currentElement) {
			var previousElement = currentElement.previousElementSibling;
			switch (currentElement.tagName) {
				case "DT":
					terms.push(currentElement.textContent);
					break;
				case "DD":
					if (previousElement.tagName === 'DT') {
						terms.forEach(function (term) {
							terms[term] = currentElement.textContent;
						});

						terms = [];
					} else if (previousElement.tagName === 'DD') {
						details.push(currentElement.textContent);
					}
					break;
				case "DIV":
					Object.assign(object, self.extract(currentElement));
					break;
				default:
					return;
			}
		});

		return object;
	}
}
