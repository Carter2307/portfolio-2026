import * as motion from 'motion/react-m'
import { useI18n } from '@/i18n'
import { useTextEntrance } from '@/lib/motion'

export function Hero() {
  const { profile } = useI18n().content
  const entrance = useTextEntrance()
  return (
    <header id="about" className="site-hero">
      <motion.div {...entrance.group} className="hero-content">
        <motion.h1 {...entrance.item}>
          {profile.firstName}
          <br />
          {profile.lastName}
          <span className="hero-period">.</span>
        </motion.h1>
        <motion.p {...entrance.item} className="hero-role">
          {profile.role}
        </motion.p>
        <motion.p {...entrance.item} className="hero-intro">
          {profile.intro}
        </motion.p>
      </motion.div>
    </header>
  )
}
