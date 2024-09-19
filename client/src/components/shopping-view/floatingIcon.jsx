import { facebook, zalo, phone, showroom } from "../../assets";
import { motion } from "framer-motion";

function FloatingIcon() {
  return (
    <div className="fixed bottom-4 left-4 flex flex-col space-y-2 gap-2">
      <motion.a
        href={`https://www.facebook.com/profile.php?id=100014666566666`}
        className={`flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-blue-500 text-white shadow-lg`}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 1, x: 0 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 20, 0, -20, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1.8,
          }}
        >
          <img
            src={facebook}
            alt="facebook"
            width={32}
            height={32}
            className="rounded-full p-1 bg-blue-500 hover:bg-blue-600 transition-colors object-cover md:w-10 md:h-10"
          />
        </motion.div>
      </motion.a>
      <motion.a
        href={`https://zalo.me/0914556996`}
        className={`flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-blue-500 text-white shadow-lg`}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 1, x: 0 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 20, 0, -20, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1.8,
          }}
        >
          <img
            src={zalo}
            alt="zalo"
            width={32}
            height={32}
            className="rounded-full p-1 bg-blue-500 hover:bg-blue-600 transition-colors object-cover md:w-10 md:h-10"
          />
        </motion.div>
      </motion.a>
      <motion.a
        href={`tel:0914556996`}
        className={`flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-red-500 text-white shadow-lg`}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 1, x: 0 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 20, 0, -20, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1.8,
          }}
        >
          <img
            src={phone}
            alt="phone"
            width={32}
            height={32}
            className="rounded-full p-1 bg-red-500 hover:bg-red-600 transition-colors md:w-10 md:h-10"
          />
        </motion.div>
      </motion.a>
      <motion.a
        href={`https://maps.app.goo.gl/8KnggH3gUMkHFF199`}
        className={`flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-yellow-500 text-white shadow-lg`}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 1, x: 0 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 20, 0, -20, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1.8,
          }}
        >
          <img
            src={showroom}
            alt="showroom"
            width={32}
            height={32}
            className="rounded-full p-1 bg-yellow-500 hover:bg-yellow-600 transition-colors md:w-10 md:h-10"
          />
        </motion.div>
      </motion.a>
    </div>
  );
}
export default FloatingIcon;
