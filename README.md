# data-extraction-js
This library contains some low-levellish JS classes for extracting HTML out of a DOM into machine-readable data as JSON.

## Preview
- [data-extraction-js](#data-extraction-js)
	- [Preview](#preview)
	- [Description lists](#description-lists)
	- [Tables](#tables)

## Description lists
The description list element, `<dl>`, can be parsed into JSON using the `DescriptionListExtracter` class, in [src/DescriptionListExtracter.js](/src/DescriptionListExtracter.js). 
The DescriptionListExtracter class, exposes a public `extract()` method, which takes any elements that implement the `HTMLDListElement` interface.

This parser is *almost* HTML5-compliant, and is capable of handling 2/3 of the following:
 - [x] handling any children elements that are a `<div>`
 - [x] handling multiple `<dt>` chilren siblings in a row
 - [ ] (Soon^TM) handling multiple `<dd>` children siblings in a row

HTML sample:
```html
<dl id="prefs">
	<div>
		<dt>Extensions</dt>
		<dd>Remove, install, and change settings of extensions</dd>
	</div>
	<div>
		<dt>Site activity</dt>
		<dd>Learn how visitors are using your site</dd>
	</div>
	<div>
		<dt>Layout and appearance</dt>
		<dd>Change how your site appears to viewers</dd>
	</div>
	<div>
		<dt>Privacy</dt>
		<dd>Decide who is able to access your site</dd>
	</div>
	<div>
		<dt>Security and storage</dt>
		<dd>Backup, update, and protect your site</dd>
	</div>
</dl>
```
JS:
```js
var dlExtracter = new DescriptionListExtracter();
dlExtracter.extract(document.getElementById('prefs'));
```
JSON output:
```json
{
	"Extensions": "Remove, install, and change settings of extensions",
	"Site activity": "Learn how visitors are using your site",
	"Layout and appearance": "Change how your site appears to viewers",
	"Privacy": "Decide who is able to access your site",
	"Security and storage": "Backup, update, and protect your site."
}
```

## Tables
> 🚧 This section is a work in progress!
