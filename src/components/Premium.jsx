const Premium = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <h2 className="text-5xl font-extrabold mb-12 text-gray-800 text-center">
        Choose Your Plan
      </h2>
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl place-items-center">
        {[
          {
            name: "Silver",
            price: "150/month",
            features: ["Basic Support", "10GB Storage", "1 Domain"],
            bgColor: "bg-gray-200",
            textColor: "text-gray-800",
          },
          {
            name: "Gold",
            price: "300/month",
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
            className={`card ${plan.bgColor} shadow-2xl p-8 rounded-3xl hover:scale-105 transition-transform duration-300 w-80 `}
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
                <button className="btn btn-primary btn-wide text-lg">
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
