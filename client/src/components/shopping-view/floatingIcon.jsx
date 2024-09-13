import { facebook, zalo, phone, showroom } from "../../assets";
import { motion } from "framer-motion";

function FloatingIcon() {
  return (
    <div className="fixed bottom-4 left-4 flex flex-col space-y-2 gap-2">
      <motion.div
        className="box"
        whileHover={{ scale: [null, 1.5, 1.4] }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={facebook}
          alt="facebook"
          width={40}
          height={40}
          className="rounded-full p-1 bg-blue-500 hover:bg-blue-600 transition-colors"
        />{" "}
      </motion.div>

      <motion.div
        className="box"
        whileHover={{ scale: [null, 1.5, 1.4] }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={zalo}
          alt="zalo"
          width={40}
          height={40}
          className="rounded-full p-1 bg-blue-500 hover:bg-blue-600 transition-colors object-cover"
        />
      </motion.div>

      <motion.div
        className="box"
        whileHover={{ scale: [null, 1.5, 1.4] }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={phone}
          alt="phone"
          width={40}
          height={40}
          className="rounded-full p-1 bg-red-500 hover:bg-red-600 transition-colors"
        />
      </motion.div>

      <motion.div
        className="box"
        whileHover={{ scale: [null, 1.5, 1.4] }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={showroom}
          alt="showroom"
          width={40}
          height={40}
          className="rounded-full p-1 bg-yellow-500 hover:bg-yellow-600 transition-colors"
        />
      </motion.div>
    </div>
  );
}
export default FloatingIcon;
