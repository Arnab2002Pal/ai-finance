import { SavingPlan } from '@/app/interface/userInterface';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SavingsProgress = ({ savings }: { savings: SavingPlan }) => (
    <div className="bg-dark-800 md:h-[370px] text-white p-6 rounded-lg  flex flex-col items-center">
        <CircularProgressbar
            value={savings.percentageOfSalarySaved}
            text={`${savings.percentageOfSalarySaved}%`}
            strokeWidth={12}
            styles={buildStyles({
                textColor: '#FFD700',
                pathColor: '#FFD700',
                trailColor: '#2D2D2D',
                textSize: '14px', // Reduced text size

            })}
        />
        <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">Percentage Saved</p>
        </div>
    </div>
);

export default SavingsProgress;
