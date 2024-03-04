/* React */
import { useEffect } from "react";

/* React Packages */
import { useNavigate } from "react-router-dom";
import { ButtonBase, CardActionArea, CardContent, Divider, Rating, Stack } from "@mui/material";
import { StarBorder, ThumbUp } from "@mui/icons-material";

/* Trip Chemistry */
import { TEST } from "../../common/app-const";
import { useStrings } from "../../texts";
import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
import AvatarProfile from "../../components/Avatar/AvatarProfile";
import getImgSrc, { FORMATWEBP } from "../../utils/getImgSrc";
import ImageCard from "../../components/Card/ImageCard";
import AvatarGroup from "../../components/Avatar/AvatarGroup";
import { useCityChemistry } from "../../reducers/tripReducer";
import { FriendProfileAvatar } from "../../components/Avatar/ProfileAvatar";

interface CityChemistryContentProps {
    cityClass: keyof typeof TEST.city.subTests;
};

function CityChemistryContent({ cityClass }: CityChemistryContentProps) {

    const navigate = useNavigate();

    const testStrings = useStrings().public.contents.test;
    const valueToProfileList = useValueToProfileIdList(cityClass);

    const score = useCityChemistry(cityClass);

    const handleClick = () => {
        navigate(`../city/${cityClass}`);
    }

    useEffect(() => {
        console.log(`[CityChemistryContent] cityClass=${cityClass}`)
    }, [cityClass])

    return (
        <div className="block__body">
                <ImageCard
                    src={getImgSrc("/city", TEST.city.subTests[cityClass].examples[0], FORMATWEBP)}
                    title={cityClass}
                    gradient="bottom"
                    className="block--xlarge"
                >
                    <CardActionArea onClick={handleClick} className="flex-end">
                    <CardContent>
                        <Stack justifyContent={"space-between"} className="typography-white">
                            <Stack>
                                <h2 className="typography-label">{testStrings.subTest[cityClass as keyof typeof testStrings.subTest].title}</h2>
                            </Stack>
                            <Stack>
                                <Rating value={score} readOnly precision={0.5} size={"small"} emptyIcon={<StarBorder fontSize="inherit" sx={{ color: "white" }} />} />
                                <p>{Math.round(score * 10) / 10}</p>
                                {
                                    (score > 3.4) &&
                                    <ThumbUp fontSize="inherit" sx={{ color: "white" }} />
                                }
                            </Stack>
                        </Stack>
                    </CardContent>
                    </CardActionArea>
                </ImageCard>
            <Stack flexWrap={"wrap"} spacing={2} divider={<Divider variant="middle" orientation="vertical" flexItem />}>
                {
                    Object.entries(valueToProfileList).reverse().map(([value, idList], index) => (
                        <Stack sx={{ flexWrap: "wrap" }}>
                            <p className="typography-note">{testStrings.test.city.answers[Number(value) as keyof typeof testStrings.test.city.answers].label}</p>
                            <Stack spacing={-0.25}>
                                {
                                    idList.map((id) => (
                                        <FriendProfileAvatar id={id} />
                                    ))
                                }
                            </Stack>
                        </Stack>
                    ))
                }
            </Stack>
        </div>
    );
}
export default CityChemistryContent;