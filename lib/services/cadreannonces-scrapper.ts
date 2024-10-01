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

export async function scrapeCadreAnnonces(url: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });

  const jobs: JobListing[] = await page.evaluate(() => {
    const jobElements = document.querySelectorAll(
      ".posts-loop-content .noo_job",
    );

    return Array.from(jobElements).map((element) => {
      const titleElement = element.querySelector(".loop-item-title a");
      const title = titleElement?.textContent?.trim() || "";
      const link = titleElement?.getAttribute("href") || "";

      const description = title;
      const company =
        element.querySelector(".job-company span")?.textContent?.trim() || "";
      const location =
        element.querySelector(".job-location em")?.textContent?.trim() || "";
      const jobType =
        element.querySelector(".job-type span")?.textContent?.trim() || "";

      // Extract recruitment period details
      const recruitmentPeriod = {
        start:
          element.querySelector(".job-date__posted")?.textContent?.trim() || "",
        end:
          element.querySelector(".job-date__closing")?.textContent?.trim() ||
          "",
      };

      const requiredDegree = ""; // The degree is not directly provided in the structure
      const experience = ""; // No direct experience field found

      // Skills are not directly listed, so let's leave it as an empty array
      const skills: string[] = [];

      return {
        title: company,
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
