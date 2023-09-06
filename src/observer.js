export function observeIntersections(elements, options, callback, elementInitializationCallback) {

    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            callback(entry);
        });
    }, options);

    elements.forEach((element) => {
        observer.observe(element);
        elementInitializationCallback(element);
    })
}