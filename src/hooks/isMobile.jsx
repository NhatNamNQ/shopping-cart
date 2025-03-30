import { useEffect, useState } from "react";

export default function isMobile() {
    const [check, setCheck] = useState(true);

    useEffect(() => {
        const checkMobile = () => {
            const isMobileSize = window.innerWidth <= 500 || window.innerHeight <= 500;
            setCheck(isMobileSize);
        }

        checkMobile();

        addEventListener('resize', checkMobile);

        return removeEventListener('resize', checkMobile);
    }, []);

    return check;
}