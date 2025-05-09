
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Email Notifications</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>This feature will be available soon.</p>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-red-600 font-medium mb-2">Danger Zone</h3>
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="outline" className="text-red-600 border-red-200">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
