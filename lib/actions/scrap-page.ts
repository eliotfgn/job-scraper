"use server";

import { scrapeCadreAnnonces } from "../services/cadreannonces-scrapper";

export async function scrapPage(website: string, url: string) {
  if (website === "cadreannonces.com") {
    const jobs = await scrapeCadreAnnonces(url);
    console.log(jobs);
    return jobs;
  }

  return [];
}
