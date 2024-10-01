"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export function CenteredForm() {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    console.log("Submitted:", { selectedOption, inputValue });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-xl space-y-8 p-6 bg-card rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
          <Select value={selectedOption} onValueChange={setSelectedOption}>
            <SelectTrigger>
              <SelectValue placeholder="Select the website" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cadreannonces.com">Cadre Annonces</SelectItem>
              <SelectItem value="bjemploi.com">BJ Emploi</SelectItem>
              <SelectItem value="emploibenin.com">Emploi Benin</SelectItem>
              <SelectItem value="novojob.com">Novo Job</SelectItem>
              <SelectItem value="wiijob.com">Wiijob</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="Enter the URL"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
