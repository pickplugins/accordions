
// * not working
document.addEventListener("DOMContentLoaded", function (event) {
	window.pgAccordion = {
		id: "",
		activeIndex: [999],
		iconInAnimation: "",
		iconOutAnimation: "",
		contentInAnimation: "",
		contentOutAnimation: "",
		lazyLoad: false,
		autoPlay: false,



		expandCollapseAllHndle: ".expand-collapse-all",
		headerList: [],
		listenUrlHash: () => {
			var hash = window.location.hash;
			var hashWrap = document.querySelector('[href="' + hash + '"]');
			if (hashWrap == null) return;
			var header = hashWrap.parentElement;
			var index = header.getAttribute("index")
			window.pgAccordion.switch(index)
		},
		activeByIndex: (index) => {
			if (window.pgAccordion.id.length == 0) return;
			var accordionHeaders = document.querySelectorAll("#" + window.pgAccordion.id + " .accordion-header");
			accordionHeaders.forEach((header, i) => {
				var loopIndex = header.getAttribute("index");
				window.pgAccordion.activeIndex = index
				var content = header.nextElementSibling;
				if (loopIndex == index) {
					header.classList.toggle("accordion-header-active");
					content.style.display = "block";
					content.style.height = "auto";

					var iconToggle = header.querySelector(".accordion-icon-toggle");
					var iconIdle = header.querySelector(".accordion-icon-idle");


					// if (header.classList.contains("accordion-header-active")) {
					// 	if (iconToggle != null) {
					// 		iconToggle.style.display = "inline-block";
					// 	}
					// 	if (iconIdle != null) {
					// 		iconIdle.style.display = "none";
					// 	}
					// 	content.style.display = "block";
					// 	content.style.height = "auto";
					// } else {
					// 	if (iconIdle != null) {
					// 		iconIdle.style.display = "inline-block";
					// 	}
					// 	if (iconToggle != null) {
					// 		iconToggle.style.display = "none";
					// 	}
					// 	content.style.display = "none";
					// 	content.style.height = 0;
					// }


					if (header.classList.contains("accordion-header-active")) {
						if (iconToggle != null) {
							iconToggle.style.display = "inline-block";

							//var entranceAnimation =										popupWrap.getAttribute("data-entrance-animation");
							var entranceAnimation = window.pgAccordion.iconInAnimation;

							iconToggle.classList.add("animate__animated");
							iconToggle.classList.add("animate__" + entranceAnimation);
							setTimeout(() => {
								iconToggle.classList.remove("animate__animated");
								iconToggle.classList.remove("animate__" + entranceAnimation);
								// popup.style.display = "none";
							}, 2000);
						}
						if (iconIdle != null) {
							iconIdle.style.display = "none";

							var entranceAnimation = window.pgAccordion.iconOutAnimation;

							iconIdle.classList.add("animate__animated");
							iconIdle.classList.add("animate__" + entranceAnimation);
							setTimeout(() => {
								iconIdle.classList.remove("animate__animated");
								iconIdle.classList.remove("animate__" + entranceAnimation);
								// popup.style.display = "none";
							}, 2000);

						}
						content.style.display = "block";
						content.style.height = "auto";




						var entranceAnimation = window.pgAccordion.contentInAnimation;

						content.classList.add("animate__animated");
						content.classList.add("animate__fast");
						content.classList.add("animate__" + entranceAnimation);
						setTimeout(() => {
							content.classList.remove("animate__animated");
							content.classList.remove("animate__" + entranceAnimation);
							// popup.style.display = "none";
						}, 800);

					} else {
						if (iconIdle != null) {
							iconIdle.style.display = "inline-block";
						}
						if (iconToggle != null) {
							iconToggle.style.display = "none";
						}
						//content.style.display = "none";
						//content.style.height = 0;


						var entranceAnimation = window.pgAccordion.contentOutAnimation;

						content.classList.add("animate__animated");
						content.classList.add("animate__fast");
						content.classList.add("animate__" + entranceAnimation);
						setTimeout(() => {
							content.classList.remove("animate__animated");
							content.classList.remove("animate__animated");
							content.classList.remove("animate__" + entranceAnimation);
							content.style.display = "none";
						}, 800);
					}






				}
			});
		},
		inactiveByIndex: (index) => {
			if (window.pgAccordion.id.length == 0) return;
			var accordionHeaders = document.querySelectorAll("#" + window.pgAccordion.id + " .accordion-header");
			accordionHeaders.forEach((header, i) => {
				var loopIndex = header.getAttribute("index");


				var content = header.nextElementSibling;
				if (loopIndex == index) {
					header.classList.toggle("accordion-header-active");
					content.style.display = "none";
					content.style.height = 0;
				}

				var iconToggle = header.querySelector(".accordion-icon-toggle");
				var iconIdle = header.querySelector(".accordion-icon-idle");


				// if (header.classList.contains("accordion-header-active")) {
				// 	if (iconToggle != null) {
				// 		iconToggle.style.display = "inline-block";
				// 	}
				// 	if (iconIdle != null) {
				// 		iconIdle.style.display = "none";
				// 	}
				// 	content.style.display = "block";
				// 	content.style.height = "auto";
				// } else {
				// 	if (iconIdle != null) {
				// 		iconIdle.style.display = "inline-block";
				// 	}
				// 	if (iconToggle != null) {
				// 		iconToggle.style.display = "none";
				// 	}
				// 	content.style.display = "none";
				// 	content.style.height = 0;
				// }



				if (header.classList.contains("accordion-header-active")) {
					if (iconToggle != null) {
						iconToggle.style.display = "inline-block";

						//var entranceAnimation =										popupWrap.getAttribute("data-entrance-animation");
						var entranceAnimation = window.pgAccordion.iconInAnimation;

						iconToggle.classList.add("animate__animated");
						iconToggle.classList.add("animate__" + entranceAnimation);
						setTimeout(() => {
							iconToggle.classList.remove("animate__animated");
							iconToggle.classList.remove("animate__" + entranceAnimation);
							// popup.style.display = "none";
						}, 2000);
					}
					if (iconIdle != null) {
						iconIdle.style.display = "none";

						var entranceAnimation = window.pgAccordion.iconOutAnimation;

						iconIdle.classList.add("animate__animated");
						iconIdle.classList.add("animate__" + entranceAnimation);
						setTimeout(() => {
							iconIdle.classList.remove("animate__animated");
							iconIdle.classList.remove("animate__" + entranceAnimation);
							// popup.style.display = "none";
						}, 2000);

					}
					content.style.display = "block";
					content.style.height = "auto";




					var entranceAnimation = window.pgAccordion.contentInAnimation;

					content.classList.add("animate__animated");
					content.classList.add("animate__fast");
					content.classList.add("animate__" + entranceAnimation);
					setTimeout(() => {
						content.classList.remove("animate__animated");
						content.classList.remove("animate__" + entranceAnimation);
						// popup.style.display = "none";
					}, 800);

				} else {
					if (iconIdle != null) {
						iconIdle.style.display = "inline-block";
					}
					if (iconToggle != null) {
						iconToggle.style.display = "none";
					}
					//content.style.display = "none";
					//content.style.height = 0;


					var entranceAnimation = window.pgAccordion.contentOutAnimation;

					content.classList.add("animate__animated");
					content.classList.add("animate__fast");
					content.classList.add("animate__" + entranceAnimation);
					setTimeout(() => {
						content.classList.remove("animate__animated");
						content.classList.remove("animate__animated");
						content.classList.remove("animate__" + entranceAnimation);
						content.style.display = "none";
					}, 800);
				}











			});
		},
		hideByIndex: (index) => {
			if (window.pgAccordion.id.length == 0) return;
			var accordionHeaders = document.querySelectorAll("#" + window.pgAccordion.id + " .accordion-header");
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
			if (window.pgAccordion.id.length == 0) return;
			var accordionHeaders = document.querySelectorAll("#" + window.pgAccordion.id + " .accordion-header");
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
			if (window.pgAccordion.id.length == 0) return;
			var accordionHeaders = document.querySelectorAll("#" + window.pgAccordion.id + " .accordion-header");
			accordionHeaders.forEach((header, i) => {
				var loopIndex = header.getAttribute("index");


				var content = header.nextElementSibling;
				content.style.display = "none";
				header.style.display = "flex";

			});
		},



		switch: (index) => {
			if (window.pgAccordion.id.length == 0) return;
			var accordionHeaders = document.querySelectorAll("#" + window.pgAccordion.id + " .accordion-header");
			accordionHeaders.forEach((header, i) => {
				var loopIndex = header.getAttribute("index");
				window.pgAccordion.activeIndex = index
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
						var entranceAnimation = window.pgAccordion.iconInAnimation;

						iconToggle.classList.add("animate__animated");
						iconToggle.classList.add("animate__" + entranceAnimation);
						setTimeout(() => {
							iconToggle.classList.remove("animate__animated");
							iconToggle.classList.remove("animate__" + entranceAnimation);
							// popup.style.display = "none";
						}, 2000);
					}
					if (iconIdle != null) {
						iconIdle.style.display = "none";

						var entranceAnimation = window.pgAccordion.iconOutAnimation;

						iconIdle.classList.add("animate__animated");
						iconIdle.classList.add("animate__" + entranceAnimation);
						setTimeout(() => {
							iconIdle.classList.remove("animate__animated");
							iconIdle.classList.remove("animate__" + entranceAnimation);
							// popup.style.display = "none";
						}, 2000);

					}
					content.style.display = "block";
					content.style.height = "auto";




					var entranceAnimation = window.pgAccordion.contentInAnimation;

					content.classList.add("animate__animated");
					content.classList.add("animate__fast");
					content.classList.add("animate__" + entranceAnimation);
					setTimeout(() => {
						content.classList.remove("animate__animated");
						content.classList.remove("animate__" + entranceAnimation);
						// popup.style.display = "none";
					}, 800);









				} else {
					if (iconIdle != null) {
						iconIdle.style.display = "inline-block";
					}
					if (iconToggle != null) {
						iconToggle.style.display = "none";
					}
					//content.style.display = "none";
					//content.style.height = 0;


					var entranceAnimation = window.pgAccordion.contentOutAnimation;

					content.classList.add("animate__animated");
					content.classList.add("animate__fast");
					content.classList.add("animate__" + entranceAnimation);
					setTimeout(() => {
						content.classList.remove("animate__animated");
						content.classList.remove("animate__animated");
						content.classList.remove("animate__" + entranceAnimation);
						content.style.display = "none";
					}, 800);
				}


				// if (header.classList.contains("accordion-header-active")) {
				// 	if (iconToggle != null) {
				// 		iconToggle.style.display = "inline-block";
				// 	}
				// 	if (iconIdle != null) {
				// 		iconIdle.style.display = "none";
				// 	}
				// 	content.style.display = "block";
				// 	content.style.height = "auto";
				// } else {
				// 	if (iconIdle != null) {
				// 		iconIdle.style.display = "inline-block";
				// 	}
				// 	if (iconToggle != null) {
				// 		iconToggle.style.display = "none";
				// 	}
				// 	content.style.display = "none";
				// 	content.style.height = 0;
				// }







			});
		},



		switchNext: () => {
			var activeIndex = window.pgAccordion.activeIndex;
			var max = window.pgAccordion.headerList.length - 1;
			var nextIndex = (activeIndex + 1 > max) ? 0 : (activeIndex + 1);
			window.pgAccordion.switch(nextIndex);
		},
		switchPrev: () => {
			var activeIndex = window.pgAccordion.activeIndex;
			var max = window.pgAccordion.headerList.length - 1;
			var nextIndex = (activeIndex - 1 < 0) ? max : (activeIndex - 1);
			window.pgAccordion.switch(nextIndex);
		},
		autoPlayRun: (args) => {
			var autoPlayOrder = (args.autoPlayOrder);
			var autoPlayDelay = parseInt(args.autoPlayDelay);

			var accordionHeaders = document.querySelectorAll("#" + window.pgAccordion.id + " .accordion-header");

			// var items = [];



			// accordionHeaders.forEach((header, i) => {

			// 	items.push(i)
			// });

			//console.log(items);

			let currentIndex = 0;


			const items = [1, 2, 3, 4, 5, 6, 7];
			//let currentIndex = 0;

			function loopThroughItems() {
				console.log(items[currentIndex]); // Print the current item
				currentIndex = (currentIndex + 1) % items.length; // Move to the next index (looping back to 0 after reaching the end)
				setTimeout(loopThroughItems, 1000); // Recursively call after 1 second
			}








			// function loopThroughItems() {
			// 	console.log(items[currentIndex]); // Print the current item


			// 	currentIndex = (currentIndex + 1) % items.length; // Move to the next index

			// 	setTimeout(loopThroughItems, autoPlayDelay); // Recursively call after 1 second

			// 	window.pgAccordion.switch(currentIndex)
			// }

			currentIndex = items.length;
			function loopThroughItemsReverse() {


				currentIndex = (currentIndex - 1 + (items.length)) % items.length; // Move to the previous index, wrap around

				setTimeout(loopThroughItemsReverse, autoPlayDelay); // Recursively call after 1 second

				window.pgAccordion.switch(currentIndex)
			}


			function loopThroughItemsRandom() {
				const currentIndex = Math.floor(Math.random() * items.length);

				//currentIndex = (currentIndex + 1) % items.length; // Move to the next index
				setTimeout(loopThroughItemsRandom, autoPlayDelay); // Recursively call after 1 second

				window.pgAccordion.switch(currentIndex)
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
				window.pgAccordion.unhideAll()

				return;

			}

			var accordionHeaders = document.querySelectorAll("#" + window.pgAccordion.id + " .accordion-header");
			accordionHeaders.forEach((header, i) => {
				var loopIndex = header.getAttribute("index");

				//window.pgAccordion.activeIndex = index
				var content = header.nextElementSibling;

				var headerLabel = header.querySelector(".accordion-header-label");

				var labelText = headerLabel.innerText.toLowerCase();;
				var contentText = content.innerText.toLowerCase();;

				var searchContent = labelText + " " + contentText
				var position = searchContent.indexOf(keyword);



				if (position < 0) {
					//window.pgAccordion.inactiveByIndex(loopIndex)
					window.pgAccordion.hideByIndex(loopIndex)

				} else {
					window.pgAccordion.unhideByIndex(loopIndex)
					//window.pgAccordion.activeByIndex(loopIndex)

				}

			});


		},



		expandCollapseAll: () => {
			var expandCollapseAllHndle = document.querySelector("#" + window.pgAccordion.id + " " + window.pgAccordion.expandCollapseAllHndle);

			var toggled = expandCollapseAllHndle.getAttribute("data-toggled");


			var headerCount = window.pgAccordion.headerList.length
			var expandCollapseAllDelay = parseInt(window.pgAccordion.expandCollapseAllDelay)


			var expandalltext = expandCollapseAllHndle.getAttribute("data-expandalltext");
			var collapsealltext = expandCollapseAllHndle.getAttribute("data-collapsealltext");
			var expandalliconhtml = expandCollapseAllHndle.getAttribute("data-expandalliconhtml");
			var collapsealliconhtml = expandCollapseAllHndle.getAttribute("data-collapsealliconhtml");

			if (!toggled) {
				expandCollapseAllHndle.setAttribute("data-toggled", true);
				var innerHtml = `${collapsealliconhtml}<span>${collapsealltext}</span>`;

				console.log(expandCollapseAllDelay);


				for (var i = 0; i < headerCount; i++) {
					// setTimeout((i) => {
					// 	console.log(i);


					// }, 2000)


					(function (index) {
						setTimeout(function () {
							window.pgAccordion.activeByIndex(index)
						}, expandCollapseAllDelay * index);
					})(i);







				}

			} else {

				for (var i = 0; i < headerCount; i++) {

					// setTimeout(() => {
					// 	window.pgAccordion.inactiveByIndex(i)
					// }, expandCollapseAllDelay)


					(function (index) {
						setTimeout(function () {
							window.pgAccordion.inactiveByIndex(index)
						}, expandCollapseAllDelay * index);
					})(i);




				}
				expandCollapseAllHndle.removeAttribute("data-toggled");
				var innerHtml = `${expandalliconhtml}<span>${expandalltext}</span>`;

			}

			expandCollapseAllHndle.innerHTML = innerHtml




		},
		init: ({ selector = "[data-pgaccordion]" }) => {
			if (selector.length == 0) return;
			var accordionWrap = document.querySelectorAll(selector);
			accordionWrap.forEach((accordion) => {
				var accordionData = accordion.getAttribute("data-pgaccordion");
				var accordionDataObj = JSON.parse(accordionData);
				var activeIndex = accordionDataObj.activeIndex;
				var iconInAnimation = accordionDataObj.iconInAnimation;
				var iconOutAnimation = accordionDataObj.iconOutAnimation;
				var contentInAnimation = accordionDataObj.contentInAnimation;
				var contentOutAnimation = accordionDataObj.contentOutAnimation;
				var lazyLoad = accordionDataObj.lazyLoad;
				var autoPlay = accordionDataObj.autoPlay;
				var autoPlayTimeout = parseInt(accordionDataObj.autoPlayTimeout);
				var autoPlayDelay = accordionDataObj.autoPlayDelay;
				var autoPlayOrder = accordionDataObj.autoPlayOrder;
				var expandCollapseAllDelay = accordionDataObj.expandCollapseAllDelay;

				if (lazyLoad) {
					accordion.style.display = "block";
				}
				if (autoPlay) {

					setTimeout(() => {

						window.pgAccordion.autoPlayRun({ autoPlayDelay, autoPlayOrder });

					}, autoPlayTimeout)

				}


				var accordionWrapId = accordionDataObj.id;
				window.pgAccordion.id = accordionWrapId;



				window.pgAccordion.activeIndex = activeIndex;
				window.pgAccordion.iconInAnimation = iconInAnimation;
				window.pgAccordion.iconOutAnimation = iconOutAnimation;
				window.pgAccordion.contentInAnimation = contentInAnimation;
				window.pgAccordion.contentOutAnimation = contentOutAnimation;
				window.pgAccordion.lazyLoad = lazyLoad;
				window.pgAccordion.autoPlay = autoPlay;
				window.pgAccordion.expandCollapseAllDelay = expandCollapseAllDelay;




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
				window.pgAccordion.headerList = headerList;
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
							accordionHeader.classList.toggle("accordion-header-active");
							content.style.height = "auto";
							if (accordionHeader.classList.contains("accordion-header-active")) {
								if (iconToggle != null) {
									iconToggle.style.display = "inline-block";

									//var entranceAnimation =										popupWrap.getAttribute("data-entrance-animation");
									var entranceAnimation = window.pgAccordion.iconInAnimation;

									iconToggle.classList.add("animate__animated");
									iconToggle.classList.add("animate__" + entranceAnimation);
									setTimeout(() => {
										iconToggle.classList.remove("animate__animated");
										iconToggle.classList.remove("animate__" + entranceAnimation);
										// popup.style.display = "none";
									}, 2000);
								}
								if (iconIdle != null) {
									iconIdle.style.display = "none";

									var entranceAnimation = window.pgAccordion.iconOutAnimation;

									iconIdle.classList.add("animate__animated");
									iconIdle.classList.add("animate__" + entranceAnimation);
									setTimeout(() => {
										iconIdle.classList.remove("animate__animated");
										iconIdle.classList.remove("animate__" + entranceAnimation);
										// popup.style.display = "none";
									}, 2000);

								}
								content.style.display = "block";
								content.style.height = "auto";




								var entranceAnimation = window.pgAccordion.contentInAnimation;

								content.classList.add("animate__animated");
								content.classList.add("animate__fast");
								content.classList.add("animate__" + entranceAnimation);
								setTimeout(() => {
									content.classList.remove("animate__animated");
									content.classList.remove("animate__" + entranceAnimation);
									// popup.style.display = "none";
								}, 800);









							} else {
								if (iconIdle != null) {
									iconIdle.style.display = "inline-block";
								}
								if (iconToggle != null) {
									iconToggle.style.display = "none";
								}
								//content.style.display = "none";
								//content.style.height = 0;


								var entranceAnimation = window.pgAccordion.contentOutAnimation;

								content.classList.add("animate__animated");
								content.classList.add("animate__fast");
								content.classList.add("animate__" + entranceAnimation);
								setTimeout(() => {
									content.classList.remove("animate__animated");
									content.classList.remove("animate__animated");
									content.classList.remove("animate__" + entranceAnimation);
									content.style.display = "none";
								}, 800);
							}







						});
					});
				}
			})




			var expandCollapseAllHndle = document.querySelector("#" + window.pgAccordion.id + " " + window.pgAccordion.expandCollapseAllHndle);
			if (expandCollapseAllHndle != null) {
				expandCollapseAllHndle.addEventListener("click", function (event) {

					window.pgAccordion.expandCollapseAll()
				})
			}


			var searchHndle = document.querySelector("#" + window.pgAccordion.id + " .search-input");

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
					window.pgAccordion.search(value)
				}

				searchHndle.addEventListener('keyup', debounce(handleKeyup, 500));

			}

			// var nextWrap = document.querySelector("#" + window.pgAccordion.id + " .next ");
			// var prevWrap = document.querySelector("#" + window.pgAccordion.id + " .prev ");
			// var pageNumbers = document.querySelectorAll("#" + window.pgAccordion.id + " .page-numbers ");
			// nextWrap.addEventListener("click", function (event) {
			// 	window.pgAccordion.switchNext()
			// })
			// prevWrap.addEventListener("click", function (event) {
			// 	window.pgAccordion.switchPrev()
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
			// 			window.pgAccordion.switch(index)
			// 		}
			// 	})
			// })
		}
	}
	window.pgAccordion.init({ selector: "[data-pgaccordion]" });
	window.pgAccordion.listenUrlHash();
});
