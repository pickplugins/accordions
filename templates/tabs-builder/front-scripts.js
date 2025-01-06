document.addEventListener("DOMContentLoaded", function () {
	class TabsBuilder {
		constructor(config) {
			this.id = config.id || "";
			this.lazyLoad = config.lazyLoad || false;
			this.navActiveIndex = config.navActiveIndex || 0;
			this.navsIndex = config.navsIndex || [];
			this.wrapperClass = "tabs";
			this.navsWrapper = "navs-wrapper";
			this.navItem = "nav-item";
			this.panelsWrap = "panels-wrap";
			this.pgTabsPanel = "tabs-panel";
			this.panelWrapInAnimation = config.panelWrapInAnimation || "";
			this.panelWrapOutAnimation = config.panelWrapOutAnimation || "";
			this.panelWrapAnimationDuration = config.panelWrapAnimationDuration || 0;
			this.autoPlay = config.autoPlay || false;
			this.urlHash = config.urlHash || false;
			this.autoPlayDelay = config.autoPlayDelay || 0;
			this.autoPlayDelay = config.autoPlayDelay || 0;

			this.init();
		}

		switchNavs(index, oldIndex = 0) {
			const oldTabPanel = document.querySelector(
				`#${this.id} .tabs-panel[data-tab-id="pg${oldIndex}"]`
			);

			if (oldTabPanel) {
				this.animate(oldTabPanel, this.panelWrapOutAnimation, this.panelWrapAnimationDuration)
			}

			setTimeout(() => {
				const navItems = document.querySelectorAll(`#${this.id} .nav-item`);
				const tabPanels = document.querySelectorAll(`#${this.id} .tabs-panel`);

				console.log(index);


				navItems.forEach((tab, tabIndex) => {
					tab.classList.remove("nav-item-active");

					var iconToggle = tab.querySelector(".nav-icon-toggle");
					var iconIdle = tab.querySelector(".nav-icon-idle");

					if (tabIndex == index) {
						iconToggle.style.display = "inline-block";
						iconIdle.style.display = "none";
						tab.classList.add("nav-item-active");

					} else {



						iconToggle.style.display = "none";
						iconIdle.style.display = "inline-block";
					}

				});
				tabPanels.forEach((panel) => panel.classList.remove("tabs-panel-active", "hidden"));

				const activeTabPanel = document.querySelector(`#${this.id} .tabs-panel[data-tab-id="pg${index}"]`);
				if (activeTabPanel) {
					activeTabPanel.classList.add("tabs-panel-active");
					// animate
					this.animate(activeTabPanel, this.panelWrapInAnimation, this.panelWrapAnimationDuration)
				}
				this.navActiveIndex = index;
			}, this.panelWrapAnimationDuration);
		}

		animate(element, animate_name, duration) {

			element.classList.add("animate__animated", "animate__fast", `animate__${animate_name}`);
			setTimeout(() => {
				element.classList.remove("animate__animated", `animate__${animate_name}`);
			}, duration);
		}
		autoPlayRun() {
			let currentIndex = this.navActiveIndex;
			const loopThroughItems = () => {
				currentIndex = (currentIndex + 1) % this.navsIndex.length;
				this.switchNavs(currentIndex);
				setTimeout(loopThroughItems, this.autoPlayDelay);
			};

			if (this.autoPlay) loopThroughItems();
		}
		listenUrlHash() {
			var hash = window.location.hash;
			if (hash.length == 0) return;
			var hashWrap = document.querySelector('[href="' + hash + '"]');

			console.log(hashWrap);


			if (hashWrap != null) {
				var index = hashWrap.getAttribute("index")

				this.switchNavs(index);
			}


		}
		init() {
			const tabElement = document.querySelector(`#${this.id}`);
			if (this.lazyLoad) tabElement.style.display = "block";

			const navItems = tabElement.querySelectorAll(".nav-item");
			navItems.forEach((item, index) => {

				var iconToggle = item.querySelector(".nav-icon-toggle");
				var iconIdle = item.querySelector(".nav-icon-idle");

				if (this.navActiveIndex == index) {
					iconToggle.style.display = "inline-block";
					iconIdle.style.display = "none";
				} else {
					iconToggle.style.display = "none";
					iconIdle.style.display = "inline-block";
				}




				item.addEventListener("click", () => this.switchNavs(index, this.navActiveIndex));
			});


			if (this.urlHash) this.listenUrlHash();
			if (this.autoPlay) this.autoPlayRun();
		}
	}

	// Initialize instances
	document.querySelectorAll("[data-tabsBuilder]").forEach((tabElement) => {
		const config = JSON.parse(tabElement.getAttribute("data-tabsBuilder"));
		new TabsBuilder(config);
	});
});
