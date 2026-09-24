/* @ds-bundle: {"format":4,"namespace":"EntersysDesignSystem_ad8f35","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"BarChart","sourcePath":"components/dataviz/BarChart.jsx"},{"name":"DonutChart","sourcePath":"components/dataviz/DonutChart.jsx"},{"name":"Infolet","sourcePath":"components/dataviz/Infolet.jsx"},{"name":"ProgressRing","sourcePath":"components/dataviz/ProgressRing.jsx"},{"name":"Sparkline","sourcePath":"components/dataviz/Sparkline.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"37c48d104ea3","components/core/Card.jsx":"4aa600c0b1ae","components/core/Icon.jsx":"54111f40b0d5","components/core/Tag.jsx":"fb628d1da4b3","components/data/StatCard.jsx":"9061a908cde5","components/dataviz/BarChart.jsx":"6f10da091837","components/dataviz/DonutChart.jsx":"f7924277e27d","components/dataviz/Infolet.jsx":"14dba61302c7","components/dataviz/ProgressRing.jsx":"e705e42d90ae","components/dataviz/Sparkline.jsx":"945e655b759e","components/feedback/Dialog.jsx":"ddf5a624b8d8","components/forms/Button.jsx":"317b353b0c25","components/forms/Checkbox.jsx":"acd832432bcf","components/forms/Input.jsx":"9f5fb5faf8b2","components/forms/Select.jsx":"4d127bb84a8d","components/forms/Switch.jsx":"fd3af28baa3a","components/navigation/Tabs.jsx":"59afed69c7bf","guidelines/doc-page.js":"371bab66f42d","ui_kits/console/DashboardScreen.jsx":"650397adf1c1","ui_kits/console/LoginScreen.jsx":"e96287a2af86","ui_kits/console/ProcessTable.jsx":"429e33fe5856","ui_kits/console/Sidebar.jsx":"369d44323a73","ui_kits/console/Topbar.jsx":"696f10a58c86"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EntersysDesignSystem_ad8f35 = window.EntersysDesignSystem_ad8f35 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Badge — status / category label. */
function Badge({
  variant = "neutral",
  size = "md",
  children,
  style = {},
  ...rest
}) {
  const variants = {
    neutral: {
      background: "var(--surface-muted)",
      color: "var(--text-body)",
      border: "1px solid var(--border-default)"
    },
    teal: {
      background: "var(--ent-teal-50)",
      color: "var(--ent-teal-700)",
      border: "1px solid var(--ent-teal-100)"
    },
    gold: {
      background: "var(--ent-gold-100)",
      color: "var(--ent-gold-700)",
      border: "1px solid var(--ent-gold-300)"
    },
    success: {
      background: "#e4f3ec",
      color: "#1f7a52",
      border: "1px solid #bfe3d1"
    },
    warning: {
      background: "#fbf1dc",
      color: "#9a6f16",
      border: "1px solid #f0dcae"
    },
    danger: {
      background: "#f8e4e1",
      color: "#a63a2c",
      border: "1px solid #efc4bd"
    },
    solid: {
      background: "var(--ent-navy-800)",
      color: "#fff",
      border: "1px solid transparent"
    }
  };
  const sizes = {
    sm: {
      fontSize: "0.6875rem",
      padding: "2px 8px"
    },
    md: {
      fontSize: "0.75rem",
      padding: "3px 10px"
    }
  };
  const v = variants[variant] || variants.neutral;
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "0.01em",
      borderRadius: "999px",
      whiteSpace: "nowrap",
      ...v,
      ...s,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — surface container. Tone "light" (white) or "dark" (navy panel).
 * `interactive` adds hover lift.
 */
function Card({
  tone = "light",
  interactive = false,
  padding = "var(--sp-5)",
  children,
  style = {},
  ...rest
}) {
  const tones = {
    light: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      color: "var(--text-body)"
    },
    dark: {
      background: "var(--surface-inverse-alt)",
      border: "1px solid rgba(255,255,255,0.08)",
      color: "var(--text-on-dark)"
    },
    muted: {
      background: "var(--surface-muted)",
      border: "1px solid var(--border-subtle)",
      color: "var(--text-body)"
    }
  };
  const t = tones[tone] || tones.light;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: interactive ? "ent-card ent-card--interactive" : "ent-card",
    style: {
      borderRadius: "var(--radius-lg)",
      padding,
      boxShadow: "var(--shadow-md)",
      transition: "transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
      cursor: interactive ? "pointer" : "default",
      ...t,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Icon — Entersys brand icon, backed by Material Symbols (Rounded).
 * The font ships with the design system via styles.css, so no per-page
 * script/link is needed. Icon names are snake_case (Material Symbols names).
 */
function Icon({
  name = "circle",
  size = 20,
  fill = 0,
  weight = 400,
  grade = 0,
  color = "currentColor",
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "material-symbols-rounded",
    style: {
      fontSize: size,
      width: size,
      height: size,
      color,
      overflow: "hidden",
      fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${size}`,
      ...style
    }
  }, rest), name);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Tag — dismissible/selectable chip for filters and keywords. */
function Tag({
  selected = false,
  onRemove,
  onClick,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 28,
      padding: onRemove ? "0 6px 0 12px" : "0 12px",
      fontFamily: "var(--font-body)",
      fontSize: "0.8125rem",
      fontWeight: "var(--fw-medium)",
      borderRadius: "999px",
      cursor: onClick ? "pointer" : "default",
      background: selected ? "var(--ent-teal-500)" : "var(--surface-muted)",
      color: selected ? "#fff" : "var(--text-body)",
      border: `1px solid ${selected ? "transparent" : "var(--border-default)"}`,
      transition: "background var(--dur-fast) var(--ease-standard)",
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    "aria-label": "Quitar",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 18,
      height: 18,
      border: "none",
      borderRadius: "50%",
      background: "transparent",
      color: "inherit",
      cursor: "pointer",
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatCard — KPI tile. Core to Entersys ("ver si estás ganando o perdiendo
 * en 3 segundos"). Shows a label, big value, optional delta and icon.
 */
function StatCard({
  label,
  value,
  unit,
  delta,
  trend = "flat",
  icon = null,
  tone = "light",
  style = {},
  ...rest
}) {
  const dark = tone === "dark";
  const trendColor = trend === "up" ? "var(--ent-success)" : trend === "down" ? "var(--ent-danger)" : "var(--text-muted)";
  const trendArrow = trend === "up" ? "M6 15l6-6 6 6" : trend === "down" ? "M6 9l6 6 6-6" : "M5 12h14";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      padding: "var(--sp-5)",
      borderRadius: "var(--radius-lg)",
      background: dark ? "var(--surface-inverse-alt)" : "var(--surface-card)",
      border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--border-subtle)",
      boxShadow: "var(--shadow-md)",
      minWidth: 180,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.8125rem",
      fontWeight: "var(--fw-medium)",
      color: dark ? "rgba(255,255,255,0.65)" : "var(--text-muted)"
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ent-teal-500)",
      display: "inline-flex"
    }
  }, icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-title)",
      fontWeight: "var(--fw-bold)",
      fontSize: "2rem",
      lineHeight: 1,
      color: dark ? "#fff" : "var(--text-strong)"
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.9375rem",
      color: dark ? "rgba(255,255,255,0.6)" : "var(--text-muted)"
    }
  }, unit)), delta != null && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      color: trendColor,
      fontFamily: "var(--font-body)",
      fontSize: "0.8125rem",
      fontWeight: "var(--fw-semibold)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: trendArrow
  })), delta));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/dataviz/BarChart.jsx
try { (() => {
const ENT_BAR = "#009ca6";

/**
 * BarChart — simple categorical bars (vertical or horizontal). Brand teal by
 * default; pass per-datum color to highlight. Pure SVG-free (flex/divs).
 */
function BarChart({
  data = [],
  horizontal = false,
  height = 200,
  color = ENT_BAR,
  showValues = true,
  max,
  style = {}
}) {
  const peak = max || Math.max(...data.map(d => d.value || 0), 1);
  if (horizontal) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        ...style
      }
    }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 120,
        flexShrink: 0,
        fontFamily: "var(--font-body)",
        fontSize: "0.8125rem",
        color: "var(--text-body)",
        textAlign: "right"
      }
    }, d.label), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 22,
        background: "var(--surface-muted)",
        borderRadius: 6,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${(d.value || 0) / peak * 100}%`,
        height: "100%",
        background: d.color || color,
        borderRadius: 6,
        transition: "width var(--dur-slow) var(--ease-out)"
      }
    })), showValues && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        fontFamily: "var(--font-title)",
        fontWeight: 600,
        fontSize: "0.875rem",
        color: "var(--text-strong)"
      }
    }, d.value))));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 16,
      height,
      ...style
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      height: "100%",
      justifyContent: "flex-end"
    }
  }, showValues && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-title)",
      fontWeight: 600,
      fontSize: "0.8125rem",
      color: "var(--text-strong)"
    }
  }, d.value), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 56,
      height: `${(d.value || 0) / peak * 100}%`,
      background: d.color || color,
      borderRadius: "6px 6px 0 0",
      transition: "height var(--dur-slow) var(--ease-out)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.75rem",
      color: "var(--text-muted)",
      textAlign: "center"
    }
  }, d.label))));
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/dataviz/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/dataviz/DonutChart.jsx
try { (() => {
const ENT_PALETTE = ["#009ca6", "#1c2838", "#c2a56d", "#7c878e", "#093d53", "#45b4bb"];

/**
 * DonutChart — brand-colored ring chart for decks, résumés and dashboards.
 * Pure SVG. Pass data as [{ label, value, color? }].
 */
function DonutChart({
  data = [],
  size = 200,
  thickness = 26,
  centerValue,
  centerLabel,
  gap = 2,
  legend = true,
  style = {}
}) {
  const total = data.reduce((s, d) => s + (d.value || 0), 0) || 1;
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const segs = data.map((d, i) => {
    const frac = (d.value || 0) / total;
    const len = Math.max(frac * c - gap, 0);
    const seg = {
      color: d.color || ENT_PALETTE[i % ENT_PALETTE.length],
      dash: `${len} ${c - len}`,
      rot: offset / c * 360,
      label: d.label,
      value: d.value
    };
    offset += frac * c;
    return seg;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24,
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cx,
    r: r,
    fill: "none",
    stroke: "var(--surface-muted)",
    strokeWidth: thickness
  }), segs.map((s, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: cx,
    cy: cx,
    r: r,
    fill: "none",
    stroke: s.color,
    strokeWidth: thickness,
    strokeDasharray: s.dash,
    strokeLinecap: "butt",
    transform: `rotate(${-90 + s.rot} ${cx} ${cx})`
  })), (centerValue != null || centerLabel) && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cx - (centerLabel ? 4 : -6),
    textAnchor: "middle",
    style: {
      fontFamily: "var(--font-title)",
      fontWeight: 700,
      fontSize: size * 0.2,
      fill: "var(--text-strong)"
    }
  }, centerValue), centerLabel && /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cx + size * 0.13,
    textAnchor: "middle",
    style: {
      fontFamily: "var(--font-body)",
      fontSize: size * 0.075,
      fill: "var(--text-muted)"
    }
  }, centerLabel))), legend && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, segs.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-body)",
      fontSize: "0.875rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: 3,
      background: s.color,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-body)"
    }
  }, s.label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-strong)",
      fontWeight: 600,
      marginLeft: "auto",
      paddingLeft: 16
    }
  }, s.value)))));
}
Object.assign(__ds_scope, { DonutChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/dataviz/DonutChart.jsx", error: String((e && e.message) || e) }); }

// components/dataviz/Infolet.jsx
try { (() => {
/**
 * Infolet — a self-contained, deck/résumé-ready metric tile. Big number + icon,
 * optional delta/trend, caption, and a chart slot (Sparkline/ProgressRing/etc).
 * Tones: light, dark (navy), brand (teal), gold.
 */
function Infolet({
  value,
  label,
  caption,
  icon = null,
  delta,
  trend = "flat",
  tone = "light",
  chart = null,
  style = {}
}) {
  const tones = {
    light: {
      bg: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      value: "var(--text-strong)",
      label: "var(--text-muted)",
      caption: "var(--text-body)",
      accent: "var(--ent-teal-600)",
      iconBg: "var(--ent-teal-50)"
    },
    dark: {
      bg: "var(--ent-navy-800)",
      border: "1px solid rgba(255,255,255,0.08)",
      value: "#ffffff",
      label: "rgba(255,255,255,0.6)",
      caption: "rgba(255,255,255,0.75)",
      accent: "var(--ent-gold-500)",
      iconBg: "rgba(255,255,255,0.08)"
    },
    brand: {
      bg: "var(--ent-teal-500)",
      border: "1px solid transparent",
      value: "#ffffff",
      label: "rgba(255,255,255,0.82)",
      caption: "rgba(255,255,255,0.9)",
      accent: "#ffffff",
      iconBg: "rgba(255,255,255,0.18)"
    },
    gold: {
      bg: "var(--ent-gold-500)",
      border: "1px solid transparent",
      value: "#2e2510",
      label: "rgba(46,37,16,0.7)",
      caption: "rgba(46,37,16,0.85)",
      accent: "#5c4a1e",
      iconBg: "rgba(46,37,16,0.12)"
    }
  };
  const t = tones[tone] || tones.light;
  const trendColor = tone === "light" ? trend === "up" ? "var(--ent-success)" : trend === "down" ? "var(--ent-danger)" : "var(--text-muted)" : t.caption;
  const arrow = trend === "up" ? "M6 15l6-6 6 6" : trend === "down" ? "M6 9l6 6 6-6" : "M5 12h14";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      padding: "22px 24px",
      borderRadius: "var(--radius-lg)",
      background: t.bg,
      border: t.border,
      boxShadow: "var(--shadow-md)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.8125rem",
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      color: t.label
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 38,
      height: 38,
      borderRadius: 10,
      background: t.iconBg,
      color: t.accent
    }
  }, icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-title)",
      fontWeight: "var(--fw-bold)",
      fontSize: "2.75rem",
      lineHeight: 1,
      color: t.value
    }
  }, value), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      color: trendColor,
      fontFamily: "var(--font-body)",
      fontSize: "0.875rem",
      fontWeight: "var(--fw-semibold)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: arrow
  })), delta)), caption && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.875rem",
      lineHeight: 1.45,
      color: t.caption,
      margin: 0
    }
  }, caption), chart && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2
    }
  }, chart));
}
Object.assign(__ds_scope, { Infolet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/dataviz/Infolet.jsx", error: String((e && e.message) || e) }); }

// components/dataviz/ProgressRing.jsx
try { (() => {
/**
 * ProgressRing — single-value circular gauge (0–100). Brand teal by default.
 */
function ProgressRing({
  value = 0,
  size = 120,
  thickness = 12,
  color = "var(--ent-teal-500)",
  track = "var(--surface-muted)",
  label,
  showValue = true,
  style = {}
}) {
  const v = Math.max(0, Math.min(100, value));
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const c = 2 * Math.PI * r;
  const dash = v / 100 * c;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cx,
    r: r,
    fill: "none",
    stroke: track,
    strokeWidth: thickness
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cx,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: thickness,
    strokeDasharray: `${dash} ${c - dash}`,
    strokeLinecap: "round",
    transform: `rotate(-90 ${cx} ${cx})`
  }), showValue && /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cx,
    dominantBaseline: "central",
    textAnchor: "middle",
    style: {
      fontFamily: "var(--font-title)",
      fontWeight: 700,
      fontSize: size * 0.26,
      fill: "var(--text-strong)"
    }
  }, v, "%")), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.8125rem",
      color: "var(--text-muted)"
    }
  }, label));
}
Object.assign(__ds_scope, { ProgressRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/dataviz/ProgressRing.jsx", error: String((e && e.message) || e) }); }

// components/dataviz/Sparkline.jsx
try { (() => {
/**
 * Sparkline — compact trend line for infolets and inline metrics.
 * Pure SVG. Pass `data` as an array of numbers.
 */
function Sparkline({
  data = [],
  width = 160,
  height = 44,
  color = "var(--ent-teal-500)",
  fill = true,
  strokeWidth = 2,
  style = {}
}) {
  if (data.length < 2) return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    style: style
  });
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pad = strokeWidth + 1;
  const stepX = (width - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (v - min) / span) * (height - pad * 2);
    return [x, y];
  });
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${height} L${pts[0][0].toFixed(1)},${height} Z`;
  const gid = "spark-" + Math.random().toString(36).slice(2, 8);
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    style: style
  }, fill && /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: "0.22"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  }))), fill && /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: `url(#${gid})`
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: pts[pts.length - 1][0],
    cy: pts[pts.length - 1][1],
    r: strokeWidth + 1,
    fill: color
  }));
}
Object.assign(__ds_scope, { Sparkline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/dataviz/Sparkline.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
/** Dialog — modal overlay. Controlled via `open` + `onClose`. */
function Dialog({
  open = false,
  onClose,
  title,
  description,
  footer,
  children,
  width = 480
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--sp-5)",
      background: "rgba(28,40,56,0.5)",
      backdropFilter: "blur(2px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--sp-5) var(--sp-5) var(--sp-4)",
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-title)",
      fontSize: "1.375rem",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-strong)"
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--text-muted)",
      padding: 4,
      display: "inline-flex",
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })))), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.9375rem",
      color: "var(--text-muted)",
      margin: 0
    }
  }, description)), children && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--sp-5)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--sp-4) var(--sp-5)",
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      borderTop: "1px solid var(--border-subtle)",
      marginTop: "var(--sp-4)"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Entersys Button — primary action primitive.
 * Variants: primary (teal), secondary (outline), ghost, gold, danger.
 */
function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = "button",
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "0 14px",
      height: 34,
      fontSize: "0.875rem",
      gap: 6
    },
    md: {
      padding: "0 20px",
      height: 42,
      fontSize: "1rem",
      gap: 8
    },
    lg: {
      padding: "0 28px",
      height: 50,
      fontSize: "1.125rem",
      gap: 10
    }
  };
  const variants = {
    primary: {
      background: "var(--action-bg)",
      color: "var(--action-text)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-brand)"
    },
    secondary: {
      background: "transparent",
      color: "var(--text-accent)",
      border: "1px solid var(--border-brand)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-body)",
      border: "1px solid transparent"
    },
    gold: {
      background: "var(--ent-gold-500)",
      color: "#2e2510",
      border: "1px solid transparent"
    },
    danger: {
      background: "var(--ent-danger)",
      color: "#fff",
      border: "1px solid transparent"
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    className: `ent-btn ent-btn--${variant}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      width: fullWidth ? "100%" : "auto",
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-semibold)",
      fontSize: s.fontSize,
      lineHeight: 1,
      borderRadius: "8px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)",
      whiteSpace: "nowrap",
      ...v,
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Checkbox with label. Controlled via `checked` + `onChange(next)`. */
function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  label,
  id,
  ...rest
}) {
  const cbId = id || (label ? `cb-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: cbId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-body)",
      fontSize: "0.9375rem",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => {
      if (!disabled && onChange) onChange(!checked);
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 20,
      height: 20,
      flexShrink: 0,
      borderRadius: "5px",
      border: `1.5px solid ${checked ? "var(--ent-teal-500)" : "var(--border-strong)"}`,
      background: checked ? "var(--ent-teal-500)" : "var(--surface-card)",
      transition: "background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)"
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("input", _extends({
    id: cbId,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input with optional label, hint, error and leading icon. */
function Input({
  label,
  hint,
  error,
  iconLeft = null,
  id,
  disabled = false,
  style = {},
  containerStyle = {},
  ...rest
}) {
  const inputId = id || (label ? `in-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.875rem",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-strong)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "ent-field",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: 42,
      padding: "0 12px",
      background: disabled ? "var(--surface-muted)" : "var(--surface-card)",
      border: `1px solid ${error ? "var(--ent-danger)" : "var(--border-default)"}`,
      borderRadius: "8px",
      transition: "border-color var(--dur-fast) var(--ease-standard)"
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      display: "inline-flex"
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    disabled: disabled,
    className: "ent-input",
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-body)",
      fontSize: "1rem",
      color: "var(--text-strong)",
      minWidth: 0,
      ...style
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.75rem",
      color: error ? "var(--ent-danger)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select styled to match Entersys fields. */
function Select({
  label,
  hint,
  options = [],
  id,
  disabled = false,
  containerStyle = {},
  ...rest
}) {
  const selId = id || (label ? `sel-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.875rem",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-strong)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "ent-field",
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      height: 42,
      background: disabled ? "var(--surface-muted)" : "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "8px"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    disabled: disabled,
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      flex: 1,
      height: "100%",
      border: "none",
      outline: "none",
      background: "transparent",
      padding: "0 36px 0 12px",
      fontFamily: "var(--font-body)",
      fontSize: "1rem",
      color: "var(--text-strong)",
      cursor: disabled ? "not-allowed" : "pointer"
    }
  }, rest), options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lab = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lab);
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-muted)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      position: "absolute",
      right: 12,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.75rem",
      color: "var(--text-muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Toggle switch. Controlled via `checked` + `onChange`. */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  id,
  ...rest
}) {
  const switchId = id || (label ? `sw-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const toggle = () => {
    if (!disabled && onChange) onChange(!checked);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: switchId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-body)",
      fontSize: "0.9375rem",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("button", _extends({
    id: switchId,
    type: "button",
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: toggle,
    style: {
      position: "relative",
      width: 42,
      height: 24,
      flexShrink: 0,
      borderRadius: "999px",
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      background: checked ? "var(--ent-teal-500)" : "var(--border-strong)",
      transition: "background var(--dur-base) var(--ease-standard)",
      padding: 0
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: checked ? 21 : 3,
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "var(--shadow-sm)",
      transition: "left var(--dur-base) var(--ease-standard)"
    }
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Tabs — horizontal segmented navigation. Controlled via `value` + `onChange`. */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "flex",
      gap: 4,
      borderBottom: "1px solid var(--border-subtle)",
      ...style
    }
  }, rest), tabs.map(t => {
    const val = typeof t === "string" ? t : t.value;
    const lab = typeof t === "string" ? t : t.label;
    const active = val === value;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(val),
      style: {
        position: "relative",
        border: "none",
        background: "transparent",
        padding: "10px 16px",
        fontFamily: "var(--font-body)",
        fontSize: "0.9375rem",
        fontWeight: active ? "var(--fw-semibold)" : "var(--fw-medium)",
        color: active ? "var(--text-accent)" : "var(--text-muted)",
        cursor: "pointer",
        transition: "color var(--dur-fast) var(--ease-standard)"
      }
    }, lab, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 12,
        right: 12,
        bottom: -1,
        height: 2,
        borderRadius: "2px 2px 0 0",
        background: active ? "var(--ent-teal-500)" : "transparent",
        transition: "background var(--dur-fast) var(--ease-standard)"
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// guidelines/doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * FIRST, decide how the document paginates — up front, before building:
 *
 * - FLOWING document (the default): write the whole document as one
 *   normal HTML flow inside <doc-page>; the browser's print engine
 *   splits it onto pages at export. Use for long-form documents with a
 *   single text flow: reports, memos, letters, essays.
 * - EXPLICIT pagination: a fixed set of pre-paginated pages, one
 *   <section class="page"> child per page. Use when the user asks for a
 *   specific page count, or the design implies one: a one-page resume, a
 *   two-sided flier, a poster, a certificate, a brochure — any richly
 *   laid-out document without a single text flow.
 * - If in doubt, ask the user as part of the build.
 *
 * PAGE SIZING — paper differs by country (letter vs A4), so the printed
 * sheet is not one fixed truth:
 * - FLOWING documents pin NO paper size: the print engine paginates
 *   onto the user's real paper, and the content reflows to it.
 * - EXPLICITLY PAGINATED documents print each page at a FIXED page box
 *   with overflow hidden — letter by default, size="a4" for a clearly
 *   metric user, the user's chosen paper when they export. Design each
 *   page to FILL that box, fitting letter and A4 alike without overlap.
 * - width/height pin an explicit fixed size, ONLY when the user gives
 *   one.
 * Never write your own @page rule or hard-code paper dimensions in the
 * content.
 *
 * Sizing modes (attributes):
 *   (none)                      — portrait: flowing docs use the user's
 *           paper; explicitly paginated pages use the named size box
 *           (letter unless size="a4")
 *   orientation="landscape"     — the same, landscape
 *   width / height              — explicit fixed size, ONLY when the user
 *           gives one (e.g. width="22in" height="30in" for a 22×30
 *           poster): the page IS the design's size, printed at true
 *           dimensions (or scaled onto the user's paper at print time).
 *           Any absolute CSS length: px/in/mm/cm/pt/pc.
 * The component announces the chosen mode to the host app at runtime (a
 * meta tag it injects), so the print path can inject the user's true
 * paper size.
 *
 * On screen the document renders on a desk background: a flowing
 * document as one tall scrolling sheet (Google Docs' pageless view);
 * explicitly paginated documents as one card per page.
 *
 * EXPLICIT pagination usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page>
 *     <section class="page" id="p1">…one page's design…</section>
 *     <section class="page" id="p2">…</section>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * How the page box works, concretely: each .page prints as ONE full-bleed
 * sheet at a FIXED physical size — letter by default (set size="a4" for
 * a clearly metric user), the user's chosen paper when they export —
 * with overflow hidden. Nothing scrolls and nothing reflows onto a next
 * sheet: content that misses the box is CLIPPED. Design each page to
 * FILL that page box, and to fit it — letter and A4 alike — without
 * overlap. Each page is a size container; don't size anything in
 * viewport units (they track the window, not the page), and never set
 * width or height on the .page section itself (the component sizes the
 * page box; an authored height like 100% is meaningless at print and is
 * overridden). The component owns the page box, the screen card chrome,
 * and the page breaks (never add your own break-before/after). Don't mix
 * .page sections with flowing content or header/footer slots in the same
 * document.
 *
 * FLOWING usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * There is no manual page-splitting — the browser's print engine
 * paginates at export. Standard break-hygiene rules (`break-inside:
 * avoid` on figures, code blocks, images and table rows; `orphans/
 * widows: 3`) are applied so paragraphs and groups split cleanly. On
 * screen and at print, headings default to `text-wrap: balance` and
 * body text to `text-wrap: pretty`; the defaults have zero specificity,
 * so any text-wrap you declare wins.
 *
 * Other attributes:
 *   size    — letter | a4 | legal (default letter). Flowing documents:
 *           preview proportion only — it does NOT pin their printed
 *           paper (the print dialog's paper governs); leave it alone
 *           there. Explicitly paginated documents: it sets the page box
 *           the cards and the pinned @page share (the export dialog's
 *           choice overrides both at print) — set size="a4" for a
 *           clearly metric user. Scaled-fit: names the sheet the fit is
 *           computed against, same a4-for-metric-users advice.
 *   content-width / content-height — the design's own fixed dimensions
 *           (CSS lengths), for scaling a fixed-size design ONTO the
 *           named sheet: content lays out at exactly this size, and the
 *           component scales it to fit that sheet's printable area
 *           (centered horizontally, top-aligned; the export dialog
 *           re-fits to the user's actual paper choice where available).
 *           Both must be set; they do not change the page box. For pages
 *           WITHOUT running header/footer slots.
 *   margin  — printable inset on every page of a FLOWING document
 *           (default 0.75in); margin="0" makes pages full-bleed.
 *           Explicitly paginated pages are always full-bleed.
 *
 * Running header/footer (flowing documents only): give an element
 * `slot="header"` or `slot="footer"` and it repeats on every printed
 * page via `position: fixed`. To keep body text from sliding under it,
 * the component prints inside a single-cell table whose <thead>/<tfoot>
 * are spacers sized to the header/footer height — browsers repeat
 * thead/tfoot on every page, so each sheet's content starts below the
 * header and ends above the footer. On screen the header/footer render
 * once at the top/bottom of the sheet.
 *
 * At print the component injects `@page { margin: 0 }` (which leaves
 * Chrome no margin box to draw its date/URL/page-count header in) and
 * moves the visual margin onto the sheet's own padding. It also marks
 * the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns — only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks in flowing documents: `break-before: page` on an
 *   element that must start a new page (a chapter, an appendix). Add
 *   your own kept-together blocks (callouts, stat tiles, cards) to a
 *   `break-inside: avoid` rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> — browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  // WebKit (Safari and every iOS browser shell) never repeats a table's
  // thead/tfoot on printed pages (WebKit bug 17205), so the spacer-borne
  // vertical margins of a FLOWING document reach only the first page
  // there. Engine check, not browser check: vendor is 'Apple Computer,
  // Inc.' exactly for WebKit and 'Google Inc.' for Blink.
  const WK_PRINT = /apple/i.test(navigator.vendor || '');
  // CSS length → px number (CSS absolute units are exact: 1in = 96px).
  // Returns NaN for anything safeLen would reject — callers gate on it.
  const PX_PER = {
    px: 1,
    in: 96,
    mm: 96 / 25.4,
    cm: 96 / 2.54,
    pt: 96 / 72,
    pc: 16
  };
  const toPx = v => {
    const m = /^(\d+(?:\.\d+)?)(px|in|mm|cm|pt|pc)$/.exec((v || '').trim());
    return m ? parseFloat(m[1]) * PX_PER[m[2]] : NaN;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #f5f5f4;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 10px rgba(20, 20, 19, 0.12);
      border-radius: 7px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    /* Scaled-fit mode (content-width/content-height): the inner .fit box
     * lays the content out at its authored fixed size and scales it onto
     * the printable area; .fit-box reserves the scaled footprint in flow
     * (transforms don't affect layout) and centers it. Without the mode,
     * both divs are unstyled block pass-throughs. */
    /* Explicit pagination: direct .page children are the pages. The sheet
     * becomes a transparent stack and each page carries the card look on
     * screen; at print each page is exactly one full-bleed sheet. The
     * ::slotted defaults are deliberately weak (document CSS wins), so
     * authored page styling can override any of this. */
    .sheet.paginated {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
    .paginated ::slotted(.page) {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--doc-page-ar);
      container-type: size;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      break-inside: avoid;
    }
    .paginated ::slotted(.page:not(:first-child)) { margin-top: 1rem; }
    @media print {
      .sheet.paginated { padding: 0; }
      /* The flowing-document vertical inset lives on the repeating
       * thead/tfoot spacers, not the sheet padding — they must go too,
       * or each full-sheet .page is pushed ~margin down and spills onto
       * a second sheet. Paginated pages are full-bleed by definition
       * (content owns its insets). */
      .sheet.paginated .hdr-space,
      .sheet.paginated .ftr-space { height: 0; }
      .paginated ::slotted(.page) {
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        /* Physical page-box sizing, no viewport units: Safari resolves
         * 100vh against the window, not the page box, so a vh-sized card
         * paginates wrong there. --doc-page-w/h are the named size by
         * default and are overridden to the user's chosen paper by the
         * export path, so every card is exactly one sheet either way.
         * Width + height (same source values as @page size) rather than
         * width + aspect-ratio: the ratio is a 6-decimal rounding of the
         * same division, and a few millionths of overflow would spill a
         * blank sheet after every page. The screen-only aspect-ratio
         * (preview proportions) must not leak into print. cqh typography
         * tracks the same box.
         *
         * Every declaration is !important: per CSS Scoping, unimportant
         * shadow ::slotted rules LOSE to the document context, so a page
         * section's authored inline style would silently beat this print
         * geometry. A model-authored height:100% did exactly that — the
         * percentage resolves as auto in the all-auto print ancestry, the
         * base rule's size containment turns auto into ZERO, and
         * overflow:hidden then paints nothing: a blank PDF with perfect
         * page boxes. At print the component's geometry is the design's
         * whole contract, so it must win over any authored sizing. */
        aspect-ratio: auto !important;
        width: var(--doc-page-w) !important;
        height: var(--doc-page-h) !important;
        overflow: hidden !important;
      }
      .paginated ::slotted(.page:not(:first-child)) {
        break-before: page !important;
        margin-top: 0 !important;
      }
    }
    .fit-mode .fit-box {
      width: calc(var(--doc-fit-w) * var(--doc-fit-scale));
      height: calc(var(--doc-fit-h) * var(--doc-fit-scale));
      margin: 0 auto;
      break-inside: avoid;
    }
    .fit-mode .fit {
      width: var(--doc-fit-w);
      height: var(--doc-fit-h);
      transform: scale(var(--doc-fit-scale));
      transform-origin: top left;
    }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      /* WebKit flowing documents: @page carries the vertical margin (see
       * _syncPrintPageRule), so the spacers keep only whatever a running
       * header/footer needs BEYOND it — page 1 would otherwise double its
       * top inset. Paginated sheets already zero their spacers above. */
      .sheet.wk-print:not(.paginated) .hdr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))) - var(--doc-page-margin))); }
      .sheet.wk-print:not(.paginated) .ftr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))) - var(--doc-page-margin))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation', 'content-width', 'content-height'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps — explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }

    /** Scaled-fit mode's content box [w, h] as CSS lengths, or null when
     *  the mode is off (either attribute missing/invalid/zero — a partial
     *  declaration falls back to normal flow rather than guessing). */
    _contentFit() {
      const w = safeLen(this.getAttribute('content-width'), null);
      const h = safeLen(this.getAttribute('content-height'), null);
      if (!w || !h) return null;
      const wPx = toPx(w),
        hPx = toPx(h);
      return wPx > 0 && hPx > 0 ? [w, h, wPx, hPx] : null;
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      const survivor = document.querySelector('doc-page');
      if (!survivor) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print', 'doc-page-fixed-size', 'doc-page-print-sizing'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
        // A live deck-stage deferred its own print-sizing meta to ours —
        // hand the page-global meta over so the deck isn't left unmarked.
        const deck = document.querySelector('deck-stage');
        if (deck && typeof deck._ensurePrintSizingMeta === 'function') {
          deck._ensurePrintSizingMeta();
        }
      } else {
        // A departed owner hands each page-global meta to whatever
        // doc-page remains (or it's removed).
        if (typeof survivor._syncFixedSizeMeta === 'function') {
          survivor._syncFixedSizeMeta();
        }
        if (typeof survivor._syncPrintSizingMeta === 'function') {
          survivor._syncPrintSizingMeta();
        }
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><div class="fit-box"><div class="fit"><slot></slot></div></div></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      // Scaled-fit mode: content at its authored size, scaled onto the
      // printable area (page minus margins on both axes). The factor is a
      // plain number var so calc(length * number) stays valid; 4 decimals
      // keeps the shadow style stable across re-measures. Upscaling is
      // allowed — print transforms are vector, so text and CSS stay crisp
      // (raster images soften, which the catalog bullet warns about).
      const fit = this._contentFit();
      let fitVars = '';
      if (fit) {
        const marginPx = toPx(this.pageMargin) || 0;
        const availW = toPx(this.pageWidth) - 2 * marginPx;
        const availH = toPx(this.pageHeight) - 2 * marginPx;
        const scale = Math.min(availW / fit[2], availH / fit[3]);
        if (scale > 0 && Number.isFinite(scale)) {
          fitVars = '--doc-fit-w:' + fit[0] + ';' + '--doc-fit-h:' + fit[1] + ';' + '--doc-fit-scale:' + scale.toFixed(4) + ';';
        }
      }
      this._sheet.classList.toggle('fit-mode', !!fitVars);
      // Numeric w/h ratio for the paginated page cards' aspect-ratio —
      // aspect-ratio takes a number, not a length ratio, so compute it
      // here (CSS length division isn't portable). 6 decimals keeps the
      // shadow style stable across re-syncs.
      const arW = toPx(this.pageWidth);
      const arH = toPx(this.pageHeight);
      const ar = arW > 0 && arH > 0 ? (arW / arH).toFixed(6) : '0.772727';
      this._vars.textContent = ':host{' + fitVars + '--doc-page-ar:' + ar + ';' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document.
     *
     *  The @page SIZE is pinned where the page box IS part of the design:
     *  explicit-fixed-size mode (width + height authored), scaled-fit
     *  mode (the named sheet the fit targets), and explicit pagination
     *  (the named size the cards share — so card and sheet agree on
     *  every print path, and the export path's chosen paper overrides
     *  BOTH with one later rule). For FLOWING documents no paper size is
     *  emitted at all — the true size comes from the user's preference,
     *  injected by the export path or chosen in the print dialog — so a
     *  flowing document never fights the paper it lands on.
     *  margin: 0 is emitted in every mode: it leaves Chrome no margin box
     *  to draw its date/URL/page-count header in, and the visual margin
     *  lives on the sheet's own padding. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      // Three print-geometry regimes:
      // - true-size: the page IS the design — pin its exact size.
      // - scaled-fit (content-width/height): the fit factor is computed
      //   against the NAMED paper's printable area, so that paper must
      //   stay pinned or the scaled content overflows a smaller sheet
      //   (the export path re-fits and re-pins at print time on top).
      // - default modes: no paper size — but landscape still needs the
      //   paper-agnostic 'size: landscape' keyword, because the size
      //   descriptor is what carries orientation; without it a landscape
      //   document prints portrait whenever nothing injects a size.
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      // Explicit pagination pins the page box to the SAME values that
      // size the cards (the named size by default, the export path's
      // chosen paper when its later rule overrides both) — card and
      // sheet agree on every print path, and a mismatched real paper
      // shrinks-to-fit in the dialog instead of clipping a Letter card
      // on A4. Declared before the paginated read below so both derive
      // from one check.
      const paginatedNow = this.querySelector(':scope > .page') !== null;
      const sizeDescriptor = this._trueSizePx() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : this._contentFit() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : paginatedNow ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : landscape ? 'size: landscape; ' : '';
      // WebKit never repeats the thead/tfoot spacers that carry a flowing
      // document's vertical page margins (see WK_PRINT above), so pages
      // after the first print edge-to-edge there. Carry the VERTICAL
      // margins on @page for WebKit instead, and the shadow print CSS
      // trims the first-page spacers by the same amount (.sheet.wk-print
      // rules). Horizontal inset stays on the sheet's own padding in
      // every engine. Blink keeps margin: 0 (a nonzero margin there
      // re-opens the box Chrome draws its header furniture in). One cost,
      // learned in testing: Safari's own date/URL headers are a USER
      // dialog setting ("Print headers and footers") that renders in the
      // margin area when room exists — margin: 0 only suppressed it by
      // leaving no room, and no CSS controls it. The export dialog's
      // Safari guide teaches turning the setting off for flowing
      // documents. Explicitly paginated and fixed-size documents keep
      // margin: 0 everywhere: their pages ARE the sheet.
      const wkFlowing = WK_PRINT && !paginatedNow && !this._trueSizePx() && !this._contentFit();
      const marginDescriptor = wkFlowing ? 'margin: ' + this.pageMargin + ' 0; ' : 'margin: 0; ';
      // Shadow-internal marker (never serialized), kept in lockstep with
      // the @page decision above: the print CSS trims the first-page
      // spacers ONLY while @page actually carries the margins — a
      // true-size or scaled-fit sheet keeps margin: 0 and must keep its
      // spacers too. Re-synced here so attribute changes and pagination
      // flips move both together.
      if (this._sheet) this._sheet.classList.toggle('wk-print', wkFlowing);
      tag.textContent = '@page { ' + sizeDescriptor + marginDescriptor + '} ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** This page's valid true-size page box (explicit width AND height)
     *  as [w, h] px ints, or null when the mode is off. */
    _trueSizePx() {
      if (!safeLen(this.getAttribute('width'), null) || !safeLen(this.getAttribute('height'), null)) return null;
      const w = Math.round(toPx(this.pageWidth));
      const h = Math.round(toPx(this.pageHeight));
      return w > 0 && h > 0 ? [w, h] : null;
    }

    /** True-size pages (explicit width AND height) also declare the page
     *  box as the preview size: the in-app preview reads
     *  meta[name="omelette-fixed-size"] (content "W,H" in px ints) and
     *  scales the sheet into view — without it an 18in poster previews at
     *  true size with scrollbars. Never overrides an author-set meta
     *  (only the component's own id is managed). The meta is page-global
     *  while doc-page instances are not, so every sync recomputes the
     *  page-wide owner — the first connected true-size doc-page — and a
     *  non-true-size sibling's sync can never delete the owner's meta.
     *  Removed when no true-size page remains (the owner's disconnect
     *  re-syncs via any survivor) or when an author-set meta exists. */
    _syncFixedSizeMeta() {
      const id = 'doc-page-fixed-size';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-fixed-size"]:not([data-omelette-injected])');
      // The page-wide owner, not this instance: an upgraded true-size page
      // anywhere in the document keeps the meta alive and sized.
      let box = null;
      for (const el of document.querySelectorAll('doc-page')) {
        box = typeof el._trueSizePx === 'function' ? el._trueSizePx() : null;
        if (box) break;
      }
      if (!box || authored) {
        if (own) own.remove();
        return;
      }
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-fixed-size';
      tag.content = box[0] + ',' + box[1];
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }

    /** This page's print-sizing mode: 'fixed' when an explicit width AND
     *  height are authored (the page is the design's own size), else the
     *  default paper in the authored orientation. */
    _printSizingMode() {
      if (this._trueSizePx()) return 'fixed';
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? 'default-landscape' : 'default-portrait';
    }

    /** Announces the print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] with content 'default-portrait',
     *  'default-landscape', or 'fixed' (fixed pages also carry the
     *  omelette-fixed-size meta with the page box in px). The export path
     *  probes it to decide what true paper size to inject at print time —
     *  in the default modes the component emits no paper size of its own.
     *  Same page-global ownership rules as the fixed-size meta above:
     *  first connected doc-page owns it, an authored meta is never
     *  overridden, removed when no doc-page remains. */
    _syncPrintSizingMeta() {
      const id = 'doc-page-print-sizing';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-print-sizing"]:not([data-omelette-injected])');
      // A fixed page wins outright (mirroring the fixed-size loop above,
      // so the two metas can never contradict each other in a mixed
      // multi-page document); otherwise the first page's mode holds.
      let mode = null;
      for (const el of document.querySelectorAll('doc-page')) {
        if (typeof el._printSizingMode !== 'function') continue;
        const m = el._printSizingMode();
        if (m === 'fixed') {
          mode = m;
          break;
        }
        if (mode === null) mode = m;
      }
      if (!mode || authored) {
        if (own) own.remove();
        return;
      }
      // A deck-stage that connected first injected its own meta and
      // defers to any existing one — take it over, or the document ends
      // up with two conflicting injected metas (a doc-page page is the
      // document; the deck re-ensures its meta if every doc-page leaves).
      const deckMeta = document.getElementById('deck-stage-print-sizing');
      if (deckMeta) deckMeta.remove();
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-print-sizing';
      tag.content = mode;
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. The
     *  same pass detects explicit pagination (direct .page children) and
     *  toggles the sheet between the flowing-document card and the
     *  page-per-card stack — content edits can add or remove pages at any
     *  time, so this tracks the same mutations the measurement does. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      const wasPaginated = this._sheet.classList.contains('paginated');
      this._sheet.classList.toggle('paginated', this.querySelector(':scope > .page') !== null);
      // The WebKit @page margin is flowing-only, so a pagination flip
      // must re-emit the rule (content edits can add or remove .page
      // sections at any time).
      if (this._sheet.classList.contains('paginated') !== wasPaginated) {
        this._syncPrintPageRule();
      }
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "guidelines/doc-page.js", error: String((e && e.message) || e) }); }

// ui_kits/console/DashboardScreen.jsx
try { (() => {
// Entersys Console — Dashboard screen (KPIs + process table + activity)
function DashboardScreen() {
  const {
    StatCard,
    Icon,
    Card
  } = window.EntersysDesignSystem_ad8f35;
  const activity = [{
    who: "Ana Ruiz",
    what: "cerró el proceso de Onboarding",
    when: "hace 12 min",
    icon: "check_circle"
  }, {
    who: "Sistema",
    what: "detectó un retraso en Auditoría ISO",
    when: "hace 1 h",
    icon: "warning"
  }, {
    who: "Luis M.",
    what: "publicó el tablero de Finanzas",
    when: "hace 3 h",
    icon: "bar_chart"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22,
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Procesos activos",
    value: 128,
    delta: "+12%",
    trend: "up",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "account_tree",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Tiempo de ciclo",
    value: "4.2",
    unit: "d\xEDas",
    delta: "-8%",
    trend: "down",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "schedule",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Automatizados",
    value: "67%",
    delta: "+5%",
    trend: "up",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "bolt",
      size: 18
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Ahorro mensual",
    value: "$240K",
    tone: "dark",
    delta: "+3%",
    trend: "up",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "trending_up",
      size: 18
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.7fr 1fr",
      gap: 18,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(ProcessTable, null), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-title)",
      fontSize: "1.125rem",
      fontWeight: 600,
      color: "var(--text-strong)",
      margin: "0 0 16px"
    }
  }, "Actividad reciente"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, activity.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 32,
      height: 32,
      borderRadius: 8,
      background: "var(--ent-teal-50)",
      color: "var(--ent-teal-600)",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: a.icon,
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.875rem",
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-strong)",
      fontWeight: 600
    }
  }, a.who), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-body)"
    }
  }, " ", a.what), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-muted)",
      fontSize: "0.75rem",
      marginTop: 2
    }
  }, a.when))))))));
}
window.DashboardScreen = DashboardScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/LoginScreen.jsx
try { (() => {
// Entersys Console — Login screen (split: brand panel + form)
function LoginScreen({
  onLogin
}) {
  const {
    Button,
    Input,
    Icon,
    Checkbox
  } = window.EntersysDesignSystem_ad8f35;
  const [remember, setRemember] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100%",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 46%",
      background: "var(--ent-navy-800)",
      color: "#fff",
      padding: "48px 46px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/entersys_isotype_white.png",
    alt: "Entersys",
    style: {
      height: 40
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-title)",
      fontWeight: 600,
      fontSize: "1.5rem"
    }
  }, "Entersys")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-title)",
      fontSize: "0.75rem",
      letterSpacing: ".1em",
      textTransform: "uppercase",
      color: "var(--ent-gold-500)",
      fontWeight: 600,
      marginBottom: 14
    }
  }, "Console"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-title)",
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1.15,
      color: "#fff",
      margin: 0
    }
  }, "Ve si est\xE1s ganando o perdiendo en 3 segundos."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "1rem",
      color: "#9fb0bd",
      marginTop: 16,
      lineHeight: 1.6
    }
  }, "Tus procesos, tableros y equipo en un solo lugar. Listos para operar desde el d\xEDa uno.")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.8125rem",
      color: "rgba(255,255,255,0.45)"
    }
  }, "\xA9 Entersys \xB7 Consultor\xEDa en gesti\xF3n y digitalizaci\xF3n"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: -80,
      bottom: -80,
      width: 320,
      height: 320,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(0,156,166,0.28), transparent 70%)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 54%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 360,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-title)",
      fontSize: "1.75rem",
      fontWeight: 700,
      color: "var(--text-strong)",
      margin: 0
    }
  }, "Bienvenido de vuelta"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.9375rem",
      color: "var(--text-muted)",
      margin: "6px 0 0"
    }
  }, "Entra a tu consola de operaci\xF3n.")), /*#__PURE__*/React.createElement(Input, {
    label: "Correo",
    placeholder: "tu@empresa.com",
    defaultValue: "maria@grupoaurora.mx",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 16
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Contrase\xF1a",
    type: "password",
    defaultValue: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 16
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: remember,
    onChange: setRemember,
    label: "Recordarme"
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.875rem"
    }
  }, "\xBFOlvidaste tu contrase\xF1a?")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    onClick: onLogin
  }, "Entrar a mi consola"))));
}
window.LoginScreen = LoginScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/LoginScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/ProcessTable.jsx
try { (() => {
// Entersys Console — Process table
function ProcessTable() {
  const {
    Badge,
    Icon
  } = window.EntersysDesignSystem_ad8f35;
  const rows = [{
    name: "Alta de proveedores",
    owner: "Compras",
    progress: 92,
    status: "En operación",
    tone: "success"
  }, {
    name: "Cierre contable mensual",
    owner: "Finanzas",
    progress: 64,
    status: "En curso",
    tone: "teal"
  }, {
    name: "Control de calidad — línea 3",
    owner: "Calidad",
    progress: 38,
    status: "Pendiente",
    tone: "warning"
  }, {
    name: "Onboarding de personal",
    owner: "RH",
    progress: 100,
    status: "Automatizado",
    tone: "gold"
  }, {
    name: "Auditoría ISO 9001",
    owner: "Calidad",
    progress: 21,
    status: "Retrasado",
    tone: "danger"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-md)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 22px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-title)",
      fontSize: "1.125rem",
      fontWeight: 600,
      color: "var(--text-strong)",
      margin: 0
    }
  }, "Procesos activos"), /*#__PURE__*/React.createElement("button", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      border: "1px solid var(--border-brand)",
      background: "transparent",
      color: "var(--text-accent)",
      borderRadius: 8,
      padding: "8px 14px",
      fontFamily: "var(--font-body)",
      fontWeight: 600,
      fontSize: "0.875rem",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "add",
    size: 17
  }), " Nuevo proceso")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      textAlign: "left",
      fontSize: "0.75rem",
      color: "var(--text-muted)",
      textTransform: "uppercase",
      letterSpacing: ".05em"
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: "12px 22px",
      fontWeight: 600
    }
  }, "Proceso"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: "12px 22px",
      fontWeight: 600
    }
  }, "Responsable"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: "12px 22px",
      fontWeight: 600,
      width: 200
    }
  }, "Avance"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: "12px 22px",
      fontWeight: 600
    }
  }, "Estado"))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: r.name,
    style: {
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "14px 22px",
      fontWeight: 500,
      color: "var(--text-strong)",
      fontSize: "0.9375rem"
    }
  }, r.name), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "14px 22px",
      color: "var(--text-body)",
      fontSize: "0.875rem"
    }
  }, r.owner), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "14px 22px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 6,
      background: "var(--surface-muted)",
      borderRadius: 999
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: r.progress + "%",
      height: "100%",
      background: r.progress === 100 ? "var(--ent-gold-500)" : "var(--ent-teal-500)",
      borderRadius: 999
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.75rem",
      color: "var(--text-muted)",
      width: 34
    }
  }, r.progress, "%"))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "14px 22px"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: r.tone
  }, r.status)))))));
}
window.ProcessTable = ProcessTable;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/ProcessTable.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/Sidebar.jsx
try { (() => {
// Entersys Console — Sidebar navigation (navy, brand mark, teal active state)
function Sidebar({
  active,
  onNav
}) {
  const {
    Icon
  } = window.EntersysDesignSystem_ad8f35;
  const items = [{
    id: "resumen",
    label: "Resumen",
    icon: "dashboard"
  }, {
    id: "procesos",
    label: "Procesos",
    icon: "account_tree"
  }, {
    id: "tableros",
    label: "Tableros",
    icon: "bar_chart"
  }, {
    id: "equipo",
    label: "Equipo",
    icon: "group"
  }, {
    id: "reportes",
    label: "Reportes",
    icon: "description"
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 240,
      flexShrink: 0,
      background: "var(--ent-navy-800)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      padding: "20px 14px",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "4px 8px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/entersys_isotype_white.png",
    alt: "Entersys",
    style: {
      height: 34
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-title)",
      fontWeight: 600,
      fontSize: "1.25rem",
      color: "#fff"
    }
  }, "Entersys")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, items.map(it => {
    const on = active === it.id;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onNav(it.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--font-body)",
        fontSize: "0.9375rem",
        fontWeight: on ? 600 : 500,
        background: on ? "var(--ent-teal-500)" : "transparent",
        color: on ? "#fff" : "rgba(255,255,255,0.72)",
        transition: "background 120ms ease"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: it.icon,
      size: 18
    }), it.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      padding: "14px 12px",
      background: "rgba(255,255,255,0.05)",
      borderRadius: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-title)",
      fontWeight: 600,
      fontSize: "0.8125rem",
      color: "var(--ent-gold-500)",
      marginBottom: 4
    }
  }, "Plan Operaci\xF3n"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.75rem",
      color: "rgba(255,255,255,0.6)",
      lineHeight: 1.4
    }
  }, "8 de 12 procesos automatizados este mes.")));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/Topbar.jsx
try { (() => {
// Entersys Console — Topbar with search, tabs and user
function Topbar({
  tab,
  onTab
}) {
  const {
    Icon,
    Tabs,
    Badge
  } = window.EntersysDesignSystem_ad8f35;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 0,
      borderBottom: "1px solid var(--border-subtle)",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "14px 28px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "0.75rem",
      color: "var(--text-muted)",
      textTransform: "uppercase",
      letterSpacing: ".06em",
      fontWeight: 600
    }
  }, "Operaciones \xB7 Grupo Aurora"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-title)",
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "var(--text-strong)",
      margin: "2px 0 0"
    }
  }, "Resumen de procesos")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: 40,
      padding: "0 12px",
      background: "var(--surface-muted)",
      borderRadius: 8,
      width: 240,
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Buscar procesos\u2026",
    style: {
      border: "none",
      background: "transparent",
      outline: "none",
      fontFamily: "var(--font-body)",
      fontSize: "0.875rem",
      flex: 1,
      color: "var(--text-strong)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      position: "relative",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--text-muted)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "notifications",
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -2,
      right: -2,
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--ent-teal-500)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      background: "var(--ent-teal-600)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-title)",
      fontWeight: 600,
      fontSize: "0.875rem"
    }
  }, "MR")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 28px"
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: ["Resumen", "Procesos", "Tableros", "Equipo"],
    value: tab,
    onChange: onTab
  })));
}
window.Topbar = Topbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/Topbar.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.DonutChart = __ds_scope.DonutChart;

__ds_ns.Infolet = __ds_scope.Infolet;

__ds_ns.ProgressRing = __ds_scope.ProgressRing;

__ds_ns.Sparkline = __ds_scope.Sparkline;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
