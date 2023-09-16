export function observeIntersections(elements, options, callback, elementInitializationCallback) {

    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            callback(entry);
        });
    }, options);

    for (var i = 0; i < elements.length; ++i) {
        let element = elements[i];
        observer.observe(element);

        if (elementInitializationCallback) {
            elementInitializationCallback(element);
        }
    }
}