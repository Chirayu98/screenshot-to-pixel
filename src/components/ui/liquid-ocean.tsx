"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { cn } from "@/lib/utils";

// Initialize RectAreaLight uniforms if in browser
if (typeof window !== "undefined") {
  try {
    RectAreaLightUniformsLib.init();
  } catch {
    // Ignore if already initialized
  }
}

const DEFAULT_THEME = {
  background: 0x000000,
  gridColor: 0x333333,
  accentColor: 0xf00589,
};

export interface LiquidOceanProps {
  className?: string;
  backgroundColor?: number;
  gridColor?: number;
  accentColor?: number;
  fov?: number;
  rotationSpeed?: number;
  showGrid?: boolean;
  showBoats?: boolean;
  boatCount?: number;
  boatSpread?: number;
  oceanSize?: number;
  oceanFragments?: number;
  waveAmplitude?: number;
  waveSpeed?: number;
  showWireframe?: boolean;
  oceanOpacity?: number;
  children?: React.ReactNode;
}

interface BoatItem {
  mesh: THREE.Mesh;
  vel: number;
  amp: number;
  pos: number;
}

export function LiquidOcean({
  className,
  backgroundColor = DEFAULT_THEME.background,
  gridColor = DEFAULT_THEME.gridColor,
  accentColor = DEFAULT_THEME.accentColor,
  fov = 20,
  rotationSpeed = 0.001,
  showGrid = true,
  showBoats = true,
  boatCount = 5,
  boatSpread = 5,
  oceanSize = 25,
  oceanFragments = 25,
  waveAmplitude = 0.2,
  waveSpeed = 0.05,
  showWireframe = true,
  oceanOpacity = 0.85,
  children,
}: LiquidOceanProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isVisible = true;
    let animationFrameId: number;

    // SCENE & FOG
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(backgroundColor, 5, 20);
    scene.background = new THREE.Color(backgroundColor);

    // CAMERA
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;

    // LIGHTING
    const hemiLight = new THREE.HemisphereLight(0xffd3d3, accentColor, 2);
    scene.add(hemiLight);

    const pointLight1 = new THREE.PointLight(accentColor, 1);
    pointLight1.position.set(-5, -20, -20);
    scene.add(pointLight1);

    const rectLight = new THREE.RectAreaLight(accentColor, 20, 3, 3);
    rectLight.position.set(2, 2, -20);
    rectLight.lookAt(0, 0, 0);
    scene.add(rectLight);

    const pointLight2 = new THREE.PointLight(accentColor, 0.1);
    pointLight2.position.set(0, 2, -2);
    scene.add(pointLight2);

    // ROTATING GROUP
    const group = new THREE.Group();
    scene.add(group);

    // GRID
    let grid: THREE.GridHelper | null = null;
    if (showGrid) {
      grid = new THREE.GridHelper(20, 20, gridColor, gridColor);
      grid.position.set(0, -1, 0);
      group.add(grid);
    }

    // BOATS
    const boats: BoatItem[] = [];
    const boatGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boatMaterial = new THREE.MeshStandardMaterial({ color: accentColor });

    if (showBoats) {
      for (let i = 0; i < boatCount; i++) {
        const x = -Math.random() * boatSpread + Math.random() * boatSpread;
        const z = -Math.random() * boatSpread + Math.random() * boatSpread;
        const sX = Math.random() * 0.8 + 0.2;
        const sY = 0.5 + Math.random() * 2;

        const mesh = new THREE.Mesh(boatGeometry, boatMaterial);
        mesh.position.set(x, 0, z);
        mesh.scale.set(sX, sY, sX);
        mesh.rotation.y = (Math.random() * 360 * Math.PI) / 180;
        mesh.castShadow = true;
        group.add(mesh);

        boats.push({
          mesh,
          vel: 1 + Math.random() * 4,
          amp: 1 + Math.random() * 6,
          pos: Math.random() * 0.2,
        });
      }
    }

    // OCEAN MESH & WAVES
    const oceanGeo = new THREE.PlaneGeometry(oceanSize, oceanSize, oceanFragments, oceanFragments);
    const posAttr = oceanGeo.getAttribute("position");
    const waveData: Array<{
      x: number;
      y: number;
      z: number;
      ang: number;
      amp: number;
      speed: number;
    }> = [];

    for (let i = 0; i < posAttr.count; i++) {
      waveData.push({
        x: posAttr.getX(i),
        y: posAttr.getY(i),
        z: posAttr.getZ(i),
        ang: Math.PI * 2,
        amp: Math.random() * waveAmplitude,
        speed: 0.03 + Math.random() * waveSpeed,
      });
    }

    const surfaceMaterial = new THREE.MeshPhysicalMaterial({
      color: accentColor,
      transparent: true,
      opacity: oceanOpacity,
      wireframe: false,
    });
    const oceanMesh = new THREE.Mesh(oceanGeo, surfaceMaterial);
    oceanMesh.receiveShadow = true;

    const oceanGroup = new THREE.Group();
    oceanGroup.rotation.x = (-90 * Math.PI) / 180;
    oceanGroup.add(oceanMesh);

    let wireMaterial: THREE.MeshPhysicalMaterial | null = null;
    let wireMesh: THREE.Mesh | null = null;
    if (showWireframe) {
      wireMaterial = new THREE.MeshPhysicalMaterial({
        color: accentColor,
        wireframe: true,
        transparent: false,
        opacity: 1,
      });
      wireMesh = new THREE.Mesh(oceanGeo, wireMaterial);
      oceanGroup.add(wireMesh);
    }
    group.add(oceanGroup);

    // RESIZE OBSERVER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // INTERSECTION OBSERVER FOR 60FPS IDLE OPTIMIZATION
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    // ANIMATION LOOP
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Camera & Lighting focus
      camera.lookAt(0, 0, 0);
      rectLight.lookAt(0, 0, 0);

      // Rotate whole group
      group.rotation.y += rotationSpeed;

      // Animate Boats
      const boatTime = elapsedTime * 3;
      for (let i = 0; i < boats.length; i++) {
        const b = boats[i];
        b.mesh.rotation.z = (Math.sin(boatTime / b.vel) * b.amp * Math.PI) / 180;
        b.mesh.rotation.x = (Math.cos(boatTime) * b.vel * Math.PI) / 180;
        b.mesh.position.y = Math.sin(boatTime / b.vel) * b.pos;
      }

      // Animate Waves
      const positionAttribute = oceanGeo.getAttribute("position");
      for (let i = 0; i < positionAttribute.count; i++) {
        const wave = waveData[i];
        positionAttribute.setX(i, wave.x + Math.cos(wave.ang) * wave.amp);
        positionAttribute.setY(i, wave.y + Math.sin(wave.ang / 2) * wave.amp);
        positionAttribute.setZ(i, wave.z + Math.cos(wave.ang / 3) * wave.amp);
        wave.ang += wave.speed;
      }
      positionAttribute.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      // Dispose Three objects
      oceanGeo.dispose();
      surfaceMaterial.dispose();
      wireMaterial?.dispose();
      boatGeometry.dispose();
      boatMaterial.dispose();
      grid?.geometry.dispose();
      renderer.dispose();
    };
  }, [
    backgroundColor,
    gridColor,
    accentColor,
    fov,
    rotationSpeed,
    showGrid,
    showBoats,
    boatCount,
    boatSpread,
    oceanSize,
    oceanFragments,
    waveAmplitude,
    waveSpeed,
    showWireframe,
    oceanOpacity,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-black", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full pointer-events-none" />

      {/* Overlay Content */}
      {children && (
        <div className="absolute inset-0 pointer-events-none select-none z-10">
          {children}
        </div>
      )}
    </div>
  );
}

export default LiquidOcean;
