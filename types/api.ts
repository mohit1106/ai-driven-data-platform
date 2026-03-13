// API response types from data.gov.in

export interface ApiField {
  name: string;
  id: string;
  type: "keyword" | "double" | "date";
  format?: string;
}

export interface DataGovResponse {
  index_name: string;
  title: string;
  desc: string;
  created: number;
  updated: number;
  created_date: string;
  updated_date: string;
  active: string;
  visualizable: string;
  catalog_uuid: string;
  source: string;
  org_type: string;
  org: string[];
  sector: string[];
  field: ApiField[];
  target_bucket: {
    index: string;
    type: string;
    field: string;
  };
  message: string;
  version: string;
  status: string;
  total: number;
  count: number;
  limit: string;
  offset: string;
  records: Record<string, string | number>[];
}

export interface FetchDatasetParams {
  limit?: number;
  offset?: number;
  filters?: Record<string, string>;
  format?: "json" | "xml" | "csv";
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}
