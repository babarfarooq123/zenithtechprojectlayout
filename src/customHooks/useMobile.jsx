import { useState } from "react"

const UseMobile = () => {
    const [width, setWidth] = useState(window.innerWidth);

    window.addEventListener("resize", (event) => {
        setWidth(window.innerWidth);
    })

    return width;
}

export default UseMobile;