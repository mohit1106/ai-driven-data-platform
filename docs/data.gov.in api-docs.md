the api key format and docs can be found at https://www.data.gov.in/apis



here are some format from the docs in case you're unable to access website:





Monthly Crude Oil Processed by Refineries
Catalog :
Crude Oil Processed by Refineries
Download:
2,075
Views:
4,048
Published On:
14/06/2023
Updated On
03/03/2026

Monthly Crude Oil Processed by Refineries
OAS 2.0

GET
/resource/8d3b6596-b09e-4077-aebf-425193185a5b
Get data of Monthly Crude Oil Processed by Refineries

By passing in the appropriate options, you can get resource level data

Parameters
Name and their Description
api-key *
string
(query)
User API Key to test this API is: "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b". This is a sample key, which will return maximum of 10 records at a time. To avail your key, please click on "Generate API Key" button above or login to the portal and goto "My Account" section.

format *
string
(query)
output format(i.e. json/xml/csv) (default json)


offset
integer($int32)
(query)
number of records to skip for pagination

limit
integer($int32)
(query)
maximum number of records to return

filters[_month_]
string
(query)
Filters the result with field Month

filters[year]
number
(query)
Filters the result with field Year

filters[oil_companies_]
string
(query)
Filters the result with field OIL COMPANIES

filters[quantity_000_metric_tonnes_]
number
(query)
Filters the result with field Quantity (000 Metric Tonnes)

Responses
Response content type

application/json
Curl

curl -X 'GET' \
  'https://api.data.gov.in/resource/8d3b6596-b09e-4077-aebf-425193185a5b?api-key=579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f&format=json' \
  -H 'accept: application/json'
Request URL
https://api.data.gov.in/resource/8d3b6596-b09e-4077-aebf-425193185a5b?api-key=579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f&format=json
Server response
Code	Details
200	
Response body
Download
{
  "index_name": "8d3b6596-b09e-4077-aebf-425193185a5b",
  "title": "Monthly Crude Oil Processed by Refineries",
  "desc": "Monthly Crude Oil Processed by Refineries",
  "created": 1687434829260,
  "updated": 1772515401,
  "created_date": "2023-06-22T17:24:31Z",
  "updated_date": "2026-03-03T05:23:21Z",
  "active": "1",
  "visualizable": "1",
  "catalog_uuid": "ed4dbe82-439e-4e7f-b217-ce64627a49fc",
  "source": "data.gov.in",
  "org_type": "Central",
  "org": [
    "Ministry of Petroleum and Natural Gas",
    "Petroleum Planning & Analysis Cell (PPAC)"
  ],
  "sector": [
    "Non Renewable"
  ],
  "field": [
    {
      "name": "Month",
      "id": "_month_",
      "type": "keyword"
    },
    {
      "name": "Year",
      "id": "year",
      "type": "double"
    },
    {
      "name": "OIL COMPANIES",
      "id": "oil_companies_",
      "type": "keyword"
    },
    {
      "name": "Quantity (000 Metric Tonnes)",
      "id": "quantity_000_metric_tonnes_",
      "type": "double"
    }
  ],
  "target_bucket": {
    "index": "api",
    "type": "ed4dbe82-439e-4e7f-b217-ce64627a49fc",
    "field": "8d3b6596-b09e-4077-aebf-425193185a5b"
  },
  "message": "Resource lists",
  "version": "2.2.0",
  "status": "ok",
  "total": 1392,
  "count": 10,
  "limit": "10",
  "offset": "0",
  "records": [
    {
      "_month_": "September",
      "year": "2022",
      "oil_companies_": "CPCL-MANALI, TAMILNADU",
      "quantity_000_metric_tonnes_": "961.61"
    },
    {
      "_month_": "September",
      "year": "2022",
      "oil_companies_": "BPCL-MUMBAI, MAHARASHTRA",
      "quantity_000_metric_tonnes_": "1261.03"
    },
    {
      "_month_": "October",
      "year": "2022",
      "oil_companies_": "IOCL-KOYALI, GUJARAT",
      "quantity_000_metric_tonnes_": "1323.40"
    },
    {
      "_month_": "October",
      "year": "2022",
      "oil_companies_": "IOCL-HALDIA, WEST BENGAL",
      "quantity_000_metric_tonnes_": "724.58"
    },
    {
      "_month_": "October",
      "year": "2022",
      "oil_companies_": "IOCL-MATHURA, UTTAR PRADESH",
      "quantity_000_metric_tonnes_": "794.59"
    },
    {
      "_month_": "October",
      "year": "2022",
      "oil_companies_": "IOCL-PARADIP,ODISHA",
      "quantity_000_metric_tonnes_": "1239.11"
    },
    {
      "_month_": "October",
      "year": "2022",
      "oil_companies_": "IOCL TOTAL",
      "quantity_000_metric_tonnes_": "6245.22"
    },
    {
      "_month_": "October",
      "year": "2022",
      "oil_companies_": "HPCL-VISAKH,ANDHRA PRADESH",
      "quantity_000_metric_tonnes_": "787.49"
    },
    {
      "_month_": "October",
      "year": "2022",
      "oil_companies_": "RIL TOTAL",
      "quantity_000_metric_tonnes_": "4691.26"
    },
    {
      "_month_": "November",
      "year": "2022",
      "oil_companies_": "IOCL-PARADIP,ODISHA",
      "quantity_000_metric_tonnes_": "1330.62"
    }
  ]
}

Response headers
 cache-control: no-cache,no-store,must-revalidate 
 content-length: 3398 
 content-type: application/json 
Responses
Code	Description
200	
search results matching criteria

400	
bad input parameter

403	
Forbidden














































































similarly, heres for another category of data:




Monthly Production of Petroleum Products by Refineries & Fractionators
HVD
Catalog :
Production of Petroleum Products by Refineries & Fractionators
Download:
816
Views:
1,790
Published On:
14/06/2023
Updated On
03/03/2026
Rated 3 stars out of 5
Share
Facebook
Twitter
Data
API
Visualization
Catalog Info
Feedback
Monthly Production of Petroleum Products by Refineries & Fractionators
OAS 2.0

GET
/resource/8b75d7c2-814b-4eb2-9698-c96d69e5f128
Get data of Monthly Production of Petroleum Products by Refineries & Fractionators

By passing in the appropriate options, you can get resource level data

Parameters
Name	Description
api-key *
string
(query)
User API Key to test this API is: "579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f".

api-key
format *
string
(query)
output format(i.e. json/xml/csv) (default json)


json
offset
integer($int32)
(query)
number of records to skip for pagination

offset
limit
integer($int32)
(query)
maximum number of records to return

limit
filters[month]
string
(query)
Filters the result with field Month

filters[month]
filters[year]
number
(query)
Filters the result with field Year

filters[year]
filters[products]
string
(query)
Filters the result with field Products

filters[products]
filters[quantity_000_metric_tonnes_]
number
(query)
Filters the result with field Quantity (000 Metric Tonnes)

filters[quantity_000_metric_tonnes_]
filters[updated_date]
string
(query)
Filters the result with field updated_date

filters[updated_date]
Responses
Response content type

application/json
Curl

curl -X 'GET' \
  'https://api.data.gov.in/resource/8b75d7c2-814b-4eb2-9698-c96d69e5f128?api-key=579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f&format=json' \
  -H 'accept: application/json'
Request URL
https://api.data.gov.in/resource/8b75d7c2-814b-4eb2-9698-c96d69e5f128?api-key=579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f&format=json
Server response
Code	Details
200	
Response body
Download
{
  "index_name": "8b75d7c2-814b-4eb2-9698-c96d69e5f128",
  "title": "Monthly Production of Petroleum Products by Refineries & Fractionators",
  "desc": "Monthly Production of Petroleum Products by Refineries & Fractionators",
  "created": 1687433640492,
  "updated": 1772518359,
  "created_date": "2023-06-22T17:04:43Z",
  "updated_date": "2026-03-03T06:12:39Z",
  "active": "1",
  "visualizable": "1",
  "catalog_uuid": "a042c5b0-c4f2-40ff-8ac0-a003698c33df",
  "source": "data.gov.in",
  "org_type": "Central",
  "org": [
    "Ministry of Petroleum and Natural Gas",
    "Petroleum Planning & Analysis Cell (PPAC)"
  ],
  "sector": [
    "Non Renewable"
  ],
  "field": [
    {
      "name": "Month",
      "id": "month",
      "type": "keyword"
    },
    {
      "name": "Year",
      "id": "year",
      "type": "double"
    },
    {
      "name": "Products",
      "id": "products",
      "type": "keyword"
    },
    {
      "name": "Quantity (000 Metric Tonnes)",
      "id": "quantity_000_metric_tonnes_",
      "type": "double"
    },
    {
      "name": "updated_date",
      "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||dd/MM/yyyy",
      "id": "updated_date",
      "type": "date"
    }
  ],
  "target_bucket": {
    "index": "api",
    "type": "a042c5b0-c4f2-40ff-8ac0-a003698c33df",
    "field": "8b75d7c2-814b-4eb2-9698-c96d69e5f128"
  },
  "message": "Resource lists",
  "version": "2.2.0",
  "status": "ok",
  "total": 360,
  "count": 10,
  "limit": "10",
  "offset": "0",
  "records": [
    {
      "month": "April",
      "year": "2023",
      "products": "HSD Others",
      "quantity_000_metric_tonnes_": "2298.86",
      "updated_date": "2024-04-29"
    },
    {
      "month": "April",
      "year": "2023",
      "products": "Others",
      "quantity_000_metric_tonnes_": "2587.04",
      "updated_date": "2024-04-29"
    },
    {
      "month": "May",
      "year": "2023",
      "products": "MS-VI",
      "quantity_000_metric_tonnes_": "2388.04",
      "updated_date": "2024-04-29"
    },
    {
      "month": "May",
      "year": "2023",
      "products": "BITUMEN",
      "quantity_000_metric_tonnes_": "507.71",
      "updated_date": "2024-04-29"
    },
    {
      "month": "June",
      "year": "2023",
      "products": "LPG",
      "quantity_000_metric_tonnes_": "1085.86",
      "updated_date": "2024-04-29"
    },
    {
      "month": "June",
      "year": "2023",
      "products": "NAPHTHA",
      "quantity_000_metric_tonnes_": "1478.84",
      "updated_date": "2024-04-29"
    },
    {
      "month": "June",
      "year": "2023",
      "products": "HSD-VI",
      "quantity_000_metric_tonnes_": "7254.32",
      "updated_date": "2024-04-29"
    },
    {
      "month": "June",
      "year": "2023",
      "products": "LUBES",
      "quantity_000_metric_tonnes_": "132.77",
      "updated_date": "2024-04-29"
    },
    {
      "month": "June",
      "year": "2023",
      "products": "LSHS",
      "quantity_000_metric_tonnes_": "49.73",
      "updated_date": "2024-04-29"
    },
    {
      "month": "July",
      "year": "2023",
      "products": "ATF",
      "quantity_000_metric_tonnes_": "1439.24",
      "updated_date": "2024-04-29"
    }
  ]
}
Response headers
 cache-control: no-cache,no-store,must-revalidate 
 content-length: 3792 
 content-type: application/json 
Responses
Code	Description
200	
search results matching criteria

400	
bad input parameter

403	
Forbidden






















































for another category:


Monthly Indigenous Crude Oil Production
HVD
Catalog :
Indigenous Crude Oil Production
Download:
713
Views:
1,496
Published On:
14/06/2023
Updated On
03/03/2026
Rated stars out of 5
Share
Facebook
Twitter
Data
API
Visualization
Catalog Info
Feedback
Monthly Indigenous Crude Oil Production
OAS 2.0

GET
/resource/7932c3ed-c88d-4e0c-bc39-17e3e3170483
Get data of Monthly Indigenous Crude Oil Production

By passing in the appropriate options, you can get resource level data

Parameters
Name	Description
api-key *
string
(query)
User API Key to test this API is: "579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f".

579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f
format *
string
(query)
output format(i.e. json/xml/csv) (default json)


json
offset
integer($int32)
(query)
number of records to skip for pagination

offset
limit
integer($int32)
(query)
maximum number of records to return

limit
filters[month]
string
(query)
Filters the result with field Month

filters[month]
filters[year]
number
(query)
Filters the result with field Year

filters[year]
filters[company_name]
string
(query)
Filters the result with field Company Name

filters[company_name]
filters[quantity_000_metric_tonnes_]
number
(query)
Filters the result with field Quantity (000 Metric Tonnes)

filters[quantity_000_metric_tonnes_]
filters[last_updated]
string
(query)
Filters the result with field last_updated

filters[last_updated]
Responses
Response content type

application/json
Curl

curl -X 'GET' \
  'https://api.data.gov.in/resource/7932c3ed-c88d-4e0c-bc39-17e3e3170483?api-key=579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f&format=json' \
  -H 'accept: application/json'
Request URL
https://api.data.gov.in/resource/7932c3ed-c88d-4e0c-bc39-17e3e3170483?api-key=579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f&format=json
Server response
Code	Details
200	
Response body
Download
{
  "index_name": "7932c3ed-c88d-4e0c-bc39-17e3e3170483",
  "title": "Monthly Indigenous Crude Oil Production",
  "desc": "Monthly Indigenous Crude Oil Production",
  "created": 1687417944120,
  "updated": 1772527039,
  "created_date": "2023-06-22T12:43:06Z",
  "updated_date": "2026-03-03T08:37:19Z",
  "active": "1",
  "visualizable": "1",
  "catalog_uuid": "68b08090-79ad-45fb-b05b-706f9a2b2f63",
  "source": "data.gov.in",
  "org_type": "Central",
  "org": [
    "Ministry of Petroleum and Natural Gas",
    "Petroleum Planning & Analysis Cell (PPAC)"
  ],
  "sector": [
    "Non Renewable"
  ],
  "field": [
    {
      "name": "Month",
      "id": "month",
      "type": "keyword"
    },
    {
      "name": "Year",
      "id": "year",
      "type": "double"
    },
    {
      "name": "Company Name",
      "id": "company_name",
      "type": "keyword"
    },
    {
      "name": "Quantity (000 Metric Tonnes)",
      "id": "quantity_000_metric_tonnes_",
      "type": "double"
    },
    {
      "name": "last_updated",
      "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||dd/MM/yyyy",
      "id": "last_updated",
      "type": "date"
    }
  ],
  "target_bucket": {
    "index": "api",
    "type": "68b08090-79ad-45fb-b05b-706f9a2b2f63",
    "field": "7932c3ed-c88d-4e0c-bc39-17e3e3170483"
  },
  "message": "Resource lists",
  "version": "2.2.0",
  "status": "ok",
  "total": 168,
  "count": 10,
  "limit": "10",
  "offset": "0",
  "records": [
    {
      "month": "April",
      "year": "2023",
      "company_name": "ONGC",
      "quantity_000_metric_tonnes_": "1.51",
      "last_updated": "NA"
    },
    {
      "month": "April",
      "year": "2023",
      "company_name": "Total crude oil",
      "quantity_000_metric_tonnes_": "2.26",
      "last_updated": "NA"
    },
    {
      "month": "April",
      "year": "2023",
      "company_name": "Total ( Crude oil + Condensate)",
      "quantity_000_metric_tonnes_": "2.38",
      "last_updated": "NA"
    },
    {
      "month": "May",
      "year": "2023",
      "company_name": "Total ( Crude oil + Condensate)",
      "quantity_000_metric_tonnes_": "2.50",
      "last_updated": "NA"
    },
    {
      "month": "June",
      "year": "2023",
      "company_name": "ONGC",
      "quantity_000_metric_tonnes_": "1.50",
      "last_updated": "NA"
    },
    {
      "month": "July",
      "year": "2023",
      "company_name": "OIL",
      "quantity_000_metric_tonnes_": "0.28",
      "last_updated": "NA"
    },
    {
      "month": "July",
      "year": "2023",
      "company_name": "Total ( Crude oil + Condensate)",
      "quantity_000_metric_tonnes_": "2.50",
      "last_updated": "NA"
    },
    {
      "month": "August",
      "year": "2023",
      "company_name": "Total crude oil",
      "quantity_000_metric_tonnes_": "2.29",
      "last_updated": "NA"
    },
    {
      "month": "September",
      "year": "2023",
      "company_name": "JVC/ Private",
      "quantity_000_metric_tonnes_": "0.46",
      "last_updated": "NA"
    },
    {
      "month": "September",
      "year": "2023",
      "company_name": "Condensate",
      "quantity_000_metric_tonnes_": "0.18",
      "last_updated": "NA"
    }
  ]
}
Response headers
 cache-control: no-cache,no-store,must-revalidate 
 content-length: 3787 
 content-type: application/json 
Responses
Code	Description
200	
search results matching criteria

400	
bad input parameter

403	
Forbidden










































Assam Public Procurement Data 2020-21
HVD
Catalog :
Assam Public Procurement Data
Download:
59
Views:
258
Published On:
11/10/2022
Updated On
11/10/2022
Rated stars out of 5
Share
Facebook
Twitter
Data
API
Visualization
Catalog Info
Feedback
Assam Public Procurement Data 2020-21
OAS 2.0

GET
/resource/fbf7f636-5926-41d5-b168-b030c3415a5c
Get data of Assam Public Procurement Data 2020-21

By passing in the appropriate options, you can get resource level data

Parameters
Name	Description
api-key *
string
(query)
User API Key to test this API is: "579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f".

579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f
format *
string
(query)
output format(i.e. json/xml/csv) (default json)


json
offset
integer($int32)
(query)
number of records to skip for pagination

offset
limit
integer($int32)
(query)
maximum number of records to return

limit
Responses
Response content type

application/json
Curl

curl -X 'GET' \
  'https://api.data.gov.in/resource/fbf7f636-5926-41d5-b168-b030c3415a5c?api-key=579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f&format=json' \
  -H 'accept: application/json'
Request URL
https://api.data.gov.in/resource/fbf7f636-5926-41d5-b168-b030c3415a5c?api-key=579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f&format=json
Server response
Code	Details
200	
Response body
Download
{
  "index_name": "fbf7f636-5926-41d5-b168-b030c3415a5c",
  "title": " Assam Public Procurement Data 2020-21",
  "desc": " Assam Public Procurement Data 2020-21",
  "created": 1676525673592,
  "updated": 1676525454,
  "created_date": "2023-02-16T10:59:51Z",
  "updated_date": "2023-02-16T11:00:54Z",
  "active": "1",
  "visualizable": "1",
  "catalog_uuid": "8691eb77-5100-44ce-9372-f5b8e5736e89",
  "source": "data.gov.in",
  "org_type": "State",
  "org": [
    "Assam",
    "Finance Department,Assam",
    "Assam Society for Comprehensive Financial Management System(AS-CFMS)"
  ],
  "sector": [
    "All",
    "Finance"
  ],
  "field": [
    {
      "id": "ocid",
      "name": "ocid",
      "type": "keyword"
    },
    {
      "id": "initiationtype",
      "name": "initiationType",
      "type": "keyword"
    },
    {
      "id": "tag",
      "name": "tag",
      "type": "keyword"
    },
    {
      "id": "id",
      "name": "id",
      "type": "double"
    },
    {
      "id": "date",
      "name": "date",
      "type": "date"
    },
    {
      "id": "tender_id",
      "name": "tender/id",
      "type": "keyword"
    },
    {
      "id": "tender_externalreference",
      "name": "tender/externalReference",
      "type": "keyword"
    },
    {
      "id": "tender_title",
      "name": "tender/title",
      "type": "keyword"
    },
    {
      "id": "tender_mainprocurementcategory",
      "name": "tender/mainProcurementCategory",
      "type": "keyword"
    },
    {
      "id": "tender_procurementmethod",
      "name": "tender/procurementMethod",
      "type": "keyword"
    },
    {
      "id": "tender_contracttype",
      "name": "tender/contractType",
      "type": "keyword"
    },
    {
      "id": "tenderclassification_description",
      "name": "tenderclassification/description",
      "type": "keyword"
    },
    {
      "id": "tender_submissionmethoddetails",
      "name": "tender/submissionMethodDetails",
      "type": "keyword"
    },
    {
      "id": "tender_participationfee_0_multicurrencyallowed",
      "name": "tender/participationFee/0/multiCurrencyAllowed",
      "type": "keyword"
    },
    {
      "id": "tender_allowtwostagetender",
      "name": "tender/allowTwoStageTender",
      "type": "keyword"
    },
    {
      "id": "tender_value_amount",
      "name": "tender/value/amount",
      "type": "double"
    },
    {
      "id": "tender_datepublished",
      "name": "tender/datePublished",
      "type": "keyword"
    },
    {
      "id": "tender_milestones_title",
      "name": "tender/milestones/title",
      "type": "keyword"
    },
    {
      "id": "tender_milestones_code",
      "name": "tender/milestones/code",
      "type": "keyword"
    },
    {
      "id": "tender_milestones_type",
      "name": "tender/milestones/type",
      "type": "keyword"
    },
    {
      "id": "tender_milestones_duedate",
      "name": "tender/milestones/dueDate",
      "type": "keyword"
    },
    {
      "id": "tender_tenderperiod_durationindays",
      "name": "tender/tenderPeriod/durationInDays",
      "type": "double"
    },
    {
      "id": "tender_allowpreferentialbidder",
      "name": "tender/allowPreferentialBidder",
      "type": "keyword"
    },
    {
      "id": "payment_mode",
      "name": "Payment Mode",
      "type": "keyword"
    },
    {
      "id": "tender_status",
      "name": "tender/status",
      "type": "keyword"
    },
    {
      "id": "tender_stage",
      "name": "tender/stage",
      "type": "keyword"
    },
    {
      "id": "tender_numberoftenderers",
      "name": "tender/numberOfTenderers",
      "type": "double"
    },
    {
      "id": "tender_milestones_type_1",
      "name": "tender/milestones/type.1",
      "type": "keyword"
    },
    {
      "id": "tender_milestones_title_1",
      "name": "tender/milestones/title.1",
      "type": "keyword"
    },
    {
      "id": "tender_milestones_duedate_1",
      "name": "tender/milestones/dueDate.1",
      "type": "keyword"
    },
    {
      "id": "tender_bidopening_date",
      "name": "tender/bidOpening/date",
      "type": "keyword"
    },
    {
      "id": "tender_documents_id",
      "name": "tender/documents/id",
      "type": "keyword"
    },
    {
      "id": "buyer_name",
      "name": "buyer/name",
      "type": "keyword"
    },
    {
      "id": "fiscal_year",
      "name": "fiscal_year",
      "type": "keyword"
    }
  ],
  "target_bucket": {
    "index": "procurement_data",
    "type": "8691eb77-5100-44ce-9372-f5b8e5736e89",
    "field": "fbf7f636-5926-41d5-b168-b030c3415a5c"
  },
  "message": "Resource lists",
  "version": "2.2.0",
  "status": "ok",
  "total": 6590,
  "count": 10,
  "limit": "10",
  "offset": "0",
  "records": [
    {
      "ocid": "ocds-kjhdrl-2020_NHM_15709_1",
      "initiationtype": "tender",
      "tag": "tender",
      "id": 1,
      "date": "2022-09-29",
      "tender_id": "2020_NHM_15709_1",
      "tender_externalreference": "2019_Procurement_NHM_23693",
      "tender_title": "SUPPLY OF ION METER WITH FLUORIDE ESTIMATION KIT",
      "tender_mainprocurementcategory": "Goods",
      "tender_procurementmethod": "Open Tender",
      "tender_contracttype": "Buy",
      "tenderclassification_description": "Supply of Materials",
      "tender_submissionmethoddetails": "NA",
      "tender_participationfee_0_multicurrencyallowed": "No",
      "tender_allowtwostagetender": "No",
      "tender_value_amount": 200000,
      "tender_datepublished": "2020-04-01 9:00:00",
      "tender_milestones_title": "Price Bid Opening Date",
      "tender_milestones_code": "PreBid Meeting Date",
      "tender_milestones_type": "assessment",
      "tender_milestones_duedate": "NA",
      "tender_tenderperiod_durationindays": 60,
      "tender_allowpreferentialbidder": "No",
      "payment_mode": "Offline",
      "tender_status": "NA",
      "tender_stage": "To be Opened",
      "tender_numberoftenderers": 3,
      "tender_milestones_type_1": "assessment",
      "tender_milestones_title_1": "Price Bid Opening Date",
      "tender_milestones_duedate_1": "NA",
      "tender_bidopening_date": "21-01-2020 16:00",
      "tender_documents_id": "NA",
      "buyer_name": "National Health Mission",
      "fiscal_year": "2020-2021"
    },
    {
      "ocid": "ocds-kjhdrl-2020_NHM_15710_1",
      "initiationtype": "tender",
      "tag": "tender",
      "id": 1,
      "date": "2022-09-29",
      "tender_id": "2020_NHM_15710_1",
      "tender_externalreference": "2019_Procurement_NHM_26400",
      "tender_title": "SUPPLY AND INSTALLATION OF CO MONITOR",
      "tender_mainprocurementcategory": "Goods",
      "tender_procurementmethod": "Open Tender",
      "tender_contracttype": "Buy",
      "tenderclassification_description": "Supply of Materials",
      "tender_submissionmethoddetails": "NA",
      "tender_participationfee_0_multicurrencyallowed": "No",
      "tender_allowtwostagetender": "No",
      "tender_value_amount": 450000,
      "tender_datepublished": "2020-04-01 9:00:00",
      "tender_milestones_title": "Price Bid Opening Date",
      "tender_milestones_code": "PreBid Meeting Date",
      "tender_milestones_type": "assessment",
      "tender_milestones_duedate": "NA",
      "tender_tenderperiod_durationindays": 60,
      "tender_allowpreferentialbidder": "No",
      "payment_mode": "Offline",
      "tender_status": "NA",
      "tender_stage": "To be Opened",
      "tender_numberoftenderers": 0,
      "tender_milestones_type_1": "assessment",
      "tender_milestones_title_1": "Price Bid Opening Date",
      "tender_milestones_duedate_1": "NA",
      "tender_bidopening_date": "05-02-2020 16:00",
      "tender_documents_id": "NA",
      "buyer_name": "National Health Mission",
      "fiscal_year": "2020-2021"
    },
    {
      "ocid": "ocds-kjhdrl-2020_NHM_15711_1",
      "initiationtype": "tender",
      "tag": "tender",
      "id": 1,
      "date": "2022-09-29",
      "tender_id": "2020_NHM_15711_1",
      "tender_externalreference": "2019_Procurement_NHM_26407",
      "tender_title": "SUPPLY OF PELVIC MODEL",
      "tender_mainprocurementcategory": "Goods",
      "tender_procurementmethod": "Open Tender",
      "tender_contracttype": "Buy",
      "tenderclassification_description": "Supply of Materials",
      "tender_submissionmethoddetails": "NA",
      "tender_participationfee_0_multicurrencyallowed": "No",
      "tender_allowtwostagetender": "No",
      "tender_value_amount": 1760000,
      "tender_datepublished": "2020-04-01 9:00:00",
      "tender_milestones_title": "Price Bid Opening Date",
      "tender_milestones_code": "PreBid Meeting Date",
      "tender_milestones_type": "assessment",
      "tender_milestones_duedate": "NA",
      "tender_tenderperiod_durationindays": 60,
      "tender_allowpreferentialbidder": "No",
      "payment_mode": "Offline",
      "tender_status": "NA",
      "tender_stage": "Technical Evaluation",
      "tender_numberoftenderers": 4,
      "tender_milestones_type_1": "assessment",
      "tender_milestones_title_1": "Price Bid Opening Date",
      "tender_milestones_duedate_1": "NA",
      "tender_bidopening_date": "05-02-2020 16:00",
      "tender_documents_id": "NA",
      "buyer_name": "National Health Mission",
      "fiscal_year": "2020-2021"
    },
    {
      "ocid": "ocds-kjhdrl-2019_BoTC_15622_1",
      "initiationtype": "tender",
      "tag": "tender",
      "id": 1,
      "date": "2022-09-29",
      "tender_id": "2019_BoTC_15622_1",
      "tender_externalreference": "TN 3 of 2019-20 (Re-Tender)",
      "tender_title": "Supply and installation of Worsted Spun Silk Machineries",
      "tender_mainprocurementcategory": "Works",
      "tender_procurementmethod": "Open Tender",
      "tender_contracttype": "Works",
      "tenderclassification_description": "Civil Works",
      "tender_submissionmethoddetails": "NA",
      "tender_participationfee_0_multicurrencyallowed": "No",
      "tender_allowtwostagetender": "No",
      "tender_value_amount": 16537700,
      "tender_datepublished": "2020-04-01 10:20:00",
      "tender_milestones_title": "Price Bid Opening Date",
      "tender_milestones_code": "PreBid Meeting Date",
      "tender_milestones_type": "assessment",
      "tender_milestones_duedate": "NA",
      "tender_tenderperiod_durationindays": 180,
      "tender_allowpreferentialbidder": "No",
      "payment_mode": "Offline",
      "tender_status": "NA",
      "tender_stage": "Technical Evaluation",
      "tender_numberoftenderers": 1,
      "tender_milestones_type_1": "assessment",
      "tender_milestones_title_1": "Price Bid Opening Date",
      "tender_milestones_duedate_1": "NA",
      "tender_bidopening_date": "03-02-2020 15:30",
      "tender_documents_id": "NA",
      "buyer_name": "Bodoland Territorial Council",
      "fiscal_year": "2020-2021"
    },
    {
      "ocid": "ocds-kjhdrl-2020_PWD_15697_1",
      "initiationtype": "tender",
      "tag": "tender",
      "id": 1,
      "date": "2022-09-29",
      "tender_id": "2020_PWD_15697_1",
      "tender_externalreference": "SENL/NIT/N/298/2009-10/Pt-II",
      "tender_title": "SENL/SOPD-G/2019-20/NAL-30",
      "tender_mainprocurementcategory": "Works",
      "tender_procurementmethod": "Open Tender",
      "tender_contracttype": "Item Rate",
      "tenderclassification_description": "Civil Works – Roads",
      "tender_submissionmethoddetails": "NA",
      "tender_participationfee_0_multicurrencyallowed": "No",
      "tender_allowtwostagetender": "No",
      "tender_value_amount": 7949000,
      "tender_datepublished": "2020-04-01 11:00:00",
      "tender_milestones_title": "Price Bid Opening Date",
      "tender_milestones_code": "PreBid Meeting Date",
      "tender_milestones_type": "assessment",
      "tender_milestones_duedate": "NA",
      "tender_tenderperiod_durationindays": 180,
      "tender_allowpreferentialbidder": "No",
      "payment_mode": "Offline",
      "tender_status": "NA",
      "tender_stage": "AOC",
      "tender_numberoftenderers": 3,
      "tender_milestones_type_1": "assessment",
      "tender_milestones_title_1": "Price Bid Opening Date",
      "tender_milestones_duedate_1": "NA",
      "tender_bidopening_date": "21-01-2020 11:00",
      "tender_documents_id": "NA",
      "buyer_name": "Public Works Roads Department",
      "fiscal_year": "2020-2021"
    },
    {
      "ocid": "ocds-kjhdrl-2020_PWD_15697_2",
      "initiationtype": "tender",
      "tag": "tender",
      "id": 1,
      "date": "2022-09-29",
      "tender_id": "2020_PWD_15697_2",
      "tender_externalreference": "SENL/NIT/N/298/2009-10/Pt-II",
      "tender_title": "SENL/SOPD-G/2019-20/NAL-31",
      "tender_mainprocurementcategory": "Works",
      "tender_procurementmethod": "Open Tender",
      "tender_contracttype": "Item Rate",
      "tenderclassification_description": "Civil Works – Roads",
      "tender_submissionmethoddetails": "NA",
      "tender_participationfee_0_multicurrencyallowed": "No",
      "tender_allowtwostagetender": "No",
      "tender_value_amount": 5574000,
      "tender_datepublished": "2020-04-01 11:00:00",
      "tender_milestones_title": "Price Bid Opening Date",
      "tender_milestones_code": "PreBid Meeting Date",
      "tender_milestones_type": "assessment",
      "tender_milestones_duedate": "NA",
      "tender_tenderperiod_durationindays": 180,
      "tender_allowpreferentialbidder": "No",
      "payment_mode": "Offline",
      "tender_status": "NA",
      "tender_stage": "Technical Evaluation",
      "tender_numberoftenderers": 4,
      "tender_milestones_type_1": "assessment",
      "tender_milestones_title_1": "Price Bid Opening Date",
      "tender_milestones_duedate_1": "NA",
      "tender_bidopening_date": "21-01-2020 11:00",
      "tender_documents_id": "NA",
      "buyer_name": "Public Works Roads Department",
      "fiscal_year": "2020-2021"
    },
    {
      "ocid": "ocds-kjhdrl-2020_PWD_15697_3",
      "initiationtype": "tender",
      "tag": "tender",
      "id": 1,
      "date": "2022-09-29",
      "tender_id": "2020_PWD_15697_3",
      "tender_externalreference": "SENL/NIT/N/298/2009-10/Pt-II",
      "tender_title": "SENL/SOPD-G/2019-20/NAL-32",
      "tender_mainprocurementcategory": "Works",
      "tender_procurementmethod": "Open Tender",
      "tender_contracttype": "Item Rate",
      "tenderclassification_description": "Civil Works – Roads",
      "tender_submissionmethoddetails": "NA",
      "tender_participationfee_0_multicurrencyallowed": "No",
      "tender_allowtwostagetender": "No",
      "tender_value_amount": 5717000,
      "tender_datepublished": "2020-04-01 11:00:00",
      "tender_milestones_title": "Price Bid Opening Date",
      "tender_milestones_code": "PreBid Meeting Date",
      "tender_milestones_type": "assessment",
      "tender_milestones_duedate": "NA",
      "tender_tenderperiod_durationindays": 180,
      "tender_allowpreferentialbidder": "No",
      "payment_mode": "Offline",
      "tender_status": "NA",
      "tender_stage": "AOC",
      "tender_numberoftenderers": 5,
      "tender_milestones_type_1": "assessment",
      "tender_milestones_title_1": "Price Bid Opening Date",
      "tender_milestones_duedate_1": "NA",
      "tender_bidopening_date": "21-01-2020 11:00",
      "tender_documents_id": "NA",
      "buyer_name": "Public Works Roads Department",
      "fiscal_year": "2020-2021"
    },
    {
      "ocid": "ocds-kjhdrl-2020_PWD_15697_4",
      "initiationtype": "tender",
      "tag": "tender",
      "id": 1,
      "date": "2022-09-29",
      "tender_id": "2020_PWD_15697_4",
      "tender_externalreference": "SENL/NIT/N/298/2009-10/Pt-II",
      "tender_title": "SENL/SOPD-G/2019-20/NAL-33",
      "tender_mainprocurementcategory": "Works",
      "tender_procurementmethod": "Open Tender",
      "tender_contracttype": "Item Rate",
      "tenderclassification_description": "Civil Works – Roads",
      "tender_submissionmethoddetails": "NA",
      "tender_participationfee_0_multicurrencyallowed": "No",
      "tender_allowtwostagetender": "No",
      "tender_value_amount": 6221000,
      "tender_datepublished": "2020-04-01 11:00:00",
      "tender_milestones_title": "Price Bid Opening Date",
      "tender_milestones_code": "PreBid Meeting Date",
      "tender_milestones_type": "assessment",
      "tender_milestones_duedate": "NA",
      "tender_tenderperiod_durationindays": 180,
      "tender_allowpreferentialbidder": "No",
      "payment_mode": "Offline",
      "tender_status": "NA",
      "tender_stage": "Financial Evaluation",
      "tender_numberoftenderers": 2,
      "tender_milestones_type_1": "assessment",
      "tender_milestones_title_1": "Price Bid Opening Date",
      "tender_milestones_duedate_1": "NA",
      "tender_bidopening_date": "21-01-2020 11:00",
      "tender_documents_id": "NA",
      "buyer_name": "Public Works Roads Department",
      "fiscal_year": "2020-2021"
    },
    {
      "ocid": "ocds-kjhdrl-2020_PWD_15697_5",
      "initiationtype": "tender",
      "tag": "tender",
      "id": 1,
      "date": "2022-09-29",
      "tender_id": "2020_PWD_15697_5",
      "tender_externalreference": "SENL/NIT/N/298/2009-10/Pt-II",
      "tender_title": "SENL/SOPD-G/2019-20/NAL-34",
      "tender_mainprocurementcategory": "Works",
      "tender_procurementmethod": "Open Tender",
      "tender_contracttype": "Item Rate",
      "tenderclassification_description": "Civil Works – Roads",
      "tender_submissionmethoddetails": "NA",
      "tender_participationfee_0_multicurrencyallowed": "No",
      "tender_allowtwostagetender": "No",
      "tender_value_amount": 6094000,
      "tender_datepublished": "2020-04-01 11:00:00",
      "tender_milestones_title": "Price Bid Opening Date",
      "tender_milestones_code": "PreBid Meeting Date",
      "tender_milestones_type": "assessment",
      "tender_milestones_duedate": "NA",
      "tender_tenderperiod_durationindays": 180,
      "tender_allowpreferentialbidder": "No",
      "payment_mode": "Offline",
      "tender_status": "NA",
      "tender_stage": "AOC",
      "tender_numberoftenderers": 4,
      "tender_milestones_type_1": "assessment",
      "tender_milestones_title_1": "Price Bid Opening Date",
      "tender_milestones_duedate_1": "NA",
      "tender_bidopening_date": "21-01-2020 11:00",
      "tender_documents_id": "NA",
      "buyer_name": "Public Works Roads Department",
      "fiscal_year": "2020-2021"
    },
    {
      "ocid": "ocds-kjhdrl-2020_PWD_15697_6",
      "initiationtype": "tender",
      "tag": "tender",
      "id": 1,
      "date": "2022-09-29",
      "tender_id": "2020_PWD_15697_6",
      "tender_externalreference": "SENL/NIT/N/298/2009-10/Pt-II",
      "tender_title": "SENL/SOPD-G/2019-20/NAL-35",
      "tender_mainprocurementcategory": "Works",
      "tender_procurementmethod": "Open Tender",
      "tender_contracttype": "Item Rate",
      "tenderclassification_description": "Civil Works – Roads",
      "tender_submissionmethoddetails": "NA",
      "tender_participationfee_0_multicurrencyallowed": "No",
      "tender_allowtwostagetender": "No",
      "tender_value_amount": 18362000,
      "tender_datepublished": "2020-04-01 11:00:00",
      "tender_milestones_title": "Price Bid Opening Date",
      "tender_milestones_code": "PreBid Meeting Date",
      "tender_milestones_type": "assessment",
      "tender_milestones_duedate": "NA",
      "tender_tenderperiod_durationindays": 180,
      "tender_allowpreferentialbidder": "No",
      "payment_mode": "Offline",
      "tender_status": "NA",
      "tender_stage": "AOC",
      "tender_numberoftenderers": 3,
      "tender_milestones_type_1": "assessment",
      "tender_milestones_title_1": "Price Bid Opening Date",
      "tender_milestones_duedate_1": "NA",
      "tender_bidopening_date": "21-01-2020 11:00",
      "tender_documents_id": "NA",
      "buyer_name": "Public Works Roads Department",
      "fiscal_year": "2020-2021"
    }
  ]
}
Response headers
 cache-control: no-cache,no-store,must-revalidate 
 content-length: 23124 
 content-type: application/json 
Responses
Code	Description
200	
search results matching criteria

400	
bad input parameter

403	
Forbidden






















































