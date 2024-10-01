"use client";

import {
  CalendarIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  ClockIcon,
  MapPinIcon,
  BuildingIcon,
  WrenchIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface JobCardProps {
  title: string;
  description: string;
  company: string;
  country: string;
  jobType: string;
  recruitmentPeriod: {
    start: string;
    end: string;
  };
  requiredDiploma: string;
  experience: string;
  skills: string[];
  onDelete: () => void; // Add this prop
}

export function JobCardComponent({
  title,
  description,
  company,
  country,
  jobType,
  recruitmentPeriod,
  requiredDiploma,
  experience,
  skills,
  onDelete, // Add this prop
}: JobCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription className="mt-1">{company}</CardDescription>
          </div>
          <Badge variant={jobType === "CDI" ? "default" : "secondary"}>
            {jobType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        <Separator />
        <div className="grid gap-2">
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-sm">{country}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm">
              {recruitmentPeriod.start} - {recruitmentPeriod.end}
            </span>
          </div>
          <div className="flex items-center">
            <GraduationCapIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-sm">{requiredDiploma}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-sm">{experience}</span>
          </div>
        </div>
        <Separator />
        <div>
          <h4 className="text-sm font-semibold mb-2">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
