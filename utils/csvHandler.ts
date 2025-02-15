import Papa from "papaparse";
import { Santa } from "@/utils/validation";

export const convertCsvToArray = async (file: File): Promise<Santa[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        resolve(results.data as Santa[]);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const downloadCsv = async (data: any[], year: string) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Invalid or empty data provided.");
    return;
  }

  const headers = Object.keys(data[0]);

  const csvRows = [headers.join(",")];

  data.forEach((item) => {
    const row = headers
      .map((header) => {
        let value = item[header];
        if (typeof value === "string") {
          value = `"${value.replace(/"/g, '""')}"`;
        } else if (value === null || value === undefined) {
          value = ""; // Handle null or undefined values
        }
        return value;
      })
      .join(",");
    csvRows.push(row);
  });

  const csvString = csvRows.join("\n");

  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `secret_santa_game_${year}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.error("Download attribute not supported.");
  }
};
