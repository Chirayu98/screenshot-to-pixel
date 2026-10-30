import { type ReactNode } from "react";

interface LampEffectProps {
  children?: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function LampEffect({
  children,
  className = "",
}: LampEffectProps) {
  return (
    <div
      className={`relative flex min-h-[480px] w-full flex-col items-center justify-center overflow-hidden bg-background pt-20 ${className}`}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        {/* Left Conic Light Beam */}
        <div
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible bg-gradient-conic from-primary/70 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-background [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-background [mask-image:linear-gradient(to_right,white,transparent)]" />
        </div>

        {/* Right Conic Light Beam */}
        <div
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-primary/70 text-white [--conic-position:from_290deg_at_center_top] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-background [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-background [mask-image:linear-gradient(to_top,white,transparent)]" />
        </div>

        {/* Ambient Top Glow Layer */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-background blur-2xl" />
        <div className="absolute top-1/2 z-30 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Core Glowing Orb */}
        <div className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-primary/40 blur-3xl" />

        {/* Central Hot Spotlight Beam */}
        <div className="absolute inset-auto z-30 h-28 w-[24rem] -translate-y-[4rem] rounded-full bg-primary/25 blur-2xl" />

        {/* Glowing Lamp Filament Bar */}
        <div className="absolute inset-auto z-30 h-0.5 w-[28rem] -translate-y-[7rem] bg-primary shadow-[0_0_40px_12px_rgba(255,74,28,0.7)]" />

        {/* Narrow Bright Laser Center */}
        <div className="absolute inset-auto z-30 h-1 w-48 -translate-y-[7rem] rounded-full bg-white shadow-[0_0_30px_6px_rgba(255,255,255,0.9)]" />

        {/* Subtle Horizontal Extension Line */}
        <div className="absolute inset-auto z-20 h-px w-[44rem] -translate-y-[7rem] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Illuminated Content In Light Cone */}
      <div className="relative z-30 -translate-y-28 flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}

