import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";

const links = [
    {
        label: "Dashboard",
        href: `/home`,
        icon: (
            <IconBrandTabler className="text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Learning",
        href: `/home/learning`,
        icon: <IconUserBolt className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
        label: "Settings",
        href: "/home/settings",
        icon: <IconSettings className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
        label: "Logout",
        href: "logout",
        icon: (
            <IconArrowLeft className="text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
];

export default links;