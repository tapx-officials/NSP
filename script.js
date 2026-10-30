
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  const modal = $("#shareModal");
  const toast = $("#toast");
  const toastMessage = $("#toastMessage");

  let toastTimer;
  let lastFocusedElement = null;

  $("#currentYear").textContent = new Date().getFullYear();

  const getProfileUrl = () => window.location.href.split("#")[0];

  function showToast(message) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }

  async function copyText(value, successMessage = "Copied successfully") {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        field.style.pointerEvents = "none";

        document.body.appendChild(field);
        field.select();

        const copied = document.execCommand("copy");
        field.remove();

        if (!copied) throw new Error("Copy failed");
      }

      showToast(successMessage);
    } catch {
      showToast("Unable to copy. Please copy the link manually.");
    }
  }

  // Share dialog
  function openShareModal() {
    if (!modal) return;

    lastFocusedElement = document.activeElement;

    const urlField = $("#profileUrl");
    if (urlField) urlField.textContent = getProfileUrl();

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("#closeModal")?.focus();
  }

  function closeShareModal() {
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  $("#shareTop")?.addEventListener("click", openShareModal);
  $("#closeModal")?.addEventListener("click", closeShareModal);

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeShareModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("open")) {
      closeShareModal();
    }
  });

  $("#copyProfileLink")?.addEventListener("click", () => {
    copyText(getProfileUrl(), "Profile link copied");
  });

  $("#copyModalLink")?.addEventListener("click", () => {
    copyText(getProfileUrl(), "Profile link copied");
  });

  $("#nativeShare")?.addEventListener("click", async () => {
    const url = getProfileUrl();

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "View this professional profile",
          url
        });
        closeShareModal();
      } catch (error) {
        if (error.name !== "AbortError") {
          showToast("Unable to open sharing options.");
        }
      }
    } else {
      await copyText(url, "Link copied — ready to share");
    }
  });

   // Fixed bottom navigation
  const navItems = $$(".nav-item[data-nav]");
  const sections = navItems
    .map((item) => document.getElementById(item.dataset.nav))
    .filter(Boolean);

  let manualNavigation = false;
  let navigationTimer;

  function setActiveNav(sectionId) {
    navItems.forEach((item) => {
      const active = item.dataset.nav === sectionId;

      item.classList.toggle("active", active);

      if (active) {
        item.setAttribute("aria-current", "location");
      } else {
        item.removeAttribute("aria-current");
      }
    });
  }

  function getCurrentSection() {
    const marker = window.innerHeight * 0.30;
    let current = sections[0];

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= marker) {
        current = section;
      }
    });

    return current;
  }

  navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const target = document.getElementById(item.dataset.nav);
      if (!target) return;

      event.preventDefault();

      manualNavigation = true;
      clearTimeout(navigationTimer);

      setActiveNav(target.id);

      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start"
      });

      if (window.history?.replaceState) {
        window.history.replaceState(null, "", `#${target.id}`);
      }

      navigationTimer = setTimeout(() => {
        manualNavigation = false;
        setActiveNav(target.id);
      }, 900);
    });
  });

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      () => {
        if (manualNavigation) return;

        const current = getCurrentSection();
        if (current) setActiveNav(current.id);
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6]
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  const initialSection = window.location.hash.slice(1);

  if (sections.some((section) => section.id === initialSection)) {
    setActiveNav(initialSection);
  } else {
    setActiveNav("home");
  }

  // Optional copy controls
  $$("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-copy");
      if (value) copyText(value);
    });
  });
});
