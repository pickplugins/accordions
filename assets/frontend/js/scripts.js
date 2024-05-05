
document.addEventListener("DOMContentLoaded", function (event) {

    var accordions = document.querySelectorAll('[data-accordions]');




    if (accordions != null) {
        accordions.forEach(accordionsWrap => {


            var accordionsData = accordionsWrap.getAttribute('data-accordions');


            if (accordionsData == null) return;

            var accordionsDataObj = JSON.parse(accordionsData);
            var accordionsId = accordionsDataObj.id;
            var lazyLoad = accordionsDataObj.lazyLoad;
            var expandedOther = accordionsDataObj.expandedOther;
            var collapsible = accordionsDataObj.collapsible;
            var heightStyle = accordionsDataObj.heightStyle;
            var animateStyle = accordionsDataObj.animateStyle;
            var animateDelay = accordionsDataObj.animateDelay;
            var navigation = accordionsDataObj.navigation;
            var URLHash = accordionsDataObj.URLHash;

            console.log(accordionsDataObj);



            var accordionitemsWrap = document.querySelector('#accordions-' + accordionsId + ' .items');
            var lazyWrap = document.querySelector('#accordions-lazy-' + accordionsId);

            if (lazyLoad) {
                accordionitemsWrap.style.display = 'block';

                if (lazyWrap != null) {
                    lazyWrap.style.display = 'none';
                }

            }





            var accordionHandle = jQuery(accordionitemsWrap).accordion({
                event: accordionsDataObj.event,
                collapsible: collapsible,
                heightStyle: heightStyle,
                animate: parseInt(animateDelay),
                navigation: navigation,
                active: accordionsDataObj.active,
                beforeActivate: function (event, ui) {

                    if (expandedOther == 'yes') {

                        if (ui.newHeader[0]) {
                            var currHeader = ui.newHeader;
                            var currContent = currHeader.next(".ui-accordion-content");
                        } else {
                            var currHeader = ui.oldHeader;
                            var currContent = currHeader.next(".ui-accordion-content");
                        }
                        var isPanelSelected = currHeader.attr("aria-selected") == "true";
                        currHeader.toggleClass("ui-corner-all", isPanelSelected).toggleClass("accordion-header-active ui-state-active ui-corner-top", !isPanelSelected).attr("aria-selected", ((!isPanelSelected).toString()));
                        currHeader.children(".ui-icon").toggleClass("ui-icon-triangle-1-e", isPanelSelected).toggleClass("ui-icon-triangle-1-s", !isPanelSelected);
                        currContent.toggleClass("accordion-content-active", !isPanelSelected)
                        if (isPanelSelected) {
                            currContent.slideUp();
                        } else {
                            currContent.slideDown();
                        }
                        return false;
                    } else {
                        if (ui.newHeader[0] != undefined) {
                            var disabled = ui.newHeader[0].getAttribute('disabled');
                            if (disabled == 'disabled') {
                                event.preventDefault();
                            }
                        }
                    }



                },


            })



            // console.log(URLHash);
            // console.log(accordionsId);
            // console.log(accordionHandle);


            if (URLHash == 'yes') {
                var hash = window.location.hash;
                if (hash) {
                    index = jQuery("#accordions-" + accordionsId + " " + hash).attr('itemcount');
                    if (index) {
                        //index = index.replace('ui-id-','');
                        //header = jQuery("#accordions-" + accordionsId + " "+hash);
                        index = parseInt(index);
                        //jQuery("html:not(:animated), body:not(:animated)").animate({ scrollTop: header.offset().top + 800 }, "slow");
                        accordionHandle.accordion("option", "active", index);
                    }
                }

            }




        })
    }




    var accordionstabs = document.querySelectorAll('[data-accordionstabs]');




    if (accordionstabs != null) {
        accordionstabs.forEach(accordionsWrap => {

            var accordionsData = accordionsWrap.getAttribute('data-accordionstabs');


            if (accordionsData == null) return;

            var accordionsDataObj = JSON.parse(accordionsData);
            var accordionsId = accordionsDataObj.id;
            var lazyLoad = accordionsDataObj.lazyLoad;
            var expandedOther = accordionsDataObj.expandedOther;
            var collapsible = accordionsDataObj.collapsible;
            var event = accordionsDataObj.event;
            var active = accordionsDataObj.active;

            var animateStyle = accordionsDataObj.animateStyle;
            var animateDelay = accordionsDataObj.animateDelay;
            var vertical = accordionsDataObj.vertical;

            var accordionTabsWrap = document.querySelector('#accordions-tabs-' + accordionsId);
            var lazyWrap = document.querySelector('#accordions-lazy-' + accordionsId);




            jQuery(accordionTabsWrap).tabs({
                event: accordionsDataObj.event,
                collapsible: collapsible,
                active: accordionsDataObj.active,

            })


            if (vertical) {
                jQuery("#accordions-tabs-" + accordionsId).addClass("ui-tabs-vertical ui-helper-clearfix");
                jQuery("#accordions-tabs- +accordionsIdli").removeClass("ui-corner-top").addClass("ui-corner-left");
            }


            setTimeout(() => {
                if (typeof accordions_tabs_active != 'undefined') {

                    var index = (accordions_tabs_active[accordionsId] == undefined) ? {} : accordions_tabs_active[accordionsId];



                    Object.entries(index).map(x => {

                        var tabId = x[0];
                        var tabIndex = x[1];




                        jQuery("#accordions-tabs-" + accordionsId).tabs("option", "active", tabIndex);
                    })

                }

            }, 1000)




        })
    }



















    var expandCollapse = document.querySelectorAll('.expand-collapse');



    if (expandCollapse != null) {
        expandCollapse.forEach(item => {
            var accordionsId = item.getAttribute('accordion-id');

            item.addEventListener('click', event => {

                jQuery("#accordions-" + accordionsId + " .ui-accordion-header").removeClass('ui-state-active')


                if (item.classList.contains("active")) {


                    //jQuery(this).removeClass("active");
                    item.classList.remove('active');
                    jQuery("#accordions-" + accordionsId + " .ui-accordion-header").next().slideUp();

                } else {
                    //jQuery(this).addClass("active");
                    item.classList.add('active');

                    jQuery("#accordions-" + accordionsId + " .ui-accordion-header").next().slideDown();

                }

            })





        })
    }



});


