import type { DevToApiResponse } from "./types.js";


const url = "https://dev.to/api/articles";

export const getArticles = async (tag?: string): Promise<DevToApiResponse> => {
  try {
    const response = await fetch(`${url}${tag ? '?tag='+tag : ""}`, {mode:"cors"});
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data: DevToApiResponse = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`API Error: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};
