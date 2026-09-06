const INSPECTIONS_KEY = "packsureInspections";
const REPORTS_KEY = "packsureReports";


const demoInspections = [
  {
    id: "INS-1001",
    product: "Packaged Food",
    category: "Packaged Items",
    date: "2026-09-01",
    score: 94,
    status: "Compliant",
    location: "Delhi",
    remarks: ""
  },
  {
    id: "INS-1002",
    product: "Face Cream",
    category: "Cosmetics",
    date: "2026-09-02",
    score: 87,
    status: "Review",
    location: "New Delhi",
    remarks: ""
  },
  {
    id: "INS-1003",
    product: "Medicine Pack",
    category: "Pharma",
    date: "2026-09-02",
    score: 72,
    status: "High Risk",
    location: "Gurugram",
    remarks: ""
  },
  {
    id: "INS-1004",
    product: "Stationery Set",
    category: "Stationery",
    date: "2026-09-03",
    score: 91,
    status: "Compliant",
    location: "Delhi",
    remarks: ""
  }
];


export function getInspections() {

  const data =
    localStorage.getItem(
      INSPECTIONS_KEY
    );

  if (!data) {

    localStorage.setItem(
      INSPECTIONS_KEY,
      JSON.stringify(demoInspections)
    );

    return demoInspections;
  }

  return JSON.parse(data);
}


export function saveInspection(inspection) {

  const inspections =
    getInspections();

  inspections.unshift(inspection);

  localStorage.setItem(
    INSPECTIONS_KEY,
    JSON.stringify(inspections)
  );

  return inspection;
}


export function getInspectionById(id) {

  const inspections =
    getInspections();

  return inspections.find(
    item => item.id === id
  );
}


export function getReports() {

  const data =
    localStorage.getItem(
      REPORTS_KEY
    );

  if (!data) {

    const reports = [];

    localStorage.setItem(
      REPORTS_KEY,
      JSON.stringify(reports)
    );

    return reports;
  }

  return JSON.parse(data);
}


export function saveReport(report) {

  const reports =
    getReports();

  reports.unshift(report);

  localStorage.setItem(
    REPORTS_KEY,
    JSON.stringify(reports)
  );

  return report;
}


export function getReportById(id) {

  const reports =
    getReports();

  return reports.find(
    report => report.id === id
  );
}