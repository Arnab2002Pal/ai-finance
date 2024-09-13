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
    <div className='flex flex-col gap-4 mb-4 justify-center items-center'>
      <div className='w-screen-md text-wrap text-center'>
        By submitting your data, you agree that the information provided will be securely stored and used solely for AI analysis purposes. We prioritize the protection of your data and ensure it will not be shared with third parties or used for any other purpose outside of AI analysis. All reasonable measures are taken to safeguard your data and maintain confidentiality in compliance with applicable data protection laws. You retain ownership of your data and can request its deletion at any time.
      </div>
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
    </div>
  );
};

export default TermsAndCondition;
