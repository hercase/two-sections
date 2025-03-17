import  { useRef } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'

const App = () => {
  const animationRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: animationRef, offset: ['-15%', '0%'] })

  const top = useTransform(scrollYProgress, [0, 1], ['999px', '0px'])
  const width = useTransform(scrollYProgress, [0, 1], ['1920px', '400px'])

  useMotionValueEvent(width, "change", (latest) => {
    console.log("Page scroll: ", latest)
  })

  return (
    <main>
      <section className='h-[200vh] bg-red-800 flex justify-center items-center text-5xl text-white'>
        Section 1
      </section>
      <section ref={animationRef} className='relative h-[400vh]'>
        <div className='sticky top-0 h-screen w-screen'>

          <div className='flex gap-2 text-7xl'>
            Trully
            <div className='relative w-[400px] border-2'>

            <motion.div className='absolute bg-orange-500 h-[300px]'
            style={{ top, width: width }}
            
            >LOGOS</motion.div>
            </div>
            LAB
          </div>
        </div>
      </section>
      <section className='h-[200vh] bg-green-800 flex justify-center items-center text-5xl text-white'>
        Section 3
      </section>
    </main>
  )
}

export default App