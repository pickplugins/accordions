
document.addEventListener("DOMContentLoaded", function (event) {
	window.tabsBuilder = {
		id: "",
		lazyLoad: false,
		navActiveIndex: 0,
		navActiveId: "",
		navsIndex: [],
		wrapperClass: "tabs",
		navsWrapper: "navs-wrapper",
		navItem: "nav-item",
		panelsWrap: "panels-wrap",
		pgTabsPanel: "tabs-panel",
		progress: "progress",
		progressFill: "progress-fill",
		paginationWrapper: "tabs-pagination",
		paginationItem: "page-numbers",
		paginationPrev: "prev ",
		paginationNext: "next ",
		panelWrapInAnimation: "",
		panelWrapOutAnimation: "",
		panelWrapAnimationDuration: 1000,
		autoPlay: false,
		autoPlayDelay: 0,



		listenUrlHash: () => {
			var hash = window.location.hash;
			if (hash.length == 0) return;
			var hashWrap = document.querySelector('[href="' + hash + '"]');

			if (hashWrap != null) {
				var index = hashWrap.getAttribute("index")

				window.tabsBuilder.switchNavs(index)
			}


		},
		switchNavs: (index, oldIndex = 0) => {

			var oldtabPanelByattr = document.querySelector(`.tabs-panel[data-tab-id="pg${oldIndex}"]`);


			if (oldtabPanelByattr != null) {

				var exitAnimation = window.tabsBuilder.panelWrapOutAnimation;

				oldtabPanelByattr.classList.add("animate__animated");
				oldtabPanelByattr.classList.add("animate__fast");
				oldtabPanelByattr.classList.add("animate__" + exitAnimation);
				setTimeout(() => {
					oldtabPanelByattr.classList.remove("animate__animated");
					oldtabPanelByattr.classList.remove("animate__" + exitAnimation);
					// popup.style.display = "none";
				}, 1000);

			}


			setTimeout(() => {


				if (window.tabsBuilder.id.length == 0) return;
				var pgTabId = window.tabsBuilder.id;
				var navsIndex = window.tabsBuilder.navsIndex;
				var navActiveId = navsIndex[index];

				window.tabsBuilder.navActiveIndex = index;
				window.tabsBuilder.navActiveId = navActiveId;
				var navItems = document.querySelectorAll(`#${pgTabId} .nav-item`);
				var tabPanels = document.querySelectorAll(`#${pgTabId} .tabs-panel`);
				var pgTab = document.querySelector(`#${pgTabId}`);
				var iconToggle = pgTab.querySelectorAll(".nav-icon-toggle");
				var iconIdle = pgTab.querySelectorAll(".nav-icon-idle");
				navItems.forEach((tab) => {
					tab.classList.remove("nav-item-active");
					tab.classList.add("nav-item");
				});
				// hide all tab panels
				tabPanels.forEach((panel) => {
					panel.classList.remove("tabs-panel-active");
					panel.setAttribute('hidden', true)
				});
				var currentTarget = document.querySelector(`#pg${navActiveId}`);
				if (currentTarget != null) {
					currentTarget.classList.add("nav-item-active");
				}




				var tabPanelByattr = document.querySelector(`.tabs-panel[data-tab-id="pg${navActiveId}"]`);

				if (tabPanelByattr != null) {
					tabPanelByattr.classList.add("tabs-panel-active");
					tabPanelByattr.setAttribute('hidden', false)


					var entranceAnimation = window.tabsBuilder.panelWrapInAnimation;

					tabPanelByattr.classList.add("animate__animated");
					tabPanelByattr.classList.add("animate__fast");
					tabPanelByattr.classList.add("animate__" + entranceAnimation);
					setTimeout(() => {
						tabPanelByattr.classList.remove("animate__animated");
						tabPanelByattr.classList.remove("animate__" + entranceAnimation);
						// popup.style.display = "none";
					}, 1000);

				}


				iconIdle.forEach((iconI, J) => {
					iconToggle[J].style.display = "none";
					iconIdle[J].style.display = "inline-block";
				});
				if (iconToggle[index] != undefined) {
					iconToggle[index].style.display = "inline-block";
				}
				if (iconIdle[index] != undefined) {
					iconIdle[index].style.display = "none";
				}






			}, window.tabsBuilder.panelWrapAnimationDuration)





		},
		switchNext: () => {
			var navActiveIndex = window.tabsBuilder.navActiveIndex;
			var max = window.tabsBuilder.navsIndex.length - 1;
			var nextIndex = (navActiveIndex + 1 > max) ? 0 : (navActiveIndex + 1);
			window.tabsBuilder.switchNavs(nextIndex);
		},
		switchPrev: () => {
			var navActiveIndex = window.tabsBuilder.navActiveIndex;
			var max = window.tabsBuilder.navsIndex.length - 1;
			var nextIndex = (navActiveIndex - 1 < 0) ? max : (navActiveIndex - 1);
			window.tabsBuilder.switchNavs(nextIndex);
		},
		autoPlayRun: (args) => {
			var autoPlayOrder = (args.autoPlayOrder);
			var autoPlayDelay = parseInt(args.autoPlayDelay);

			var accordionHeaders = document.querySelectorAll("#" + window.tabsBuilder.id + " .accordion-header");


			let currentIndex = 0;

			const items = [1, 2, 3];
			//let currentIndex = 0;

			function loopThroughItems() {
				currentIndex = (currentIndex + 1) % items.length; // Move to the next index (looping back to 0 after reaching the end)
				window.tabsBuilder.switchNavs(currentIndex)
				setTimeout(loopThroughItems, autoPlayDelay); // Recursively call after 1 second


			}



			currentIndex = items.length;
			function loopThroughItemsReverse() {


				currentIndex = (currentIndex - 1 + (items.length)) % items.length; // Move to the previous index, wrap around

				setTimeout(loopThroughItemsReverse, autoPlayDelay); // Recursively call after 1 second

				window.tabsBuilder.switchNavs(currentIndex)
			}


			function loopThroughItemsRandom() {
				const currentIndex = Math.floor(Math.random() * items.length);

				//currentIndex = (currentIndex + 1) % items.length; // Move to the next index
				setTimeout(loopThroughItemsRandom, autoPlayDelay); // Recursively call after 1 second

				window.tabsBuilder.switchNavs(currentIndex)
			}







			// Start the loop

			if (autoPlayOrder == "topToBottom") {
				loopThroughItems();
			}
			if (autoPlayOrder == "bottomToTop") {
				loopThroughItemsReverse();
			}
			if (autoPlayOrder == "random") {
				loopThroughItemsRandom();
			}







		},
		initTabs: ({ selector = "[data-tabsBuilder]" }) => {
			// Tabs Wrapper Selectors
			var tabsBuilder = document.querySelectorAll(selector);


			if (tabsBuilder.length == 0) return;
			if (tabsBuilder != null) {
				tabsBuilder.forEach((pgTab) => {


					var tabDataX = pgTab.getAttribute("data-tabsBuilder");
					var tabDataObject = JSON.parse(tabDataX);
					var pgTabId = tabDataObject.id;

					var activeTab = tabDataObject.activeTab;
					var navActiveIndex = tabDataObject.navActiveIndex;
					var panelWrapInAnimation = tabDataObject.panelWrapInAnimation;
					var panelWrapOutAnimation = tabDataObject.panelWrapOutAnimation;
					var panelWrapAnimationDuration = tabDataObject.panelWrapAnimationDuration;
					var lazyLoad = tabDataObject.lazyLoad;
					var navsIndex = tabDataObject.navsIndex;

					var autoPlay = tabDataObject.autoPlay;
					var autoPlayTimeout = parseInt(tabDataObject.autoPlayTimeout);
					var autoPlayDelay = tabDataObject.autoPlayDelay;
					var autoPlayOrder = tabDataObject.autoPlayOrder;

					window.tabsBuilder.id = pgTabId;
					window.tabsBuilder.navsIndex = navsIndex;
					window.tabsBuilder.navActiveId = activeTab;
					window.tabsBuilder.navActiveIndex = navActiveIndex;
					window.tabsBuilder.panelWrapInAnimation = panelWrapInAnimation;
					window.tabsBuilder.panelWrapOutAnimation = panelWrapOutAnimation;
					window.tabsBuilder.panelWrapAnimationDuration = panelWrapAnimationDuration;
					window.tabsBuilder.lazyLoad = lazyLoad;

					if (lazyLoad) {
						pgTab.style.display = "block";
					}


					if (autoPlay) {

						setTimeout(() => {

							window.tabsBuilder.autoPlayRun({ autoPlayDelay, autoPlayOrder });

						}, autoPlayTimeout)

					} else {
						window.tabsBuilder.switchNavs(navActiveIndex);

					}




					var pgTabId = pgTab.getAttribute("id");

					var navItems = document.querySelectorAll(`#${pgTabId} .nav-item`);
					var tabPanels = document.querySelectorAll(`#${pgTabId} .tabs-panel`);
					var iconToggle = pgTab.querySelectorAll(".nav-icon-toggle");
					var iconIdle = pgTab.querySelectorAll(".nav-icon-idle");


					navItems.forEach((item, index) => {
						var tabIdX = item.getAttribute("data-tab-id");


						if (activeTab == tabIdX) {
							if (iconToggle[index] != undefined) {
								iconToggle[index].style.display = "inline-block";
							}
							if (iconIdle[index] != undefined) {
								iconIdle[index].style.display = "none";
							}
						} else {
							if (iconToggle[index] != undefined) {
								iconToggle[index].style.display = "none";
							}
							if (iconIdle[index] != undefined) {
								iconIdle[index].style.display = "inline-block";
							}
						}






						item.addEventListener("click", function (event) {
							event.preventDefault();

							var index = event.currentTarget.getAttribute("index");

							window.tabsBuilder.switchNavs(index, window.tabsBuilder.navActiveIndex);




						});
					});
				});

			}


			// Next Previous
			var tabsNextWrap = document.querySelector("#" + window.tabsBuilder.id + " .next ");
			var tabsPrevWrap = document.querySelector("#" + window.tabsBuilder.id + " .prev ");
			var tabsPageNumbers = document.querySelectorAll("#" + window.tabsBuilder.id + " .page-numbers ");
			if (tabsNextWrap != null) {
				tabsNextWrap.addEventListener("click", function (event) {
					window.tabsBuilder.switchNext()
				})
			}
			if (tabsPrevWrap != null) {
				tabsPrevWrap.addEventListener("click", function (event) {
					window.tabsBuilder.switchPrev()
				})
			}
			if (tabsPageNumbers != null) {
				tabsPageNumbers.forEach((PageNumbers) => {
					PageNumbers.addEventListener("click", function (event) {
						var target = event.target;
						var itemClass = [];
						target.classList.forEach((item) => {
							itemClass.push(item)
						})
						if (itemClass.includes("prev")) {
						}
						else if (itemClass.includes("next")) {
						}
						else {
							var index = parseInt(target.getAttribute("index"));
							window.tabsBuilder.switchNavs(index)
						}
					})
				})
			}
		},

	}
	window.tabsBuilder.initTabs({ selector: "[data-tabsBuilder]" });
	window.tabsBuilder.listenUrlHash();




});

