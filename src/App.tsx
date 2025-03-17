import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import Logo1 from './assets/logo-1.png';
import Logo2 from './assets/logo-2.png';

const HEIGHT = 150;
const WIDTH = 400;

const App = () => {
  const firstWord = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: animationRef });

  const [screenSize, setScreenSize] = useState({ width: WIDTH, height: HEIGHT });
  const [scrolValue, setScrollValue] = useState(0);
  const [leftSpace, setLeftSpace] = useState(0);

  // Orange area
  const top = useTransform(scrollYProgress, [0, 0.2], [screenSize.height, 0]);
  const width = useTransform(scrollYProgress, [0.4, 0.8], [screenSize.width, WIDTH]);
  const height = useTransform(scrollYProgress, [0.4, 0.8], [screenSize.height, HEIGHT]);
  const left = useTransform(scrollYProgress, [0.4, 0.8], [0, leftSpace]);

  // Logos
  const logoPosition = useTransform(scrollYProgress, [0.2, 0.4], ['100%', '0%']);

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
      <section className="h-[200vh] bg-red-800 flex justify-center items-center text-5xl text-white">Section 1</section>
      <section ref={animationRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-screen">
          <span className="absolute top-0 right-0 text-2xl">Scroll: {scrolValue}</span>
          <div className="flex gap-2 text-9xl">
            <span ref={firstWord}>Truly</span>
            <div style={{ width: WIDTH }} />
            <motion.div className="absolute bg-orange-500" style={{ top, width, height, left }}>
              <motion.div className="w-full h-full flex justify-center items-center">
                <div className="overflow-hidden">
                  <motion.span className="relative" style={{ left: logoPosition }}>
                    <img className="mr-4" src={Logo1} alt="Logo 1" />
                  </motion.span>
                </div>
                <div className="block w-px h-[250px] bg-white" />
                <div className="overflow-hidden">
                  <motion.span className="relative" style={{ right: logoPosition }}>
                    <img className="ml-4" src={Logo2} alt="Logo 2" />
                  </motion.span>
                </div>
              </motion.div>
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
