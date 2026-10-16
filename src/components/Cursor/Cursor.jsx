import { useEffect, useRef } from 'react';
import './Cursor.scss';

const INTERACTIVE =
    'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        // Solo dispositivos con mouse
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        const root = document.documentElement;

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let visible = false;
        let rafId;

        root.classList.add('has-custom-cursor');

        const show = () => {
            dot.classList.add('is-visible');
            ring.classList.add('is-visible');
            visible = true;
        };

        const hide = () => {
            dot.classList.remove('is-visible');
            ring.classList.remove('is-visible');
            visible = false;
        };

        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

            if (!visible) {
                // Evita que el círculo "vuele" desde la esquina la primera vez
                ringX = mouseX;
                ringY = mouseY;
                show();
            }
        };

        const onOver = (e) => {
            ring.classList.toggle('is-hovering', !!e.target.closest(INTERACTIVE));
        };

        const onDown = () => ring.classList.add('is-pressed');
        const onUp = () => ring.classList.remove('is-pressed');

        const animate = () => {
            ringX += (mouseX - ringX) * 0.15; // velocidad del seguimiento
            ringY += (mouseY - ringY) * 0.15;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            rafId = requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseover', onOver);
        document.addEventListener('mousedown', onDown);
        document.addEventListener('mouseup', onUp);
        root.addEventListener('mouseleave', hide);
        root.addEventListener('mouseenter', show);

        return () => {
            cancelAnimationFrame(rafId);
            root.classList.remove('has-custom-cursor');
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('mouseup', onUp);
            root.removeEventListener('mouseleave', hide);
            root.removeEventListener('mouseenter', show);
        };
    }, []);

    return (
        <>
            <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
        </>
    );
}