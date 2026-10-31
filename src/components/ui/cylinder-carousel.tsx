
import React from "react";

export interface CarouselImage {
    src: string;
    alt?: string;
}

interface CylinderCarouselProps {
    images: CarouselImage[];
    className?: string;
    animationDuration?: number;
    cardWidth?: number;
}

export function CylinderCarousel({
    images,
    className = "",
    animationDuration = 35,
    cardWidth = 460,
}: CylinderCarouselProps) {
    const count = images.length;

    if (count === 0) return null;

    const style = {
        "--n": count,
        "--w": `${cardWidth}px`,
        "--ba": "calc(1turn / var(--n))",
        "--anim-dur": `${animationDuration}s`,
    } as React.CSSProperties;

    return (
        <div
            className={`grid min-h-[420px] w-full place-items-center overflow-hidden ${className}`}
            style={{
                perspective: "55em",
                maskImage:
                    "linear-gradient(90deg, transparent, #000 12% 88%, transparent)",
                WebkitMaskImage:
                    "linear-gradient(90deg, transparent, #000 12% 88%, transparent)",
            }}
        >
            <div
                className="grid place-items-center [transform-style:preserve-3d]"
                style={{
                    ...style,
                    animation: "dashboard-cylinder var(--anim-dur) linear infinite",
                }}
            >
                <style>
                    {`
            @keyframes dashboard-cylinder {
              to {
                transform: rotateY(1turn);
              }
            }

            .dashboard-cylinder:hover {
              animation-play-state: paused;
            }

            @media (prefers-reduced-motion: reduce) {
              .dashboard-cylinder {
                animation: none !important;
              }
            }
          `}
                </style>

                {images.map((image, index) => (
                    <div
                        key={`${image.src}-${index}`}
                        className="dashboard-cylinder [grid-area:1/1] overflow-hidden rounded-xl border border-border bg-white shadow-2xl [backface-visibility:hidden]"
                        style={{
                            width: "var(--w)",
                            aspectRatio: "16 / 9",
                            transform: `rotateY(calc(${index} * var(--ba))) translateZ(calc(-1 * (0.5 * var(--w) + 0.5em) / tan(0.5 * var(--ba))))`,
                        }}
                    >
                        <a
                            href={image.src}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${image.alt || "dashboard"} full size`}
                            className="block h-full w-full"
                        >
                            <img
                                src={image.src}
                                alt={image.alt || `Dashboard ${index + 1}`}
                                className="h-full w-full object-contain"
                                loading="lazy"
                            />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
