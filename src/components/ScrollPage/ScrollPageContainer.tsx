import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { useMotionValueEvent, useScroll } from "framer-motion";

import PageContext from "./PageContext";
import Step from "../Step/components/Step";
import { useLocation, useNavigate } from "react-router-dom";

/* ScrollPageContainer
    Sticky Container, which displays paged items according to the amount of scroll in the container.*/

interface ScrollPageContainerProps {
    pages: number;
    onPageChange?: (page: number) => void;
};

const ScrollPageContainer = ({ onPageChange, pages, children }: PropsWithChildren<ScrollPageContainerProps>) => {

    const [page, setPage] = useState<number>();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    // const [ pages, setPages ] = useState<number>(0);

    const ref = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    /* Motion */
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        console.log(`[ScrollPageContainer] useMotionValueEvent\n\tscrollY.get()=${scrollY.get()}\n\tpageRef?.current?.offsetHeight=${pageRef?.current?.offsetHeight}`);
        setPage(Math.min(Math.floor((scrollY.get() - (ref.current?.offsetTop as number)) / (pageRef?.current?.offsetHeight as number)), pages - 1));
    });

    /* Side Effect */
    useEffect(() => {
        console.log(`[ScrollPageContainer] useEffect\n\tscrollY.get()=${scrollY.get()}\n\tpageRef?.current?.offsetHeight=${pageRef?.current?.offsetHeight}`);
        setPage(Math.floor((scrollY.get() - (ref.current?.offsetTop as number)) / (pageRef?.current?.offsetHeight as number)));
    }, [])

    /* Side Effect OnPageChange */
    useEffect(() => {
        console.log(`[ScrollPageContainer]\n\tpage=${page}`);
        /* onPageChange Event Handlers from props */
        if (page) {
            onPageChange && onPageChange(page);
        }
    }, [page, onPageChange, pathname, navigate])

    return (
        <div ref={ref} className="ScrollPageContainer">
            {
                Array.from({ length: pages }, (value, index) => (
                    <Step key={index} index={index} className="fill-window" style={{ visibility: "hidden" }}/>
                ))
            }
            <div className="fill-window" />
            <div className="ScrollPageContainer__viewport-container">
                <div ref={pageRef} className="ScrollPageContainer__viewport fill-window">
                    <PageContext.Provider value={{ activePage: page }}>
                        {children}
                    </PageContext.Provider>
                </div>
            </div>
        </div>
    );
}

export default ScrollPageContainer;