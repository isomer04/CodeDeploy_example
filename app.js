(() => {
  const qs = new URLSearchParams(location.search);
  const statusEl = document.getElementById("deploy-status");
  const eventsEl = document.getElementById("events");
  const testBtn = document.getElementById("test-trigger");

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  // Allow quick simulation via query string: ?deploy=on or ?deploy=off
  const deployParam = qs.get("deploy");
  if (deployParam === "on") setStatus("Enabled");
  else if (deployParam === "off") setStatus("Disabled");
  else setStatus("Unknown — add ?deploy=on to simulate");

  // Load previous simulated events from localStorage
  try {
    const stored = JSON.parse(localStorage.getItem("deployEvents") || "[]");
    stored.forEach((ev) => addEvent(ev));
  } catch (e) {}

  function addEvent(text) {
    if (!eventsEl) return;
    const li = document.createElement("li");
    li.textContent = text;
    eventsEl.prepend(li);
  }

  if (testBtn) {
    testBtn.addEventListener("click", () => {
      const ts = new Date().toLocaleString();
      const msg = `Simulated deploy trigger at ${ts}`;
      addEvent(msg);
      try {
        const arr = JSON.parse(localStorage.getItem("deployEvents") || "[]");
        arr.unshift(msg);
        localStorage.setItem("deployEvents", JSON.stringify(arr.slice(0, 20)));
      } catch (e) {}
      setStatus("Triggered (simulated)");
    });
  }
})();
