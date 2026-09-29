import { useState, useMemo, memo, useEffect } from "react";
import "./FilterSideBar.css";
import searcIcon from "../../Assets/Career/search.svg";
import filterIcon from "../../Assets/Career/filter_alt.svg";

const FilterSideBar = memo(({ onFilterChange,onSearchChange, filterOptions = {}, type }) => {
  const FILTER_GROUPS = useMemo(() => {
    /*
     * ---------------------------------------
     * CAMERA FILTERS
     * ---------------------------------------
     */
    if (type === "camera") {
      return [
        {
          key: "camera_type",
          label: "Camera Type",
          options: filterOptions?.cameraTypes || [],
        },
        {
          key: "resolution",
          label: "Resolution",
          options: filterOptions?.resolutions || [],
        },
        {
          key: "zoom",
          label: "Zoom",
          options: [...(filterOptions?.zooms || [])].sort((a, b) => {
            const numA = parseFloat(a);
            const numB = parseFloat(b);

            if (!isNaN(numA) && !isNaN(numB)) {
              return numA - numB;
            }

            return a.localeCompare(b);
          }),
        },
      ];
    }
    /*
     * ---------------------------------------
     * CAREER FILTERS
     * ---------------------------------------
     */

    if (type === "career") {
      return [
        {
          key: "area",
          label: "Area of Interest",
          options: filterOptions?.areas || [],
        },
        {
          key: "job_type",
          label: "Job Type",
          options: filterOptions?.jobTypes || [],
        },
        {
          key: "experience",
          label: "Experience",
          options: filterOptions?.experiences || [],
        },
      ];
    }
    /*
     * ---------------------------------------
     * DEFAULT / LED FILTERS
     * ---------------------------------------
     */

    return [
      {
        key: "type",
        label: "Panel Type",
        options: filterOptions?.ledTypes || [],
      },
      {
        key: "pixel_pitch",
        label: "Pixel Pitch (mm)",
        options: [...(filterOptions?.pixelPitches || [])].sort((a, b) => {
          const numA = parseFloat(a.replace(/[^0-9.]/g, ""));

          const numB = parseFloat(b.replace(/[^0-9.]/g, ""));

          if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
          }

          return a.localeCompare(b);
        }),
      },
      {
        key: "brightness",
        label: "Brightness",
        options: filterOptions?.brightness || [],
      },
      {
        key: "refresh_rate",
        label: "Refresh Rate",
        options: filterOptions?.refreshRates || [],
      },
      {
        key: "size",
        label: "Sizes",
        options: [...(filterOptions?.sizes || [])].sort((a, b) => {
          const numA = parseFloat(a);
          const numB = parseFloat(b);

          if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
          }

          return a.localeCompare(b);
        }),
      },
      {
        key: "processor",
        label: "Processor",
        options: filterOptions?.processors || [],
      },
      {
        key: "processor_speed",
        label: "Processor Speed",
        options: filterOptions?.processorSpeeds || [],
      },
      {
        key: "storage",
        label: "Storage",
        options: filterOptions?.storages || [],
      },
      {
        key: "smart_features",
        label: "Smart Features",
        options: filterOptions?.smartFeatures || [],
      },
    ];
  }, [filterOptions, type]);

  const [openGroups, setOpenGroups] = useState({});
  const [selected, setSelected] = useState({});
  const [draftSelected, setDraftSelected] = useState({});
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    const filteredGroups = useMemo(() => {
  if (!searchTerm.trim()) return FILTER_GROUPS;

  const term = searchTerm.toLowerCase();

  return FILTER_GROUPS.map((group) => ({
    ...group,
    options: group.options.filter((option) =>
      String(option).toLowerCase().includes(term)
    ),
  })).filter((group) => group.options.length > 0);
}, [FILTER_GROUPS, searchTerm]);
  // useEffect(() => {
  //   const openState = {};

  //   FILTER_GROUPS.forEach((group) => {
  //     openState[group.key] = true;
  //   });

  //   setOpenGroups(openState);

  //   setSelected((prev) => {
  //     const next = { ...prev };

  //     FILTER_GROUPS.forEach((group) => {
  //       if (!next[group.key]) {
  //         next[group.key] = new Set();
  //       }
  //     });

  //     return next;
  //   });
  // }, [FILTER_GROUPS]);
useEffect(() => {
  const openState = {};

  FILTER_GROUPS.forEach((group) => {
    openState[group.key] = true;
  });

  setOpenGroups(openState);

  setSelected((prev) => {
    const next = { ...prev };

    FILTER_GROUPS.forEach((group) => {
      if (!next[group.key]) {
        next[group.key] = new Set();
      }
    });

    return next;
  });
}, [FILTER_GROUPS]);
   useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

    useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const toggleGroup = (key) => {
    setOpenGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // const toggleOption = (groupKey, option) => {
  //   setSelected((prev) => {
  //     const next = new Set(prev[groupKey] || []);

  //     if (next.has(option)) {
  //       next.delete(option);
  //     } else {
  //       next.add(option);
  //     }

  //     const updated = {
  //       ...prev,
  //       [groupKey]: next,
  //     };

  //     if (onFilterChange) {
  //       const payload = Object.fromEntries(
  //         Object.entries(updated).map(([key, value]) => [key, [...value]])
  //       );

  //       onFilterChange(payload);
  //     }

  //     return updated;
  //   });
  // };
  
  const toggleOption = (groupKey, option) => {
  // Desktop: apply immediately
  if (window.innerWidth > 1024) {
    setSelected((prev) => {
      const next = new Set(prev[groupKey] || []);

      if (next.has(option)) {
        next.delete(option);
      } else {
        next.add(option);
      }

      const updated = {
        ...prev,
        [groupKey]: next,
      };

      if (onFilterChange) {
        const payload = Object.fromEntries(
          Object.entries(updated).map(([key, value]) => [key, [...value]])
        );

        onFilterChange(payload);
      }

      return updated;
    });

    return;
  }

  // Mobile/tablet: only update temporary selections
  setDraftSelected((prev) => {
    const next = new Set(prev[groupKey] || []);

    if (next.has(option)) {
      next.delete(option);
    } else {
      next.add(option);
    }

    return {
      ...prev,
      [groupKey]: next,
    };
  });
};
  
  // const openDrawer = () => setIsDrawerOpen(true);
  // const closeDrawer = () => setIsDrawerOpen(false);
  const openDrawer = () => {
  // Start the drawer with the currently applied filters
  setDraftSelected(() => {
    const next = {};

    Object.entries(selected).forEach(([key, value]) => {
      next[key] = new Set(value);
    });

    return next;
  });

  setIsDrawerOpen(true);
};

const closeDrawer = () => {
  setIsDrawerOpen(false);
};

const applyFilters = () => {
  const updated = {};

  FILTER_GROUPS.forEach((group) => {
    updated[group.key] = new Set(draftSelected[group.key] || []);
  });

  setSelected(updated);

  if (onFilterChange) {
    const payload = Object.fromEntries(
      Object.entries(updated).map(([key, value]) => [key, [...value]])
    );

    onFilterChange(payload);
  }

  setIsDrawerOpen(false);
};

  return (
    <>
          {/* Mobile Search & Filter Actions */}
    {/* Mobile Search & Filter Actions */}
<div className="display-on-small-screens">
  <div className="search-input-wrapper">
    <img src={searcIcon} alt="Search" className="search-icon" />
    <input
      className="filter-input-mobile"
      type="text"
      placeholder="Type here"
      value={searchTerm}
      // onChange={(e) => setSearchTerm(e.target.value)}
      onChange={(e) => {
  const value = e.target.value;
  setSearchTerm(value);
  if (onSearchChange) onSearchChange(value);
}}
    />
  </div>
  <button
    type="button"
    className="filter-drawer-opener-mobile"
    onClick={openDrawer}
  >
    <img src={filterIcon} alt="Filter" className="filter-btn-icon" />
    <span>Filters</span>
  </button>
</div>


      <div
  className={`filter-drawer-overlay ${isDrawerOpen ? "is-open" : ""}`}
  onClick={closeDrawer}
  aria-hidden={!isDrawerOpen}
>
  <aside
    className="filter-sidebar"
    onClick={(e) => e.stopPropagation()}
  >

       {filteredGroups.map((group, gi) => {
          if (!group.options || group.options.length === 0) {
            return null;
          }

          return (
            <div
              key={group.key}
              className={`filter-group ${
                gi < filteredGroups.length - 1 ? "has-divider" : ""
              }`}
            >
              <button
                type="button"
                className="filter-group-header"
                onClick={() => toggleGroup(group.key)}
                aria-expanded={openGroups[group.key]}
              >
                <span className="filter-group-label">{group.label}</span>

                <span className="filter-group-icon">
                  {openGroups[group.key] ? (
                    <svg width="16" height="2" viewBox="0 0 16 2" fill="none">
                      <rect width="16" height="2" rx="1" fill="#1a1a1a" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="7" width="2" height="16" rx="1" fill="#1a1a1a" />
                      <rect y="7" width="16" height="2" rx="1" fill="#1a1a1a" />
                    </svg>
                  )}
                </span>
              </button>

              {openGroups[group.key] && (
                <div className="filter-options">
                  {group.options.map((option) => {
                    // const checked = selected[group.key]?.has(option) || false;
                    const checked =
  window.innerWidth <= 1024
    ? draftSelected[group.key]?.has(option) || false
    : selected[group.key]?.has(option) || false;

                    const id = `${group.key}-${String(option)
                      .replace(/\s+/g, "-")
                      .replace(/[^a-zA-Z0-9-_]/g, "")}`;

                    return (
                      <label
                        key={option}
                        className="filter-option"
                        htmlFor={id}
                      >
                        <input
                          id={id}
                          type="checkbox"
                          className="filter-checkbox"
                          checked={checked}
                          onChange={() => toggleOption(group.key, option)}
                        />

                        <span className="filter-option-label">{option}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        <div className="display-on-small-screens button-sm-screens">
  <button
    type="button"
    className="go-back-btn"
    onClick={closeDrawer}
  >
    Go Back
  </button>

  <button
    type="button"
    className="filter-drawer-opener-mobile"
    onClick={applyFilters}
  >
    Apply
  </button>
</div>
      </aside>
      
      </div>

     
    </>
  );
});

export default FilterSideBar;