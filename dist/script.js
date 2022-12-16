const sections = [...document.querySelectorAll(".item")];

let options = {
  rootMargin: "-49.9% 0% -49.9% 0%",
  threshold: 0,
};

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    const { target } = entry;
    // console.log(entry.intersectionRatio, target);
    if (entry.intersectionRatio > 0) {
      target.classList.add("active");
    } else {
      target.classList.remove("active");
    }
  });
};

setTimeout(() => {
  sections.forEach((section, index) => {
    observer.observe(section);
  });
}, 200);
const observer = new IntersectionObserver(callback, options);

function getActiveIndex(targetElement) {
  let activeIndex = 0;
  const siblings = targetElement.parentNode.children;
  for (let i = 0; i < siblings.length; i++) {
    if (siblings[i] === targetElement) {
      activeIndex = i;
      break;
    }
  }
  return activeIndex;
}
function setActiveProject(activeIndex) {
  const images = document.querySelector(".image");
  Array.from(images.children).forEach((item, index) => {
    activeIndex !== index
      ? (item.style.opacity = "0%")
      : (item.style.opacity = "100%");
  });
}

function onClassChange(element, callback) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        callback(mutation.target);
      }
    });
  });
  observer.observe(element, { attributes: true });
  return observer.disconnect;
}

sections.forEach((section) => {
  onClassChange(section, (node) => {
    if (node.classList.contains("active")) {
      let activeIndex = getActiveIndex(section);
      setActiveProject(activeIndex);
    }
  });
});
