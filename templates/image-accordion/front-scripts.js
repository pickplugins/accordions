document.addEventListener("DOMContentLoaded", function () {
	class ImageAccordion {
		constructor(config) {
			this.id = config.id || "";
			this.lazyLoad = config.lazyLoad || false;
			this.navActiveIndex = config.navActiveIndex || 0;
			this.navsIndex = config.navsIndex || [];
			this.activeEvent = "mouseover";
			this.wrapperClass = "tabs";
			this.navsWrapper = "navs-wrapper";
			this.navItem = "nav-item";
			this.panelsWrap = "panels-wrap";
			this.pgTabsPanel = "tabs-panel";
			this.overlayInAnimation = config.overlayInAnimation || "";
			this.overlayOutAnimation = config.overlayOutAnimation || "";
			this.overlayAnimationDuration = parseInt(config.overlayAnimationDuration) || 0;
			this.autoPlay = config.autoPlay || false;
			this.urlHash = config.urlHash || false;
			this.autoPlayDelay = config.autoPlayDelay || 0;
			this.autoPlayTimeout = config.autoPlayTimeout || 0;

			this.init();
		}

		activeByIndex(index, oldIndex = 0) {

			const navItems = document.querySelectorAll(`#${this.id} .image-accordion-item`);
			navItems.forEach((item, index) => {
				item.classList.remove("active");
			})

			// const OlditemHndle = document.querySelector(`#${this.id} .image-accordion-item[index="${oldIndex}"]`);
			// OlditemHndle.classList.remove("active");

			const itemHndle = document.querySelector(`#${this.id} .image-accordion-item[index="${index}"]`);
			itemHndle.classList.add("active");

			const overlay = itemHndle.querySelector(".image-accordion-overlay");
			overlay.style.display = "block";
			this.animate(overlay, this.overlayInAnimation, this.overlayAnimationDuration)
		}
		inactiveByIndex(index) {

			console.log(this.overlayOutAnimation);
			console.log(this.overlayAnimationDuration);

			const itemHndle = document.querySelector(`#${this.id} .image-accordion-item[index="${index}"]`);
			itemHndle.classList.remove("active");
			const overlay = itemHndle.querySelector(".image-accordion-overlay");

			this.animate(overlay, this.overlayOutAnimation, this.overlayAnimationDuration)

			setTimeout(() => { overlay.style.display = "none"; }, this.overlayAnimationDuration)

		}










		animate(element, animate_name, duration) {

			element.classList.add("animate__animated", "animate__fast", `animate__${animate_name}`);

			setTimeout(() => {
				element.classList.remove("animate__animated", "animate__fast", `animate__${animate_name}`);
			}, duration);
		}
		autoPlayRun() {
			let currentIndex = this.navActiveIndex;
			const loopThroughItems = () => {
				currentIndex = (currentIndex + 1) % this.navsIndex.length;
				this.activeByIndex(currentIndex);
				setTimeout(loopThroughItems, this.autoPlayDelay);
			};

			if (this.autoPlay) loopThroughItems();
		}
		listenUrlHash() {
			var hash = (window.location.hash);

			console.log(hash.replace("#", ""));
			var index = hash.replace("#", "");

			if (index.length == 0) return;
			index = parseInt(index)
			this.activeByIndex(index);



		}
		init() {
			const tabElement = document.querySelector(`#${this.id}`);
			if (this.lazyLoad) tabElement.style.display = "block";

			const navItems = tabElement.querySelectorAll(".image-accordion-item");
			navItems.forEach((item, index) => {



				item.addEventListener("mouseover", (ev) => {
					ev.preventDefault();
					ev.stopImmediatePropagation();
					var itemIndex = item.getAttribute("index");
					this.activeByIndex(itemIndex)

				});

				item.addEventListener("mouseleave", (ev) => {

					ev.preventDefault();
					ev.stopImmediatePropagation();

					var itemIndex = item.getAttribute("index");
					this.inactiveByIndex(itemIndex);


				});










			});


			if (this.urlHash) this.listenUrlHash();
			if (this.autoPlay) this.autoPlayRun();
		}
	}

	// Initialize instances
	document.querySelectorAll("[data-imageAccordion]").forEach((tabElement) => {
		const config = JSON.parse(tabElement.getAttribute("data-imageAccordion"));
		new ImageAccordion(config);
	});
});
