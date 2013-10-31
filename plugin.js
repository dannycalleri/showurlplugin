/**
 * plugin.js
 *
 * Copyright 2013, Danny Calleri
 * Released under MIT license.
 *
 */

tinymce.PluginManager.add('showurl', function(editor, url) {

	editor.addButton('showurl', {
		text: 'Show URL',
		title : 'Show URL plugin',
		onclick : function() {

			var rawData = editor.selection.getContent({format : 'html'});
		    
		    var settings = { 
		       invalid_elements : "script,object,embed,link,style,form,input,iframe",
		       valid_elements:"a[href],img[src],li,ul,ol,span,div,p,br,blockquote,h1,h2,h3,h4,h5,h6,strong/b,em/i,li,ul,ol"
		    };

		    var schema = new tinymce.html.Schema(settings);
		    var parser = new tinymce.html.DomParser({}, schema);
		    var serializer = new tinymce.html.Serializer({}, schema);
			var rootNode = parser.parse(rawData);
			var linkNode = rootNode.getAll("a")[0];

			console.log("RAW DATA = " + rawData);

			var url = "";
			var linkContent = "";
			if(linkNode && !linkNode.isEmpty())
			{
				linkContent = editor.selection.getContent({format : 'text'});
				console.log("Link value = " + linkContent);

				url = linkNode.attr("href");
				if(url) 
				{
					console.log("Link href = " + url);
				}
				else 
				{
					console.log("No URL found! " + url);
				}
			}

			if(!url || url === "")
			{
				editor.windowManager.alert('No URL found in selection.');
			}
			else
			{
				// Open window with a specific url
				editor.windowManager.open({
					title: linkContent,
					url: url,
					width: 640,
					height: 480,
					buttons: [{
						text: 'Close',
						onclick: 'close'
					}]
				});
			}
		}
	});

	// Adds a menu item to the tools menu
	editor.addMenuItem('showurl', {
		text: 'Show URL plugin',
		context: 'tools',
		onclick: function() {
			editor.windowManager.alert('Plugin developed by Danny Calleri 2013');
		}
	});
});