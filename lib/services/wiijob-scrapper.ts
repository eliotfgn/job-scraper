import puppeteer from "puppeteer";

export interface JobListing {
  title: string;
  description: string;
  company: string;
  location: string;
  jobType: string;
  recruitmentPeriod: { start: string; end: string };
  requiredDegree: string;
  experience: string;
  skills: string[];
  link: string;
}

export async function scrapeWiijob(url: string): Promise<JobListing[]> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });

  const jobs: JobListing[] = await page.evaluate(() => {
    const jobElements = document.querySelectorAll(".job-list.v1");

    return Array.from(jobElements).map((element) => {
      const titleElement = element.querySelector(".job-title a");
      const title = titleElement?.textContent?.trim() || "";
      const link = titleElement?.getAttribute("href") || "";

      const company =
        element.querySelector(".employeur_name_joblist")?.textContent?.trim() ||
        "Unknown";
      const location =
        element.querySelector(".job-location")?.textContent?.trim() ||
        "Unspecified";

      // Extract job type
      const jobTypeElement = element.querySelector(".job-type .type-job");
      const jobType = jobTypeElement?.textContent?.trim() || "Unspecified";

      // Extract recruitment period
      const recruitmentPeriod = {
        start: "", // Start date is not provided in the structure
        end: element.querySelector(".job-deadline")?.textContent?.trim() || "",
      };

      const requiredDegree = "Not specified"; // No direct information found
      const experience = "Not specified"; // No direct information found

      const skills: string[] = []; // Skills not directly available

      return {
        title,
        description: title, // No separate description found, using title as placeholder
        company,
        location,
        jobType,
        recruitmentPeriod,
        requiredDegree,
        experience,
        skills,
        link: link.startsWith("/") ? `https://wiijob.com${link}` : link,
      };
    });
  });

  await browser.close();
  return jobs;
}
