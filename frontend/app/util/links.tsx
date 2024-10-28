import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";

const links = [
    {
        label: "Dashboard",
        href: "#",
        icon: (
            <IconBrandTabler className="text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
    },
    {
        label: "Profile",
        href: "#",
        icon: <IconUserBolt className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
        label: "Settings",
        href: "#",
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