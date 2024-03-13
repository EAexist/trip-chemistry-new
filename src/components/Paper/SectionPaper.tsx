import { ForwardedRef, forwardRef } from "react";

import { Paper, PaperProps } from "@mui/material";
import { motion } from 'framer-motion';

import { SLIDEINUPINVIEW } from "../../motion/props";

const SectionPaper = forwardRef(({ className, square = true, children, ...props }: PaperProps, ref: ForwardedRef<HTMLDivElement>) =>


    <Paper
        square={square}
        elevation={0}
        {...props}
        className={`block--with-padding ${className}`}
    >
        {children}
    </Paper>
);

export default SectionPaper;
