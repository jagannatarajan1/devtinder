import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../utils/constance";
import FeedCard from "./FeedCard";

const EditProfile = () => {
  const user = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [selectedGender, setSelectedGender] = useState("Select Gender");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setProfilePic(user.profilePic || "");
      setAge(user.age || "");
      setAbout(user.about || "");
      setSelectedGender(user.gender || "Select Gender");
      setSkills(user.skills || []);
    }
  }, [user]);

  const handleSelect = (gender) => {
    setSelectedGender(gender);
    setDropdownOpen(false);
  };

  const handleSkillsChange = (e) => {
    setSkills(e.target.value.split(",").map((skill) => skill.trim()));
  };

  const finaloutput = {
    firstName,
    lastName,
    profilePic,
    age,
    about,
    skills,
    gender: selectedGender,
  };

  const EditFormHandler = async () => {
    try {
      const response = await axios.put(`${BaseUrl}/profile/edit`, finaloutput, {
        withCredentials: true,
      });
      console.log("User edited successfully", response.data);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  return (
    <div className="flex justify-center gap-6 items-center h-screen">
      <div className="w-96 border py-5 px-6 rounded-md border-gray-500">
        <label className="form-control w-full ">
          <span className="label-text  py-2">First Name</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text py-2">Last Name</span>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text py-2">Photo URL</span>
          <input
            type="text"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>

        <div className="flex gap-x-2">
          <label className="form-control w-full">
            <span className="label-text py-2">Age</span>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full relative">
            <span className="label-text py-2">Gender</span>
            <div className="relative w-full">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn w-full"
              >
                {selectedGender}
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0 right-0 bg-base-100 rounded-box z-10 p-2 shadow w-full">
                  {["Male", "Female", "Other"].map((gender) => (
                    <li
                      key={gender}
                      className="cursor-pointer p-2 hover:bg-gray-200"
                      onClick={() => handleSelect(gender)}
                    >
                      {gender}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </label>
        </div>

        <label className="form-control w-full">
          <span className="label-text py-2">About</span>
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text py-2">Skills</span>
          <input
            type="text"
            value={skills.join(", ")}
            onChange={handleSkillsChange}
            className="input input-bordered w-full"
          />
        </label>

        <div className="flex justify-center">
          <button
            onClick={EditFormHandler}
            className="btn btn-primary mt-5 px-6 py-2"
          >
            Submit
          </button>
        </div>
      </div>

      {user && <FeedCard user={finaloutput} />}
      {alert && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Your Profile was Updated Successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
