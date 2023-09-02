import React from "react";
import { Icon } from "../../public/Icons";

export const Account = () => {
  return (
    <div className="w-full h-full bg-background flex items-center justify-center flex-col">
      <h1 className="text-white text-6xl mb-10 font-semibold">Kim İzliyor?</h1>
      <div className="flex gap-5">
        {/* profillerin ekleneceği yer */}
        <div className="flex items-center justify-center flex-col text-button cursor-pointer">
          <div className="profile-box flex items-center justify-center hover:bg-gray-200 rounded">
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
  );
};
