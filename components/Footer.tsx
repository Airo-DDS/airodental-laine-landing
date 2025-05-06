"use client"

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F121E] text-white py-[60px] px-5">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-10">
          <div className="mb-8 md:mb-0">
            <Image 
              src="/laine-footer-logo.png" 
              alt="AiroDental Logo" 
              width={160} 
              height={40} 
              className="max-w-[160px] h-auto"
            />
          </div>
          
          <div className="mr-auto md:mr-0 mb-8 md:mb-0">
            <div className="text-sm uppercase tracking-wider text-white/70 mb-4">MENU</div>
            <ul className="list-none p-0 m-0">
              <li className="mb-3">
                <Link href="#" className="text-white no-underline text-base hover:text-white/80 transition-colors">
                  Overview
                </Link>
              </li>
              <li className="mb-3">
                <Link href="#" className="text-white no-underline text-base hover:text-white/80 transition-colors">
                  Airodental
                </Link>
              </li>
              <li className="mb-3">
                <Link href="#" className="text-white no-underline text-base hover:text-white/80 transition-colors">
                  Saige
                </Link>
              </li>
              <li className="mb-3">
                <Link href="#" className="text-white no-underline text-base hover:text-white/80 transition-colors">
                  Updates
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-6">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            Copyright 2025 @ Airodental
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-white/60 no-underline text-sm hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/60 no-underline text-sm hover:text-white/80 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 