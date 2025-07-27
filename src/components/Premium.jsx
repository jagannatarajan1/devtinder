import { useSelector } from "react-redux";
import { BaseUrl } from "../utils/constance";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Premium = () => {
  const user = useSelector((store) => store.user);
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    if (user?.isSubscribed && user?.subscriptionExpiresAt) {
      const now = dayjs();
      const expiry = dayjs(user.subscriptionExpiresAt);
      const diffDays = expiry.diff(now, "day");
      setDaysLeft(diffDays);
    }
  }, [user]);

  const selectButtonHandler = async () => {
    const type = "premium";
    try {
      const response = await axios.post(
        `${BaseUrl}/payment/create`,
        { type },
        { withCredentials: true }
      );
      const razorpayKey = response.data.razorpayKey;
      const { amount, notes, orderId } = response.data.newPayment;

      const options = {
        key: razorpayKey,
        amount,
        currency: "INR",
        name: "Devtinder Premium",
        description: "Unlock all premium dating features",
        order_id: orderId,
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: user.email,
          contact: "9999999999",
        },
        theme: { color: "#FF3E6C" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error selecting premium", error);
    }
  };

  const plan = {
    name: "Devtinder Premium",
    priceLabel: "₹499/month",
    priceDigit: "49900",
    features: [
      "Unlimited Swipes",
      "See Who Likes You",
      "Boost Your Profile 3x",
      "Match Insights & Analytics",
      "1 Free Super Like Everyday",
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 p-6">
      <h2 className="text-5xl font-extrabold mb-8 text-gray-800 text-center">
        {user?.isSubscribed
          ? "You're a Premium Member 🎉"
          : "Upgrade to Devtinder Premium"}
      </h2>

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl transition-transform duration-300 hover:scale-105">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-rose-600">{plan.name}</h3>
          <p className="text-2xl font-semibold text-gray-600 mt-2">
            {plan.priceLabel}
          </p>
        </div>

        <ul className="mb-8 space-y-4">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-lg text-gray-700">
              <span className="text-rose-600 mr-3 text-xl">❤️</span>
              {feature}
            </li>
          ))}
        </ul>

        {user?.isSubscribed ? (
          <div className="text-center">
            <p className="text-lg text-green-600 font-semibold">
              Your premium membership is active.
            </p>
            {daysLeft !== null && (
              <p className="mt-2 text-md text-gray-600">
                Expires in{" "}
                <span className="font-bold">
                  {daysLeft} day{daysLeft !== 1 ? "s" : ""}
                </span>{" "}
                on {dayjs(user.subscriptionExpiresAt).format("DD MMM YYYY")}
              </p>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={selectButtonHandler}
              className="px-8 py-3 bg-rose-600 text-white text-lg font-semibold rounded-full hover:bg-rose-700 transition duration-200"
            >
              Unlock Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Premium;
