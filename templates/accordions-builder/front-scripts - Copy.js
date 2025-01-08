
// * not working
document.addEventListener("DOMContentLoaded", function (event) {
	window.accordionBuilder = {
		instances: {}, // Store instances by their IDs

		id: "",
		activeIndex: [999],
		iconInAnimation: "",
		iconOutAnimation: "",
		iconAnimationDuration: 0,
		contentInAnimation: "",
		contentOutAnimation: "",
		contentAnimationDuration: 0,
		lazyLoad: false,
		autoPlay: false,
		autoPlayDelay: 0,
		keepExpandOther: false,
		clickToScrollTop: false,
		clickToScrollTopOffset: 0,
		expandCollapseAllHndle: ".expand-collapse-all",
		headerList: [],

		listenUrlHash: () => {
			var hash = window.location.hash;
			var hashWrap = document.querySelector('[href="' + hash + '"]');
			if (hashWrap == null) return;
			var header = hashWrap.parentElement;
			var index = header.getAttribute("index")
			window.accordionBuilder.switch(index)
		},

		activeByIndex: (index) => {
			if (window.accordionBuilder.id.length == 0) return;
			var accordionHeaders = document.querySelectorAll("#" + window.accordionBuilder.id + " .accordion-header");
			accordionHeaders.forEach((header, i) => {
				var loopIndex = header.getAttribute("index");
				window.accordionBuilder.activeIndex = index
				var content = header.nextElementSibling;
				if (loopIndex == index) {
					header.classList.toggle("accordion-header-active");
					content.style.display = "block";
					content.style.height = "auto";

					var iconToggle = header.querySelector(".accordion-icon-toggle");
					var iconIdle = header.querySelector(".accordion-icon-idle");



					if (header.classList.contains("accordion-header-active")) {
						if (iconToggle != null) {
							iconToggle.style.display = "inline-block";

							//var entranceAnimation =										popupWrap.getAttribute("data-entrance-animation");
							var entranceAnimation = window.accordionBuilder.iconInAnimation;

							iconToggle.classList.add("animate__animated");
							iconToggle.classList.add("animate__" + entranceAnimation);
							setTimeout(() => {
								iconToggle.classList.remove("animate__animated");
								iconToggle.classList.remove("animate__" + entranceAnimation);
								// popup.style.display = "none";
							}, window.accordionBuilder.iconAnimationDuration);
						}
						if (iconIdle != null) {
							iconIdle.style.display = "none";

							var entranceAnimation = window.accordionBuilder.iconOutAnimation;

							iconIdle.classList.add("animate__animated");
							iconIdle.classList.add("animate__" + entranceAnimation);
							setTimeout(() => {
								iconIdle.classList.remove("animate__animated");
								iconIdle.classList.remove("animate__" + entranceAnimation);
								// popup.style.display = "none";
							}, window.accordionBuilder.iconAnimationDuration);

						}
						content.style.display = "block";
						content.style.height = "auto";




						var entranceAnimation = window.accordionBuilder.contentInAnimation;

						content.classList.add("animate__animated");
						content.classList.add("animate__fast");
						content.classList.add("animate__" + entranceAnimation);
						setTimeout(() => {
							content.classList.remove("animate__animated");
							content.classList.remove("animate__" + entranceAnimation);
							// popup.style.display = "none";
						}, window.accordionBuilder.contentAnimationDuration);

					} else {
						if (iconIdle != null) {
							iconIdle.style.display = "inline-block";
						}
						if (iconToggle != null) {
							iconToggle.style.display = "none";
						}
						//content.style.display = "none";
						//content.style.height = 0;


						var entranceAnimation = window.accordionBuilder.contentOutAnimation;

						content.classList.add("animate__animated");
						content.classList.add("animate__fast");
						content.classList.add("animate__" + entranceAnimation);
						setTimeout(() => {
							content.classList.remove("animate__animated");
							content.classList.remove("animate__animated");
							content.classList.remove("animate__" + entranceAnimation);
							content.style.display = "none";
						}, window.accordionBuilder.contentAnimationDuration);
					}






				}
			});
		},
		inactiveByIndex: (index) => {
			if (window.accordionBuilder.id.length == 0) return;
			var accordionHeaders = document.querySelectorAll("#" + window.accordionBuilder.id + " .accordion-header");
			accordionHeaders.forEach((header, i) => {
				var loopIndex = header.getAttribute("index");


				var content = header.nextElementSibling;
				if (loopIndex == index) {
					header.classList.toggle("accordion-header-active");
					//content.style.display = "none";
					//content.style.height = 0;
				}

				var iconToggle = header.querySelector(".accordion-icon-toggle");
				var iconIdle = header.querySelector(".accordion-icon-idle");


				if (header.classList.contains("accordion-header-active")) {
					if (iconToggle != null) {
						iconToggle.style.display = "inline-block";

						//var entranceAnimation =										popupWrap.getAttribute("data-entrance-animation");
						var entranceAnimation = window.accordionBuilder.iconInAnimation;

						iconToggle.classList.add("animate__animated");
						iconToggle.classList.add("animate__" + entranceAnimation);
						setTimeout(() => {
							iconToggle.classList.remove("animate__animated");
							iconToggle.classList.remove("animate__" + entranceAnimation);
							// popup.style.display = "none";
						}, window.accordionBuilder.iconAnimationDuration);
					}
					if (iconIdle != null) {
						iconIdle.style.display = "none";

						var entranceAnimation = window.accordionBuilder.iconOutAnimation;

						iconIdle.classList.add("animate__animated");
						iconIdle.classList.add("animate__" + entranceAnimation);
						setTimeout(() => {
							iconIdle.classList.remove("animate__animated");
							iconIdle.classList.remove("animate__" + entranceAnimation);
							// popup.style.display = "none";
						}, window.accordionBuilder.iconAnimationDuration);

					}
					content.style.display = "block";
					content.style.height = "auto";




					var entranceAnimation = window.accordionBuilder.contentInAnimation;

					content.classList.add("animate__animated");
					content.classList.add("animate__fast");
					content.classList.add("animate__" + entranceAnimation);
					setTimeout(() => {
						content.classList.remove("animate__animated");
						content.classList.remove("animate__" + entranceAnimation);
						// popup.style.display = "none";
					}, window.accordionBuilder.contentAnimationDuration);

				} else {
					if (iconIdle != null) {
						iconIdle.style.display = "inline-block";
					}
					if (iconToggle != null) {
						iconToggle.style.display = "none";
					}
					//content.style.display = "none";
					//content.style.height = 0;


					var exitAnimation = window.accordionBuilder.contentOutAnimation;

					content.classList.add("animate__animated");
					content.classList.add("animate__fast");
					content.classList.add("animate__" + exitAnimation);
					setTimeout(() => {
						content.classList.remove("animate__animated");
						content.classList.remove("animate__animated");
						content.classList.remove("animate__" + exitAnimation);
						content.style.display = "none";
					}, window.accordionBuilder.contentOutAnimation);
				}











			});
		},
		hideByIndex: (index) => {
			if (window.accordionBuilder.id.length == 0) return;
			var accordionHeaders = document.querySelectorAll("#" + window.accordionBuilder.id + " .accordion-header");
			accordionHeaders.forEach((header, i) => {
				var loopIndex = header.getAttribute("index");

				if (index == loopIndex) {
					var content = header.nextElementSibling;
					//content.style.display = "none";
					header.style.display = "none";
				}
			});
		},
		unhideByIndex: (index) => {
			if (window.accordionBuilder.id.length == 0) return;
			var accordionHeaders = document.querySelectorAll("#" + window.accordionBuilder.id + " .accordion-header");
			accordionHeaders.forEach((header, i) => {
				var loopIndex = header.getAttribute("index");

				if (index == loopIndex) {
					var content = header.nextElementSibling;
					//content.style.display = "block";
					header.style.display = "flex";
				}
			});
		},
		unhideAll: (index) => {
			if (window.accordionBuilder.id.length == 0) return;
			var accordionHeaders = document.querySelectorAll("#" + window.accordionBuilder.id + " .accordion-header");
			accordionHeaders.forEach((header, i) => {
				var loopIndex = header.getAttribute("index");


				var content = header.nextElementSibling;
				content.style.display = "none";
				header.style.display = "flex";

			});
		},



		switch: (index) => {

			console.log(index);
			console.log(window.accordionBuilder.id);


			if (window.accordionBuilder.id.length == 0) return;
			var accordionHeaders = document.querySelectorAll("#" + window.accordionBuilder.id + " .accordion-header");

			console.log(accordionHeaders);



			accordionHeaders.forEach((header, i) => {
				var loopIndex = header.getAttribute("index");
				window.accordionBuilder.activeIndex = index
				var content = header.nextElementSibling;
				if (loopIndex == index) {
					header.classList.toggle("accordion-header-active");
					content.style.display = "block";
					content.style.height = "auto";
				} else {
					header.classList.remove("accordion-header-active");
					content.style.display = "none";
					content.style.height = 0;
				}





				var iconToggle = header.querySelector(".accordion-icon-toggle");
				var iconIdle = header.querySelector(".accordion-icon-idle");


				if (header.classList.contains("accordion-header-active")) {
					if (iconToggle != null) {
						iconToggle.style.display = "inline-block";

						//var entranceAnimation =										popupWrap.getAttribute("data-entrance-animation");
						var entranceAnimation = window.accordionBuilder.iconInAnimation;

						iconToggle.classList.add("animate__animated");
						iconToggle.classList.add("animate__" + entranceAnimation);
						setTimeout(() => {
							iconToggle.classList.remove("animate__animated");
							iconToggle.classList.remove("animate__" + entranceAnimation);
							// popup.style.display = "none";
						}, window.accordionBuilder.iconAnimationDuration);
					}
					if (iconIdle != null) {
						iconIdle.style.display = "none";

						var exitAnimation = window.accordionBuilder.iconOutAnimation;

						iconIdle.classList.add("animate__animated");
						iconIdle.classList.add("animate__" + exitAnimation);
						setTimeout(() => {
							iconIdle.classList.remove("animate__animated");
							iconIdle.classList.remove("animate__" + exitAnimation);
							// popup.style.display = "none";
						}, window.accordionBuilder.iconAnimationDuration);

					}
					content.style.display = "block";
					content.style.height = "auto";




					var entranceAnimation = window.accordionBuilder.contentInAnimation;

					content.classList.add("animate__animated");
					content.classList.add("animate__fast");
					content.classList.add("animate__" + entranceAnimation);
					setTimeout(() => {
						content.classList.remove("animate__animated");
						content.classList.remove("animate__" + entranceAnimation);
						// popup.style.display = "none";
					}, window.accordionBuilder.contentAnimationDuration);









				} else {
					if (iconIdle != null) {
						iconIdle.style.display = "inline-block";
					}
					if (iconToggle != null) {
						iconToggle.style.display = "none";
					}
					//content.style.display = "none";
					//content.style.height = 0;


					var entranceAnimation = window.accordionBuilder.contentOutAnimation;

					content.classList.add("animate__animated");
					content.classList.add("animate__fast");
					content.classList.add("animate__" + entranceAnimation);
					setTimeout(() => {
						content.classList.remove("animate__animated");
						content.classList.remove("animate__animated");
						content.classList.remove("animate__" + entranceAnimation);
						content.style.display = "none";
					}, window.accordionBuilder.contentOutAnimation);
				}









			});
		},



		switchNext: () => {
			var activeIndex = window.accordionBuilder.activeIndex;
			var max = window.accordionBuilder.headerList.length - 1;
			var nextIndex = (activeIndex + 1 > max) ? 0 : (activeIndex + 1);
			window.accordionBuilder.switch(nextIndex);
		},
		switchPrev: () => {
			var activeIndex = window.accordionBuilder.activeIndex;
			var max = window.accordionBuilder.headerList.length - 1;
			var nextIndex = (activeIndex - 1 < 0) ? max : (activeIndex - 1);
			window.accordionBuilder.switch(nextIndex);
		},
		autoPlayRun: (args) => {
			var autoPlayOrder = (args.autoPlayOrder);
			var autoPlayDelay = parseInt(args.autoPlayDelay);

			var accordionHeaders = document.querySelectorAll("#" + window.accordionBuilder.id + " .accordion-header");


			let currentIndex = 0;

			const items = [1, 2, 3, 4, 5, 6, 7];
			//let currentIndex = 0;

			function loopThroughItems() {
				console.log(items[currentIndex]); // Print the current item
				currentIndex = (currentIndex + 1) % items.length; // Move to the next index (looping back to 0 after reaching the end)
				setTimeout(loopThroughItems, autoPlayDelay); // Recursively call after 1 second
			}


			// function loopThroughItems() {
			// 	console.log(items[currentIndex]); // Print the current item


			// 	currentIndex = (currentIndex + 1) % items.length; // Move to the next index

			// 	setTimeout(loopThroughItems, autoPlayDelay); // Recursively call after 1 second

			// 	window.accordionBuilder.switch(currentIndex)
			// }

			currentIndex = items.length;
			function loopThroughItemsReverse() {


				currentIndex = (currentIndex - 1 + (items.length)) % items.length; // Move to the previous index, wrap around

				setTimeout(loopThroughItemsReverse, autoPlayDelay); // Recursively call after 1 second

				window.accordionBuilder.switch(currentIndex)
			}


			function loopThroughItemsRandom() {
				const currentIndex = Math.floor(Math.random() * items.length);

				//currentIndex = (currentIndex + 1) % items.length; // Move to the next index
				setTimeout(loopThroughItemsRandom, autoPlayDelay); // Recursively call after 1 second

				window.accordionBuilder.switch(currentIndex)
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


		search: (keyword) => {

			if (keyword.length == 0) {
				window.accordionBuilder.unhideAll()

				return;

			}

			var accordionHeaders = document.querySelectorAll("#" + window.accordionBuilder.id + " .accordion-header");
			accordionHeaders.forEach((header, i) => {
				var loopIndex = header.getAttribute("index");

				//window.accordionBuilder.activeIndex = index
				var content = header.nextElementSibling;

				var headerLabel = header.querySelector(".accordion-header-label");

				var labelText = headerLabel.innerText.toLowerCase();;
				var contentText = content.innerText.toLowerCase();;

				var searchContent = labelText + " " + contentText
				var position = searchContent.indexOf(keyword);



				if (position < 0) {
					//window.accordionBuilder.inactiveByIndex(loopIndex)
					window.accordionBuilder.hideByIndex(loopIndex)

				} else {
					window.accordionBuilder.unhideByIndex(loopIndex)
					//window.accordionBuilder.activeByIndex(loopIndex)

				}

			});


		},



		expandCollapseAll: () => {
			var expandCollapseAllHndle = document.querySelector("#" + window.accordionBuilder.id + " " + window.accordionBuilder.expandCollapseAllHndle);

			var toggled = expandCollapseAllHndle.getAttribute("data-toggled");


			var headerCount = window.accordionBuilder.headerList.length
			var expandCollapseAllDelay = parseInt(window.accordionBuilder.expandCollapseAllDelay)


			var expandalltext = expandCollapseAllHndle.getAttribute("data-expandalltext");
			var collapsealltext = expandCollapseAllHndle.getAttribute("data-collapsealltext");
			var expandalliconhtml = expandCollapseAllHndle.getAttribute("data-expandalliconhtml");
			var collapsealliconhtml = expandCollapseAllHndle.getAttribute("data-collapsealliconhtml");

			if (!toggled) {
				expandCollapseAllHndle.setAttribute("data-toggled", true);
				var innerHtml = `${collapsealliconhtml}<span>${collapsealltext}</span>`;

				for (var i = 0; i < headerCount; i++) {
					(function (index) {
						setTimeout(function () {
							window.accordionBuilder.activeByIndex(index)
						}, expandCollapseAllDelay * index);
					})(i);

				}

			} else {

				for (var i = 0; i < headerCount; i++) {

					(function (index) {
						setTimeout(function () {
							window.accordionBuilder.inactiveByIndex(index)
						}, expandCollapseAllDelay * index);
					})(i);

				}
				expandCollapseAllHndle.removeAttribute("data-toggled");
				var innerHtml = `${expandalliconhtml}<span>${expandalltext}</span>`;

			}

			expandCollapseAllHndle.innerHTML = innerHtml




		},
		init: ({ selector = "[data-accordionBuilder]" }) => {
			if (selector.length == 0) return;
			var accordionWrap = document.querySelectorAll(selector);
			accordionWrap.forEach((accordion) => {
				var accordionData = accordion.getAttribute("data-accordionBuilder");
				var accordionDataObj = JSON.parse(accordionData);
				var activeIndex = accordionDataObj.activeIndex;
				var iconInAnimation = accordionDataObj.iconInAnimation;
				var iconOutAnimation = accordionDataObj.iconOutAnimation;
				var iconAnimationDuration = accordionDataObj.iconAnimationDuration;
				var contentInAnimation = accordionDataObj.contentInAnimation;
				var contentOutAnimation = accordionDataObj.contentOutAnimation;
				var contentAnimationDuration = accordionDataObj.contentAnimationDuration;
				var lazyLoad = accordionDataObj.lazyLoad;
				var autoPlay = accordionDataObj.autoPlay;
				var autoPlayTimeout = parseInt(accordionDataObj.autoPlayTimeout);
				var autoPlayDelay = accordionDataObj.autoPlayDelay;
				var autoPlayOrder = accordionDataObj.autoPlayOrder;
				var expandCollapseAllDelay = accordionDataObj.expandCollapseAllDelay;
				var keepExpandOther = accordionDataObj.keepExpandOther;
				var clickToScrollTop = accordionDataObj.clickToScrollTop;
				var clickToScrollTopOffset = parseInt(accordionDataObj.clickToScrollTopOffset);

				if (lazyLoad) {
					accordion.style.display = "block";
				}
				if (autoPlay) {

					setTimeout(() => {

						window.accordionBuilder.autoPlayRun({ autoPlayDelay, autoPlayOrder });

					}, autoPlayTimeout)

				}


				var accordionWrapId = accordionDataObj.id;
				window.accordionBuilder.id = accordionWrapId;
				console.log(accordionWrapId);



				window.accordionBuilder.activeIndex = activeIndex;
				window.accordionBuilder.iconInAnimation = iconInAnimation;
				window.accordionBuilder.iconOutAnimation = iconOutAnimation;
				window.accordionBuilder.iconAnimationDuration = iconAnimationDuration;
				window.accordionBuilder.contentInAnimation = contentInAnimation;
				window.accordionBuilder.contentOutAnimation = contentOutAnimation;
				window.accordionBuilder.contentAnimationDuration = contentAnimationDuration;
				window.accordionBuilder.lazyLoad = lazyLoad;
				window.accordionBuilder.autoPlay = autoPlay;
				window.accordionBuilder.autoPlayDelay = autoPlayDelay;
				window.accordionBuilder.expandCollapseAllDelay = expandCollapseAllDelay;
				window.accordionBuilder.keepExpandOther = keepExpandOther;




				var accordionHeaders = document.querySelectorAll("#" + accordionWrapId + " .accordion-header");



				var headerList = [];
				accordionHeaders.forEach((header, index) => {
					var headerId = header.getAttribute("id");
					headerList.push(headerId)
					header.setAttribute("index", index);
					const counter = header.querySelector(".accordion-label-counter");
					if (counter !== null) {
						counter.textContent = `${index + 1}`; // Adding 1 to start counting from 1
					}
				});
				window.accordionBuilder.headerList = headerList;
				accordionHeaders.forEach((accordionHeader) => {
					var iconToggle = accordionHeader.querySelector(".accordion-icon-toggle");
					var iconIdle = accordionHeader.querySelector(".accordion-icon");
					if (iconToggle != null) {
						iconToggle.style.display = "none";
					}
				});
				if (accordionHeaders != null) {
					accordionHeaders.forEach((accordionHeader) => {
						// var fieldId = accordionHeader.getAttribute("id");
						var content = accordionHeader.nextElementSibling;
						var iconToggle = accordionHeader.querySelector(".accordion-icon-toggle");
						var iconIdle = accordionHeader.querySelector(".accordion-icon-idle");
						if (iconToggle != null) {
							iconToggle.style.display = "none";
						}
						if (content != undefined) {
							content.style.height = 0;
							content.style.overflow = "hidden";
							content.style.display = "none";
						}
						accordionHeader.addEventListener("click", (event) => {



							event.stopImmediatePropagation();
							event.preventDefault();

							//accordionHeader.scrollIntoView({ behavior: 'smooth' });

							if (clickToScrollTop) {
								var offset = clickToScrollTopOffset;

								const elementPosition = accordionHeader.getBoundingClientRect().top + window.scrollY;
								const offsetPosition = elementPosition - offset;

								window.scrollTo({
									top: offsetPosition,
									behavior: 'smooth'
								});

							}



							var loopIndex = accordionHeader.getAttribute("index");


							if (keepExpandOther) {
								window.accordionBuilder.activeByIndex(loopIndex);

							} else {
								window.accordionBuilder.switch(loopIndex);

							}





						});
					});
				}
			})




			var expandCollapseAllHndle = document.querySelector("#" + window.accordionBuilder.id + " " + window.accordionBuilder.expandCollapseAllHndle);
			if (expandCollapseAllHndle != null) {
				expandCollapseAllHndle.addEventListener("click", function (event) {

					window.accordionBuilder.expandCollapseAll()
				})
			}


			var searchHndle = document.querySelector("#" + window.accordionBuilder.id + " .search-input");

			if (searchHndle != null) {

				function debounce(func, delay) {
					let timeout;
					return function (...args) {
						clearTimeout(timeout);
						timeout = setTimeout(() => func.apply(this, args), delay);
					};
				}


				function handleKeyup(event) {
					event.preventDefault();

					var value = event.target.value;
					window.accordionBuilder.search(value)
				}

				searchHndle.addEventListener('keyup', debounce(handleKeyup, 500));

			}

			// var nextWrap = document.querySelector("#" + window.accordionBuilder.id + " .next ");
			// var prevWrap = document.querySelector("#" + window.accordionBuilder.id + " .prev ");
			// var pageNumbers = document.querySelectorAll("#" + window.accordionBuilder.id + " .page-numbers ");
			// nextWrap.addEventListener("click", function (event) {
			// 	window.accordionBuilder.switchNext()
			// })
			// prevWrap.addEventListener("click", function (event) {
			// 	window.accordionBuilder.switchPrev()
			// })
			// pageNumbers.forEach((PageNumber) => {
			// 	PageNumber.addEventListener("click", function (event) {
			// 		var target = event.target;
			// 		var itemClass = [];
			// 		target.classList.forEach((item) => {
			// 			itemClass.push(item)
			// 		})
			// 		if (itemClass.includes("prev")) {
			// 		}
			// 		else if (itemClass.includes("next")) {
			// 		}
			// 		else {
			// 			var index = parseInt(target.getAttribute("index"));
			// 			window.accordionBuilder.switch(index)
			// 		}
			// 	})
			// })
		}
	}
	window.accordionBuilder.init({ selector: "[data-accordionBuilder]" });
	window.accordionBuilder.listenUrlHash();
});
