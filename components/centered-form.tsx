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
import { scrapPage } from "@/lib/actions/scrap-page";
import { JobCardComponent } from "@/components/job-card";
import { JobListing } from "@/lib/services/cadreannonces-scrapper";
import * as XLSX from "xlsx";

export function CenteredForm() {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [jobs, setJobs] = useState<JobListing[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const retrievedJobs = await scrapPage(selectedOption, inputValue);
      console.log(retrievedJobs);
      setJobs(retrievedJobs as JobListing[]);
    } catch (error) {
      console.error("Error scraping data:", error);
    } finally {
      setLoading(false);
    }
    console.log("Submitted:", { selectedOption, inputValue });
  };

  const handleDelete = (index: number) => {
    setJobs((prevJobs) => prevJobs.filter((_, i) => i !== index));
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(jobs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jobs");
    XLSX.writeFile(workbook, "jobs.xlsx");
  };

  return (
    <div className="w-full h-full">
      <div className="mt-32 w-full max-w-xl mx-auto bg-background">
        <div className=" space-y-8 p-6 bg-card rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
            <Select value={selectedOption} onValueChange={setSelectedOption}>
              <SelectTrigger>
                <SelectValue placeholder="Select the website" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cadreannonces.com">
                  Cadre Annonces
                </SelectItem>
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
      <div className="mt-8 mx-auto w-fit space-y-4 pb-10">
        {jobs.map((job, index) => (
          <JobCardComponent
            key={index}
            title={job.title}
            description={job.description}
            company={job.company}
            country={job.location}
            jobType={job.jobType}
            recruitmentPeriod={job.recruitmentPeriod}
            requiredDiploma={job.requiredDegree}
            experience={job.experience}
            skills={job.skills}
            onDelete={() => handleDelete(index)} // Pass the delete function
          />
        ))}
      </div>
      {jobs.length > 0 && (
        <div className="mt-4 mx-auto w-fit pb-8">
          <Button onClick={handleExport} className="bg-green-500">
            Export to Excel
          </Button>
        </div>
      )}
    </div>
  );
}
