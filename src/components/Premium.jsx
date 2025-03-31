import { BaseUrl } from "../utils/constance";
import axios from "axios";
const Premium = () => {
  const selectButtonHandler = async (price, type) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/payment/create`,
        {
          price,
          type,
        },
        { withCredentials: true }
      );
      const razorpayKey = response.data.razorpayKey;
      const { amount, notes, orderId } = response.data.newPayment;
      console.log(razorpayKey, amount, notes);
      console.log("Premium Selected", response.data.newPayment);
      const options = {
        key: razorpayKey, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Seeker Lounge",
        description: "Test Transaction",
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error selecting premium", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <h2 className="text-5xl font-extrabold mb-12 text-gray-800 text-center">
        Choose Your Plan
      </h2>
      <div className="grid md:grid-cols-3 gap-12 w-full max-w-6xl place-items-center">
        {[
          {
            name: "Silver",
            price: "150/month",
            priceDigit: "15000",
            features: [
              "Basic Support",
              "10GB Storage",
              "100GB Storage",
              "1 Domain",
            ],
            bgColor: "bg-gray-200",
            textColor: "text-gray-800",
          },
          {
            name: "Gold",
            price: "300/month",
            priceDigit: "30000",
            features: [
              "Priority Support",
              "100GB Storage",
              "5 Domains",
              "Custom Email",
            ],
            bgColor: "bg-yellow-400",
            textColor: "text-yellow-900",
          },
          {
            name: "Platinum",
            price: "500/month",
            priceDigit: "50000",
            features: [
              "24/7 Support",
              "1TB Storage",
              "Unlimited Domains",
              "Custom Email & Analytics",
            ],
            bgColor: "bg-gray-800",
            textColor: "text-white",
          },
        ].map((plan, index) => (
          <div
            key={index}
            className={`card ${plan.bgColor} shadow-2xl p-8 rounded-3xl hover:scale-105 transition-transform duration-300  `}
          >
            <div className={`card-body ${plan.textColor}`}>
              <div className="flex gap-3">
                <h2 className="card-title text-3xl font-bold">{plan.name}</h2>
                <p className="text-xl font-semibold my-4">{plan.price}</p>
              </div>

              <ul className="mb-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-2  text-lg">
                    <span className="badge badge-success p-3 text-white">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary btn-wide text-lg"
                  onClick={() =>
                    selectButtonHandler(plan.priceDigit, plan.name)
                  }
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Premium;
