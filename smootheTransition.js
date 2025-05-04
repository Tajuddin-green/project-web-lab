function smoothTransition(section) {
    document.querySelector(`#${section}-section`).scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
    });
}
