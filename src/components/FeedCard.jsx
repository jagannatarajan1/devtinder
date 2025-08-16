import { motion, useMotionValue, useTransform } from "framer-motion";
import PropTypes from "prop-types";

const FeedCard = ({ user, onDecision }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);

  const handleDragEnd = (_, info) => {
    if (!user?._id) return;

    const threshold = 140; // how far to drag before it counts as a swipe
    if (info.offset.x < -threshold) {
      // Left swipe → interested
      onDecision?.("interested", user);
    } else if (info.offset.x > threshold) {
      // Right swipe → ignored
      onDecision?.("ignored", user);
    }
    // If not past threshold, Framer snaps back automatically
  };

  if (!user) return null;

  const {
    firstName = "",
    lastName = "",
    profilePic = "",
    skills = [],
    about = "",
    age = "",
  } = user;

  return (
    <motion.div
      className="absolute card bg-base-100 w-96 h-[600px] shadow-xl"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      onDragEnd={handleDragEnd}
    >
      <figure>
        <img
          src={
            profilePic ||
            "https://i.pinimg.com/736x/5e/72/eb/5e72ebebbd623f2cd8a6d855d31ada75.jpg"
          }
          alt="person"
          className="w-full h-64 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName + " " + lastName} {age}
        </h2>
        <p>{about}</p>
        <p>
          Skills: {skills.length > 0 ? skills.join(", ") : "No skills listed"}
        </p>
      </div>
    </motion.div>
  );
};
FeedCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    profilePic: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    about: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onDecision: PropTypes.func,
};

export default FeedCard;
