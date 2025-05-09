
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/auth";
import { LogOut, Settings } from "lucide-react";

const AccountActions = () => {
  const { signOut } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Actions</CardTitle>
        <CardDescription>
          Manage your account settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            asChild
          >
            <a href="/change-password">
              <Settings size={16} />
              <span>Change Password</span>
            </a>
          </Button>
        </div>
        <div>
          <Button
            variant="destructive"
            className="w-full flex items-center justify-center gap-2"
            onClick={signOut}
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountActions;
