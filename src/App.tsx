import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';

const App = () => {
  const firstWord = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: animationRef });

  const [screenSize, setScreenSize] = useState({ width: 400, height: 100 });
  const [scrolValue, setScrollValue] = useState(0);
  const [leftSpace, setLeftSpace] = useState(0);

  const top = useTransform(scrollYProgress, [0, 0.2], [screenSize.height, 0]);
  const width = useTransform(
    scrollYProgress,
    [0.4, 0.8],
    [screenSize.width, 400]
  );
  const height = useTransform(
    scrollYProgress,
    [0.4, 0.8],
    [screenSize.height, 100]
  );

  const left = useTransform(scrollYProgress, [0.4, 0.8], [0, leftSpace]);

  useMotionValueEvent(scrollYProgress, 'change', setScrollValue);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      console.log('🚀 ~ :45 ~ firstWord.current:', firstWord.current);
      if (!firstWord.current) return;

      setLeftSpace(firstWord.current?.clientWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main>
      <section className="h-[200vh] bg-red-800 flex justify-center items-center text-5xl text-white">
        Section 1
      </section>
      <section ref={animationRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-screen">
          <span className="absolute top-0 right-0 text-2xl">
            Scroll: {scrolValue}
          </span>
          <div className="flex gap-2 text-7xl">
            <span ref={firstWord}>Truly</span>
            <div style={{ width: 400 }} />
            <motion.div
              className="absolute bg-orange-500"
              style={{ top, width, height, left }}
            >
              <span>LOGOS</span>
            </motion.div>
            <span>Loved</span>
          </div>
        </div>
      </section>
      <section className="h-[200vh] bg-green-800 flex justify-center items-center text-5xl text-white">
        Section 3
      </section>
    </main>
  );
};

export default App;
