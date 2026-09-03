"use client";

/**
 * HeroCanvas — Three.js wireframe icosahedron with connected nodes.
 * Pure client component. Loaded dynamically (no SSR) in the Hero.
 *
 * Design: floating wireframe icosahedron (#5e6ad2, opacity 0.6),
 * slowly rotating. 5 small node-spheres orbiting it, connected by
 * SVG lines that update each frame. Soft radial glow behind.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ACCENT   = 0x5e6ad2;
const NODE_COUNT = 5;

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    /* ── Renderer ──────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* ── Scene / Camera ────────────────────────────────────── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);

    /* ── Icosahedron wireframe ─────────────────────────────── */
    const geoIco      = new THREE.IcosahedronGeometry(1.4, 1);
    const matWire     = new THREE.MeshBasicMaterial({
      color:       ACCENT,
      wireframe:   true,
      transparent: true,
      opacity:     0.55,
    });
    const mesh = new THREE.Mesh(geoIco, matWire);
    scene.add(mesh);

    /* ── Node spheres ──────────────────────────────────────── */
    const nodeMat    = new THREE.MeshBasicMaterial({
      color:       ACCENT,
      transparent: true,
      opacity:     0.85,
    });
    const nodeGeo    = new THREE.SphereGeometry(0.055, 8, 8);
    const nodes: THREE.Mesh[] = [];
    const nodeAngles: number[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const n = new THREE.Mesh(nodeGeo, nodeMat.clone());
      nodes.push(n);
      nodeAngles.push((i / NODE_COUNT) * Math.PI * 2);
      scene.add(n);
    }

    /* ── SVG overlay for connection lines ──────────────────── */
    const svgNS  = "http://www.w3.org/2000/svg";
    const svg    = document.createElementNS(svgNS, "svg") as SVGSVGElement;
    svg.setAttribute("width",  String(W));
    svg.setAttribute("height", String(H));
    svg.style.position = "absolute";
    svg.style.top      = "0";
    svg.style.left     = "0";
    svg.style.pointerEvents = "none";
    container.style.position = "relative";
    container.appendChild(svg);

    /* Pre-create lines: connect each node to the center + to next node */
    const lineEls: SVGLineElement[] = [];
    const totalLines = NODE_COUNT * 2;
    for (let i = 0; i < totalLines; i++) {
      const line = document.createElementNS(svgNS, "line") as SVGLineElement;
      line.setAttribute("stroke", "#5e6ad2");
      line.setAttribute("stroke-width", "0.8");
      line.setAttribute("stroke-opacity", "0.35");
      svg.appendChild(line);
      lineEls.push(line);
    }

    /* Helper: project 3D → 2D screen px */
    const tmp = new THREE.Vector3();
    function project(obj: THREE.Object3D): { x: number; y: number } {
      obj.getWorldPosition(tmp);
      tmp.project(camera);
      return {
        x: ((tmp.x + 1) / 2) * W,
        y: ((-tmp.y + 1) / 2) * H,
      };
    }

    /* ── Resize handler ────────────────────────────────────── */
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      svg.setAttribute("width",  String(w));
      svg.setAttribute("height", String(h));
    };
    window.addEventListener("resize", onResize);

    /* ── Subtle mouse parallax ─────────────────────────────── */
    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 0.4;
      my = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMouse);

    /* ── Animation loop ────────────────────────────────────── */
    let raf: number;
    let t = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.006;

      /* Rotate mesh */
      mesh.rotation.x = t * 0.22 + my * 0.6;
      mesh.rotation.y = t * 0.35 + mx * 0.6;

      /* Orbit nodes on varying radii / elevations */
      const CENTER = new THREE.Vector3(0, 0, 0);
      nodes.forEach((n, i) => {
        const angle  = nodeAngles[i] + t * (0.3 + i * 0.07);
        const radius = 1.8 + Math.sin(t * 0.5 + i) * 0.3;
        const elev   = Math.sin(t * 0.4 + i * 1.3) * 0.6;
        n.position.set(
          Math.cos(angle) * radius,
          elev,
          Math.sin(angle) * radius * 0.6,
        );
      });

      /* Update SVG lines */
      // compute center projection manually
      const cTmp = new THREE.Vector3(0, 0, 0).project(camera);
      const cx   = ((cTmp.x + 1) / 2) * W;
      const cy   = ((-cTmp.y + 1) / 2) * H;

      nodes.forEach((n, i) => {
        const np = project(n);

        // node → center
        const lCenter = lineEls[i];
        lCenter.setAttribute("x1", String(np.x));
        lCenter.setAttribute("y1", String(np.y));
        lCenter.setAttribute("x2", String(cx));
        lCenter.setAttribute("y2", String(cy));

        // node → next node
        const next = nodes[(i + 1) % NODE_COUNT];
        const np2  = project(next);
        const lNext = lineEls[NODE_COUNT + i];
        lNext.setAttribute("x1", String(np.x));
        lNext.setAttribute("y1", String(np.y));
        lNext.setAttribute("x2", String(np2.x));
        lNext.setAttribute("y2", String(np2.y));
      });

      renderer.render(scene, camera);
    };
    animate();

    /* ── Cleanup ────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",     onResize);
      window.removeEventListener("mousemove",  onMouse);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      if (container.contains(svg)) container.removeChild(svg);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full"
    />
  );
}
