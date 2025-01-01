
document.addEventListener("DOMContentLoaded", function (event) {
	window.pgTabs = {
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

				window.pgTabs.switchNavs(index)
			}


		},
		switchNavs: (index, oldIndex = 0) => {

			var oldtabPanelByattr = document.querySelector(`.tabs-panel[data-tab-id="pg${oldIndex}"]`);


			if (oldtabPanelByattr != null) {

				var exitAnimation = window.pgTabs.panelWrapOutAnimation;

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


				if (window.pgTabs.id.length == 0) return;
				var pgTabId = window.pgTabs.id;
				var navsIndex = window.pgTabs.navsIndex;
				var navActiveId = navsIndex[index];

				window.pgTabs.navActiveIndex = index;
				window.pgTabs.navActiveId = navActiveId;
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


					var entranceAnimation = window.pgTabs.panelWrapInAnimation;

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






			}, window.pgTabs.panelWrapAnimationDuration)





		},
		switchNext: () => {
			var navActiveIndex = window.pgTabs.navActiveIndex;
			var max = window.pgTabs.navsIndex.length - 1;
			var nextIndex = (navActiveIndex + 1 > max) ? 0 : (navActiveIndex + 1);
			window.pgTabs.switchNavs(nextIndex);
		},
		switchPrev: () => {
			var navActiveIndex = window.pgTabs.navActiveIndex;
			var max = window.pgTabs.navsIndex.length - 1;
			var nextIndex = (navActiveIndex - 1 < 0) ? max : (navActiveIndex - 1);
			window.pgTabs.switchNavs(nextIndex);
		},
		autoPlayRun: (args) => {
			var autoPlayOrder = (args.autoPlayOrder);
			var autoPlayDelay = parseInt(args.autoPlayDelay);

			var accordionHeaders = document.querySelectorAll("#" + window.pgTabs.id + " .accordion-header");


			let currentIndex = 0;

			const items = [1, 2, 3];
			//let currentIndex = 0;

			function loopThroughItems() {
				currentIndex = (currentIndex + 1) % items.length; // Move to the next index (looping back to 0 after reaching the end)
				window.pgTabs.switchNavs(currentIndex)
				setTimeout(loopThroughItems, autoPlayDelay); // Recursively call after 1 second


			}



			currentIndex = items.length;
			function loopThroughItemsReverse() {


				currentIndex = (currentIndex - 1 + (items.length)) % items.length; // Move to the previous index, wrap around

				setTimeout(loopThroughItemsReverse, autoPlayDelay); // Recursively call after 1 second

				window.pgTabs.switchNavs(currentIndex)
			}


			function loopThroughItemsRandom() {
				const currentIndex = Math.floor(Math.random() * items.length);

				//currentIndex = (currentIndex + 1) % items.length; // Move to the next index
				setTimeout(loopThroughItemsRandom, autoPlayDelay); // Recursively call after 1 second

				window.pgTabs.switchNavs(currentIndex)
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
		initTabs: ({ selector = "[data-pgTabs]" }) => {
			// Tabs Wrapper Selectors
			var pgTabs = document.querySelectorAll(selector);
			if (pgTabs.length == 0) return;
			if (pgTabs != null) {
				pgTabs.forEach((pgTab) => {


					var tabDataX = pgTab.getAttribute("data-pgTabs");
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

					window.pgTabs.id = pgTabId;
					window.pgTabs.navsIndex = navsIndex;
					window.pgTabs.navActiveId = activeTab;
					window.pgTabs.navActiveIndex = navActiveIndex;
					window.pgTabs.panelWrapInAnimation = panelWrapInAnimation;
					window.pgTabs.panelWrapOutAnimation = panelWrapOutAnimation;
					window.pgTabs.panelWrapAnimationDuration = panelWrapAnimationDuration;
					window.pgTabs.lazyLoad = lazyLoad;

					if (lazyLoad) {
						pgTab.style.display = "block";
					}


					if (autoPlay) {

						setTimeout(() => {

							window.pgTabs.autoPlayRun({ autoPlayDelay, autoPlayOrder });

						}, autoPlayTimeout)

					} else {
						//window.pgTabs.switchNavs(navActiveIndex);

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

							window.pgTabs.switchNavs(index, window.pgTabs.navActiveIndex);




						});
					});
				});

			}













			// Next Previous
			var tabsNextWrap = document.querySelector("#" + window.pgTabs.id + " .next ");
			var tabsPrevWrap = document.querySelector("#" + window.pgTabs.id + " .prev ");
			var tabsPageNumbers = document.querySelectorAll("#" + window.pgTabs.id + " .page-numbers ");
			if (tabsNextWrap != null) {
				tabsNextWrap.addEventListener("click", function (event) {
					window.pgTabs.switchNext()
				})
			}
			if (tabsPrevWrap != null) {
				tabsPrevWrap.addEventListener("click", function (event) {
					window.pgTabs.switchPrev()
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
							window.pgTabs.switchNavs(index)
						}
					})
				})
			}
		},
	}
	window.pgTabs.initTabs({ selector: "[data-pgTabs]" });
	window.pgTabs.listenUrlHash();
});

