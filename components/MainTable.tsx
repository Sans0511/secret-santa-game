"use client";
import React from "react";
import { useState } from "react";
import { convertCsvToArray } from "@/utils/csvHandler";
import { generateSecretSanta } from "@/utils/secretSanta";
import { downloadCsv } from "@/utils/csvHandler";
import { ConformModal } from "@/components/ConformModal";
import { Santa } from "@/utils/validation";
import { fileInputDataValidation } from "@/utils/validation";
import { sampleCSVFormat } from "@/utils/csvHandler";

export default function MainTable() {
  const [lastYearData, setLastYearData] = useState<Santa[]>([]);
  const [tableData, setTableData] = useState<Santa[]>([]);

  const [conformDownload, setConformDownload] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tableLabel, setTableLabe] = useState("Previous Year Santa");

  const handleCsvDownload = async () => {
    setConformDownload(false);
    await downloadCsv(tableData, tableLabel);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setErrorMessage("");
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      try {
        const data = await convertCsvToArray(file);
        const validationResult = fileInputDataValidation(data);
        if (validationResult === null) {
          setLastYearData(data);
          setTableData(data);
        } else {
          setErrorMessage(validationResult);
          console.log({ validationResult });
        }
      } catch (error) {
        console.error("Error parsing CSV:", error);
      }
    }
  };
  const handleOnGenarate = async () => {
    const geneartedDate: Santa[] = generateSecretSanta(lastYearData);
    setTableLabe("New Year Santa");
    setTableData(geneartedDate);
    console.log({ geneartedDate });
  };

  const handleOnHandleSampleDownload = async () => {
    await downloadCsv(sampleCSVFormat, "Sample_format");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-full items-center justify-around">
        <div className="overflow-x-auto min-h-96 h-auto overflow-y-auto w-full flex flex-col  ">
          <p className="flex justify-center items-center font-semibold text-3xl mb-4">
            Secret Santa Game
          </p>

          <div className="border-t border-b border-gray-300 py-4 flex  justify-center mb-3 ">
            <div className="flex justify-center items-center">
              <div>
                <label className=" flex justify-center items-center font-semibold text-center">
                  Upload last year Data
                </label>
                <div className="flex flex-row justify-center items-center w-fit ">
                  <div className="flex items-center border-2 border-black ">
                    <input
                      type="file"
                      accept=".csv"
                      className="file-input file-input-sm"
                      onChange={handleFileChange}
                    />
                  </div>
                  <a
                    className="flex link link-accent w-full justify-center items-center px-5 rounded-md"
                    onClick={handleOnHandleSampleDownload}
                  >
                    Sample Csv download
                  </a>
                </div>
                <p className=" text-red-400 my-3 flex items-cente">
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>
          {lastYearData.length > 0 && (
            <div className="modal-action flex flex-col items-center justify-center">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Sl.No</th>
                    <th>Employee Name</th>
                    <th>Employee Email</th>
                    <th>{tableLabel} Secret Child Name</th>
                    <th>{tableLabel} Secret Child Email</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="items-center">{item.Employee_Name}</td>
                      <td className="items-center">{item.Employee_EmailID}</td>
                      <td className="items-center">
                        {item?.Secret_Child_Name || "-"}
                      </td>
                      <td className="items-center">
                        {item?.Secret_Child_EmailID || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-co justify-center items-center mt-4">
                <button
                  className="btn btn-active btn-neutral btn-sm mx-3"
                  onClick={handleOnGenarate}
                >
                  Generate New Santa Game
                </button>
                <button
                  className="btn btn-active btn-neutral btn-sm mx-3 "
                  onClick={() => setConformDownload(true)}
                >
                  Download CSV File
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {conformDownload && (
        <ConformModal
          isOpen={conformDownload}
          onClose={() => setConformDownload(false)}
          onConform={handleCsvDownload}
          message={`Click the button below to confirm the download for ${tableLabel}.`}
        />
      )}
    </div>
  );
}
