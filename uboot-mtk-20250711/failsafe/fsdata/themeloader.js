/* SPDX-License-Identifier: GPL-2.0 */
/*
 * Copyright (C) 2026 Yuzhii0718
 *
 * All rights reserved.
 *
 * This file is part of the project bl-mt798x-dhcpd
 * You may not use, copy, modify or distribute this file except in compliance with the license agreement.
 */
(function () {
	function normalizeHexColor(input) {
		var s, hex;
		if (!input) return null;
		s = String(input).trim();
		if (s === "") return null;
		if (s[0] === "#") s = s.slice(1);
		if (!/^[0-9a-fA-F]{3}$/.test(s) && !/^[0-9a-fA-F]{6}$/.test(s)) return null;
		if (s.length === 3) {
			hex = "#" + s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
		} else {
			hex = "#" + s;
		}
		return hex.toLowerCase();
	}

	function normalizeThemeMode(input) {
		if (!input) return null;
		var s = String(input).trim().toLowerCase();
		if (s === "auto" || s === "light" || s === "dark") return s;
		return null;
	}

	function hexToRgb(hex) {
		var n = normalizeHexColor(hex);
		if (!n) return null;
		return {
			r: parseInt(n.slice(1, 3), 16),
			g: parseInt(n.slice(3, 5), 16),
			b: parseInt(n.slice(5, 7), 16)
		};
	}

	function blendColor(hex, targetHex, t) {
		var a = hexToRgb(hex);
		var b = hexToRgb(targetHex);
		if (!a || !b) return hex;
		var r = Math.round(a.r + (b.r - a.r) * t);
		var g = Math.round(a.g + (b.g - a.g) * t);
		var b2 = Math.round(a.b + (b.b - a.b) * t);
		return "#" + r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b2.toString(16).padStart(2, "0");
	}

	try {
		var cached = localStorage.getItem("failsafe_theme_color_cache");
		var cachedTheme = localStorage.getItem("theme");
		var norm = normalizeHexColor(cached);
		var themeMode = normalizeThemeMode(cachedTheme);
		var rgb;
		var root;
		var lighter;
		var meta;
		root = document.documentElement;
		if (themeMode && themeMode !== "auto")
			root.setAttribute("data-theme", themeMode);
		else
			root.removeAttribute("data-theme");
		if (!norm) return;
		rgb = hexToRgb(norm);
		if (!rgb) return;
		root.style.setProperty("--primary", norm);
		root.style.setProperty("--primary-rgb", rgb.r + ", " + rgb.g + ", " + rgb.b);
		lighter = blendColor(norm, "#ffffff", 0.28);
		root.style.setProperty("--primary-2", lighter);
		meta = document.querySelector("meta[name='theme-color']");
		if (!meta) {
			meta = document.createElement("meta");
			meta.setAttribute("name", "theme-color");
			document.head && document.head.appendChild(meta);
		}
		meta.setAttribute("content", norm);
	} catch (e) {
		/* ignore storage errors */
	}
})();
