export const scrollToHotelList = (offset = 150, behavior = "smooth") => {
  requestAnimationFrame(() => {
    const element = document.getElementById("hotel-list-section");

    if (!element) return;

    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: y,
      behavior,
    });
  });
};
