import Image from "next/image";
import { Button } from "@/components/ui/button";

export function FeaturedBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="relative w-full h-[110px] sm:h-[260px] lg:h-[500px]">
        {/* Mobile Image */}
        <div className="w-full flex justify-center">
          <Image
            src="/Newbanner.png"
            alt="hero"
            width={600}
            height={600}
            className="w-[100%] sm:w-[100%] md:w-[600px] h-auto object-contain "
          />
        </div>


        {/* Desktop Image */}
        <Image
          src="/Newbanner.png"
          alt="Jackets & Hoodies Collection"
          fill
          priority
          sizes="100vw"
          className="object-contain hidden lg:block"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
}