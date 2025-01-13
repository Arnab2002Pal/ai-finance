import { HoverEffect } from "./ui/card-hover-effect";

export function FeatureCard() {
    return (
        <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={projects} />
        </div>
    );
}
export const projects = [

    {
        title: "💡 Personalized Investment Strategies",
        description:
            "Receive customized investment plans tailored to your financial goals. Our AI ensures your money is working for you efficiently.",
        link: "#",
    },
    {
        title: "📈 Growth Insights & Analytics",
        description:
            "Track your financial growth with insightful charts and analytics. Get a clear view of your net worth and cash flow over time.",
        link: "#",
    },
    {
        title: "📊 Debt and EMI Tracker",
        description:
            "Stay on top of your loans and EMIs with automated tracking. Get reminders and strategies to pay off your debt faster.",
        link: "#",
    },
    {
        title: "💰 Budget & Savings Planner",
        description:
            "Create realistic budgets and savings plans. Our app helps you optimize your spending and reach your financial goals faster.",
        link: "#",
    },
];
