"use server";

import { scrapeCadreAnnonces } from "../services/cadreannonces-scrapper";
import { scrapeBjEmploi } from "../services/bjemploi-scrapper";
import { scrapeEmploiBenin } from "../services/emploibenin-scrapper";

export async function scrapPage(website: string, url: string) {
  if (website === "cadreannonces.com") {
    const jobs = await scrapeCadreAnnonces(url);
    console.log(jobs);
    return jobs;
  } else if (website === "bjemploi.com") {
    const jobs = await scrapeBjEmploi(url);
    console.log(jobs);
    return jobs;
  } else if (website === "emploibenin.com") {
    console.log(website);
    const jobs = await scrapeEmploiBenin(url);
    console.log(jobs);
    return jobs;
  }

  return [];
}
