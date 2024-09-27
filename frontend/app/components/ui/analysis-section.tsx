import { cn } from "@/app/lib/utils";
import { UserFinancialInfo } from "@/interface/userInterface";
import {
  IconCurrencyDollar,
  IconEaseInOut,
  IconRouteAltLeft,
} from "@tabler/icons-react";
import { useSetRecoilState } from "recoil";
import { selectedDashboardState } from "@/app/store/atoms/dashboardAtom";
import { useRouter } from "next/navigation";

export function AnalysisSection({
  category,
}: {
  category?: UserFinancialInfo;
  }) {
  const router = useRouter()
  const setDashboardContent = useSetRecoilState(selectedDashboardState)
  
  const analyses = [
    {
      title: "Expense Analysis",
      description:
        "Built for engineers, developers, dreamers, thinkers and doers.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-license"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11" />
          <path d="M9 7l4 0" />
          <path d="M9 11l4 0" />
        </svg>
      ),
    },
    {
      title: "Investment Analysis",
      description:
        "It's as easy as using an Apple, and as expensive as buying one.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Debt Managment",
      description:
        "Our prices are best in the market. No cap, no lock, no credit card required.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Saving Plan",
      description: "We just cannot be taken down by anyone.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-pig-money"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 11v.01" />
          <path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377" />
          <path d="M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3h0z" />
        </svg>
      ),
    },
    {
      title: "Goal Roadmap",
      description:
        "We are available a 100% of the time. Atleast our AI Agents are.",
      icon: <IconRouteAltLeft />,
    },
  ];

  
  const onAnalysisClick = (title: string) => {
    const firstWord = title.split(' ')[0].toLowerCase()
        
    router.push(`/home/dashboard/${firstWord}`);
    // setDashboardContent(title)

  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {analyses.map((analysis, index) => (
        <Feature
          key={analysis.title}
          {...analysis}
          index={index}
          onClick={() => onAnalysisClick(analysis.title)}
        />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  onClick: () => void;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
      onClick={onClick}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-600 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-600 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-400">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300  group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="cursor-default group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10 cursor-default">
        {description}
      </p>
    </div>
  );
};
