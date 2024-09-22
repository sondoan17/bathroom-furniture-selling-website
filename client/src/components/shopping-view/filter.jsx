import { filterOptions, filterTitle } from "@/config";
import { Fragment, useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

function ProductFilter() {
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedTypes, setSelectedTypes] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    
    if (category) {
      setSelectedCategories({ [category]: true });
      if (type) {
        setSelectedTypes({ [category]: type });
      }
    }
  }, [searchParams]);

  const updateFilters = (newCategories, newTypes) => {
    const params = new URLSearchParams();
    
    Object.keys(newCategories).forEach(category => {
      if (newCategories[category]) {
        params.append('category', category);
        if (newTypes[category]) {
          params.append('type', newTypes[category]);
        }
      }
    });

    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (category, isChecked) => {
    const newCategories = { ...selectedCategories, [category]: isChecked };
    const newTypes = { ...selectedTypes };
    
    if (!isChecked) {
      delete newTypes[category];
    }

    setSelectedCategories(newCategories);
    setSelectedTypes(newTypes);
    updateFilters(newCategories, newTypes);
  };

  const handleTypeChange = (category, type, isChecked) => {
    const newTypes = { ...selectedTypes };
    
    if (isChecked) {
      newTypes[category] = type;
    } else {
      delete newTypes[category];
    }

    setSelectedTypes(newTypes);
    updateFilters(selectedCategories, newTypes);
  };

  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={index}>
            <div>
              <h3 className="text-base font-bold">{filterTitle[index]}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <Label
                      className="flex font-medium items-center gap-2 hover:cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedCategories[option.id] || false}
                        onCheckedChange={(checked) => handleCategoryChange(option.id, checked)}
                      />
                      {option.label}
                    </Label>
                    {keyItem === "category" && option.type && option.type.length > 0 && selectedCategories[option.id] && (
                      <div className="ml-6 mt-2 space-y-2">
                        {option.type.map((type, typeIndex) => (
                          <Label
                            key={typeIndex}
                            className="flex items-center gap-2 hover:cursor-pointer"
                          >
                            <Checkbox
                              checked={selectedTypes[option.id] === type}
                              onCheckedChange={(checked) => handleTypeChange(option.id, type, checked)}
                            />
                            {type}
                          </Label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
