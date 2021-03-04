/**
 * Traverses an HTML table and converts it to machine-readable data.
 * It is able to process multiple `thead` and `tbody` elements.
 */
class TableDataExtracter {
	/**
	 * @param {String} selector
	 * @return {Array}
	 */
	extractBySelector(selector) {
		const table = document.querySelector(selector);
		const dataProps = this.collectDataProps(table);

		return this.collectDataBodies(table, dataProps);
	}

	/**
	 * @param {HTMLTableElement} table
	 * @return {String[]}
	 */
	collectDataProps(table) {
		let dataProps = [];
		const tHeads = table.tHead.getElementsByTagName('th');
		Array.from(tHeads).forEach(tHead => {
			dataProps.push(tHead.innerText);
		});

		return dataProps;
	}

	/**
	 * @param {HTMLTableElement} table 
	 * @param {String[]} dataProps
	 * @return {Array[]}
	 */
	collectDataBodies(table, dataProps) {
		let dataBodies = [];
		Array.from(table.tBodies).forEach(tableBody => {
			dataBodies.push(this.collectDataRows(tableBody, dataProps));
		});

		return dataBodies;
	}

	/**
	 * @param {HTMLTableSectionElement} tableBody 
	 * @param {String[]} dataProps
	 * @return {Object[]}
	 */
	collectDataRows(tableBody, dataProps) {
		let dataRows = [];
		Array.from(tableBody.rows).forEach(tableRow => {
			const tableCells = tableRow.cells;
			let dataRow = {};
			for (let i = 0; i < tableCells.length; i++) {
				const prop = dataProps[i];
				dataRow[`${prop}`] = tableCells[i].innerText;
			}
			dataRows.push(dataRow);
		});

		return dataRows;
	}
}
