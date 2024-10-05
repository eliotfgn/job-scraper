import puppeteer from "puppeteer";
import { JobListing } from "./cadreannonces-scrapper";

export async function scrapeEmploiBenin(url: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  console.log("page");
  const jobs: JobListing[] = await page.evaluate(() => {
    console.log("page");
    const jobElements = document.querySelectorAll(".div_rz_ance_gnral");

    console.log("jobElements", jobElements);
    return Array.from(jobElements).map((element) => {
      const titleElement = element.querySelector("a span.txt_fs11_b");
      const title = titleElement?.textContent?.trim() || "No title";
      const link = titleElement?.parentElement?.getAttribute("href") || "";

      console.log(title);
      const companyElement = element.querySelector("a.ss_miz_f span");
      const company = companyElement?.textContent?.trim() || "";

      const locationElement = Array.from(
        element.querySelectorAll("a.ss_miz_f"),
      ).find((el) => el.getAttribute("title")?.includes("Lieu d'affectation"));
      const location = locationElement?.textContent?.trim() || "";

      const jobTypeElement = Array.from(
        element.querySelectorAll("a.ss_miz_f"),
      ).find((el) =>
        el.getAttribute("title")?.includes("Catégorie - Type de contrat"),
      );
      const jobType = jobTypeElement?.textContent?.trim() || "";

      const startDateElement = element.querySelector("i.fa-calendar");
      const startDate =
        startDateElement?.nextSibling?.textContent?.trim() || "";

      const endDateElement = element.querySelector("i.fa-calendar-times-o");
      const endDate = endDateElement?.nextSibling?.textContent?.trim() || "";

      const requiredDegreeElement = Array.from(
        element.querySelectorAll("a.ss_miz_f"),
      ).find((el) => el.getAttribute("title")?.includes("Diplôme (minimum)"));
      const requiredDegree = requiredDegreeElement?.textContent?.trim() || "";

      const recruitmentPeriod = {
        start: startDate,
        end: endDate,
      };

      const description = title; // Assuming description is the same as title
      const experience = ""; // No direct experience field found
      const skills: string[] = []; // Skills are not directly listed

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
