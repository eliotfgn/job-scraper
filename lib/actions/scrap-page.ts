"use server";

import { scrapeCadreAnnonces } from "../services/cadreannonces-scrapper";
import { scrapeBjEmploi } from "../services/bjemploi-scrapper";
import { scrapeEmploiBenin } from "../services/emploibenin-scrapper";
import { scrapeNovojob } from "../services/novojob-scrapper";
import { scrapeWiijob } from "../services/wiijob-scrapper";

export async function scrapPage(website: string, url: string) {
  try {
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
    } else if (website === "novojob.com") {
      const jobs = await scrapeNovojob(url);
      console.log(jobs);
      return jobs;
    } else if (website === "wiijob.com") {
      const jobs = await scrapeWiijob(url);
      console.log(jobs);
      return jobs;
    }
  } catch (error) {
    console.log(error);
  }
  return [];
}
