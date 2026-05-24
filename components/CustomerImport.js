"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Papa from "papaparse";
import { createClient } from "@/lib/supabase/client";

// The columns we understand. The CSV's headers are matched to these
// (case-insensitive, spaces -> underscores), so "First Name" maps to first_name.
const COLUMNS = [
  "first_name",
  "last_name",
  "address_line_1",
  "town_city",
  "postcode",
  "phone",
  "email",
  "default_price",
  "visit_frequency",
  "access_notes",
];

const normaliseHeader = (h) => (h || "").trim().toLowerCase().replace(/\s+/g, "_");

export default function CustomerImport() {
  const router = useRouter();
  const supabase = createClient();

  const [rows, setRows] = useState([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [importing, setImporting] = useState(false);
  const [done, setDone] = useState(0);
  const [finished, setFinished] = useState(false);

  function handleFile(e) {
    setError("");
    setStatus("");
    setRows([]);
    setDone(0);
    setFinished(false);

    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: normaliseHeader,
      complete: (results) => {
        const parsed = results.data
          .map((r) => {
            const row = {};
            COLUMNS.forEach((col) => {
              let v = r[col];
              if (typeof v === "string") v = v.trim();
              row[col] = v === "" || v === undefined ? null : v;
            });
            // Clean the price into a real number.
            if (row.default_price != null) {
              const n = Number(String(row.default_price).replace(/[^0-9.]/g, ""));
              row.default_price = isNaN(n) ? null : n;
            }
            return row;
          })
          // Drop completely blank lines.
          .filter((row) => row.first_name || row.last_name || row.postcode);

        if (parsed.length === 0) {
          setError(
            "No usable rows found. Check your column headings match the template."
          );
          return;
        }
        setRows(parsed);
      },
      error: (err) => setError(err.message),
    });
  }

  async function handleImport() {
    setImporting(true);
    setError("");
    setStatus("");

    const chunkSize = 200;
    let inserted = 0;
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      // business_id is auto-filled by the database default.
      const { error } = await supabase.from("customers").insert(chunk);
      if (error) {
        setImporting(false);
        setError(`Stopped after ${inserted}. ${error.message}`);
        return;
      }
      inserted += chunk.length;
      setDone(inserted);
    }

    setImporting(false);
    setStatus(`Imported ${inserted} customer${inserted === 1 ? "" : "s"}.`);
    setFinished(true);
  }

  function downloadTemplate() {
    const example = [
      "Jane",
      "Smith",
      "12 High Street",
      "Chelmsford",
      "CM1 1AA",
      "07700900123",
      "jane@example.com",
      "15",
      "Every 4 weeks",
      "Side gate, beware of dog",
    ].map((c) => (/[",]/.test(c) ? `"${c}"` : c));

    const csv = COLUMNS.join(",") + "\n" + example.join(",") + "\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pugsie-customers-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="card">
      <p className="muted">
        Upload a CSV of your customers. Not sure of the format? Download the
        template, fill it in, and upload it back.
      </p>

      <button type="button" className="secondary" onClick={downloadTemplate}>
        Download template CSV
      </button>

      <label htmlFor="csv">Choose CSV file</label>
      <input id="csv" type="file" accept=".csv,text/csv" onChange={handleFile} />

      {rows.length > 0 && !finished && (
        <>
          <div className="spacer" />
          <p>
            <strong>{rows.length}</strong> customer
            {rows.length === 1 ? "" : "s"} ready from {fileName}:
          </p>
          {rows.slice(0, 5).map((r, i) => (
            <div key={i} className="muted">
              • {r.first_name} {r.last_name} {r.postcode ? `(${r.postcode})` : ""}
            </div>
          ))}
          {rows.length > 5 && (
            <div className="muted">…and {rows.length - 5} more</div>
          )}

          <button type="button" onClick={handleImport} disabled={importing}>
            {importing
              ? `Importing… ${done}/${rows.length}`
              : `Import ${rows.length} customer${rows.length === 1 ? "" : "s"}`}
          </button>
        </>
      )}

      {error && <p className="error">{error}</p>}
      {status && (
        <p className="note" style={{ color: "var(--ok)" }}>
          {status}
        </p>
      )}

      {finished ? (
        <button
          type="button"
          onClick={() => {
            router.push("/customers");
            router.refresh();
          }}
        >
          View customers
        </button>
      ) : (
        <Link href="/customers" className="linklike">
          ← Back to customers
        </Link>
      )}
    </div>
  );
}
