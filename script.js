/* =========================================================
   AAMIR MOHTASHIM
   LUXURY NFC DIGITAL IDENTITY
   PREMIUM INTERACTION ENGINE
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const PROFILE = {

  name:
    "Aamir Mohtashim",

  profession:
    "Waterproofing Engineer",

  phone:
    "+919910106056",

  email:
    "nirman.speciality@gmail.com",

  businessProfile:
    "https://share.google/R18zvgH84cBKSYKSt",

  whatsapp:
    "https://wa.me/919910106056"

};


/* =========================================================
   DOM ELEMENTS
========================================================= */

const loader =
  document.getElementById("loader");

const toast =
  document.getElementById("toast");

const toastMessage =
  document.getElementById("toastMessage");

const bubbles =
  document.getElementById("bubbles");

const shareModal =
  document.getElementById("shareModal");

const shareBackdrop =
  document.getElementById("shareBackdrop");

const shareClose =
  document.getElementById("shareClose");

const copyProfileLink =
  document.getElementById("copyProfileLink");

const nativeShare =
  document.getElementById("nativeShare");

const openQR =
  document.getElementById("openQR");

const qrModal =
  document.getElementById("qrModal");

const qrBackdrop =
  document.getElementById("qrBackdrop");

const qrClose =
  document.getElementById("qrClose");

const profileQR =
  document.getElementById("profileQR");

const downloadQR =
  document.getElementById("downloadQR");


/* =========================================================
   UTILITY
========================================================= */

function isTouchDevice() {

  return (
    window.matchMedia("(hover: none)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );

}


/* =========================================================
   FLOATING BUBBLES
========================================================= */

function createBubbles() {

  if (!bubbles) return;

  const amount =
    window.innerWidth < 600
      ? 14
      : 22;

  const fragment =
    document.createDocumentFragment();

  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const bubble =
      document.createElement("span");

    bubble.className =
      "bubble";

    const size =
      Math.floor(
        Math.random() * 48
      ) + 10;

    const left =
      Math.random() * 100;

    const duration =
      Math.floor(
        Math.random() * 12
      ) + 10;

    const delay =
      Math.random() * 12;

    bubble.style.width =
      `${size}px`;

    bubble.style.height =
      `${size}px`;

    bubble.style.left =
      `${left}%`;

    bubble.style.animationDuration =
      `${duration}s`;

    bubble.style.animationDelay =
      `-${delay}s`;

    fragment.appendChild(
      bubble
    );

  }

  bubbles.appendChild(
    fragment
  );

}

createBubbles();


/* =========================================================
   LOADER
========================================================= */

window.addEventListener(
  "load",
  () => {

    setTimeout(
      () => {

        loader?.classList.add(
          "hide"
        );

      },
      850
    );

  }
);


/* =========================================================
   REVEAL OBSERVER
========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if (
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


  revealElements.forEach(
    element => {

      revealObserver.observe(
        element
      );

    }
  );

} else {

  revealElements.forEach(
    element => {

      element.classList.add(
        "visible"
      );

    }
  );

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


function showToast(
  message
) {

  if (
    !toast ||
    !toastMessage
  ) return;

  toastMessage.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2400
    );

}


/* =========================================================
   CLIPBOARD FALLBACK
========================================================= */

async function copyToClipboard(
  text
) {

  if (
    navigator.clipboard &&
    window.isSecureContext
  ) {

    await navigator.clipboard.writeText(
      text
    );

    return true;

  }


  try {

    const textarea =
      document.createElement(
        "textarea"
      );

    textarea.value =
      text;

    textarea.setAttribute(
      "readonly",
      ""
    );

    textarea.style.position =
      "fixed";

    textarea.style.opacity =
      "0";

    textarea.style.pointerEvents =
      "none";

    document.body.appendChild(
      textarea
    );

    textarea.select();

    textarea.setSelectionRange(
      0,
      textarea.value.length
    );

    const successful =
      document.execCommand(
        "copy"
      );

    textarea.remove();

    return successful;

  } catch {

    return false;

  }

}


/* =========================================================
   SHARE SHEET
========================================================= */

function openShareSheet() {

  if (!shareModal) return;

  shareModal.classList.add(
    "active"
  );

  document.body.classList.add(
    "share-open"
  );

}


function closeShareSheet() {

  if (!shareModal) return;

  shareModal.classList.remove(
    "active"
  );

  if (
    !qrModal?.classList.contains(
      "active"
    )
  ) {

    document.body.classList.remove(
      "share-open"
    );

  }

}


/* =========================================================
   CLOSE QR
========================================================= */

function closeQR() {

  qrModal?.classList.remove(
    "active"
  );

  if (
    !shareModal?.classList.contains(
      "active"
    )
  ) {

    document.body.classList.remove(
      "share-open"
    );

  }

}


/* =========================================================
   PROFILE SHARE BUTTONS
========================================================= */

[
  "shareTop",
  "shareBottom",
  "mobileShare"
]
.forEach(
  id => {

    const button =
      document.getElementById(
        id
      );

    button?.addEventListener(
      "click",
      event => {

        event.preventDefault();

        openShareSheet();

      }
    );

  }
);


/* =========================================================
   SHARE CLOSE EVENTS
========================================================= */

shareClose?.addEventListener(
  "click",
  closeShareSheet
);


shareBackdrop?.addEventListener(
  "click",
  closeShareSheet
);


/* =========================================================
   COPY PROFILE LINK
========================================================= */

copyProfileLink?.addEventListener(
  "click",
  async event => {

    event.preventDefault();

    const copied =
      await copyToClipboard(
        window.location.href
      );

    if (copied) {

      closeShareSheet();

      showToast(
        "Profile link copied"
      );

    } else {

      showToast(
        "Unable to copy link"
      );

    }

  }
);


/* =========================================================
   NATIVE SHARE
========================================================= */

nativeShare?.addEventListener(
  "click",
  async event => {

    event.preventDefault();


    const shareData = {

      title:
        `${PROFILE.name} | ${PROFILE.profession}`,

      text:
        `Connect with ${PROFILE.name} — ${PROFILE.profession}.`,

      url:
        window.location.href

    };


    if (
      typeof navigator.share !==
      "function"
    ) {

      const copied =
        await copyToClipboard(
          window.location.href
        );

      if (copied) {

        closeShareSheet();

        showToast(
          "Profile link copied"
        );

      } else {

        showToast(
          "Sharing is not supported"
        );

      }

      return;

    }


    try {

      await navigator.share(
        shareData
      );

    } catch (error) {

      if (
        error?.name ===
        "AbortError"
      ) {

        return;

      }

      showToast(
        "Unable to open share menu"
      );

    }

  }
);


/* =========================================================
   GENERATE QR
========================================================= */

function generateProfileQR() {

  if (!profileQR) return null;

  const profileURL =
    window.location.href;

  const qrURL =
    `https://api.qrserver.com/v1/create-qr-code/?size=900x900&margin=20&data=${encodeURIComponent(profileURL)}`;

  profileQR.src =
    qrURL;

  profileQR.alt =
    `${PROFILE.name} profile QR code`;

  return qrURL;

}


/* =========================================================
   OPEN QR MODAL
========================================================= */

openQR?.addEventListener(
  "click",
  event => {

    event.preventDefault();

    if (!qrModal) return;

    generateProfileQR();

    closeShareSheet();

    setTimeout(
      () => {

        qrModal.classList.add(
          "active"
        );

        document.body.classList.add(
          "share-open"
        );

      },
      180
    );

  }
);


/* =========================================================
   QR CLOSE EVENTS
========================================================= */

qrClose?.addEventListener(
  "click",
  closeQR
);


qrBackdrop?.addEventListener(
  "click",
  closeQR
);


/* =========================================================
   QR IMAGE LOAD ERROR
========================================================= */

profileQR?.addEventListener(
  "error",
  () => {

    showToast(
      "Unable to generate QR code"
    );

  }
);


/* =========================================================
   DOWNLOAD QR
========================================================= */

downloadQR?.addEventListener(
  "click",
  async event => {

    event.preventDefault();

    if (
      !profileQR ||
      !profileQR.src
    ) {

      showToast(
        "QR code is not ready"
      );

      return;

    }


    try {

      const response =
        await fetch(
          profileQR.src,
          {
            mode: "cors"
          }
        );


      if (
        !response.ok
      ) {

        throw new Error(
          "QR request failed"
        );

      }


      const blob =
        await response.blob();


      const blobURL =
        URL.createObjectURL(
          blob
        );


      const link =
        document.createElement(
          "a"
        );

      link.href =
        blobURL;

      link.download =
        "Aamir-Mohtashim-QR-Code.png";

      link.style.display =
        "none";

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();


      setTimeout(
        () => {

          URL.revokeObjectURL(
            blobURL
          );

        },
        1000
      );


      showToast(
        "QR code saved"
      );


    } catch {

      /*
       * Some browsers block downloading
       * third-party images through fetch.
       * Open the QR image instead.
       */

      window.open(
        profileQR.src,
        "_blank",
        "noopener,noreferrer"
      );

      showToast(
        "Opening QR image"
      );

    }

  }
);


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key !==
      "Escape"
    ) return;

    closeShareSheet();

    closeQR();

  }
);


/* =========================================================
   BACKDROP / MODAL CLICK PROTECTION
========================================================= */

shareModal?.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      shareModal
    ) {

      closeShareSheet();

    }

  }
);


qrModal?.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      qrModal
    ) {

      closeQR();

    }

  }
);


/* =========================================================
   SMART TOUCH DEVICE
========================================================= */

if (
  isTouchDevice()
) {

  document.body.classList.add(
    "touch-device"
  );

}


/* =========================================================
   PREMIUM MAGNETIC BUTTONS
========================================================= */

const magneticButtons =
  document.querySelectorAll(
    ".btn-primary, .btn-secondary, .business-button, .final-button, .creator-btn"
  );


if (
  !isTouchDevice()
) {

  magneticButtons.forEach(
    button => {

      button.addEventListener(
        "pointermove",
        event => {

          if (
            window.innerWidth < 700
          ) return;


          const rect =
            button.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          const moveX =
            (
              x -
              rect.width / 2
            ) * 0.035;


          const moveY =
            (
              y -
              rect.height / 2
            ) * 0.035;


          button.style.setProperty(
            "--mag-x",
            `${moveX}px`
          );

          button.style.setProperty(
            "--mag-y",
            `${moveY}px`
          );


          button.classList.add(
            "magnetic-active"
          );

        }
      );


      button.addEventListener(
        "pointerleave",
        () => {

          button.style.removeProperty(
            "--mag-x"
          );

          button.style.removeProperty(
            "--mag-y"
          );

          button.classList.remove(
            "magnetic-active"
          );

        }
      );

    }
  );

}


/* =========================================================
   CONTACT / EXPERTISE TILT
========================================================= */

if (
  !isTouchDevice()
) {

  document
    .querySelectorAll(
      ".contact-card, .expertise"
    )
    .forEach(
      card => {

        card.addEventListener(
          "pointermove",
          event => {

            if (
              window.innerWidth < 700
            ) return;


            const rect =
              card.getBoundingClientRect();


            const x =
              event.clientX -
              rect.left;


            const y =
              event.clientY -
              rect.top;


            const rotateY =
              (
                (x -
                  rect.width / 2) /
                rect.width
              ) * 2;


            const rotateX =
              (
                (y -
                  rect.height / 2) /
                rect.height
              ) * -2;


            card.style.setProperty(
              "--tilt-x",
              `${rotateX}deg`
            );

            card.style.setProperty(
              "--tilt-y",
              `${rotateY}deg`
            );

            card.classList.add(
              "tilt-active"
            );

          }
        );


        card.addEventListener(
          "pointerleave",
          () => {

            card.style.removeProperty(
              "--tilt-x"
            );

            card.style.removeProperty(
              "--tilt-y"
            );

            card.classList.remove(
              "tilt-active"
            );

          }
        );

      }
    );

}


/* =========================================================
   CREATOR BUTTON FEEDBACK
========================================================= */

document
  .querySelectorAll(
    ".creator-btn"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          button.classList.add(
            "creator-clicked"
          );

          setTimeout(
            () => {

              button.classList.remove(
                "creator-clicked"
              );

            },
            450
          );

        }
      );

    }
  );


/* =========================================================
   REDUCED MOTION
========================================================= */

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );


function applyReducedMotion() {

  if (
    reducedMotion.matches
  ) {

    document.documentElement.style
      .setProperty(
        "scroll-behavior",
        "auto"
      );

    document.body.classList.add(
      "reduced-motion"
    );

  } else {

    document.body.classList.remove(
      "reduced-motion"
    );

  }

}


applyReducedMotion();


reducedMotion.addEventListener?.(
  "change",
  applyReducedMotion
);


/* =========================================================
   VISIBILITY OPTIMIZATION
========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    document.body.classList.toggle(
      "page-hidden",
      document.hidden
    );

  }
);


/* =========================================================
   CONSOLE BRANDING
========================================================= */

console.log(
  "%cAAMIR MOHTASHIM",
  "color:#207666;font-size:18px;font-weight:800;"
);

console.log(
  "%cLuxury NFC Digital Identity",
  "color:#777;font-size:11px;"
);

console.log(
  "%cPowered by TAP X",
  "color:#ff650f;font-size:12px;font-weight:800;"
);