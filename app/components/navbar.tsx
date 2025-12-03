"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Kontakt", href: "#kontakt" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Zürcher Unterland</span>
          <span className="hidden text-xl font-semibold sm:inline">Räumungen</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <Button asChild>
            <a href="#kontakt">Jetzt anfragen</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 border-t bg-background md:hidden">
          <nav className="container flex flex-col gap-4 py-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="w-full">
              <a href="#kontakt" onClick={() => setIsOpen(false)}>
                Jetzt anfragen
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export { Navbar };
