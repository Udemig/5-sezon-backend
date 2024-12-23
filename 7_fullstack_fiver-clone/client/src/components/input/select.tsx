import { ICategory } from "../../types";

type Props = {
  label: string;
  options: ICategory[];
  name?: string;
};

const Select = ({ label, options, name }: Props) => {
  return (
    <div className="mb-5 flex flex-col">
      <label className="mb-2 text-sm font-medium text-gray-900">{label}</label>

      <select
        required
        name={name}
        className="bg-gray-50 border border-gray-300 rounded-md p-2.5 placeholder-gray-400 text-dark focus:border-blue-500"
      >
        {options.map((option, key) => (
          <option value={option.name}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
