class TableDOMWalker {
	/**
	 * Checks if the element is related to a table. It must be one of the following:
	 * `<table>`, `<caption>`, `<colgroup>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`
	 * or `<tfoot>`
	 *
	 * @param {HTMLElement} element 
	 * @returns {Boolean}
	 */
	isTableRelatedElement(element) {
		return [
			'TABLE',
			'CAPTION',
			'COLGROUP',
			'THEAD',
			'TBODY',
			'TH',
			'TR',
			'TD',
			'TFOOT',
		].includes(element.tagName);
	}

	/**
	 * Tries to find a caption/description of the element by getting
	 * the closest element (listed by highest priority) that matches any of:
	 * - `HTMLTableCaptionElement`: table caption element (`<caption>`)
	 * - `HTMLHeadingElement`: heading element (`<h1>` - `<h6>`)
	 * - soon: checks if the previous element contains an child element
	 * that is an instance of an HTMLHeadingElement
	 *
	 * If it can't find either, it will return an empty string.
	 *
	 * @param {HTMLTableElement} element
	 * @returns {String}
	 */
	getTableCaption(element) {
		if (!(element instanceof HTMLTableElement)) {
			return "";
		}

		if (element.caption !== null) {
			return element.caption.textContent;
		}

		if (element.previousElementSibling instanceof HTMLHeadingElement) {
			return element.previousElementSibling.textContent;
		}

		return "";
	}

	/**
	 * This method tries to find the closest parent table element
	 * of a table-related element by walking through the DOM.
	 * If the element is not table-related, it'll return undefined.
	 *
	 * @param {HTMLElement} element
	 * @return {HTMLTableElement|undefined}
	 */
	getClosestParentTableElement(element) {
		if (!this.isTableRelatedElement(element)) {
			return undefined;
		}

		switch (element.tagName) {
			case "TABLE":
				return element;
			case "CAPTION":
			case "COLGROUP":
			case "THEAD":
			case "TBODY":
			case "TFOOT":
				return element.parentElement;
			case "COL":
				return element.parentElement.parentElement;
			case "TR":
				return this.getClosestParentTableElementFromRow(element);
			case "TD":
			case "TH":
				return this.getClosestParentTableElementFromRow(element.parentElement);
			default:
				return undefined;
		}
	}

	/**
	 * @param {HTMLTableRowElement} rowElement
	 * @return {HTMLTableElement}
	 */
	getClosestParentTableElementFromRow(rowElement) {
		if (!(rowElement instanceof HTMLTableRowElement)) {
			return undefined;
		}

		if (rowElement.parentElement instanceof HTMLTableElement) {
			return rowElement.parentElement;
		}

		return rowElement.parentElement.parentElement;
	}
}
