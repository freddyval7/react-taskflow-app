import { Moon, Trash2, Download, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const SettingsPage = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure your TaskFlow experience
        </p>
      </div>

      <div className="max-w-lg space-y-6">
        {/* Dark mode */}
        <div className="bg-card rounded-xl border border-border p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
              <Moon className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">
                Dark Mode
              </p>
              <p className="text-xs text-muted-foreground">
                Toggle dark appearance
              </p>
            </div>
          </div>
          <Switch
            onCheckedChange={(checked) => console.log("Dark mode:", checked)}
          />
        </div>

        {/* Data management */}
        <div className="bg-card rounded-xl border border-border p-5 space-y-4">
          <div>
            <p className="text-sm font-medium text-card-foreground">
              Data Management
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Export, import, or clear your task data
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="justify-start gap-2"
              onClick={() => console.log("Export data")}
            >
              <Download className="w-4 h-4" />
              Export data as JSON
            </Button>

            <Button
              variant="outline"
              className="justify-start gap-2"
              onClick={() => console.log("Import data")}
            >
              <Upload className="w-4 h-4" />
              Import data from JSON
            </Button>

            <Button
              variant="outline"
              className="justify-start gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => console.log("Clear all data")}
            >
              <Trash2 className="w-4 h-4" />
              Clear all data
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
