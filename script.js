const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (details) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale},${yscale})`;
  });
}

function firstPageAnimation() {
  let tl = gsap.timeline();
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      duration: 2,
      delay: -1,
      ease: Expo.easeInOut,
      stagger: 0.2,
    })

    .from("#herofooter", {
      y: -10,
      ease: Expo.easeInOut,
      delay: -1,
      duration: 2,
      opacity: 0,
    });
}

let timeout;

function circleShapeChange() {
  let xscale = 1;
  let yscale = 1;

  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", function (details) {
    clearTimeout(timeout);
    let xdiff = details.clientX - xprev;
    let ydiff = details.clientY - yprev;

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

    xprev = details.clientX;
    yprev = details.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1,1)`;
    }, 100);
  });
}

document.querySelectorAll(".elem").forEach(function (elem) {
  let rotate = 0;
  let diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    let diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});

circleShapeChange();
circleMouseFollower();
firstPageAnimation();

const date1 = new Date();

const setTime = new Date(date1).toLocaleString(undefined, {
  timeZone: "Asia/Kolkata",
});

const Time = document.createElement("h5");

Time.textContent = setTime;
document.querySelector("#time").append(Time);
