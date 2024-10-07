import { userFinancialInfoState } from "@/app/store/atoms/financialAtom";
import { useRecoilValue } from "recoil";

const GoalDashboard = () => {

  const userFinancialInfo = useRecoilValue(userFinancialInfoState);
  const { goalRoadmap } = userFinancialInfo
  
  const longTermGoal = {
    advice: goalRoadmap.LongTermGoal?.Advice,
    currentAge: goalRoadmap.LongTermGoal?.CurrentAge,
    description: goalRoadmap.LongTermGoal?.Description,
    estimatedAnnualRequirement: goalRoadmap.LongTermGoal?.EstimatedAnnualRequirement,
    yearsToInvest: goalRoadmap.LongTermGoal?.YearsToInvest,
  };

  const shortTermGoal = {
    advice: goalRoadmap.ShortTermGoal?.Advice,
    description: goalRoadmap.ShortTermGoal?.Description,
    monthlySavingsNeeded: goalRoadmap.ShortTermGoal?.MonthlySavingsNeeded,
    targetAmount: goalRoadmap.ShortTermGoal?.TargetAmount,
  };

  return (
    <div className="flex flex-row gap-6 w-full">
      {/* Long-Term Goal Section */}
      <div className="p-6 rounded-lg bg-gradient-to-t from-blue-600 to-neutral-900 text-white">
        <h3 className="text-2xl font-bold mb-4">Long-Term Goal: {longTermGoal.description}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-lg">Current Age:</div>
            <div className="text-3xl font-bold">{longTermGoal.currentAge}</div>
          </div>
          <div>
            <div className="text-lg">Years to Invest:</div>
            <div className="text-3xl font-bold">{longTermGoal.yearsToInvest} years</div>
          </div>
          <div>
            <div className="text-lg">Estimated Annual Requirement:</div>
            <div className="text-3xl font-bold">₹{longTermGoal.estimatedAnnualRequirement?.toLocaleString()}</div>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-xl font-bold">Advice</h4>
          <p className="mt-2 text-lg">{longTermGoal.advice}</p>
        </div>
      </div>

      {/* Short-Term Goal Section */}
      <div className="p-6 rounded-lg bg-gradient-to-t from-green-600 to-neutral-900 text-white">
        <h3 className="text-2xl font-bold mb-4">Short-Term Goal: {shortTermGoal.description}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-lg">Monthly Savings Needed:</div>
            <div className="text-3xl font-bold">₹{shortTermGoal.monthlySavingsNeeded?.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-lg">Target Amount:</div>
            <div className="text-3xl font-bold">₹{shortTermGoal.targetAmount?.toLocaleString()}</div>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-xl font-bold">Advice</h4>
          <p className="mt-2 text-lg">{shortTermGoal.advice}</p>
        </div>
      </div>
    </div>
  );
};

export default GoalDashboard;
