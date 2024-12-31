

var tabsTemplates = [

	// {
	// 	label: "Template 10",
	// 	thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
	// 	isPro: false,
	// 	data: {
	// 		"wrapper": { "options": { "content": "", "tag": "div", "class": "accordions-wrapper" }, "styles": { "flexWrap": { "Tablet": "wrap !important" } } },
	// 		"navItem": { "options": { "class": "nav-item " }, "styles": { "display": { "Desktop": "inline-block" }, "color": { "Desktop": "#ffffff" }, "padding": { "Desktop": "10px 50px 5px 50px" }, "backgroundColor": [], "margin": { "Desktop": "0px 5px 10px 0px" }, "justifyContent": [], "alignItems": { "Desktop": "center" }, "cursor": { "Desktop": "pointer" }, "textAlign": { "Desktop": "center" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "400" }, "borderRadius": { "Desktop": "5px 5px 5px 5px" }, "backgroundImage": { "Desktop": "linear-gradient(135deg,rgb(0,0,0) 0%,rgb(146,141,171) 100%)" } } },
	// 		"activeNavItem": { "options": { "class": "nav-item-active", "id": "" }, "styles": { "backgroundColor": { "Desktop": "#462aff" } } },
	// 		"labelCounter": { "options": { "enable": false, "position": "", "tag": "div", "class": "accordion-label-counter" }, "styles": [] },
	// 		"labelIcon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "", "position": "beforeLabel", "class": "label-icon" }, "styles": [] },
	// 		"icon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-angle-down", "position": "before", "class": " nav-icon-idle nav-icon" }, "styles": [] },
	// 		"iconToggle": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": " fas fa-angle-up", "class": "nav-icon-toggle nav-icon" }, "styles": [] },
	// 		"navLabel": { "options": { "class": "" }, "styles": [] },
	// 		"panelWrap": { "options": { "class": "tabs-panel " }, "styles": { "backgroundColor": { "Desktop": "#ffffff" }, "padding": { "Desktop": "20px 20px 20px 20px" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "fontSize": { "Desktop": "16px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "400" }, "borderRight": { "Desktop": "1px solid #928dab" }, "borderTop": { "Desktop": "1px solid #928dab" }, "borderLeft": { "Desktop": "1px solid #928dab" }, "borderRadius": { "Desktop": "5px 5px 0px 0px" } } },

	// 	}
	// },
	// {
	// 	label: "Template 12",
	// 	thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
	// 	isPro: false,
	// 	data: {
	// 		"wrapper": { "options": { "content": "", "tag": "div", "class": "accordions-wrapper" }, "styles": { "flexWrap": { "Tablet": "wrap !important" } } },
	// 		"navItem": { "options": { "class": "nav-item " }, "styles": { "display": { "Desktop": "flex" }, "color": { "Desktop": "#ffffff" }, "padding": { "Desktop": "10px 30px 10px 30px" }, "backgroundColor": { "Desktop": "#7e8c8d" }, "margin": { "Desktop": "0px 5px 0px 0px" }, "justifyContent": [], "alignItems": { "Desktop": "center" }, "cursor": { "Desktop": "pointer" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Damion" }, "fontWeight": { "Desktop": "400" }, "borderRadius": { "Desktop": "5px 5px 0px 0px" } } },
	// 		"activeNavItem": { "options": { "class": "nav-item-active", "id": "" }, "styles": { "backgroundColor": { "Desktop": "#e2e4ea !important" }, "display": { "Desktop": "flex" }, "padding": { "Desktop": "10px 30px 10px 30px" }, "margin": { "Desktop": "0px 5px 0px 0px" }, "alignItems": { "Desktop": "center" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Damion" }, "fontWeight": { "Desktop": "400" }, "color": { "Desktop": "#444444 !important" }, "border": [], "borderTop": { "Desktop": "1px solid #7e8c8d" }, "borderRight": { "Desktop": "1px solid #7e8c8d" }, "borderLeft": { "Desktop": "1px solid #7e8c8d" } } },
	// 		"labelCounter": { "options": { "enable": false, "position": "", "tag": "div", "class": "accordion-label-counter" }, "styles": {} },
	// 		"labelIcon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "", "position": "beforeLabel", "class": "label-icon" }, "styles": {} },
	// 		"icon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-angle-down", "position": "before", "class": " nav-icon-idle nav-icon" }, "styles": {} },
	// 		"iconToggle": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": " fas fa-angle-up", "class": "nav-icon-toggle nav-icon" }, "styles": {} },
	// 		"navLabel": { "options": { "class": "" }, "styles": {} },
	// 		"panelWrap": { "options": { "class": "tabs-panel " }, "styles": { "backgroundColor": { "Desktop": "#e2e4ea" }, "padding": { "Desktop": "20px 20px 20px 20px" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "fontSize": { "Desktop": "16px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "400" }, "boxShadow": { "Desktop": "0px 0px 1px 1px #7d8b8c7a" } } },

	// 	}
	// },
	// {
	// 	label: "Template 11",
	// 	thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
	// 	isPro: false,
	// 	data: {
	// 		"wrapper": { "options": { "content": "", "tag": "div", "class": "accordions-wrapper" }, "styles": {} },
	// 		"navItem": { "options": { "class": "nav-item " }, "styles": { "display": { "Desktop": "flex" }, "color": { "Desktop": "#505050" }, "padding": { "Desktop": "10px 30px 10px 30px" }, "backgroundColor": { "Desktop": "#ffffff" }, "margin": { "Desktop": "0px 5px 10px 0px" }, "justifyContent": [], "alignItems": { "Desktop": "center" }, "cursor": { "Desktop": "pointer" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "400" }, "border": { "Desktop": "1px solid #d6d6d6" }, "borderRadius": { "Desktop": "5px 5px 5px 5px" }, "boxShadow": [] } },
	// 		"activeNavItem": { "options": { "class": "nav-item-active", "id": "" }, "styles": { "backgroundColor": { "Desktop": "#eeeeee !important" }, "display": { "Desktop": "flex" }, "padding": { "Desktop": "10px 30px 10px 30px" }, "margin": { "Desktop": "0px 5px 10px 0px" }, "alignItems": { "Desktop": "center" }, "color": { "Desktop": "#444444 !important" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "400" }, "border": [], "borderRadius": { "Desktop": "5px 5px 5px 5px" }, "boxShadow": [], "borderTop": { "Desktop": "4px solid #f44244" } } },
	// 		"labelCounter": { "options": { "enable": false, "position": "", "tag": "div", "class": "accordion-label-counter" }, "styles": {} },
	// 		"labelIcon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "", "position": "beforeLabel", "class": "label-icon" }, "styles": {} },
	// 		"icon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-angle-down", "position": "before", "class": " nav-icon-idle nav-icon" }, "styles": {} },
	// 		"iconToggle": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": " fas fa-angle-up", "class": "nav-icon-toggle nav-icon" }, "styles": {} },
	// 		"navLabel": { "options": { "class": "" }, "styles": {} },
	// 		"panelWrap": { "options": { "class": "tabs-panel " }, "styles": { "backgroundColor": { "Desktop": "#e0e0e0" }, "padding": { "Desktop": "20px 20px 20px 20px" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "fontSize": { "Desktop": "16px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "400" }, "color": { "Desktop": "#444444" }, "boxShadow": [] } },

	// 	}
	// },
	// {
	// 	label: "Template 13",
	// 	thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
	// 	isPro: false,
	// 	data: {
	// 		"wrapper": { "options": { "content": "", "tag": "div", "class": "accordions-wrapper" }, "styles": [] },
	// 		"navItem": { "options": { "class": "nav-item " }, "styles": { "display": { "Desktop": "flex" }, "color": { "Desktop": "#2b2b2b" }, "padding": { "Desktop": "10px 30px 10px 30px" }, "backgroundColor": { "Desktop": "#ffffff" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "justifyContent": [], "alignItems": { "Desktop": "center" }, "cursor": { "Desktop": "pointer" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "600" }, "border": { "Desktop": "1px solid #d6d6d6" } } },
	// 		"activeNavItem": { "options": { "class": "nav-item-active", "id": "" }, "styles": { "backgroundColor": { "Desktop": "#eeeeee !important" }, "display": { "Desktop": "flex" }, "padding": { "Desktop": "10px 30px 10px 30px" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "alignItems": { "Desktop": "center" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "600" }, "border": [], "borderTop": { "Desktop": "4px solid #35a455 !important" } } },
	// 		"labelCounter": { "options": { "enable": false, "position": "", "tag": "div", "class": "accordion-label-counter" }, "styles": [] },
	// 		"labelIcon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "", "position": "beforeLabel", "class": "label-icon" }, "styles": [] },
	// 		"icon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-angle-down", "position": "before", "class": " nav-icon-idle nav-icon" }, "styles": [] },
	// 		"iconToggle": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": " fas fa-angle-up", "class": "nav-icon-toggle nav-icon" }, "styles": [] },
	// 		"navLabel": { "options": { "class": "" }, "styles": [] },
	// 		"panelWrap": { "options": { "class": "tabs-panel " }, "styles": { "backgroundColor": { "Desktop": "#f2f2f2" }, "padding": { "Desktop": "20px 20px 20px 20px" }, "margin": { "Desktop": "0px 0px 0px 0px" } } },

	// 	}
	// },
	// {
	// 	label: "Template 14",
	// 	thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
	// 	isPro: false,
	// 	data: {
	// 		"wrapper": { "options": { "content": "", "tag": "div", "class": "accordions-wrapper" }, "styles": { "display": { "Desktop": "flex", "Tablet": "inline-block" } } },
	// 		"navItem": { "options": { "class": "nav-item " }, "styles": { "display": { "Desktop": "flex" }, "color": { "Desktop": "#444444" }, "padding": { "Desktop": "10px 15px 10px 30px" }, "backgroundColor": { "Desktop": "#ffffff" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "width": { "Desktop": "250px", "Tablet": "100%" }, "alignItems": { "Desktop": "center" }, "cursor": { "Desktop": "pointer" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "600" }, "border": { "Desktop": "2px solid #eeeeee" }, "height": [] } },
	// 		"activeNavItem": { "options": { "class": "nav-item-active", "id": "" }, "styles": { "backgroundColor": { "Desktop": "#eeeeee !important" }, "display": { "Desktop": "flex" }, "padding": { "Desktop": "10px 15px 10px 30px" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "alignItems": { "Desktop": "center" }, "width": { "Desktop": "250px", "Tablet": "100%" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "600" }, "border": [], "borderRight": [], "borderLeft": { "Desktop": "4px solid #35a455" }, "borderTop": [], "borderBottom": [], "boxShadow": { "Desktop": "0px 0px 1px 1px #ededed78" } } },
	// 		"labelCounter": { "options": { "enable": false, "position": "", "tag": "div", "class": "accordion-label-counter" }, "styles": [] },
	// 		"labelIcon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "", "position": "beforeLabel", "class": "label-icon" }, "styles": [] },
	// 		"icon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-angle-down", "position": "before", "class": " nav-icon-idle nav-icon" }, "styles": [] },
	// 		"iconToggle": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": " fas fa-angle-up", "class": "nav-icon-toggle nav-icon" }, "styles": [] },
	// 		"navLabel": { "options": { "class": "" }, "styles": [] },
	// 		"panelWrap": { "options": { "class": "tabs-panel " }, "styles": { "width": { "Desktop": "100%" }, "backgroundColor": { "Desktop": "#f1f1f1" }, "padding": { "Desktop": "20px 20px 20px 20px" }, "margin": { "Desktop": "0px 0px 0px 0px" } } },

	// 	}
	// },
	// {
	// 	label: "Template 1",
	// 	thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
	// 	isPro: false,
	// 	data: {
	// 		"wrapper": { "options": { "content": "", "tag": "div", "class": "accordions-wrapper" }, "styles": { "display": { "Desktop": "flex", "Tablet": "inline-block" }, "flexWrap": [] } },
	// 		"navItem": { "options": { "class": "nav-item " }, "styles": { "display": { "Desktop": "inline-block" }, "color": { "Desktop": "#444444" }, "padding": { "Desktop": "5px 15px 5px 15px" }, "backgroundColor": { "Desktop": "#eeeeee" }, "margin": { "Desktop": "0px 0px 2px 0px" }, "width": { "Desktop": "250px", "Tablet": "100%" }, "alignItems": { "Desktop": "center" }, "cursor": { "Desktop": "pointer" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "500" }, "border": { "Desktop": "1px solid #cccccc" }, "textAlign": { "Desktop": "center" } } },
	// 		"activeNavItem": { "options": { "class": "nav-item-active", "id": "" }, "styles": { "backgroundColor": { "Desktop": "#ffffff !important" }, "display": { "Desktop": "inline-block" }, "padding": { "Desktop": "5px 15px 5px 15px" }, "margin": { "Desktop": "0px 0px 3px 0px" }, "alignItems": { "Desktop": "center" }, "width": { "Desktop": "250px", "Tablet": "100%" }, "color": { "Desktop": "#28822e !important" }, "borderLeft": { "Desktop": "5px solid #28822e !important" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "500" }, "boxShadow": { "Desktop": "0px 0px 0px 1px #50547d4f" }, "textAlign": { "Desktop": "center" } } },
	// 		"labelCounter": { "options": { "enable": false, "position": "", "tag": "div", "class": "accordion-label-counter" }, "styles": [] },
	// 		"labelIcon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "", "position": "beforeLabel", "class": "label-icon" }, "styles": [] },
	// 		"icon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-angle-down", "position": "before", "class": " nav-icon-idle nav-icon" }, "styles": [] },
	// 		"iconToggle": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": " fas fa-angle-up", "class": "nav-icon-toggle nav-icon" }, "styles": [] },
	// 		"navLabel": { "options": { "class": "" }, "styles": [] },
	// 		"panelWrap": { "options": { "class": "tabs-panel " }, "styles": { "width": { "Desktop": "100%" }, "backgroundColor": { "Desktop": "#ffffff" }, "padding": { "Desktop": "20px 20px 20px 20px" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "border": [], "borderTop": { "Desktop": "1px solid #cccccc" }, "borderRight": { "Desktop": "1px solid #cccccc" }, "borderLeft": [], "borderBottom": { "Desktop": "1px solid #cccccc" } } },

	// 	}
	// },
	// // {
	// // 	label: "Template 1",
	// // 	thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
	// // 	isPro: false,
	// // 	data: {}
	// // },
	// {
	// 	label: "Template 17",
	// 	thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
	// 	isPro: false,
	// 	data: {
	// 		"wrapper": { "options": { "content": "", "tag": "div", "class": "accordions-wrapper" }, "styles": { "display": { "Desktop": "flex", "Tablet": "inline-block" }, "alignItems": { "Desktop": "flex-end", "Tablet": "flex-start" }, "flexDirection": [] } },
	// 		"navItem": { "options": { "class": "nav-item " }, "styles": { "display": { "Desktop": "flex" }, "color": { "Desktop": "#000000" }, "padding": { "Desktop": "10px 15px 10px 15px" }, "backgroundColor": { "Desktop": "#cccccc" }, "margin": { "Desktop": "5px 0px 0px 0px" }, "width": { "Desktop": "250px", "Tablet": "100%" }, "alignItems": { "Desktop": "center" }, "cursor": { "Desktop": "pointer" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "500" }, "border": { "Desktop": "1px solid #cccccc" }, "borderRadius": { "Desktop": "0px 5px 5px 0px" }, "justifyContent": { "Desktop": "center", "Tablet": "start" }, "alignContent": [] } },
	// 		"activeNavItem": { "options": { "class": "nav-item-active", "id": "" }, "styles": { "backgroundColor": { "Desktop": "#ffffff !important" }, "display": { "Desktop": "flex" }, "padding": { "Desktop": "10px 15px 10px 15px" }, "margin": { "Desktop": "5px 0px 0px 0px" }, "alignItems": { "Desktop": "center" }, "width": { "Desktop": "250px", "Tablet": "100%" }, "justifyContent": { "Desktop": "center", "Tablet": "start" }, "borderTop": { "Desktop": "1px solid #cccccc" }, "borderRight": { "Desktop": "4px solid #aa12ff" }, "borderBottom": { "Desktop": "1px solid #cccccc" }, "borderRadius": { "Desktop": "0px 5px 5px 0px" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "500" } } },
	// 		"labelCounter": { "options": { "enable": false, "position": "", "tag": "div", "class": "accordion-label-counter" }, "styles": [] },
	// 		"labelIcon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "", "position": "beforeLabel", "class": "label-icon" }, "styles": [] },
	// 		"icon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-angle-down", "position": "before", "class": " nav-icon-idle nav-icon" }, "styles": [] },
	// 		"iconToggle": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": " fas fa-angle-up", "class": "nav-icon-toggle nav-icon" }, "styles": [] },
	// 		"navLabel": { "options": { "class": "" }, "styles": [] },
	// 		"panelWrap": { "options": { "class": "tabs-panel " }, "styles": { "width": { "Desktop": "100%" }, "backgroundColor": { "Desktop": "#ffffff" }, "padding": { "Desktop": "20px 20px 20px 20px" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "borderTop": { "Desktop": "1px solid #cccccc" }, "borderBottom": { "Desktop": "1px solid #cccccc" }, "borderLeft": { "Desktop": "1px solid #cccccc" } } },

	// 	}
	// },
	// {
	// 	label: "Template 3",
	// 	thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
	// 	isPro: false,
	// 	data: {
	// 		"wrapper": { "options": { "content": "", "tag": "div", "class": "accordions-wrapper" }, "styles": { "display": { "Desktop": "flex" }, "flexDirection": { "Tablet": "column-reverse" }, "flexWrap": [] } },
	// 		"navItem": { "options": { "class": "nav-item " }, "styles": { "display": { "Desktop": "flex" }, "color": { "Desktop": "#444444" }, "padding": { "Desktop": "10px 20px 10px 20px" }, "backgroundColor": { "Desktop": "#e8eaf6" }, "margin": { "Desktop": "5px 0px 0px 0px" }, "width": { "Desktop": "250px", "Tablet": "100%" }, "alignItems": { "Desktop": "center" }, "cursor": { "Desktop": "pointer" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "500" }, "border": { "Desktop": "1px solid #ede7f6" }, "borderRadius": { "Desktop": "0px 3px 3px 0px" } } },
	// 		"activeNavItem": { "options": { "class": "nav-item-active", "id": "" }, "styles": { "backgroundColor": { "Desktop": "#3f51b5 !important" }, "display": { "Desktop": "flex" }, "padding": { "Desktop": "10px 20px 10px 20px" }, "margin": { "Desktop": "5px 0px 0px 0px" }, "alignItems": { "Desktop": "center" }, "width": { "Desktop": "250px", "Tablet": "100%" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "500" }, "color": { "Desktop": "#ffffff !important" }, "borderLeft": [], "borderRight": { "Desktop": "4px solid #ed003f !important" } } },
	// 		"labelCounter": { "options": { "enable": false, "position": "", "tag": "div", "class": "accordion-label-counter" }, "styles": [] },
	// 		"labelIcon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "", "position": "beforeLabel", "class": "label-icon" }, "styles": [] },
	// 		"icon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-angle-down", "position": "before", "class": " nav-icon-idle nav-icon" }, "styles": [] },
	// 		"iconToggle": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": " fas fa-angle-up", "class": "nav-icon-toggle nav-icon" }, "styles": [] },
	// 		"navLabel": { "options": { "class": "" }, "styles": [] },
	// 		"panelWrap": { "options": { "class": "tabs-panel " }, "styles": { "width": { "Desktop": "100%" }, "backgroundColor": { "Desktop": "#ffffff" }, "padding": { "Desktop": "20px 20px 20px 20px" }, "margin": { "Desktop": "5px 0px 0px 0px" }, "border": { "Desktop": "1px solid #ede7f6" } } },

	// 	}
	// },
	// {
	// 	label: "Template 4",
	// 	thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
	// 	isPro: false,
	// 	data: {
	// 		"wrapper": { "options": { "content": "", "tag": "div", "class": "accordions-wrapper" }, "styles": { "display": { "Desktop": "flex", "Tablet": "inline-block" }, "flexWrap": [] } },
	// 		"navItem": { "options": { "class": "nav-item " }, "styles": { "display": { "Desktop": "flex" }, "color": { "Desktop": "#b87334" }, "padding": { "Desktop": "10px 5px 10px 15px" }, "backgroundColor": { "Desktop": "#ffffff" }, "margin": { "Desktop": "5px 0px 0px 0px" }, "width": { "Desktop": "100px", "Tablet": "100%" }, "alignItems": { "Desktop": "center" }, "cursor": { "Desktop": "pointer" }, "textAlign": [], "borderRadius": { "Desktop": "5px 0px 0px 5px" }, "justifyContent": { "Desktop": "center", "Tablet": "start" }, "border": [], "borderRight": [], "borderBottom": { "Desktop": "1px solid #b87334" }, "borderLeft": { "Desktop": "1px solid #b87334" }, "borderTop": { "Desktop": "1px solid #b87334" } } },
	// 		"activeNavItem": { "options": { "class": "nav-item-active", "id": "" }, "styles": { "backgroundColor": { "Desktop": "#e2e2e2 !important" }, "display": { "Desktop": "flex" }, "padding": { "Desktop": "10px 5px 10px 15px" }, "margin": { "Desktop": "5px 0px 0px 0px" }, "alignItems": { "Desktop": "center" }, "width": { "Desktop": "100px", "Tablet": "100%" }, "borderRadius": { "Desktop": "5px 0px 0px 5px" }, "textAlign": [], "justifyContent": { "Desktop": "center" }, "borderTop": { "Desktop": "1px solid #b87334" }, "borderRight": [], "borderLeft": { "Desktop": "1px solid #b87334" }, "borderBottom": { "Desktop": "1px solid #b87334" }, "border": [] } },
	// 		"labelCounter": { "options": { "enable": false, "position": "", "tag": "div", "class": "accordion-label-counter" }, "styles": [] },
	// 		"labelIcon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "", "position": "beforeLabel", "class": "label-icon" }, "styles": [] },
	// 		"icon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-angle-down", "position": "before", "class": " nav-icon-idle nav-icon" }, "styles": [] },
	// 		"iconToggle": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": " fas fa-angle-up", "class": "nav-icon-toggle nav-icon" }, "styles": { "fontSize": { "Desktop": "24px" }, "textAlign": [] } },
	// 		"navLabel": { "options": { "class": "" }, "styles": [] },
	// 		"panelWrap": { "options": { "class": "tabs-panel " }, "styles": { "width": { "Desktop": "100%" }, "backgroundColor": { "Desktop": "#ffffff" }, "padding": { "Desktop": "20px 20px 20px 20px" }, "margin": { "Desktop": "5px 0px 0px 0px" }, "borderTop": { "Desktop": "1px solid #b87334" }, "borderRight": { "Desktop": "1px solid #b87334" }, "borderLeft": { "Desktop": "1px solid #b87334" } } },

	// 	}
	// },
	// {
	// 	label: "Template 5",
	// 	thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
	// 	isPro: false,
	// 	data: {
	// 		"wrapper": { "options": { "content": "", "tag": "div", "class": "accordions-wrapper" }, "styles": [] },
	// 		"navItem": { "options": { "class": "nav-item " }, "styles": { "display": { "Desktop": "flex" }, "color": { "Desktop": "#2b2b2b" }, "padding": { "Desktop": "10px 30px 10px 30px" }, "backgroundColor": { "Desktop": "#ffffff" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "justifyContent": [], "alignItems": { "Desktop": "center" }, "cursor": { "Desktop": "pointer" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "600" }, "border": { "Desktop": "1px solid #d6d6d6" } } },
	// 		"activeNavItem": { "options": { "class": "nav-item-active", "id": "" }, "styles": { "backgroundColor": { "Desktop": "#eeeeee !important" }, "display": { "Desktop": "flex" }, "padding": { "Desktop": "10px 30px 10px 30px" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "alignItems": { "Desktop": "center" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "600" }, "border": [], "borderTop": { "Desktop": "4px solid #35a455 !important" } } },
	// 		"labelCounter": { "options": { "enable": false, "position": "", "tag": "div", "class": "accordion-label-counter" }, "styles": [] },
	// 		"labelIcon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "", "position": "beforeLabel", "class": "label-icon" }, "styles": [] },
	// 		"icon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-angle-down", "position": "before", "class": " nav-icon-idle nav-icon" }, "styles": [] },
	// 		"iconToggle": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": " fas fa-angle-up", "class": "nav-icon-toggle nav-icon" }, "styles": [] },
	// 		"navLabel": { "options": { "class": "" }, "styles": [] },
	// 		"panelWrap": { "options": { "class": "tabs-panel " }, "styles": { "backgroundColor": { "Desktop": "#f2f2f2" }, "padding": { "Desktop": "20px 20px 20px 20px" }, "margin": { "Desktop": "0px 0px 0px 0px" } } },

	// 	}
	// },
	{
		label: "Template 7",
		thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
		isPro: false,
		data: {
			"wrapper": { "options": { "content": "", "tag": "div", "class": "accordions-wrapper" }, "styles": [] },
			"navItem": { "options": { "class": "nav-item " }, "styles": { "display": { "Desktop": "flex" }, "color": { "Desktop": "#444444" }, "padding": { "Desktop": "5px 15px 5px 15px" }, "backgroundColor": { "Desktop": "#eeeeee" }, "margin": { "Desktop": "0px 5px 0px 0px" }, "justifyContent": [], "alignItems": { "Desktop": "center" }, "cursor": { "Desktop": "pointer" }, "fontSize": { "Desktop": "18px" }, "fontWeight": { "Desktop": "600" }, "borderRadius": { "Desktop": "5px 5px 5px 5px" }, "boxShadow": { "Desktop": "0px 0px 1px 1px #50547d4f" }, "width": [] } },
			"activeNavItem": { "options": { "class": "nav-item-active", "id": "" }, "styles": { "backgroundColor": { "Desktop": "#ffffff !important" }, "display": { "Desktop": "flex" }, "padding": { "Desktop": "10px 20px 10px 20px" }, "margin": { "Desktop": "0px 5px 0px 0px" }, "alignItems": { "Desktop": "center" }, "boxShadow": { "Desktop": "0px 0px 1px 1px #50547d4f" }, "borderRadius": { "Desktop": "5px 5px 0px 0px" }, "position": { "Desktop": "relative" }, "color": { "Desktop": "#444444" }, "fontSize": { "Desktop": "18px" }, "fontWeight": { "Desktop": "600" }, "border": [], "width": [], "flexDirection": [] } },
			"labelCounter": { "options": { "enable": false, "position": "", "tag": "div", "class": "accordion-label-counter" }, "styles": [] },
			"labelIcon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "", "position": "beforeLabel", "class": "label-icon" }, "styles": [] },
			"icon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-angle-down", "position": "before", "class": " nav-icon-idle nav-icon" }, "styles": [] },
			"iconToggle": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": " fas fa-angle-up", "class": "nav-icon-toggle nav-icon" }, "styles": [] },
			"navLabel": { "options": { "class": "" }, "styles": [] },
			"panelWrap": { "options": { "class": "tabs-panel " }, "styles": { "backgroundColor": { "Desktop": "#ffffff" }, "padding": { "Desktop": "10px 10px 10px 10px" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "border": [], "boxShadow": { "Desktop": "0px 0px 1px 1px #50547d4f" } } },

		}
	},
	{
		label: "Template 8",
		thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
		isPro: false,
		data: {
			"wrapper": { "options": { "content": "", "tag": "div", "class": "accordions-wrapper" }, "styles": { "flexDirection": [], "flexWrap": { "Tablet": "wrap !important" } } },
			"navItem": { "options": { "class": "nav-item " }, "styles": { "display": { "Desktop": "flex" }, "color": { "Desktop": "#484848" }, "padding": { "Desktop": "5px 15px 5px 15px" }, "backgroundColor": { "Desktop": "#f1f8e9" }, "margin": { "Desktop": "0px 5px 0px 0px" }, "justifyContent": [], "alignItems": { "Desktop": "center" }, "cursor": { "Desktop": "pointer" }, "fontSize": { "Desktop": "20px" }, "fontWeight": { "Desktop": "400" }, "fontFamily": { "Desktop": "Poppins" }, "borderRadius": { "Desktop": "5px 5px 0px 0px" }, "width": [] } },
			"activeNavItem": { "options": { "class": "nav-item-active", "id": "" }, "styles": { "backgroundColor": { "Desktop": "#33691e !important" }, "display": { "Desktop": "flex" }, "padding": { "Desktop": "5px 15px 5px 15px" }, "margin": { "Desktop": "0px 5px 0px 0px" }, "alignItems": { "Desktop": "center" }, "fontSize": { "Desktop": "20px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "400" }, "borderRadius": { "Desktop": "5px 5px 0px 0px" }, "color": { "Desktop": "#ffffff !important" }, "width": [] } },
			"labelCounter": { "options": { "enable": false, "position": "", "tag": "div", "class": "accordion-label-counter" }, "styles": [] },
			"labelIcon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "", "position": "beforeLabel", "class": "label-icon" }, "styles": [] },
			"icon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-angle-down", "position": "before", "class": " nav-icon-idle nav-icon" }, "styles": [] },
			"iconToggle": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": " fas fa-angle-up", "class": "nav-icon-toggle nav-icon" }, "styles": [] },
			"navLabel": { "options": { "class": "" }, "styles": [] },
			"panelWrap": { "options": { "class": "tabs-panel " }, "styles": { "backgroundColor": { "Desktop": "#e8eaed" }, "padding": { "Desktop": "20px 20px 20px 20px" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "fontSize": { "Desktop": "18px" }, "fontFamily": { "Desktop": "Poppins" }, "fontWeight": { "Desktop": "400" }, "color": { "Desktop": "#444444" }, "position": { "Desktop": "relative" }, "borderRight": { "Desktop": "1px solid #33691e" }, "borderLeft": { "Desktop": "1px solid #33691e" } } },

		}
	},
	// {
	// 	label: "Template 9",
	// 	thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
	// 	isPro: false,
	// 	data: {
	// 		"wrapper": { "options": { "content": "", "tag": "div", "class": "accordions-wrapper" }, "styles": [] },
	// 		"navItem": { "options": { "class": "nav-item " }, "styles": { "display": { "Desktop": "flex" }, "color": { "Desktop": "#515151" }, "padding": { "Desktop": "5px 15px 5px 15px" }, "backgroundColor": { "Desktop": "#eff0f2" }, "margin": { "Desktop": "0px 5px 0px 0px" }, "justifyContent": [], "alignItems": { "Desktop": "center" }, "cursor": { "Desktop": "pointer" }, "fontSize": { "Desktop": "20px" }, "fontWeight": { "Desktop": "700" }, "border": [], "borderRadius": { "Desktop": "5px 0px 0px 0px" }, "width": [] } },
	// 		"activeNavItem": { "options": { "class": "nav-item-active", "id": "" }, "styles": { "backgroundColor": { "Desktop": "#e74b3c !important" }, "display": { "Desktop": "flex" }, "padding": { "Desktop": "5px 15px 5px 15px" }, "margin": { "Desktop": "0px 5px 0px 0px" }, "alignItems": { "Desktop": "center" }, "fontSize": { "Desktop": "20px" }, "fontWeight": { "Desktop": "700" }, "color": { "Desktop": "#ffffff !important" }, "borderRadius": { "Desktop": "5px 5px 0px 0px" }, "position": { "Desktop": "relative" }, "width": [] } },
	// 		"labelCounter": { "options": { "enable": false, "position": "", "tag": "div", "class": "accordion-label-counter" }, "styles": [] },
	// 		"labelIcon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "", "position": "beforeLabel", "class": "label-icon" }, "styles": [] },
	// 		"icon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-angle-down", "position": "before", "class": " nav-icon-idle nav-icon" }, "styles": [] },
	// 		"iconToggle": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": " fas fa-angle-up", "class": "nav-icon-toggle nav-icon" }, "styles": [] },
	// 		"navLabel": { "options": { "class": "" }, "styles": [] },
	// 		"panelWrap": { "options": { "class": "tabs-panel " }, "styles": { "backgroundColor": { "Desktop": "#eff0f2" }, "padding": { "Desktop": "20px 20px 20px 20px" }, "margin": { "Desktop": "0px 5px 0px 0px" }, "position": { "Desktop": "relative" }, "fontSize": [], "fontWeight": [] } },

	// 	}
	// },
	// {
	// 	label: "Template 6",
	// 	thumb: "https://pickplugins.com/wp-content/uploads/2024/12/accoridons-template-1.png",
	// 	isPro: false,
	// 	data: {
	// 		"wrapper": { "options": { "content": "", "tag": "div", "class": "accordions-wrapper" }, "styles": { "display": { "Desktop": "flex" }, "flexDirection": { "Tablet": "column-reverse" }, "flexWrap": [] } },
	// 		"navItem": { "options": { "class": "nav-item " }, "styles": { "display": { "Desktop": "flex" }, "color": { "Desktop": "#ffffff" }, "padding": { "Desktop": "5px 15px 5px 15px" }, "backgroundColor": { "Desktop": "#3236ff" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "width": { "Desktop": "250px" }, "alignItems": { "Desktop": "center" }, "cursor": { "Desktop": "pointer" }, "fontSize": { "Desktop": "20px" }, "fontFamily": [], "fontWeight": { "Desktop": "600" } } },
	// 		"activeNavItem": { "options": { "class": "nav-item-active", "id": "" }, "styles": { "backgroundColor": { "Desktop": "#42c853 !important" }, "display": { "Desktop": "flex" }, "padding": { "Desktop": "5px 15px 5px 15px" }, "margin": { "Desktop": "0px 0px 0px 0px" }, "alignItems": { "Desktop": "center" }, "width": { "Desktop": "250px" }, "color": { "Desktop": "#ffffff" }, "fontSize": { "Desktop": "20px" }, "fontWeight": { "Desktop": "600" } } },
	// 		"labelCounter": { "options": { "enable": false, "position": "", "tag": "div", "class": "accordion-label-counter" }, "styles": [] },
	// 		"labelIcon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "", "position": "beforeLabel", "class": "label-icon" }, "styles": [] },
	// 		"icon": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": "fas fa-angle-down", "position": "before", "class": " nav-icon-idle nav-icon" }, "styles": [] },
	// 		"iconToggle": { "options": { "library": "fontAwesome", "srcType": "class", "iconSrc": " fas fa-angle-up", "class": "nav-icon-toggle nav-icon" }, "styles": [] },
	// 		"navLabel": { "options": { "class": "" }, "styles": [] },
	// 		"panelWrap": { "options": { "class": "tabs-panel " }, "styles": { "width": { "Desktop": "100%" }, "backgroundColor": { "Desktop": "#eff0f2" }, "padding": { "Desktop": "20px 20px 20px 20px" }, "margin": { "Desktop": "0px 0px 0px 0px" } } },

	// 	}
	// }



];
export default tabsTemplates;
