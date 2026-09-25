"use client";

import { useEffect, useState } from "react";
import { brand, navLinks } from "@/content/celia";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header-bar">
        <a className="site-header-brand" href="#top" aria-label={brand.name}>
          {brand.name}
        </a>

        <nav className="site-header-nav" aria-label="Navigation principale">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="site-header-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`site-header-mobile${open ? " open" : ""}`}
        aria-label="Navigation mobile"
      >
        {open &&
          navLinks.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
      </nav>
    </header>
  );
}
