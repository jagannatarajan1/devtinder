const FeedCard = ({ user }) => {
  console.log(user); // Debugging (Make sure user exists)

  const {
    firstName = "",
    lastName = "",
    emailId = "",
    profilePic = "",
    skills = [],
  } = user || {};

  console.log(firstName, lastName, emailId, profilePic); // Removed password from logs

  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-96 h-[600px] shadow-xl">
        <figure>
          <img
            src={
              //   profilePic ||
              "https://i.pinimg.com/736x/5e/72/eb/5e72ebebbd623f2cd8a6d855d31ada75.jpg"
            }
            alt="person"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>

          {/* Displaying skills properly if it's an array */}
          <p>{skills.length > 0 ? skills.join(", ") : "No skills listed"}</p>

          <div className="card-actions justify-center">
            <button className="btn btn-primary px-10">Interested</button>
            <button className="btn  px-10 bg-red-600">Ignored</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
