import Builder from './components/Builder'




document.addEventListener("DOMContentLoaded", DOMContentLoadedImport);

function DOMContentLoadedImport() {

    var appData = {
        name: "Accordions",
        version: "1.0.0",
        demoUrl: "https://pickplugins.com/demo/accordions/",
        reviewsUrl: "https://wordpress.org/support/plugin/accordions/reviews/#new-post/"
    }


    setTimeout(() => {

        var builderWrap = document.querySelector('#builder');
        if (builderWrap != null) {
            wp.element.render(<Builder appData={appData} />, builderWrap)
        }

    }, 500)



}




















