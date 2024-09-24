import { filterOptions, filterTitle } from "@/config";
import { Fragment, useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

function ProductFilter() {
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedTypes, setSelectedTypes] = useState({});
  const [selectedSubtypes, setSelectedSubtypes] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const subtype = searchParams.get("subtype");

    if (category) {
      setSelectedCategories({ [category]: true });
      if (type) {
        setSelectedTypes({ [category]: type });
        if (subtype) {
          setSelectedSubtypes({ [category]: { [type]: subtype } });
        }
      }
    }
  }, [searchParams]);

  const updateFilters = (newCategories, newTypes, newSubtypes) => {
    const params = new URLSearchParams();

    Object.keys(newCategories).forEach((category) => {
      if (newCategories[category]) {
        params.append("category", category);
        if (newTypes[category]) {
          params.append("type", newTypes[category]);
          if (
            newSubtypes[category] &&
            newSubtypes[category][newTypes[category]]
          ) {
            params.append("subtype", newSubtypes[category][newTypes[category]]);
          }
        }
      }
    });

    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (category, isChecked) => {
    const newCategories = { [category]: isChecked };
    const newTypes = {};
    const newSubtypes = {};

    if (!isChecked) {
      delete newTypes[category];
      delete newSubtypes[category];
    }

    setSelectedCategories(newCategories);
    setSelectedTypes(newTypes);
    setSelectedSubtypes(newSubtypes);
    updateFilters(newCategories, newTypes, newSubtypes);
  };

  const handleTypeChange = (category, type, isChecked) => {
    const newTypes = { ...selectedTypes };
    const newSubtypes = { ...selectedSubtypes };

    if (isChecked) {
      newTypes[category] = type;
    } else {
      delete newTypes[category];
      delete newSubtypes[category];
    }

    setSelectedTypes(newTypes);
    setSelectedSubtypes(newSubtypes);
    updateFilters(selectedCategories, newTypes, newSubtypes);
  };

  const handleSubtypeChange = (category, type, subtype, isChecked) => {
    const newSubtypes = { ...selectedSubtypes };

    if (isChecked) {
      if (!newSubtypes[category]) {
        newSubtypes[category] = {};
      }
      newSubtypes[category][type] = subtype;
    } else {
      if (newSubtypes[category]) {
        delete newSubtypes[category][type];
        if (Object.keys(newSubtypes[category]).length === 0) {
          delete newSubtypes[category];
        }
      }
    }

    setSelectedSubtypes(newSubtypes);
    updateFilters(selectedCategories, selectedTypes, newSubtypes);
  };

  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Danh mục</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={index}>
            <div>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <Label className="flex font-medium items-center gap-2 hover:cursor-pointer">
                      <Checkbox
                        checked={selectedCategories[option.id] || false}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(option.id, checked)
                        }
                      />
                      {option.label}
                    </Label>
                    {keyItem === "category" &&
                      option.types &&
                      option.types.length > 0 &&
                      selectedCategories[option.id] && (
                        <div className="ml-6 mt-2 space-y-2">
                          {option.types.map((type, typeIndex) => (
                            <div key={typeIndex}>
                              <Label className="flex items-center gap-2 hover:cursor-pointer">
                                <Checkbox
                                  checked={
                                    selectedTypes[option.id] === type.name
                                  }
                                  onCheckedChange={(checked) =>
                                    handleTypeChange(
                                      option.id,
                                      type.name,
                                      checked
                                    )
                                  }
                                />
                                {type.name}
                              </Label>
                              {selectedTypes[option.id] === type.name &&
                                type.subtypes &&
                                type.subtypes.length > 0 && (
                                  <div className="ml-6 mt-2 space-y-2">
                                    {type.subtypes.map(
                                      (subtype, subtypeIndex) =>
                                        subtype !== "No" ? (
                                          <Label
                                            key={subtypeIndex}
                                            className="flex items-center gap-2 hover:cursor-pointer"
                                          >
                                            <Checkbox
                                              checked={
                                                selectedSubtypes[option.id] &&
                                                selectedSubtypes[option.id][
                                                  type.name
                                                ] === subtype
                                              }
                                              onCheckedChange={(checked) =>
                                                handleSubtypeChange(
                                                  option.id,
                                                  type.name,
                                                  subtype,
                                                  checked
                                                )
                                              }
                                            />
                                            {subtype}
                                          </Label>
                                        ) : null
                                    )}
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      )}
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
