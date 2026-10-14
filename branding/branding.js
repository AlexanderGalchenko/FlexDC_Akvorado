/* ISP Support presentation layer. Upstream Akvorado version and credits remain intact. */
(() => {
  "use strict";
  const name = "ISP-BGP Monitoring";
  const original = "Akvorado";
  let navigation;
  let navigationObserver;

  const style = document.createElement("style");
  style.textContent = "nav .isp-bgp-brand-title { font-size: clamp(.875rem, 3.7vw, 1.25rem); white-space: nowrap; }";
  document.head.append(style);

  function updateTitle() {
    if (/^Akvorado(?:\s*\||$)/.test(document.title)) {
      document.title = name + document.title.slice(original.length);
    }
  }

  function updateNavigation() {
    const link = navigation?.querySelector('a[href="/"]');
    if (!link) return;
    const walker = document.createTreeWalker(link, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const text = walker.currentNode;
      if (text.nodeValue.trim() === original) {
        text.nodeValue = text.nodeValue.replace(original, name);
        text.parentElement.classList.add("isp-bgp-brand-title");
        link.setAttribute("aria-label", name);
      }
    }
    const logo = link.querySelector('img[alt="Akvorado Logo"]');
    if (logo) logo.alt = name;
  }

  function attachNavigation() {
    // Charts update frequently: only revisit the navigation if Vue replaces it.
    if (navigation?.isConnected) return;
    navigationObserver?.disconnect();
    navigation = document.querySelector("nav");
    if (!navigation) return;
    updateNavigation();
    navigationObserver = new MutationObserver(updateNavigation);
    navigationObserver.observe(navigation, { childList: true, characterData: true, subtree: true });
  }

  updateTitle();
  new MutationObserver(updateTitle).observe(document.head, {
    childList: true, characterData: true, subtree: true,
  });
  attachNavigation();
  new MutationObserver(attachNavigation).observe(document.body, { childList: true, subtree: true });
})();
