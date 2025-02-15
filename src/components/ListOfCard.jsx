const ListOfCard = ({ connection }) => {
  if (!connection || connection.length === 0) {
    return <p className="text-center text-gray-500">No connections found.</p>;
  }
  return (
    <div className="flex justify-center items-center p-4">
      <ul className="menu bg-base-200 w-full sm:w-3/6 rounded-lg p-2">
        {connection.map((ele, index) => (
          <li key={ele._id || index} className="p-2 border-b last:border-none">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <img
                  className="w-28 h-28 rounded-lg object-cover"
                  src={ele.profilePic || "/default-profile.png"}
                  alt={`${ele.firstName} ${ele.lastName}`}
                />

                {/* User Info */}
                <div>
                  <p className="font-semibold">
                    {ele.firstName} {ele.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {ele.age ? `${ele.age} years old, ` : ""} {ele.gender}
                  </p>
                  <p className="text-gray-500">{ele.about}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfCard;
