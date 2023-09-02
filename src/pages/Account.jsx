import React, { useState } from "react";
import { Icon } from "../../public/Icons";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export const Account = () => {
  const [addProfile, setAddProfile] = useState(false);
  const [profileName, setProfileName] = useState("");
  const user = JSON.parse(localStorage.getItem("CredentialUser"));
  const navigate = useNavigate();
  const { addUserProfile } = UserAuth();

  const handleSubmit = async (profileName) => {
    debugger;
    const newUser = {
      profileName: profileName,
      defaultPhoto:
        "https://occ-0-7329-1489.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbV2URr-qEYOrESG0qnP2787XsIxWTMBh7QfJwyqYxMAVFNyiXAqFeu16gI8yTxg3kLwF2mUDKmZGfwBEDd7722xskhYwAMwsBBe.png?r=bd7",
    };
    try {
      await addUserProfile(newUser);
      setAddProfile(false);
    } catch (error) {}
  };

  return (
    <>
      {addProfile === false ? (
        <div className="w-full h-full bg-background flex items-center justify-center flex-col">
          <h1 className="text-white text-6xl mb-10 font-semibold">
            Kim İzliyor?
          </h1>
          <div className="flex gap-10">
            {/* profillerin ekleneceği yer */}
            <div className="group flex items-center justify-center flex-col text-button cursor-pointer">
              <div
                className="profile-box rounded relative group-hover:border-[3px] border-white"
                onClick={() => navigate("/home")}
              >
                <img
                  src={
                    user?.photoURL === null
                      ? "https://occ-0-7329-1489.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbV2URr-qEYOrESG0qnP2787XsIxWTMBh7QfJwyqYxMAVFNyiXAqFeu16gI8yTxg3kLwF2mUDKmZGfwBEDd7722xskhYwAMwsBBe.png?r=bd7"
                      : user?.photoURL
                  }
                  alt={`${user?.displayName} photo`}
                />
              </div>
              <div className="mt-2">
                <p className="text-button font-semibold text-xl  group-hover:text-white">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center flex-col text-button cursor-pointer">
              <div
                className="profile-box flex items-center justify-center hover:bg-gray-200 rounded"
                onClick={() => setAddProfile(true)}
              >
                <Icon name="plus" size={125} />
              </div>
              <div className="mt-2">
                <p className="text-button font-semibold text-xl">Profil Ekle</p>
              </div>
            </div>
          </div>
          <button className="text-button py-2 px-6 text-3xl border border-solid border-button mt-16 hover:border-white hover:text-white">
            Profil Yönetimi
          </button>
        </div>
      ) : (
        <div className="w-full h-full bg-background flex items-center justify-center">
          <div>
            <h1 className="text-white text-6xl mb-6">Profil Ekle</h1>
            <p className="text-button text-2xl mb-5">
              Netflix'i izleyen başka bir kişi için profil ekleyin.
            </p>
            <div className="py-9 border-t-[1px] border-b-[1px] border-button flex items-center">
              <img
                src="https://occ-0-7329-1489.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbV2URr-qEYOrESG0qnP2787XsIxWTMBh7QfJwyqYxMAVFNyiXAqFeu16gI8yTxg3kLwF2mUDKmZGfwBEDd7722xskhYwAMwsBBe.png?r=bd7"
                alt="Main Profile Avatar"
                className="rounded w-40 mr-8"
              />
              <input
                onChange={(event) => setProfileName(event.target.value)}
                type="text"
                placeholder="Name"
                className="bg-button py-2 px-4 text-white font-semibold focus:outline-none w-96 text-2xl mr-4"
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  id="add-kids-profile"
                />
                <label
                  htmlFor="add-kids-profile"
                  className="text-white text-3xl pb-1"
                >
                  Çocuk
                </label>
              </div>
            </div>
            <div className="flex items-center mt-9">
              <button
                onClick={() => handleSubmit(profileName)}
                disabled={profileName.length === 0}
                className={`text-black font-semibold text-2xl max-h-12 py-2 px-8 bg-white hover:bg-red-600 hover:text-white mr-4 ${
                  profileName.length === 0 ? "opacity-60" : "opacity-100"
                }`}
              >
                Devam Et
              </button>
              <button
                onClick={() => setAddProfile(false)}
                className="text-button py-2 max-h-12 px-8 text-2xl border border-solid border-button hover:border-white hover:text-white"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
