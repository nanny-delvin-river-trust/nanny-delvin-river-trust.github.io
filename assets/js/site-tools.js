(() => {
  "use strict";

  const script =
    document.currentScript ||
    [...document.scripts].find((item) =>
      item.src.includes("site-tools.js")
    );

  if (!script) return;

  const scriptUrl = new URL(script.src, document.baseURI);
  const siteRoot = new URL("../../", scriptUrl);
  const asset = (path) => new URL(path, siteRoot).href;

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  const isIOS =
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  let deferredPrompt = null;

  function pageDescription() {
    const meta = document.querySelector('meta[name="description"]');
    return meta?.content?.trim() || "Nanny-Delvin Rivers Trust";
  }

  function showToast(message) {
    let toast = document.querySelector(".site-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.className = "site-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 3000);
  }

  function icon(type) {
    if (type === "share") {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 8a3 3 0 1 0-2.83-4 3 3 0 0 0 .08 1.02L8.91 8.2a3 3 0 0 0-4.66 2.5 3 3 0 0 0 4.66 2.5l6.34 3.18A3 3 0 1 0 16.1 14.6l-6.34-3.17a3.1 3.1 0 0 0 0-.86l6.34-3.17A3 3 0 0 0 18 8Z"/>
        </svg>`;
    }

    if (type === "install") {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42l2.3 2.3V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z"/>
        </svg>`;
    }

    return `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"/>
      </svg>`;
  }

  function showIOSInstructions() {
    let dialog = document.querySelector("#ios-install-dialog");

    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.id = "ios-install-dialog";
      dialog.className = "site-dialog";
      dialog.innerHTML = `
        <div class="site-dialog-inner">
          <button
            class="site-dialog-close"
            type="button"
            aria-label="Close"
          >×</button>

          <img
            class="site-dialog-logo"
            src="${asset("assets/icons/icon-192.png")}"
            alt=""
            width="72"
            height="72"
          />

          <h2>Add Nanny-Delvin to your phone</h2>

          <p>
            In Safari, tap the Share button and choose
            <strong>Add to Home Screen</strong>.
          </p>

          <button class="button site-dialog-done" type="button">
            Done
          </button>
        </div>
      `;

      const close = () => {
        if (typeof dialog.close === "function") {
          dialog.close();
        } else {
          dialog.removeAttribute("open");
        }
      };

      dialog
        .querySelector(".site-dialog-close")
        .addEventListener("click", close);

      dialog
        .querySelector(".site-dialog-done")
        .addEventListener("click", close);

      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) close();
      });

      document.body.appendChild(dialog);
    }

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  async function sharePage() {
    const data = {
      title: document.title,
      text: pageDescription(),
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(data.url);
        showToast("Page link copied.");
        return;
      }

      window.prompt("Copy this page link:", data.url);
    } catch (error) {
      if (error?.name !== "AbortError") {
        showToast("Sharing was not completed.");
      }
    }
  }

  async function installSite() {
    if (isStandalone) {
      showToast("The site is already installed.");
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      return;
    }

    if (isIOS) {
      showIOSInstructions();
      return;
    }

    showToast(
      "Use the browser menu and choose Install app or Add to Home Screen."
    );
  }

  function replaceLogoMarks() {
    document.querySelectorAll(".logo-mark").forEach((mark) => {
      if (mark.querySelector("img")) return;

      mark.classList.add("logo-mark-image");
      mark.textContent = "";

      const image = document.createElement("img");
      image.className = "logo-avatar";
      image.src = asset("assets/icons/icon-192.png");
      image.alt = "";
      image.width = 42;
      image.height = 42;

      mark.appendChild(image);
    });
  }

  function makeButton(type, label, handler) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `site-tool-button site-${type}-button`;
    button.title = label;
    button.setAttribute("aria-label", label);
    button.innerHTML = icon(type);
    button.addEventListener("click", handler);
    return button;
  }

  function directChildWithClass(parent, className) {
    return [...parent.children].find(
      (child) => child.classList?.contains(className)
    );
  }

  function addNavigationTools() {
    const navigations = document.querySelectorAll(".nav-links, .page-nav");

    navigations.forEach((navigation, index) => {
      const row =
        navigation.closest(".nav-shell, .nav-wrap") ||
        navigation.parentElement;

      if (!row || directChildWithClass(row, "site-tools")) return;

      if (!navigation.id) {
        navigation.id = `site-navigation-${index + 1}`;
      }

      const tools = document.createElement("span");
      tools.className = "site-tools";

      const share = makeButton(
        "share",
        "Share this page",
        sharePage
      );

      const install = makeButton(
        "install",
        "Install this website",
        installSite
      );
      install.setAttribute("data-install-site", "");

      const menu = makeButton(
        "menu",
        "Open navigation",
        () => {
          const open = navigation.classList.toggle("is-open");
          menu.setAttribute("aria-expanded", String(open));
          menu.setAttribute(
            "aria-label",
            open ? "Close navigation" : "Open navigation"
          );
        }
      );
      menu.setAttribute("aria-controls", navigation.id);
      menu.setAttribute("aria-expanded", "false");

      tools.append(share, install, menu);
      row.appendChild(tools);

      navigation.addEventListener("click", (event) => {
        if (!event.target.closest("a")) return;
        navigation.classList.remove("is-open");
        menu.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-label", "Open navigation");
      });

      document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        navigation.classList.remove("is-open");
        menu.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  function registerServiceWorker() {
    const allowed =
      window.location.protocol === "https:" ||
      ["localhost", "127.0.0.1"].includes(window.location.hostname);

    if (!allowed || !("serviceWorker" in navigator)) return;

    const workerUrl = new URL("sw.js", siteRoot);

    navigator.serviceWorker
      .register(workerUrl, { scope: siteRoot.pathname })
      .catch((error) => {
        console.warn("Service worker registration failed:", error);
      });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    showToast("Nanny-Delvin was added to this device.");
  });

  document.addEventListener("DOMContentLoaded", () => {
    replaceLogoMarks();
    addNavigationTools();
    registerServiceWorker();
  });
})();
