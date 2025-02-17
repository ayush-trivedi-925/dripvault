import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export default function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  function renderInputByComponentType(controlItem) {
    let element = null;
    const value = formData[controlItem.name] || "";
    switch (controlItem.componentType) {
      case "input":
        element = (
          <Input
            type={controlItem.type}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(e) => {
              setFormData({
                ...formData,
                [controlItem.name]: e.target.value,
              });
            }}
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) => {
              setFormData({
                ...formData,
                [controlItem.name]: value,
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options && controlItem.options.length > 0
                ? controlItem.options.map((option) => {
                    return (
                      <SelectItem key={option.id} value={option}>
                        {option}
                      </SelectItem>
                    );
                  })
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(e) => {
              setFormData({
                ...formData,
                [controlItem.name]: e.target.value,
              });
            }}
          />
        );
        break;
      default:
        element = (
          <input
            type={controlItem.type}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(e) => {
              setFormData({
                ...formData,
                [controlItem.name]: e.target.value,
              });
            }}
          />
        );
        break;
    }
    return element;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => {
          return (
            <div className="grid w-full gap-1.5" key={controlItem.name}>
              <Label className="mb-1">{controlItem.label}</Label>
              {renderInputByComponentType(controlItem)}
            </div>
          );
        })}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}
