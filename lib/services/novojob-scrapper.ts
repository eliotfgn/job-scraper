import puppeteer from "puppeteer";

export interface JobListing {
  title: string;
  description: string;
  company: string;
  location: string;
  jobType: string;
  recruitmentPeriod: { postedDate: string };
  experience: string;
  link: string;
  skills: string[];
}

export async function scrapeNovojob(url: string): Promise<JobListing[]> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });

  const jobs: JobListing[] = await page.evaluate(() => {
    const jobElements = document.querySelectorAll(
      ".result-list-style li.separator-bot",
    );

    return Array.from(jobElements).map((element) => {
      const titleElement = element.querySelector("a h2");
      const title = titleElement?.textContent?.trim() || "";
      const link = titleElement?.closest("a")?.getAttribute("href") || "";

      const company =
        element.querySelector(".contact h6 span")?.textContent?.trim() ||
        "Unknown";
      const location =
        element
          .querySelector(".fa-map-marker")
          ?.nextSibling?.textContent?.trim() || "Unspecified";
      const experience =
        element
          .querySelector(".fa-bookmark")
          ?.nextSibling?.textContent?.trim() || "Not specified";

      const postedDate =
        element
          .querySelector(".fa-clock-o")
          ?.nextSibling?.textContent?.trim() || "";

      return {
        title,
        description: title, // The description can be the same as the title or filled with other details.
        company,
        location,
        jobType: "Unspecified", // Job type is not directly available from the document.
        recruitmentPeriod: { postedDate },
        experience,
        link: link.startsWith("/") ? `https://www.novojob.com${link}` : link,
        skills: [],
      };
    });
  });

  await browser.close();
  return jobs;
}
