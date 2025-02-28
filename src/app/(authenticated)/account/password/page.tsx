import { AccountTabs } from "@/app/(authenticated)/account/_navigation/tabs";
import { Heading } from "@/components/heading";

const ProfilePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Password"
        description="Keep your account safe"
        tabs={<AccountTabs />}
      />
    </div>
  );
};

export default ProfilePage;
