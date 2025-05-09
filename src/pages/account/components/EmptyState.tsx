
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
};

const EmptyState = ({ icon: Icon, title, description, linkText, linkUrl }: EmptyStateProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-8 text-center text-muted-foreground">
          <Icon size={48} className="mx-auto mb-4 opacity-30" />
          <p>{description}</p>
          <Button className="mt-4" asChild>
            <a href={linkUrl}>{linkText}</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
