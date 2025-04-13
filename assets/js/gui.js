(function($){

	String.prototype.removeAccents = function() {
		return (this.replace(new RegExp("[áàâäã]", "ig"), "a").replace(new RegExp("[éèêë]", "ig"), "e").replace(new RegExp("[íìîï]", "ig"), "i").replace(new RegExp("[óòôöõ]", "ig"), "o").replace(new RegExp("[úùûü]", "ig"), "u").replace(new RegExp("[ç]", "ig"), "c"));
	};
	
	Array.prototype.getObj = function(value, key, children) {
		if (!value) throw new Error("parameter value must be specified");
		if (!key) throw new Error("parameter key must be specified");
		
		var match = null;
		
		for (var x=0; x<this.length; x++) {
			if (this[x].__proto__ !== {}.__proto__) return false;
			
			if (this[x][key] && (this[x][key].removeAccents().toLowerCase() == value.removeAccents().toLowerCase())) 
				match = this[x];
				
			else if (children && this[x][children])
				match = this[x][children].getObj(value, key, children);
			
			if (match != null) break;
		}
		
		return match;
	};

/*
*	WIN
*/

$.win = function(p) {

	p = $.extend({
		// params
		width: 350,
		alwaysCenter: true,
		visible: false,
		overlay: true,
		showCloseBtn: true,
		autoRemove: false,
		overlayOpacity: 0.75,
		buttonAlign: "center",
		x: 50,
		y: 50,
		render: $('body'),
		content: null,
		title: null,
		url: null,
		buttons: null,
		loadingMessage: "Carregando conteúdo...",
		// events
		onRequestComplete: null,
		onSuccess: null,
		onShow: null,
		onHide: null
	}, p);

	var win = {
		successHandler:function(data) {
			win.setContent(data);
			
			if (p.onSuccess)
				p.onSuccess();
		},
		requestCompleteHandler:function() {
			if (p.onRequestComplete)
				p.onRequestComplete();
		},
		request:function(value, data, post) {
			win.load();
			
			$.ajax({
				type: post ? "POST" : "GET",
				dataType: "html",
				url: value,
				data: (data || ""),
				success: win.successHandler,
				complete: win.requestCompleteHandler
			});
			
		},	
		setWidth:function(value) {
			win._content.width(value);
			win.center();
		},
		setTitle:function(value) {
			win._title.html(value);
		},
		getButton:function(i) {
			return win._bottomBar.find("span.botao").eq(i);
		},
		addBtn:function(data) {
			if (typeof data != "object") return false;
			if (data.callback && typeof data.callback != "function") return false;
			
			var btn = $("<span class='botao'><a href='javascript:void(0)'><span>" + data.label +"</span></a></span>");
			
			if (data.className) btn.find("a").addClass(data.className);
			if (data.callback) btn.bind("click", data.callback);
				
			win._bottomBar.append(btn);
			win.fixBottomBar();
			
			if (data.hidden) btn.hide();			
		},
		removeBtn:function(i) {
			if (i == null || typeof i != "number") return false;
			var btnSize = win.getButtons().size();
			if (i < btnSize) win.getButton(i).remove();
			win.fixBottomBar();
		},
		getHolder:function() {
			return win._content;
		},
		getContent:function() {
			return win._content;
		},
		setContent:function(value) {
			win._content.html(value);
			win.center();
		},
		insertContent:function(value) {
			var content = win._content.html() + value;
			win._content.html(content);
			win.center();
		},
		bringToFront:function() {
			win._wrapper.parent().append(win._wrapper);
			win.attachOverlay();
		},
		center:function() {
			win.fixContentHeight();
			win.fixOverlayHeight();
					
			var screenW = $(window).width(), winW = win._wrapper.width(), diffW = (screenW - winW), winX = $(window).scrollLeft(), x = diffW * ((p.x || 0) * 0.01) + winX,
				screenY = $(window).height(), winY = win._wrapper.height(), diffY = (screenY - winY), winY = $(window).scrollTop(), y = diffY * ((p.y || 0) * 0.01) + winY;
			
			win._wrapper.css("left", x).css("top", y);				
		},
		show:function() {
			if (p.overlay) 
				win.showOverlay();
		
			win._wrapper.show();
			
			if (p.alwaysCenter)
				win.center();
				
			if (p.onShow)
				p.onShow();
		},
		hide:function() {
			if (p.overlay)
				win.hideOverlay();
				
			win._wrapper.hide();
				
			if (p.onHide)
				p.onHide();
				
			if (p.autoRemove)
				win.remove();
		},
		fixOverlayHeight:function() {
			var viewportHeight = Math.max($("html").height(), $(window).height());
			win._overlay.height(viewportHeight);		
		},
		showOverlay:function() {
			win._overlay.show();				
			win.fixOverlayHeight();
		},
		hideOverlay:function() {
			win._overlay.hide();
		},
		clear:function() {
			win._content.empty();
		},
		params:function() {
			if (p.render) win.render(p.render);
			if (p.visible) win.show();
			if (p.width) win.setWidth(p.width);
			if (p.title) win.setTitle(p.title);
			if (p.x || p.y) win.center();
			if (p.content) win.setContent(p.content);
			if (p.url) win.request(p.url);
			if (p.buttons) for (var x=0; x<p.buttons.length; x++) win.addBtn(p.buttons[x]);
		},
		getButtons:function() {
			return $("span.botao", win._bottomBar);
		},
		fixBottomBar:function() {
			var btnSize = win.getButtons().size();
			
			if (btnSize > 0)
				win._bottomBar.show();
			
			else
				win._bottomBar.hide();
				
			win.center();
		},
		addListeners:function() {
			$(window).bind("scroll", win.center).bind("resize", win.center);
		},
		removeListeners:function() {
			$(window).unbind("scroll", win.center).bind("resize", win.center);
		},
		load:function() {
			win.clear();
			win._content.append(win._loading);
		},
		remove:function() {
			win._wrapper.remove();
			win._overlay.remove();
		},
		attachOverlay:function() {
			win._wrapper.before(win._overlay);
		},
		render:function(value) {
			win._wrapper.appendTo(value);
			win.attachOverlay();
		},
		drag:function(e) {
			var curX = parseInt(win._wrapper.css("left"), 10), curY = parseInt(win._wrapper.css("top"), 10);
			$(win).data("x", e.pageX - curX).data("y", e.pageY - curY);
			$(document).bind("mousemove", win.move).bind("mouseup", win.drop);
		},
		drop:function() {
			$(document).unbind("mousemove", win.move).unbind("mouseup", win.drop);
		},
		move:function(e) {
			var scrollLeft = $(window).scrollLeft(), scrollTop = $(window).scrollTop(),
				boundX = $(window).width() + scrollLeft - win._wrapper.width(),
				boundY = $(window).height() + scrollTop - win._wrapper.height(),
				x = Math.min(boundX, Math.max(scrollLeft, e.pageX - $(win).data("x"))),
				y = Math.min(boundY, Math.max(scrollTop, e.pageY - $(win).data("y")));
				
			win._wrapper.css("left", x).css("top", y);
			win.removeListeners();
		},
		fixContentHeight:function() {
			var viewportHeight = Math.max($("html").height(), $(window).height()),
				height = (viewportHeight - 80);
				
			win._content.css({maxHeight: height});
		},
		create:function() {
			win._overlay = $("<div class='win-overlay'></div>").css("opacity", p.overlayOpacity).hide();
			win._wrapper = $("<div class='win-wrapper'></div>");

			win._top = $("<div class='win-top'><div class='win-top-right'></div><div class='win-top-left'></div><div class='win-top-center'></div></div>");
			win._bottom = $("<div class='win-bottom'><div class='win-bottom-right'></div><div class='win-bottom-left'></div><div class='win-bottom-center'></div></div>");
			win._mid = $("<div class='win-mid'>");
			
			win._sides = $("<div class='win-mid-right'></div><div class='win-mid-left'></div>");
			win._center = $("<div class='win-mid-center'></div>");
		
			win._header = $("<div class='win-header'></div>").bind("mousedown", win.drag).noSelect();
			win._tools = $("<div class='win-tools'></div>");
			win._title = $("<div class='win-title'></div>");
			
			win._closeBtn = $("<a href='javascript:void(0)' class='tool close'></a>").bind("click", win.hide);
			
			win._content = $("<div class='win-content'></div>");
			win._loading = $("<div class='center'><span class='loading'><div class='loading-pad'>" + p.loadingMessage + "</div></span></div>");
			
			win._bottomBar = $("<div class='win-bottom-bar'></div").css("text-align", p.buttonAlign).hide();

			win._wrapper.append(win._top).append(win._mid).append(win._bottom).hide();
			win._mid.append(win._sides).append(win._center);
			win._center.append(win._header).append(win._content).append(win._bottomBar);
			win._header.append(win._tools).append(win._title);
			
			if (p.showCloseBtn)
				win._tools.append(win._closeBtn);
		},
		init:function() {
			win.create();
			win.params();
			win.addListeners();
		}
	};
	
	win.init();
	
	return win;
	
};

/*
*	TAB
*/

$.tab = function(o, p) {

	p = $.extend({
		selectedIndex: 0,
		height: "auto",
		onChange: null
	}, p);
	
	var tab = {
		create:function() {
			tab._wrapper = $(o);
			tab._header = $("<div class='tab-header'></div>");
			tab._content = $("<div class='tab-content'></div>").html(tab._wrapper.html()).height(p.height);
			
			$.each($("> div", tab._content), function(i) {
				if (i != p.selectedIndex) $(this).hide();
				var handler = tab.createHandler(this, i);
				tab._header.append(handler);
			});
			
			tab._wrapper.empty().prepend(tab._content).prepend(tab._header);			
		},
		previous:function() {
			var index = (tab.getSelectedIndex() - 1);
				
			tab.setSelectedIndex(Math.max(index, 0));		
		},
		next:function() {
			var index = (tab.getSelectedIndex() + 1),
				max = (tab.getHolders().size() - 1);
				
			tab.setSelectedIndex(Math.min(index, max));
		},
		setSelectedIndex:function(i) {
			tab.getHandlers().attr("class", "inactive-tab");
			tab.getHolders().hide();
			
			tab.getHandler(i).attr("class", "active-tab");
			tab.getHolder(i).show();
			
			p.selectedIndex = i;
			
			if (p.onChange)
				p.onChange(i);
		},
		getSelectedIndex:function() {
			return p.selectedIndex;
		},
		getHolders:function() {
			return $("> div", tab._content);
		},
		getHolder:function(i) {
			return $("> div:eq(" + i + ")", tab._content);
		},
		getHandlers:function() {
			return $("> span", tab._header);
		},
		getHandler:function(i) {
			return $("> span:eq(" + i + ")", tab._header);
		},
		createHandler:function(o, i) {
			var tabTitle = $(o).attr("title") || "tab " + (i+1),
				tabClass = (i == p.selectedIndex) ? "active-tab" : "inactive-tab";
			return $("<span class='" + tabClass + "'><a href='javascript:void(0)'><span>" + tabTitle + "</span></a></span>").bind("click", function(){tab.setSelectedIndex(i)});
		},
		init:function() {
			tab.create();
		}
	};
	
	o.addClass("tab-wrapper");

	tab.init();
	
	return tab;
	
};

/*
*	PANEL
*/

$.panel = function(p) {

	p = $.extend({
		// params
		title: "Painel",
		info: null,
		buttons: null,
		render: null,
		// events
		onRender: null
	}, p);

	var panel = {
		setInfo:function(value) {
			panel._topbar.html(value).show();
		},
		setTitle:function(value) {
			panel._header.html(value);
		},
		getContent:function() {
			return panel._content;
		},
		render:function(value) {
			panel._wrapper.appendTo(value);
			
			if (p.onRender)
				p.onRender();
		},
		addBtn:function(value) {
			if (typeof value != "object") return false;
			if (value.callback && typeof value.callback != "function") return false;
			
			var btn = $("<a href='javascript:void(0)'>" + value.label +"</a>");
			
			if (value.callback) 
				btn.bind("click", value.callback);
				
			panel._bottomBar.append(btn).show();
			panel.fixBottomBar();
		},
		getButtons:function() {
			return $("a", panel._bottomBar);
		},
		fixBottomBar:function() {
			var btnSize = panel.getButtons().size();
			
			if (btnSize > 0)
				panel._bottomBar.show();
			
			else
				panel._bottomBar.hide();
		},
		create:function() {
			panel._wrapper = $("<div class='panel-wrapper'></div>");
			
			panel._header = $("<div class='panel-header'></div>");
			panel._topbar = $("<div class='panel-top-bar'></div>").hide();
			panel._content = $("<div class='panel-content'></div>");
			panel._bottomBar = $("<div class='panel-bottom-bar'></div>").hide();
			
			panel._wrapper.append(panel._header).append(panel._topbar).append(panel._content).append(panel._bottomBar);
		},
		params:function() {
			if (p.render) panel.render(p.render);
			if (p.title) panel.setTitle(p.title);
			if (p.info) panel.setInfo(p.info);
			if (p.buttons) for (var x=0; x<p.buttons.length; x++) panel.addBtn(p.buttons[x]);
		},
		init:function() {
			panel.create();
			panel.params();
		}
	};
	
	panel.init();
	
	return panel;
	
};

/*
*	UPLOAD
*/

$.upload = function(p) {

	p = $.extend({
		// params
		name: "file",
		auto: true,
		size: 50,
		render: null,
		url: null,
		allowedTypes: null,
		// events
		onSuccess: null,
		onRender: null
	}, p);
	
	var upload = {
		getExtension:function() {
			var value = upload._input.val();
			return value.substring((value.lastIndexOf(".") + 1), value.length);
		},
		isFilled:function() {
			var value = upload._input.val();
			return (value.length > 0);
		},
		isValid:function() {
			var pattern = new RegExp(upload.getExtension(), "i"), valid = false;
			
				if (p.allowedTypes) {
					for (var x=0; x<p.allowedTypes.length; x++) {
						if (pattern.test(p.allowedTypes[x])) {
							valid = true;
							break;
						}
					}
				}
				
				else
					valid = true;
					
			return valid;
		},
		success:function(data) {
			if (p.onSuccess)
				p.onSuccess(data);
		},
		request:function() {
			if (p.url) {
				upload._form.ajaxSubmit({
					type: "POST",
					success: upload.success,
					complete: upload.replace
				});
			}
		},
		replace:function() {
			var inputRef = upload._input;
			upload._input = upload.createInput();
			inputRef.before(upload._input).remove();
		},
		validate:function() {
			var isValid = upload.isValid(),
				isFilled = upload.isFilled();
				
			if (!isFilled)
				return false;
			
			if (!isValid)
				upload.replace();
			
			else
				if (p.auto)
					upload.request();
		},
		render:function(value) {
			upload._wrapper.appendTo(value);
			
			if (p.onRender)
				p.onRender();
		},
		createInput:function() {
			return $("<input type='file'></input").attr("name", p.name).attr("size", p.size).bind({change: upload.validate, mouseleave: upload.validate});
		},
		create:function() {
			upload._wrapper = $("<div class='upload-wrapper'></div>");
			
			upload._form = $("<form enctype='multipart/form-data' method='post'></form>").attr("action", p.url);
			upload._input = upload.createInput();
			
			upload._sendBtn = $("<input type='button' value='upload' />").bind("click", upload.request);
			
			if (p.auto) upload._sendBtn.hide();
			
			upload._form.append(upload._input).append(upload._sendBtn);
			upload._wrapper.append(upload._form);
		},
		params:function() {
			if (p.render) upload.render(p.render);
		},
		init:function() {
			upload.create();
			upload.params();
		}
	};
	
	upload.init();
	
	return upload;

};

/*
*	GRID
*/

$.grid = function(p) {

	p = $.extend({
		url: null,
		render: null,
		columns: null,
		provider: null,
		selectMode: "single",
		maxHeight: 200,
		selectFn: null,
		onGenerate: null,
		onMove: null
	}, p);

	var grid = {
		// GETTERS
		getSelectedItems:function() {
			return grid.getRows().filter(".selected");
		},
		getRow:function(i) {
			return grid._contentTable.find("tr:eq(" + i + ")");
		},
		getRows:function() {
			return grid._contentTable.find("tr");
		},
		getRowIndex:function(o) {
			return $(o).prevAll().size();
		},
		getProvider:function() {
			return p.provider;
		},
		getColumns:function() {
			return p.columns;
		},
		// SETTERS
		setMaxHeight:function(value) {
			p.maxHeight = value;
			grid.checkHeight();
		},
		setUrl:function(value) {
			p.url = value;

			$.ajax({
				type: "GET",
				data: {t: (new Date()).getTime()},
				dataType: "json",
				url: value,
				success: grid.setProvider
			});
			
		},
		setProvider:function(value) {
			p.provider = value;
			grid.generate();
		},
		setColumns:function(value) {
			p.columns = value;
			grid.generate();
		},
		// PUBLIC
		moveUp:function(factor) {
			var selected = grid.getSelectedItems(),
				provider = grid.getProvider(),
				limit = factor ? 0 + factor : 0,
				arr = [];
			
			$.each(selected, function(i, row){
				var index = row.rowIndex,
					data = provider[index];
					
				if (index <= limit) return false;
				
				provider.splice(index, 1);
				provider.splice((index - 1), 0, data);
				
				arr.push((index - 1));
			});
			
			if (arr.length <= 0) return false;
			
			grid.generate();
			
			for (var x=0; x<arr.length; x++) {
				grid.getRow(arr[x]).addClass("selected");
			}
		},
		moveDown:function(factor) {
			var selected = grid.getSelectedItems(),
				provider = grid.getProvider(),
				limit = factor ? provider.length + factor : provider.length,
				arr = [];
			
			$.each(selected, function(i, row){
				var index = row.rowIndex,
					data = provider[index];
					
				if (index >= limit) return false;
				
				provider.splice(index, 1);
				provider.splice((index + 1), 0, data);
				
				arr.push((index + 1));
			});
			
			if (arr.length <= 0) return false;
			
			grid.generate();
			
			for (var x=0; x<arr.length; x++) {
				grid.getRow(arr[x]).addClass("selected");
			}
		},
		reload:function() {
			grid.setUrl(p.url);
		},
		render:function(value) {
			grid._wrapper.appendTo(value);
		},		
		clearRows:function() {
			grid.getRows().removeClass("selected");
		},
		// PRIVATE
		singleSelection:function(e) {
			var row = e.currentTarget;
			
			if (p.selectFn) {
				if (!p.selectFn(row, grid)) {
					return false;
				}
			}
			
			grid.clearRows();
			grid.toggleRow(row);
			$(grid).data("lastRowIndex", grid.getRowIndex(row));
		},
		multiSelection:function(e) {
			var row = e.currentTarget;
			
			if (p.selectFn) {
				if (!p.selectFn(row, grid)) {
					return false;
				}
			}
			
			if (e.ctrlKey) {
				grid.toggleRow(row);
				$(grid).data("lastRowIndex", grid.getRowIndex(row));
			}
			
			else if (e.shiftKey) {
				var newIndex = grid.getRowIndex(row), 
					oldIndex = $(grid).data("lastRowIndex"),
					min = Math.min(newIndex, oldIndex), 
					max = Math.max(newIndex, oldIndex),
					rows = grid.getRows();
					
				$.each(rows, function(i){
					if ((i >= min && i <= max) && (oldIndex != i)) {
						grid.toggleRow(row);
					}
				});
			}
			
			else
				grid.singleSelection(e);
		},
		createTable:function() {
			return $("<table></table>").attr("cellspacing", 0).attr("cellpading", 0);
		},
		fixHeaderWidth:function() {
			var headerRows = grid._headerHolder.find("tr:eq(0)").find("th"),
				contentRows = grid._contentHolder.find("tr:eq(0)").find("td");
				
			grid._headerTable.width(grid._contentTable.width());
				
			$.each(contentRows, function(i, row){
				var header = headerRows.eq(i),
					rowWidth = $(row).width(),
					borderWidth = header.outerWidth() - header.innerWidth(),
					width = rowWidth - borderWidth;
					
 				header.width(width);
			});
		},
		checkHeight:function() {
			var curHeight = grid._contentTable.height();
			
			if (curHeight > p.maxHeight) {
				grid._content.css("height", p.maxHeight);
			}
			
			else {
				grid._content.css("height", "auto");
			}
			
			grid.fixHeaderWidth();
		},
		toggleRow:function(o) {
			$(o).toggleClass("selected");
		},
		defaultRender:function(field, cell, data, i) {
			var wrapper = $("<div class='cell-wrapper'></div>").html(data[field]);
			cell.empty().append(wrapper);
		},
		renderCell:function(fn, cell, data, i) {
			fn(cell, data, i);
			
			if (cell.data("editable")) {
				cell.bind("click.edit", function(){
					$(this).trigger("edit");
				});
			}
		},
		editCell:function(fn, cell, data, i) {
			cell.data("editable", false).unbind("click.edit");
			fn(cell, data, i);
		},
		createBody:function() {
		
			$.each(p.provider, function(i, data){
				var row = $("<tr></tr>").addClass((i%2 == 0) ? "even" : "odd");
				
				$.each(p.columns, function(j, column){
					var cell = $("<td></td>"), 
						editFn = (column.editFunction || null),
						editable = (data["editable"] != null) ? data["editable"] : (editFn != null),
						renderFn;
						
					renderFn = (column.renderFunction || function(){
						grid.defaultRender(column["field"], cell, data, i);
					});
					
					if (column.width) cell.css("width", column.width);
					if (column.textAlign) cell.css("text-align", column.textAlign);
					
					if (editFn) {
						cell.bind("edit", function(){
							grid.editCell(editFn, cell, data, i);
						});
					}
					
					cell.bind("render", function(){
						grid.renderCell(renderFn, cell, data, i);
					});
					
					cell.data("editable", editable).trigger("render");

					row.append(cell);
					
				});
				
				row.hover(function(){$(this).addClass("hover")}, function(){$(this).removeClass("hover")});
				
				// .noSelect();
				
				grid._contentHolder.append(row);				
			});
		
		},
		createHeader:function() {
			var row = $("<tr></tr>"),
				lastIndex = (p.columns.length - 1);
				
			$.each(p.columns, function(i, item){
				var header = $("<th></th>");
				if (i == lastIndex) header.addClass("last");
				if (item.label) header.text(item.label);
				if (item.width) header.css("width", item.width);
				if (item.headerAlign) header.css("text-align", item.headerAlign);
				row.append(header);
			});
			
			grid._headerHolder.append(row);
		},
		clear:function() {
			grid._headerHolder.empty();
			grid._contentHolder.empty();
		},
		selectEngine: function() {
			if (!p.selectMode) return false;
			
			var rows = grid._contentTable.find("tr");
			
			if (p.selectMode == "single")
				rows.bind("click", grid.singleSelection);
				
			else if (p.selectMode == "multi")
				rows.bind("click", grid.multiSelection);			
		},
		generate:function() {
			grid.clear();
			grid.createHeader();
			grid.createBody();
			grid.checkHeight();
			grid.selectEngine();
			
			if (p.onGenerate)
				p.onGenerate();
		},
		create:function() {
			grid._wrapper = $("<div class='grid-wrapper'></div>");
			grid._header = $("<div class='grid-header'></div>");
			grid._content = $("<div class='grid-content'></div>");
			
			grid._headerTable = grid.createTable();
			grid._headerHolder = $("<thead></thead>");
			
			grid._contentTable = grid.createTable();
			grid._contentHolder = $("<tbody></tbody");
			
			grid._headerTable.append(grid._headerHolder);
			grid._contentTable.append(grid._contentHolder);
			
			grid._header.append(grid._headerTable);
			grid._content.append(grid._contentTable);
			
			grid._wrapper.append(grid._header).append(grid._content);
		},
		params:function() {
			if (p.render) grid.render(p.render);
			if (p.provider) grid.setProvider(p.provider);
			if (p.url) grid.setUrl(p.url);
		},
		init:function() {
			grid.create();
			grid.params();
		}
	};
	
	grid.init();
	
	return grid;
	
};

/*
*	SUGGEST	
*/

$.suggest = function(p) {

	p = $.extend({
		// params
		attr: {label: "label", children: "children"},
		inputClass: "",
		provider: null,
		render: null,
		selectedIndex: -1,
		searchDelay: 250,
		minNumChar: 2,
		maxResults: 10,
		searchFunction: function(o, suggest) {
			var provider = o.provider,
				label = suggest.getAttr("label"),
				children = suggest.getAttr("children"),
				pattern = suggest.getRegExp(suggest.getQueryString());
				
			$.each(provider, function(i, data){
			
				var lb = data[label].removeAccents();
				
				if (pattern.test(lb)) {
					if (pattern.exec(lb)[1]) o.equal.push(data);
					else if (pattern.exec(lb)[2]) o.begin.push(data);
					else if (pattern.exec(lb)[3]) o.any.push(data);
				}
				
				if (data[children]) 
					suggest.search({provider: data[children], equal: o.equal, begin: o.begin, any: o.any});
			});
		},
		createItemFunction: function(o, suggest) {
			var data = o.data, 
				qs = suggest.getQueryString(), 
				pattern = new RegExp(qs, "i"),
				label = suggest.getAttr("label"), 
				lb = data[label].replace(pattern, "<b>" + qs + "</b>");
				
			return $("<a></a>").attr("href", "javascript:void(0)").html(lb);
		},
		// events
		onItemClick: null,
		onKeyEnter: null,
		onNavigate: null
	}, p);
	
	var INPUT_PADDING_TOP = 3,
		SCROLL_PADDING_RIGHT = 18,
		IS_INSIDE_LIST = false;
	
	var suggest = {
		getAttr:function(value) {
			return p.attr[value];
		},
		setProvider:function(value) {
			p.provider = value;
		},
		getProvider:function() {
			return p.provider;
		},
		setValue:function(value) {
			suggest._input.val(value);
		},
		fixPosition:function() {
			var left = suggest._input.position().left,
				top = suggest._input.position().top + suggest._input.outerHeight() + INPUT_PADDING_TOP;
				
			$(suggest._list).css("left", left).css("top", top);
		},
		fixListScroll:function(i) {
			var itemHeight = suggest.getListItemHeight(), itemOffset = (itemHeight * i),
				min = suggest._listContent.scrollTop(),
				max = suggest._listContent.height() + (min - itemHeight),
				diff = (itemOffset < min) ? -itemHeight : (itemOffset > max) ? itemHeight : 0;
				
			suggest._listContent.scrollTop(min + diff);
		},
		fixListHeight:function() {
			var excessItems = (suggest.getListItems().size() > p.maxResults),
				height = excessItems ? p.maxResults * suggest.getListItemHeight() : "auto",
				width = excessItems ? suggest._listContent.width() + SCROLL_PADDING_RIGHT : "auto";
			
			suggest._listContent.css("height", height).css("width", width);		
		},
		clearQueryString:function(qs) {
			return qs.removeAccents().replace(/[^\w- ]+/g, "");
		},
		getRegExp:function(qs) {
			qs = suggest.clearQueryString(qs);
			return (new RegExp("(^" + qs + "$)|(^" + qs +".+$)|(^.+" + qs + ".*$)", "i"));
		},
		getListItem:function(i) {
			return suggest._listContent.find("a:eq(" + i + ")");
		},
		getListItems:function() {
			return suggest._listContent.find("a");
		},
		getSelectedItem:function() {
			return suggest._listContent.find("a.selected");
		},
		getInput:function() {
			return suggest._input;
		},
		getWrapper:function() {
			return suggest._wrapper;
		},
		getListItemHeight:function() {
			return suggest.getListItem(0).outerHeight();
		},
		clearTimeouts:function() {
			clearTimeout(suggest.searchTimer);
		},
		startSearchTimer:function() {
			suggest.searchTimer = setTimeout(suggest.initSearch, p.searchDelay);
		},
		clearSelected:function() {
			suggest.getListItems().removeClass("selected");
			p.selectedIndex = -1;
		},
		getSelectedIndex:function() {
			return p.selectedIndex;
		},
		setSelectedIndex:function(i) {
			if (i == null || typeof i != "number") return false;
			
			suggest.clearSelected();
			suggest.getListItem(i).addClass("selected");
			suggest.fixListScroll(i);
			
			var selected = suggest.getSelectedItem();
			
			if (p.onNavigate)
				p.onNavigate(selected.data("data"));

			p.selectedIndex = i;
		},
		getQueryString:function() {
			return $.trim(suggest._input.val());
		},
		userInteraction:function(e) {
			switch(e.keyCode) {
				case 13:
					if (p.onKeyEnter)
						p.onKeyEnter(suggest);
						
						suggest.hide();
				break;
				case 35:
				case 36:
				case 37:
				case 39:
					e.preventDefault();
				break;
				case 27:
					suggest.hide();
				break;
				case 38:
					suggest.setSelectedIndex(Math.max(--p.selectedIndex, 0));
				break;
				case 40:
					suggest.setSelectedIndex(Math.min(++p.selectedIndex, (suggest.getListItems().size()-1)));
				break;
				default:
					suggest.hide();
					
					if (suggest.getQueryString().length >= p.minNumChar) 
						suggest.startSearchTimer();
			}
		},
		initSearch:function() {
			var results = [], 
				equal = [], 
				begin = [], 
				any = [];
			
			suggest.search({
				provider: p.provider,
				equal: equal,
				begin: begin,
				any: any
			});
			
			results = equal.concat(begin.concat(any));
			
			if (results.length > 0) 
				suggest.searchSuccess(results);
		},
		search:function(o) {
			if (!o) return false;
			
			p.searchFunction({provider: o.provider, equal: o.equal, begin: o.begin, any: o.any}, suggest);
		},
		searchSuccess:function(results) {
			suggest._listContent.empty();
			suggest.clearSelected();
			$.each(results, function(i, data){
				var listItem = suggest.createItem(i, data);
				suggest._listContent.append(listItem);
			});
			suggest.show();
		},
		createItem:function(i, data) {
			var item = p.createItemFunction({data: data}, suggest);
			
			item.hover(function(){
				suggest.setSelectedIndex(i);
			}, function(){
				suggest.clearSelected();
			}).bind("click", suggest.hide).data("data", data);
			
			if (p.onItemClick)
				item.bind("click", function(){p.onItemClick(data)});
				
			return item;
		},
		hide:function(e) {
			suggest.clearTimeouts();
			suggest.clearSelected();
			suggest._list.hide();
		},
		show:function() {
			suggest.fixPosition();
			suggest._list.show();
			suggest.fixListHeight();
		},
		onInputBlur:function(e) {
			if (!IS_INSIDE_LIST)
				suggest.hide();
		},
		onListEnter:function() {
			IS_INSIDE_LIST = true;
		},
		onListLeave:function() {
			IS_INSIDE_LIST = false;
			
			if ($.browser.msie)
				suggest._input.focus();
		},
		create:function() {
			suggest._wrapper = $("<div class='suggest-wrapper'></div>");
			
			suggest._input = $("<input type='text'></input").bind({keyup: suggest.userInteraction, blur: suggest.onInputBlur}).addClass(p.inputClass);
			
			suggest._list = $("<div class='suggest-list'></div>");
			suggest._roundTop = $("<h1></h1><h2></h2><h3></h3>");
			suggest._roundBot = $("<h3></h3><h2></h2><h1></h1>");
			suggest._listContent = $("<div class='suggest-content'></div>").bind({mouseenter: suggest.onListEnter, mouseleave: suggest.onListLeave});
			
			suggest._list.append(suggest._roundTop).append(suggest._listContent).append(suggest._roundBot);
			
			suggest._wrapper.append(suggest._input).append(suggest._list);			
		},
		render:function(value) {
			suggest._wrapper.appendTo(value);
		},
		params:function() {
			if (p.render) suggest.render(p.render);
		},
		init:function() {
			suggest.create();
			suggest.params();
		}
	};
	
	suggest.init();
	
	return suggest;

};

/*
*	PROGRESS
*/

$.progress = function(p) {

	p = $.extend({
		// params
		message: "{0}% concluído",
		animSpeed: 500,
		progress: 0,
		render: null,
		// events
		onComplete: null
	}, p);
	
	var progress = {
		// GETTERS
		getMessage:function(value) {
			return p.message.replace("{0}", value);
		},
		getProgress:function() {
			return p.progress;
		},
		// SETTERS
		setProgress:function(value) {
			if (value == null || typeof value != "number" || value < 0 || value > 100) return false;
			p.progress = value;
			progress.setWidth(value);
		},
		setText:function(value) {
			var msg = progress.getMessage(value);
			progress._outside.text(msg);
			progress._inside.text(msg);
		},
		setWidth:function(value) {
			var percentLeft = 50*((100 - value)/value);
			progress.setText(value);
			progress._inside.css("left", percentLeft + "%");
			progress._bar.css("width", value + "%");
			progress.checkEvents();
		},
		// PUBLIC
		render:function(value) {
			progress._wrapper.appendTo(value);
		},
		// PRIVATE
		checkEvents:function() {
			var value = progress.getProgress();
			
			if (value == 100 && p.onComplete) 
				p.onComplete();
		},
		create:function() {
			progress._wrapper = $("<div class='progress-wrapper'></div>");
			
			progress._outside = $("<div class='progress-outside'></div>");
			progress._bar = $("<div class='progress-bar'></div>");
			progress._inside = $("<div class='progress-inside'></div>");
			
			progress._bar.append(progress._inside);
			progress._wrapper.append(progress._outside).append(progress._bar);
		},
		params:function() {
			if (p.render) progress.render(p.render);
			if (p.progress != null) progress.setProgress(p.progress);
		},
		init:function() {
			progress.create();
			progress.params();
		}
	};

	progress.init();
	
	return progress;
	
};

/*
*	TREE
*/

$.tree = function(p) {

	p = $.extend({
		// params
		attr: {children: "children", label: "label", icon: "icon"},
		provider: null,
		render: null,
		listeners: null,
		opened: false,
		maxHeight: 200,
		renderFunction: function(o, tree) {
			var obj = o.provider,
				str = o.opened ? "<ul>" : "<ul style='display:none'>",
				label = tree.getAttr("label"), 
				icon = tree.getAttr("icon"), 
				children = tree.getAttr("children");
				
			for (var x=0; x<obj.length; x++) {
				var hasChildren = tree.hasChildren(obj[x]),
					icon = obj[x][icon] ? obj[x][icon] : "item",
					dataIndex = (o.dataIndex != null) ? (o.dataIndex + "," + x) : x;
					
				str += "<li nodeIndex=" + (tree.nodeIndex++) + " dataIndex=" + dataIndex + ">";
				
				if (hasChildren)
					str += "<a href='javascript:void(0)' class='icon plus'></a><a href='javascript:void(0)' class='icon closed'></a>";

				else
					str += "<a href='javascript:void(0)' class='icon " + icon + "'></a>";
						
				str += "<a href='javascript:void(0)' class='label'>" + obj[x][label] + "</a>";
				
				if (hasChildren)
					str += tree.getMarkup({provider: obj[x][children], opened: false, dataIndex: dataIndex});
					
				str += "</li>";
			}
			str += "</ul>";
			return str;
		},
		// events
		onScroll: null,
		onItemClick: null
	}, p);
	
	var nodeIndex = 0,
		searchIndex = -1,
		matchIndex = -1;
	
	var tree = {
		// GETTERS
		getAttr:function(value) {
			return p.attr[value];
		},
		getLabels:function() {
			return tree._wrapper.find("a.label");
		},
		getLabel:function(node) {
			return $(node).find("> a.label:eq(0)");
		},
		getNode:function(i) {
			return tree.getNodes().eq(i);
		},
		getNodes:function() {
			return tree._wrapper.find("li");
		},
		getNodesArr:function(arr) {
			return tree.getNodes().filter(function(index){
				return ($.inArray(index, arr) != -1);
			});
		},
		getMatchedItems:function() {
			return tree._wrapper.find("a.match").parent("li");
		},
		getSelectedItemIndex:function() {
			return tree.getSelectedItem().attr("nodeIndex");
		},
		getSelectedItem:function() {
			return tree._wrapper.find("a.selected").parent("li");
		},
		getPositionY:function(node) {
			return $(node).position().top;
		},
		getProvider:function() {
			return p.provider;
		},
		getData:function(index) {
			var arr = index.split(","),
				l = arr.length,
				provider = p.provider,
				children = tree.getAttr("children");
				
			for (var x=0; x<l; x++)
				provider = (x + 1 == l) ? provider[arr[x]] : provider[arr[x]][children];

			return provider;
		},
		// SETTERS
		setProvider:function(value) {
			p.provider = value;
			tree.nodeIndex = 0;
			tree.generate();
		},
		setListeners:function(value) {
			p.listeners = value;
			tree.assignListeners();
		},
		// PUBLIC
		search:function(qs) {
			if (qs.length < 2) throw new Error("querystring qs too small");
			var provider = tree.getProvider(),
				pattern = tree.getRegExp(qs),
				results = [];
					
			searchIndex = -1;
			matchIndex = -1;
			
			tree.collapseAll();
			tree.clearLabels();
			
			tree.searchEngine({provider: provider, pattern: pattern, results: results});
			
			var nodes = tree.getNodesArr(results);
			
			nodes.find("> a.label").addClass("match");
			
			tree.expandNode(nodes);
			
			tree.nextMatch();
		},		
		scrollTo:function(node) {
			tree._wrapper.scrollTo(node, 500);
			
			if (p.onScroll)
				p.onScroll(node, tree);
		},
		hasPrevious:function() {
			return (matchIndex > 0);
		},
		hasNext:function() {
			var items = tree.getMatchedItems();
			return ((matchIndex+1) < tree.getMatchedItems().size());
		},
		firstMatch:function() {
			var items = tree.getMatchedItems();
			matchIndex = 0;
			tree.scrollTo(items.eq(matchIndex));
		},
		previousMatch:function() {
			if (!tree.hasPrevious()) return false;
			var items = tree.getMatchedItems();
			tree.scrollTo(items.eq(--matchIndex));
		},
		nextMatch:function() {
			if (!tree.hasNext()) return false;
			var items = tree.getMatchedItems();
			tree.scrollTo(items.eq(++matchIndex));
		},
		lastMatch:function() {
			var items = tree.getMatchedItems();
			matchIndex = (items.size() - 1);
			tree.scrollTo(items.eq(matchIndex));
		},
		refresh:function() {
			tree.setProvider(p.provider);
		},
		bind:function(selector, event, fn) {
			tree._wrapper.find(selector).unbind(event + ".treeListener").bind(event + ".treeListener", function(e){
				var node = (this.tagName.toLowerCase() == "li") ? $(this) : $(this).parent("li"),
					data = tree.getData(node.attr("dataIndex"));
					
				fn(this, data, tree, e);
			});
		},
		openByIndex:function(i, mark) {
			if (i == null || typeof parseInt(i, 10) != "number") return false;
			
			var node = tree.getNode(i);
			
			if (mark)
				node.find("> a.label").addClass("match");
				
			tree.expandNode(node);
		},
		expandAll:function() {
			tree._wrapper
				.find("a.plus").removeClass("plus").addClass("minus").end()
				.find("a.closed").removeClass("closed").addClass("opened").end()
				.find("ul").not("ul:eq(0)").show();
		},
		collapseAll:function() {
			tree._wrapper
				.find("a.minus").removeClass("minus").addClass("plus").end()
				.find("a.opened").removeClass("opened").addClass("closed").end()
				.find("ul").not("ul:eq(0)").hide();
		},
		// PRIVATE
		searchEngine:function(o) {
			var children = tree.getAttr("children"),
				label = tree.getAttr("label");
				
			$.each(o.provider, function(i, data){
				var lb = data[label].removeAccents();
				
				searchIndex++;
				
				if (o.pattern.test(lb))
					o.results.push(searchIndex);
					
				if (tree.hasChildren(data))
					tree.searchEngine({provider: data[children], pattern: o.pattern, results: o.results});
			});
		},		
		getMarkup:function(o) {
			return p.renderFunction(o, tree);
		},
		appendMarkup:function() {
			tree._wrapper.empty().append(tree.getMarkup({provider: p.provider, opened: true}));		
		},
		clearLabels:function() {
			tree.getLabels().removeClass("match").removeClass("selected");
		},
		generate:function() {
			tree.appendMarkup();
			tree.assignListeners();
			
			if (p.onItemClick)
				tree.bind("a.label", "click", p.onItemClick);			
		},
		assignListeners:function() {
			if (!p.listeners) return false;
			
			for (var x=0; x<p.listeners.length; x++) {
				var listener = p.listeners[x];
				tree.bind(listener["selector"], listener["event"], listener["fn"]);
			}
		},
		expandNode:function(node) {
			var $node = $(node),
				isParentHidden = $node.parent("ul").is(":hidden");
			
			if (isParentHidden) {
				$node.parents("li").find("> a.icon:eq(0)").removeClass("plus").addClass("minus");
				$node.parents("ul").show();
			}
				
			$node
				.find("> a.icon:eq(0)").removeClass("plus").addClass("minus").end()
				.find("> a.icon:eq(1)").removeClass("closed").addClass("opened").end()
				.find("> ul").show();
		},
		collapseNode:function(node) {
			$(node)
				.find("> a.icon:eq(0)").removeClass("minus").addClass("plus").end()
				.find("> a.icon:eq(1)").removeClass("opened").addClass("closed").end()
				.find("> ul").hide();
		},
		toggleNode:function(node) {
			var innerContent = $(node).find("> ul");
			
			if (innerContent.is(":visible")) 
				tree.collapseNode(node);
						
			else
				tree.expandNode(node);
		},
		hasChildren:function(o) {
			return (o[tree.getAttr("children")] && o[tree.getAttr("children")].length > 0);
		},
		clearQueryString:function(qs) {
			return qs.removeAccents().replace(/[^\w- ]+/g, "");
		},
		getRegExp:function(qs) {
			qs = tree.clearQueryString(qs);
			return (new RegExp("(^" + qs + "$)|(^" + qs + ".+$)|(^.+" + qs + ".*$)", "i"));
		},
		delegate: function(selector, evt, fn) {
			tree._wrapper.delegate(selector, evt, fn);
		},
		selectionFn: function() {
			tree.getLabels().removeClass("selected").removeClass("match");
			$(this).addClass("selected");		
		},
		toggleFn: function() {
			var node = $(this).parent("li");
			tree.toggleNode(node);		
		},
		engine: function() {
			// assign selection
			tree.delegate("a.label", "click", tree.selectionFn);
			// assign toggle
			tree.delegate("a.plus, a.minus", "click", tree.toggleFn);
		},
		params:function() {
			if (p.render) tree.render(p.render);
			if (p.provider)	tree.setProvider(p.provider);			
			
			if (p.opened) {
				if ($.isArray(p.opened))
					for (var x=0; x<p.opened.length; x++) 
						tree.openByIndex(p.opened[x]);
				
				else
					tree.openAll();
			}
		},
		create:function() {
			tree._wrapper = $("<div class='tree-wrapper'></div>").css({maxHeight: p.maxHeight});
		},
		init:function() {
			tree.create();
			tree.params();
			tree.engine();
		},
		render:function(value) {
			tree._wrapper.appendTo(value);
		}
	};
	
	tree.init();
	
	return tree;

};

/*
*	BUTTON
*/

$.button = function(p) {

	p = $.extend({
		text: "button",
		toggle: false
	}, p);
	
	var button = {
		setText:function(value) {
			button._content.text(value);
		},
		transform:function() {
			var target = $(p.target);
			button.setText(target.text() || target.val());
			target.before(button._wrapper).remove();
		},
		create:function() {
			button._wrapper = $("<span class='button-wrapper'></div>");
			button._anchor = $("<a></a>").attr("href", "javascript:void(0)");
			button._content = $("<span class='button-content'></span>");
			
			button._anchor.append(button._content);
			button._wrapper.append(button._anchor);
		},
		apply:function() {
			if (p.target) button.transform();
		},
		init:function() {
			button.create();
			button.apply();
		}
	};
	
	button.init();
	
	return button;
	
};

$.fn.button = function(p) {

	return this.each(function(){

		if (p)
			p.target = this;
			
		else
			p = {target: this};
			
		$.button(p);
	});

};

/*
*	NO SELECT
*/

$.fn.noSelect = function(p) {

	if (p == null) 
		prevent = true;
		
	else
		prevent = p;

	if (prevent) {
		return this.each(function(){
		
			if ($.browser.msie||$.browser.safari) 
				$(this).bind('selectstart', function(){return false;});
				
			else if ($.browser.mozilla) {
				$(this).css('MozUserSelect','none');
				$('body').trigger('focus');
			}
			
			else if ($.browser.opera)
				$(this).bind('mousedown',function(){return false;});
				
			else
				$(this).attr('unselectable','on');

		});
	}
	
	else {
		return this.each(function() {
			if ($.browser.msie||$.browser.safari) $(this).unbind('selectstart');
			else if ($.browser.mozilla) $(this).css('MozUserSelect','inherit');
			else if ($.browser.opera) $(this).unbind('mousedown');
			else $(this).removeAttr('unselectable','on');
		});
	}

};

/*
*	NOW
*/

$.now = function() {
	return +new Date();
};

})(jQuery);