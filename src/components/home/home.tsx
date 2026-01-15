import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { setPageTitle } from "../../store/themeConfigSlice";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Tab holati
  const [activeTab, setActiveTab] = useState<"dashboard" | "modules">(
    "dashboard"
  );

  useEffect(() => {
    // Sahifa title
    dispatch(setPageTitle(t("bread.home", { defaultValue: "Dashboard" })));
  }, [dispatch, t]);

  // Dizayndagi 3D kartalar (rasmlar public/ ichidan olinadi)

  // Tab tugmalari uchun sinf
  const tabClass = (key: "dashboard" | "modules") =>
    [
      "px-5 py-2 rounded-full text-sm font-semibold transition",
      activeTab === key
        ? "bg-white shadow text-slate-900 dark:bg-slate-100"
        : "text-white/90 hover:text-white/100",
    ].join(" ");

  return (
    <div className="space-y-6">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl h-56 md:h-64">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute left-6 bottom-6">
          <h1 className="text-white font-extrabold text-2xl md:text-4xl drop-shadow">
            O‘ZBEKISTON TEMIR YO‘LLARI
          </h1>
        </div>

        {/* Tabs (Dashboard / Modulli) */}
        <div className="absolute left-6 top-6 flex items-center">
          <div className="flex items-center gap-1 rounded-full border border-white/40 bg-white/20 backdrop-blur-md p-1">
            <button
              type="button"
              onClick={() => setActiveTab("modules")}
              className={tabClass("modules")}
            >
              Modulli
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
