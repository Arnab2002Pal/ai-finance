"use client"
import React, { useState } from 'react';

const TermsAndCondition = ({ formData, handleChange }: any) => {
  const [checkedTerm, setCheckedTerm] = useState(formData?.acceptTerms);

  const handleTermsAndCondition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckedTerm(checked);
    handleChange(e);
  };

  return (
    <div className="flex flex-col gap-4 mb-4 justify-center items-center px-4">
      <div className="w-full max-w-md text-center text-sm lg:text-base">
        By submitting your data, you agree that it will be securely stored for AI analysis only. We prioritize confidentiality and data security, ensuring no unauthorized sharing. You can request data deletion anytime.
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="acceptTerms"
          checked={checkedTerm}
          onChange={handleTermsAndCondition}
          className="h-4 w-4"
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
