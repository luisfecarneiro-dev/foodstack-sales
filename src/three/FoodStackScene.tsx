"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero ambience: one luminous wireframe "plating" formation.
 * Decorative only (`aria-hidden`), DPR-capped, fully disposed on
 * unmount, and silently absent when WebGL fails or motion is reduced.
 */
export function FoodStackScene({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    host.appendChild(canvas);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power"
      });
    } catch {
      canvas.remove();
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.6, 7);

    const group = new THREE.Group();
    group.position.x = 1.6;
    scene.add(group);

    const materials: THREE.MeshBasicMaterial[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    const ring = (radius: number, tube: number, color: number, opacity: number) => {
      const geometry = new THREE.TorusGeometry(radius, tube, 8, 96);
      const material = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity
      });
      geometries.push(geometry);
      materials.push(material);
      return new THREE.Mesh(geometry, material);
    };

    const outer = ring(2.15, 0.018, 0xe7b05b, 0.22);
    const mid = ring(1.55, 0.016, 0xd88732, 0.18);
    const knot = (() => {
      const geometry = new THREE.TorusKnotGeometry(0.82, 0.13, 110, 8, 2, 3);
      const material = new THREE.MeshBasicMaterial({
        color: 0xa55d32,
        wireframe: true,
        transparent: true,
        opacity: 0.2
      });
      geometries.push(geometry);
      materials.push(material);
      return new THREE.Mesh(geometry, material);
    })();

    outer.rotation.x = Math.PI * 0.32;
    mid.rotation.x = Math.PI * 0.12;
    mid.rotation.y = 0.5;
    group.add(outer, mid, knot);

    const resize = () => {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer?.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let pointerX = 0;
    const onPointer = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    const start = performance.now();
    const render = (now: number) => {
      const t = (now - start) / 1000;
      group.rotation.y = t * 0.07 + pointerX * 0.12;
      mid.rotation.z = t * 0.05;
      knot.rotation.x = t * 0.06;
      group.position.y = Math.sin(t * 0.3) * 0.08;
      renderer?.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer?.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className={className} aria-hidden="true" />;
}
