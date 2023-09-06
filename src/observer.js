export function Observe(elements, options, callback, elementCallback) {

    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            callback(entry);
        });
    }, options);

    elements.forEach((element) => {
        elementCallback(element);
        observer.observe(element);
    })
}