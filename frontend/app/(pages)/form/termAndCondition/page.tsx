import React, { useState } from 'react';
import { Checkbox } from "../../../components/ui/checkbox";

const TermsAndCondition = ({ formData, handleChange }: any) => {
  const [checkedTerm, setCheckedTerm] = useState(formData.acceptTerms);

  const handleTermsAndCondition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckedTerm(checked);
    handleChange(e);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="acceptTerms" 
        checked={checkedTerm}
        onChange={handleTermsAndCondition}
      />
      <label
        htmlFor="acceptTerms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
};

export default TermsAndCondition;
