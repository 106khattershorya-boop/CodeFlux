
import React, {
  useState
} from "react";

import {
  ScanLine,
  FileText,
  Bot,
  ChevronDown
} from "lucide-react";


function Help() {

  const [open, setOpen] =
    useState(null);


  const faqs = [

    [
      "How do I start an inspection?",
      "Open New Inspection, upload one or more product or label images, optionally select a category, add location or remarks, and click Scan & Check Compliance."
    ],

    [
      "What image formats are supported?",
      "PackSure AI supports JPG, JPEG, PNG and WEBP images."
    ],

    [
      "Can I use my device camera?",
      "Yes. Use the Take Photo option in New Inspection. On supported mobile browsers, it opens the device camera."
    ],

    [
      "How are compliance results generated?",
      "The intended workflow is image processing, OCR, information extraction, configurable rules evaluation and compliance scoring. AI is primarily used for OCR/information extraction and assistance, while rule validation should be backed by a verified rules database."
    ],

    [
      "Are the reports real?",
      "The frontend demo generates functional browser-based reports from saved inspection records. Production reports should be generated from a secure backend and verified data source."
    ]

  ];


  return (

    <div className="mx-auto max-w-5xl">

      <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        Support
      </p>

      <h1 className="mt-2 text-3xl font-black">
        Help & Guide
      </h1>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Learn how to use PackSure AI.
      </p>


      <div
        className="
        mt-7
        grid
        gap-4
        md:grid-cols-3
        "
      >

        <div
          className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
          "
        >

          <ScanLine className="text-blue-600 dark:text-blue-400" />

          <h3 className="mt-4 font-bold">
            1. Scan
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Upload or capture product label
            images.
          </p>

        </div>


        <div
          className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
          "
        >

          <FileText className="text-emerald-500 dark:text-emerald-400" />

          <h3 className="mt-4 font-bold">
            2. Analyze
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            OCR and rule checks process the
            detected declarations.
          </p>

        </div>


        <div
          className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
          "
        >

          <Bot className="text-blue-600 dark:text-blue-400" />

          <h3 className="mt-4 font-bold">
            3. Review
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Review the score and ask the AI
            assistant for explanations.
          </p>

        </div>

      </div>


      <div
        className="
        mt-7
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
        "
      >

        <div className="border-b border-slate-200 p-5 dark:border-slate-800">

          <h2 className="font-bold">
            Frequently Asked Questions
          </h2>

        </div>


        {faqs.map(
          ([question, answer], index) => (

            <div
              key={question}
              className="
              border-b
              border-slate-200
              last:border-0
              dark:border-slate-800
              "
            >

              <button
                onClick={() =>
                  setOpen(
                    open === index
                      ? null
                      : index
                  )
                }
                className="
                flex
                w-full
                items-center
                justify-between
                p-5
                text-left
                "
              >

                <span className="text-sm font-bold">
                  {question}
                </span>

                <ChevronDown
                  size={18}
                  className={`
                  text-slate-400
                  transition
                  dark:text-slate-500
                  ${
                    open === index
                      ? "rotate-180"
                      : ""
                  }
                  `}
                />

              </button>


              {open === index && (

                <div
                  className="
                  px-5
                  pb-5
                  text-sm
                  leading-6
                  text-slate-600
                  dark:text-slate-400
                  "
                >
                  {answer}
                </div>

              )}

            </div>

          )
        )}

      </div>

    </div>

  );
}


export default Help;

