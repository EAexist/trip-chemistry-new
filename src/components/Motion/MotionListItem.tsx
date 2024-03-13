import { ListItem, ListItemProps } from "@mui/material";
import { MotionProps, motion } from "framer-motion";
import { VARIANTS_SLIDE_UP } from "../../motion/props";

const MotionListItemComponent = motion(ListItem, { forwardMotionProps: true });

export const MotionListItem = (props : ListItemProps & MotionProps) => 
    <MotionListItemComponent {...props} {...{variants : VARIANTS_SLIDE_UP}} /> 