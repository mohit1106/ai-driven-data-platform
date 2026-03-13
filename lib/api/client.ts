import type { FetchDatasetParams, DataGovResponse, ApiError } from "@/types/api";

const API_BASE = "https://api.data.gov.in/resource";
const API_KEY =
  process.env.NEXT_PUBLIC_DATA_GOV_API_KEY ||
  "579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f";

export async function fetchDataset(
  datasetId: string,
  params: FetchDatasetParams = {}
): Promise<DataGovResponse> {
  const { limit = 100, offset = 0, filters = {}, format = "json" } = params;

  const queryParams = new URLSearchParams({
    "api-key": API_KEY,
    format,
    limit: String(limit),
    offset: String(offset),
  });

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value.trim()) {
      queryParams.append(`filters[${key}]`, value);
    }
  });

  const url = `${API_BASE}/${datasetId}?${queryParams.toString()}`;

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        const errorBody = await response.text().catch(() => "");
        throw {
          name: "ApiError",
          message: `API request failed: ${response.status} ${response.statusText}`,
          statusCode: response.status,
          response: errorBody,
        } as ApiError;
      }

      const data: DataGovResponse = await response.json();

      if (data.status !== "ok") {
        throw {
          name: "ApiError",
          message: `API returned error: ${data.message}`,
          statusCode: 500,
          response: data,
        } as ApiError;
      }

      return data;
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) throw error;
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempts) * 500)
      );
    }
  }

  throw new Error("Max retry attempts reached");
}
