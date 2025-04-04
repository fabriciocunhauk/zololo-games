"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 py-6 bg-pink-primary w-full">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
