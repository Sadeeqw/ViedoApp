import AdminUpload from "@/components/AdminUpload";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Admin() {
  return (
    <div>
      <div className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="max-w-4xl mx-auto p-4">
          <Link href="/">
            <Button variant="ghost" className="gap-2" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
              Back to Interview
            </Button>
          </Link>
        </div>
      </div>
      <AdminUpload />
    </div>
  );
}
