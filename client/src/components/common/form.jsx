import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  const [typeOptions, setTypeOptions] = useState([]);
  const [subtypeOptions, setSubtypeOptions] = useState([]);

  useEffect(() => {
    const categoryControl = formControls.find(
      (control) => control.name === "category"
    );

    if (categoryControl && categoryControl.options) {
      const selectedCategory = categoryControl.options.find(
        (option) => option.id === formData.category
      );
      if (selectedCategory && selectedCategory.types) {
        setTypeOptions(
          selectedCategory.types.map((type) => ({
            id: type.name,
            label: type.name,
          }))
        );
      } else {
        setTypeOptions([]);
        setSubtypeOptions([]);
      }
    }
  }, [formData.category, formControls]);

  useEffect(() => {
    const categoryControl = formControls.find(
      (control) => control.name === "category"
    );

    if (categoryControl && categoryControl.options) {
      const selectedCategory = categoryControl.options.find(
        (option) => option.id === formData.category
      );
      if (selectedCategory && selectedCategory.types) {
        const selectedType = selectedCategory.types.find(
          (type) => type.name === formData.type
        );
        if (selectedType && selectedType.subtypes) {
          setSubtypeOptions(
            selectedType.subtypes.map((subtype) => ({
              id: subtype,
              label: subtype,
            }))
          );
        } else {
          setSubtypeOptions([]);
        }
      }
    }
  }, [formData.category, formData.type, formControls]);

  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        let options;
        if (getControlItem.name === "type") {
          options = typeOptions;
        } else if (getControlItem.name === "subtype") {
          options = subtypeOptions;
        } else {
          options = getControlItem.options || [];
        }
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {options.length > 0
                ? options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            rows={8}
            className="min-h-[200px]"
          />
        );
        break;
      default:
        element = null;
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
