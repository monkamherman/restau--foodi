
import { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import AccountActions from "./AccountActions";

type ProfileData = {
  first_name: string;
  last_name: string;
};

const ProfileTab = ({ profile: initialProfile }: { 
  profile: ProfileData 
}) => {
  const [profile, setProfile] = useState(initialProfile);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PersonalInformation profile={profile} setProfile={setProfile} />
      <AccountActions />
    </div>
  );
};

export default ProfileTab;
