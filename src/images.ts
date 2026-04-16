const svgDataUrl = (svg: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const poster = (opts: {
  title: string;
  subtitle: string;
  from: string;
  to: string;
  accent: string;
}) => {
  const { title, subtitle, from, to, accent } = opts;
  return svgDataUrl(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="glow" cx="55%" cy="35%" r="65%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.45"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>
  <rect width="1600" height="1000" rx="72" fill="url(#bg)"/>
  <rect width="1600" height="1000" rx="72" fill="url(#glow)"/>
  <g opacity="0.22">
    <circle cx="260" cy="240" r="180" fill="${accent}" filter="url(#soft)"/>
    <circle cx="1310" cy="770" r="260" fill="${accent}" filter="url(#soft)"/>
  </g>
  <g opacity="0.24">
    <path d="M0 740C260 640 420 860 720 780C1030 700 1210 560 1600 650V1000H0Z" fill="#ffffff"/>
  </g>
  <g font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial" fill="#0b1020">
    <text x="96" y="740" font-size="68" font-weight="800" letter-spacing="-1">${title}</text>
    <text x="96" y="810" font-size="28" font-weight="600" opacity="0.78">${subtitle}</text>
  </g>
  <g opacity="0.45">
    <rect x="96" y="110" width="520" height="10" rx="5" fill="#ffffff"/>
    <rect x="96" y="132" width="360" height="10" rx="5" fill="#ffffff" opacity="0.7"/>
  </g>
</svg>`);
};

export const IMAGES = {
  hero: poster({
    title: "慕寒AI",
    subtitle: "专注落地与赋能",
    from: "#0b1020",
    to: "#0f172a",
    accent: "#22d3ee",
  }),
  life1: poster({
    title: "旅行",
    subtitle: "把路上的光变成灵感",
    from: "#fff7ed",
    to: "#fecaca",
    accent: "#fb7185",
  }),
  life2: poster({
    title: "摄影",
    subtitle: "捕捉日常的高级感",
    from: "#f0f9ff",
    to: "#bae6fd",
    accent: "#0ea5e9",
  }),
  life3: poster({
    title: "阅读",
    subtitle: "安静地变强",
    from: "#f5f3ff",
    to: "#ddd6fe",
    accent: "#8b5cf6",
  }),
  life4: poster({
    title: "咖啡",
    subtitle: "慢下来，才会更快",
    from: "#fefce8",
    to: "#fde68a",
    accent: "#f59e0b",
  }),
  workspace: poster({
    title: "工作区",
    subtitle: "秩序感与创造力并存",
    from: "#0b1020",
    to: "#1e293b",
    accent: "#3b82f6",
  }),
  project1: poster({
    title: "作品 A",
    subtitle: "清晰、稳定、好用",
    from: "#ecfeff",
    to: "#cffafe",
    accent: "#06b6d4",
  }),
  project2: poster({
    title: "作品 B",
    subtitle: "细节决定体验",
    from: "#fdf2f8",
    to: "#ffe4e6",
    accent: "#fb7185",
  }),
  project3: poster({
    title: "作品 C",
    subtitle: "从 0 到 1 的落地",
    from: "#eff6ff",
    to: "#dbeafe",
    accent: "#3b82f6",
  }),
};
