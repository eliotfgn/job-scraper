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

export async function scrapeEmploiBenin(url: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });

  const jobs: JobListing[] = await page.evaluate(() => {
    const jobElements = document.querySelectorAll(".view-content .job-item");

    return Array.from(jobElements).map((element) => {
      const titleElement = element.querySelector(".views-field-title a");
      const title = titleElement?.textContent?.trim() || "";
      const link = titleElement?.getAttribute("href") || "";

      const description =
        element.querySelector(".views-field-body")?.textContent?.trim() || "";
      const company =
        element
          .querySelector(".views-field-field-company")
          ?.textContent?.trim() || "";
      const location =
        element
          .querySelector(".views-field-field-location")
          ?.textContent?.trim() || "";
      const jobType =
        element
          .querySelector(".views-field-field-contract")
          ?.textContent?.trim() || "";

      // Extract recruitment period details
      const recruitmentPeriod = {
        start:
          element
            .querySelector(".views-field-field-date-debut")
            ?.textContent?.trim() || "",
        end:
          element
            .querySelector(".views-field-field-date-fin")
            ?.textContent?.trim() || "",
      };

      const requiredDegree =
        element
          .querySelector(".views-field-field-degree")
          ?.textContent?.trim() || "";
      const experience =
        element
          .querySelector(".views-field-field-experience")
          ?.textContent?.trim() || "";

      const skills: string[] = Array.from(
        element.querySelectorAll(".views-field-field-skills .skill"),
      ).map((skill) => skill.textContent?.trim() || "");

      return {
        title,
        description,
        company,
        location,
        jobType,
        recruitmentPeriod,
        requiredDegree,
        experience,
        skills,
        link,
      };
    });
  });

  await browser.close();

  return jobs;
}
