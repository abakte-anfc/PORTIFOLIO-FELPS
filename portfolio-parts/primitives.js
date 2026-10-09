"use client";
import * as x from "react";
import * as t from "react/jsx-runtime";
function R({
  text: o,
  weight: l = 8,
  outline: s = 0,
  tracking: p = 26,
  ligatures: r = !0,
  color: f = "currentColor",
  inner: d = "var(--ftp-sheet)",
  delay: n = 0,
  className: m,
  label: h,
  decorative: b,
}) {
  const y = x.useMemo(() => be(o, p + l * 0.6, r), [o, p, l, r]),
    A = l / 2 + 2,
    w = i(y.width + A * 2),
    u = i(124 + A * 2),
    N =
      s > 0
        ? [
            { c: f, w: l },
            { c: d, w: Math.max(0.5, l - s * 2) },
          ]
        : [{ c: f, w: l }];
  return t.jsx("svg", {
    className: "ftp-st" + (m ? " " + m : ""),
    viewBox: i(-A) + " " + i(-12 - A) + " " + w + " " + u,
    width: w,
    height: u,
    role: b ? void 0 : "img",
    "aria-label": b ? void 0 : (h ?? o),
    "aria-hidden": b ? !0 : void 0,
    style: { "--d": n + "ms" },
    children: N.map((z, j) =>
      t.jsx(
        "g",
        {
          fill: "none",
          stroke: z.c,
          strokeWidth: z.w,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: y.items.map((M, C) =>
            t.jsx(
              "g",
              {
                transform: "translate(" + i(M.x) + " 0)",
                children: t.jsx("g", {
                  className: "ftp-gl",
                  style: { "--i": C },
                  children: ye(M.d).map((I, T) =>
                    t.jsx(
                      "path",
                      { d: I, pathLength: 1 },
                      T,
                    ),
                  ),
                }),
              },
              C,
            ),
          ),
        },
        j,
      ),
    ),
  });
}

function be(o, l, s) {
  const p = [...o.toUpperCase()],
    r = [];
  let f = 0;
  for (let n = 0; n < p.length; n++) {
    const m = p[n] + (p[n + 1] ?? "");
    if (s && mt[m]) {
      (r.push({ ch: m, x: f, d: mt[m].d }), (f += mt[m].w + l), n++);
      continue;
    }
    const h = me[p[n]];
    if (!h) {
      f += ue;
      continue;
    }
    (r.push({ ch: p[n], x: f, d: h.d }), (f += h.w + l));
  }
  const d = Math.max(0, r.length ? f - l : 0);
  return { items: r, width: d };
}

const mt = {
  OO: { w: 210, d: "M50 0 H160 A50 50 0 0 1 160 100 H50 A50 50 0 0 1 50 0" },
};

const me = {
  A: { w: 120, d: "M0 100 L60 0 L120 100 M22 64 H98" },
  B: {
    w: 99,
    d: "M0 0 V100 M0 0 H68 A25 25 0 0 1 68 50 H0 M0 50 H74 A25 25 0 0 1 74 100 H0",
  },
  C: { w: 118, d: "M109.5 17.9 A62 50 0 1 0 109.5 82.1" },
  D: { w: 104, d: "M0 0 V100 M0 0 H52 A52 50 0 0 1 52 100 H0" },
  E: { w: 100, d: "M100 0 H0 V100 H100 M0 50 H86" },
  F: { w: 100, d: "M100 0 H0 V100 M0 50 H86" },
  G: { w: 124, d: "M109.5 17.9 A62 50 0 1 0 124 50 H72" },
  H: { w: 110, d: "M0 0 V100 M110 0 V100 M0 50 H110" },
  I: { w: 0, d: "M0 0 V100" },
  J: { w: 90, d: "M90 0 V58 A42 42 0 0 1 6 58" },
  K: { w: 108, d: "M0 0 V100 M104 0 L0 60 M34 40 L108 100" },
  L: { w: 92, d: "M0 0 V100 H92" },
  M: { w: 132, d: "M0 100 V0 L66 70 L132 0 V100" },
  N: { w: 110, d: "M0 100 V0 L110 100 V0" },
  O: { w: 124, d: "M62 0 A62 50 0 1 1 62 100 A62 50 0 1 1 62 0" },
  P: { w: 97, d: "M0 100 V0 H70 A27 27 0 0 1 70 54 H0" },
  Q: {
    w: 124,
    d: "M62 0 A62 50 0 1 1 62 100 A62 50 0 1 1 62 0 M84 74 L124 104",
  },
  R: { w: 104, d: "M0 100 V0 H70 A27 27 0 0 1 70 54 H0 M60 54 L104 100" },
  S: {
    w: 116,
    d: "M112 18 C100 4 80 0 60 0 H52 C24 0 4 10 4 27 C4 44 22 50 56 50 H64 C98 50 116 58 116 74 C116 90 96 100 64 100 H54 C32 100 12 94 0 80",
  },
  T: { w: 116, d: "M0 0 H116 M58 0 V100" },
  U: { w: 110, d: "M0 0 V50 A55 50 0 0 0 110 50 V0" },
  V: { w: 120, d: "M0 0 L60 100 L120 0" },
  W: { w: 160, d: "M0 0 L40 100 L80 20 L120 100 L160 0" },
  X: { w: 112, d: "M0 0 L112 100 M112 0 L0 100" },
  Y: { w: 116, d: "M0 0 L58 52 L116 0 M58 52 V100" },
  Z: { w: 114, d: "M4 0 H112 L0 100 H114" },
  0: { w: 92, d: "M46 0 A46 50 0 1 1 46 100 A46 50 0 1 1 46 0" },
  1: { w: 44, d: "M6 22 L44 0 V100" },
  2: {
    w: 100,
    d: "M2 26 C6 8 26 0 50 0 C78 0 98 10 98 28 C98 50 70 56 40 70 C16 81 2 90 0 100 H100",
  },
  3: {
    w: 100,
    d: "M4 10 C16 3 32 0 50 0 C78 0 96 10 96 26 C96 42 78 48 48 48 M48 48 C82 48 100 58 100 74 C100 92 80 100 50 100 C30 100 12 96 0 88",
  },
  4: { w: 108, d: "M78 100 V0 L0 70 H108" },
  5: {
    w: 100,
    d: "M96 0 H12 L6 46 C20 40 34 38 52 38 C82 38 100 50 100 69 C100 88 80 100 52 100 C30 100 12 96 0 88",
  },
  6: {
    w: 102,
    d: "M88 6 C76 2 64 0 52 0 C20 0 0 22 0 52 C0 80 22 100 52 100 C82 100 102 86 102 66 C102 46 82 34 54 34 C30 34 8 44 0 58",
  },
  7: { w: 104, d: "M0 0 H104 L40 100" },
  8: {
    w: 100,
    d: "M50 0 A44 23 0 1 1 50 46 A44 23 0 1 1 50 0 M50 46 A50 27 0 1 1 50 100 A50 27 0 1 1 50 46",
  },
  9: {
    w: 102,
    d: "M14 94 C26 98 38 100 50 100 C82 100 102 78 102 48 C102 20 80 0 50 0 C20 0 0 14 0 34 C0 54 20 66 48 66 C72 66 94 56 102 42",
  },
  "#": { w: 96, d: "M34 6 L22 94 M78 6 L66 94 M6 34 H96 M0 66 H90" },
  "-": { w: 48, d: "M0 56 H48" },
  "–": { w: 64, d: "M0 56 H64" },
  ".": { w: 0, d: "M0 99.5 L0 100" },
  ",": { w: 6, d: "M6 96 L0 112" },
  ":": { w: 0, d: "M0 44 L0 44.5 M0 99.5 L0 100" },
  "'": { w: 0, d: "M0 0 V24" },
  "’": { w: 0, d: "M0 0 V24" },
  "/": { w: 70, d: "M70 -4 L0 104" },
  "+": { w: 76, d: "M0 50 H76 M38 12 V88" },
  "(": { w: 32, d: "M32 -8 Q-12 50 32 108" },
  ")": { w: 32, d: "M0 -8 Q44 50 0 108" },
  "!": { w: 0, d: "M0 0 V70 M0 99.5 V100" },
  "?": {
    w: 92,
    d: "M0 24 C4 8 22 0 46 0 C74 0 92 10 92 28 C92 48 50 50 50 72 M50 99.5 V100",
  },
  "&": {
    w: 104,
    d: "M100 100 L22 30 C10 18 18 0 42 0 C64 0 72 16 60 28 L14 62 C2 72 4 100 42 100 C66 100 84 88 98 66",
  },
};

function F({
  tone: o,
  tab: l,
  tabAt: s = 0.1,
  glass: p,
  as: r = "div",
  className: f,
  bodyClass: d,
  style: n,
  children: m,
  ...h
}) {
  const b = s <= 0 ? "left" : s >= 1 ? "right" : void 0,
    y = r;
  return t.jsxs(y, {
    ...h,
    className: "ftp-folder" + (f ? " " + f : ""),
    "data-tone": o,
    "data-glass": p ? "true" : void 0,
    "data-flush": b,
    style: { ...n, "--tx": Math.min(1, Math.max(0, s)) },
    children: [
      l != null &&
        t.jsx("span", {
          className: "ftp-tabshape ftp-ftab",
          "data-tone": o,
          "data-flush": b,
          children: l,
        }),
      t.jsx("div", {
        className: "ftp-fbody" + (d ? " " + d : ""),
        children: m,
      }),
    ],
  });
}

function S({ size: o = 14, dir: l = "right" }) {
  const s = { right: 0, down: 90, left: 180, up: -90, ne: -45 }[l];
  return t.jsx("svg", {
    width: o,
    height: o,
    viewBox: "0 0 16 16",
    "aria-hidden": "true",
    style: { transform: "rotate(" + s + "deg)" },
    children: t.jsx("path", {
      d: "M2 8h11M9 4l4 4-4 4",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  });
}

const ue = 52;

const i = (o) => Math.round(o * 10) / 10;

function ye(o) {
  return o
    .split(/(?=M)/)
    .map((l) => l.trim())
    .filter(Boolean);
}

function Ot({ text: o, className: l, delay: s = 0, weight: p = 3.2 }) {
  const r = x.useMemo(() => we(o), [o]),
    f = r.width + 34;
  return t.jsx("svg", {
    className: "ftp-sig" + (l ? " " + l : ""),
    viewBox: "-30 -2 " + f + " 106",
    width: f,
    height: 106,
    "aria-hidden": "true",
    style: { "--d": s + "ms" },
    children: t.jsx("path", {
      d: r.d,
      transform: "skewX(-14)",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: p,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      pathLength: 1,
    }),
  });
}

function we(o) {
  const l = [...o.replace(/[^A-Za-z]/g, "")].slice(0, 12),
    s = ot(rt(o || "signature")),
    p = 64;
  let r = 4,
    f = "M0 " + (p + 6) + " C1 " + (p + 2) + " 2 " + p + " " + r + " " + p;
  const d = (n, m) =>
    " C" +
    i(r + n * 0.95) +
    " " +
    i(p - m * 0.5) +
    " " +
    i(r + n * 0.9) +
    " " +
    i(p - m) +
    " " +
    i(r + n * 0.55) +
    " " +
    i(p - m) +
    " C" +
    i(r + n * 0.15) +
    " " +
    i(p - m) +
    " " +
    i(r + n * 0.3) +
    " " +
    p +
    " " +
    i(r + n) +
    " " +
    p;
  return (
    l.length || l.push("s"),
    l.forEach((n, m) => {
      const h = n.toLowerCase(),
        b = n !== h || m === 0;
      let y = 16 + s() * 10;
      if (b) ((y += 12), (f += d(y, 52 + s() * 8)));
      else if (/[bdfhklt]/.test(h)) f += d(y, 42 + s() * 6);
      else if (/[gjpqyz]/.test(h)) f += d(y, -(30 + s() * 6));
      else if (s() < 0.55) {
        const A = 15 + s() * 6;
        f +=
          " C" +
          i(r + y * 0.1) +
          " " +
          i(p - A) +
          " " +
          i(r + y * 0.8) +
          " " +
          i(p - A) +
          " " +
          i(r + y) +
          " " +
          p;
      } else f += d(y, 16 + s() * 5);
      r += y;
    }),
    (f +=
      " C" +
      i(r + 18) +
      " " +
      (p - 6) +
      " " +
      i(r + 20) +
      " " +
      (p + 16) +
      " " +
      i(r - 6) +
      " " +
      (p + 18) +
      " C" +
      i(r * 0.55) +
      " " +
      (p + 22) +
      " " +
      i(r * 0.25) +
      " " +
      (p + 12) +
      " 4 " +
      (p + 20)),
    { d: f, width: i(r + 24) }
  );
}

function ot(o) {
  let l = o >>> 0;
  return () => {
    l = (l + 1831565813) >>> 0;
    let s = l;
    return (
      (s = Math.imul(s ^ (s >>> 15), s | 1)),
      (s ^= s + Math.imul(s ^ (s >>> 7), s | 61)),
      ((s ^ (s >>> 14)) >>> 0) / 4294967296
    );
  };
}

function rt(o) {
  let l = 2166136261;
  for (let s = 0; s < o.length; s++)
    ((l ^= o.charCodeAt(s)), (l = Math.imul(l, 16777619)));
  return l >>> 0;
}

function Bt({ size: o = 30 }) {
  return t.jsxs("svg", {
    width: o,
    height: o,
    viewBox: "0 0 32 32",
    "aria-hidden": "true",
    children: [
      t.jsx("path", {
        d: "M15.5 30c.6-6 .9-11 .2-17",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.2",
        strokeLinecap: "round",
      }),
      t.jsx("path", {
        d: "M16 13C12 7 6 7 2.5 10.5 7 9.5 11 10.5 16 13Zm0 0c1-6 6-10 11.5-8.5C22 5 18.5 8 16 13Zm0 0c4.5-3 10-2 13 2.5-4.5-2-8.5-2.5-13-2.5Zm0 0C10.5 11 5 14 4 19c3.5-4 7-5.5 12-6Zm0 0c-1-4.5-4-8.5-8.5-10C10 6 13 9 16 13Z",
        fill: "currentColor",
      }),
    ],
  });
}

function Me({ name: o, seed: l }) {
  const s = x.useId().replace(/:/g, ""),
    p = x.useMemo(() => {
      const r = ot(l),
        f = [];
      let d = -6;
      for (; d < 306;) {
        const h = 14 + r() * 26,
          b = r() < 0.18;
        (f.push({
          x: d,
          w: h,
          h: b ? 90 + r() * 40 : 26 + r() * 52,
          spire: b && r() < 0.6,
        }),
          (d += h + (r() < 0.3 ? 2 : 0)));
      }
      const n = [];
      for (const h of f)
        for (let b = 196 - h.h + 6; b < 190; b += 7)
          for (let y = h.x + 3; y < h.x + h.w - 4; y += 6)
            r() < 0.34 && n.push({ x: y, y: b, on: r() < 0.2, dl: r() * 3 });
      const m = Array.from({ length: 14 }, () => ({
        x: r() * 300,
        y: 300 + r() * 56,
        rx: 4 + r() * 12,
        ry: 2 + r() * 5,
      }));
      return { blds: f, wins: n, rocks: m };
    }, [l]);
  return t.jsxs("svg", {
    viewBox: "0 0 300 360",
    width: 300,
    height: 360,
    preserveAspectRatio: "xMidYMid slice",
    role: "img",
    "aria-label": "Photo of " + o,
    children: [
      t.jsxs("defs", {
        children: [
          t.jsxs("linearGradient", {
            id: s + "-sky",
            x1: "0",
            y1: "0",
            x2: "0",
            y2: "1",
            children: [
              t.jsx("stop", { offset: "0", stopColor: "#2b4a8f" }),
              t.jsx("stop", { offset: ".42", stopColor: "#6d8ed2" }),
              t.jsx("stop", { offset: ".72", stopColor: "#d9b4c9" }),
              t.jsx("stop", { offset: "1", stopColor: "#f5d2b0" }),
            ],
          }),
          t.jsxs("linearGradient", {
            id: s + "-sea",
            x1: "0",
            y1: "0",
            x2: "0",
            y2: "1",
            children: [
              t.jsx("stop", { offset: "0", stopColor: "#6a7fb4" }),
              t.jsx("stop", { offset: ".5", stopColor: "#3a5288" }),
              t.jsx("stop", { offset: "1", stopColor: "#1f2f55" }),
            ],
          }),
          t.jsxs("linearGradient", {
            id: s + "-coat",
            x1: "0",
            y1: "0",
            x2: "1",
            y2: "0",
            children: [
              t.jsx("stop", { offset: "0", stopColor: "#24252c" }),
              t.jsx("stop", { offset: ".6", stopColor: "#111217" }),
              t.jsx("stop", { offset: "1", stopColor: "#060608" }),
            ],
          }),
        ],
      }),
      t.jsx("rect", {
        width: "300",
        height: "200",
        fill: "url(#" + s + "-sky)",
      }),
      t.jsx("circle", {
        cx: "232",
        cy: "172",
        r: "16",
        fill: "#ffe2c2",
        opacity: ".7",
      }),
      t.jsx("g", {
        fill: "#273863",
        children: p.blds.map((r, f) =>
          t.jsxs(
            "g",
            {
              children: [
                t.jsx("rect", {
                  x: i(r.x),
                  y: i(196 - r.h),
                  width: i(r.w),
                  height: i(r.h),
                }),
                r.spire &&
                  t.jsx("rect", {
                    x: i(r.x + r.w / 2 - 1),
                    y: i(196 - r.h - 18),
                    width: "2",
                    height: "18",
                  }),
              ],
            },
            f,
          ),
        ),
      }),
      t.jsx("g", {
        children: p.wins.map((r, f) =>
          t.jsx(
            "rect",
            {
              x: i(r.x),
              y: i(r.y),
              width: "2.4",
              height: "2.8",
              fill: f % 5 ? "#ffd68a" : "#a8dcff",
              className: r.on ? "ftp-twinkle" : void 0,
              style: r.on ? { "--dl": i(r.dl) + "s" } : void 0,
              opacity: ".9",
            },
            f,
          ),
        ),
      }),
      t.jsx("rect", {
        y: "196",
        width: "300",
        height: "104",
        fill: "url(#" + s + "-sea)",
      }),
      t.jsx("g", {
        fill: "#273863",
        opacity: ".35",
        transform: "translate(0 392) scale(1 -1)",
        children: p.blds.map((r, f) =>
          t.jsx(
            "rect",
            {
              x: i(r.x),
              y: i(196 - r.h * 0.6),
              width: i(r.w),
              height: i(r.h * 0.6),
            },
            f,
          ),
        ),
      }),
      t.jsx("g", {
        className: "ftp-shimmer",
        stroke: "#ffe0b0",
        strokeLinecap: "round",
        opacity: ".55",
        children: [206, 214, 223, 233, 246, 262].map((r, f) =>
          t.jsx(
            "line",
            {
              x1: 30 + ((f * 47) % 140),
              x2: 70 + ((f * 47) % 140) + f * 9,
              y1: r,
              y2: r,
              strokeWidth: 1.2 + f * 0.2,
            },
            r,
          ),
        ),
      }),
      t.jsxs("g", {
        transform: "translate(48 204)",
        children: [
          t.jsx("path", { d: "M0 8 H58 L52 14 H6 Z", fill: "#e9edf6" }),
          t.jsx("rect", {
            x: "10",
            y: "2",
            width: "34",
            height: "6",
            rx: "1",
            fill: "#f5f7fb",
          }),
          t.jsx("rect", {
            x: "16",
            y: "-3",
            width: "16",
            height: "5",
            rx: "1",
            fill: "#dfe6f3",
          }),
          [13, 19, 25, 31, 37].map((r) =>
            t.jsx(
              "rect",
              {
                x: r,
                y: "4",
                width: "3",
                height: "2",
                fill: "#ffcf7a",
                className: "ftp-twinkle",
                style: { "--dl": r / 20 + "s" },
              },
              r,
            ),
          ),
        ],
      }),
      t.jsx("path", {
        d: "M0 296 C40 284 70 292 110 286 C160 278 200 290 240 282 C268 277 288 284 300 280 V360 H0Z",
        fill: "#2a2522",
      }),
      t.jsx("g", {
        fill: "#3b3430",
        children: p.rocks.map((r, f) =>
          t.jsx(
            "ellipse",
            { cx: i(r.x), cy: i(r.y), rx: i(r.rx), ry: i(r.ry) },
            f,
          ),
        ),
      }),
      t.jsxs("g", {
        children: [
          t.jsx("path", {
            d: "M142 360 C138 316 140 262 152 236 C160 218 178 210 196 212 C214 214 226 228 232 254 C238 284 240 326 238 360 Z",
            fill: "url(#" + s + "-coat)",
          }),
          t.jsx("path", {
            d: "M176 214 C180 224 186 230 194 232 C198 226 200 220 200 213 C192 210 184 210 176 214Z",
            fill: "#0a0a0d",
          }),
          t.jsx("rect", {
            x: "181",
            y: "198",
            width: "14",
            height: "18",
            rx: "5",
            fill: "#d9b49a",
          }),
          t.jsx("ellipse", {
            cx: "186",
            cy: "184",
            rx: "16",
            ry: "19",
            fill: "#e2bfa3",
          }),
          t.jsx("path", {
            d: "M170 182 C166 160 182 152 198 157 C208 161 207 177 204 190 C200 182 196 176 188 172 C181 172 174 176 170 182Z",
            fill: "#131315",
          }),
          t.jsx("path", {
            d: "M171 186 C169 190 170 194 173 195",
            fill: "none",
            stroke: "#c99f84",
            strokeWidth: "1.5",
            strokeLinecap: "round",
          }),
          t.jsx("path", {
            d: "M156 262 C160 276 168 288 178 292",
            fill: "none",
            stroke: "#2c2d35",
            strokeWidth: "2",
            strokeLinecap: "round",
          }),
          t.jsx("rect", {
            x: "172",
            y: "282",
            width: "14",
            height: "22",
            rx: "3",
            fill: "#d6393b",
            transform: "rotate(-12 179 293)",
          }),
        ],
      }),
    ],
  });
}

function Le({ dark: o }) {
  const l = x.useId().replace(/:/g, "") + "-moon";
  return t.jsxs("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    children: [
      t.jsxs("mask", {
        id: l,
        children: [
          t.jsx("rect", { width: "24", height: "24", fill: "#fff" }),
          t.jsx("circle", {
            className: "ftp-sun-moon",
            cx: o ? 16 : 30,
            cy: o ? 7 : -6,
            r: "6.5",
            fill: "#000",
          }),
        ],
      }),
      t.jsx("circle", {
        className: "ftp-sun-core",
        cx: "12",
        cy: "12",
        r: o ? 8 : 4.5,
        fill: "currentColor",
        mask: "url(#" + l + ")",
      }),
      t.jsx("g", {
        className: "ftp-sun-rays",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        children: t.jsx("path", {
          d: "M12 1.5v2.2M12 20.3v2.2M1.5 12h2.2M20.3 12h2.2M4.6 4.6l1.5 1.5M17.9 17.9l1.5 1.5M4.6 19.4l1.5-1.5M17.9 6.1l1.5-1.5",
        }),
      }),
    ],
  });
}

function ve(o) {
  return o
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((l) => l[0].toUpperCase())
    .join("");
}

function k(o) {
  return (o < 10 ? "0" : "") + o;
}

const je = {
  blue: "#3a6cf4",
  green: "#3cc84a",
  orange: "#ff6a3d",
  yellow: "#f3e7a6",
};

const _ = ["blue", "green", "orange", "yellow"];
export {
  R as Lettering,
  Ot as Signature,
  F as Folder,
  S as Arrow,
  Bt as Star,
  Me as Portrait,
  Le as ThemeIcon,
  ve as initials,
  rt as seed,
  k as number,
  je as colors,
};
