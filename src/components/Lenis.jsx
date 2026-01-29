import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { tr } from 'framer-motion/client'

export default function LenisProvider({ children }) {
    useEffect(() => {

        const lenis = new Lenis({
            duration: 1.9,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    return children
}